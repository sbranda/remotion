"""
Música original para el Reel de triglicéridos (90 s), sintetizada desde cero.
Al no usar ninguna grabación ni canción existente, no tiene problemas de derechos.

- Progresión F – C – Dm – Bb (tono alegre y tranquilo), 96 BPM
- Capas: colchón de acordes, bajo, arpegio tipo "pluck", percusión muy suave
- Una campanita en cada cambio de página (tiempos tomados de src/trigliceridos/datos.ts)

Uso:  python3 scripts/musica_trigliceridos.py
Salida: public/audio/trigliceridos-musica.wav (después se convierte a .mp3 con ffmpeg)
"""

import os
import wave

import numpy as np

SR = 44100
DUR = 90.0
BPM = 96
BEAT = 60 / BPM
BAR = 4 * BEAT
# segundos en que empieza cada página (4, 10, 12, 12, 17, 23, 7, 5)
CAMBIOS = [4, 14, 26, 38, 55, 78, 85]

N = int(SR * DUR)
t_total = np.arange(N) / SR
mix = np.zeros(N)
rng = np.random.default_rng(7)


def hz(midi):
    return 440.0 * 2 ** ((midi - 69) / 12)


# acordes (MIDI): F, C, Dm, Bb
ACORDES = [
    [53, 57, 60, 65],  # F
    [48, 55, 60, 64],  # C
    [50, 57, 62, 65],  # Dm
    [46, 53, 58, 62],  # Bb
]
BAJOS = [41, 36, 38, 34]


def add(señal, inicio):
    i = int(inicio * SR)
    if i >= N:
        return
    fin = min(N, i + len(señal))
    mix[i:fin] += señal[: fin - i]


def env_adsr(n, a, d, s, r):
    """envolvente en muestras"""
    a, d, r = int(a * SR), int(d * SR), int(r * SR)
    sus = max(0, n - a - d - r)
    return np.concatenate([
        np.linspace(0, 1, a, endpoint=False),
        np.linspace(1, s, d, endpoint=False),
        np.full(sus, s),
        np.linspace(s, 0, r),
    ])[:n]


def pad(notas, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = np.zeros(n)
    for m in notas:
        f = hz(m + 12)
        for det in (-0.12, 0.12):  # leve desafinado: sonido más cálido
            x += np.sin(2 * np.pi * f * (1 + det / 100) * t)
            x += 0.18 * np.sin(2 * np.pi * 2 * f * t)
    x *= 1 + 0.08 * np.sin(2 * np.pi * 0.25 * t)  # vaivén lento
    return x / (len(notas) * 2.4) * env_adsr(n, 0.6, 0.4, 0.85, 0.7)


def bajo(m, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = hz(m)
    x = np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * 2 * f * t)
    return x * env_adsr(n, 0.01, 0.25, 0.55, 0.15)


def pluck(m, dur=0.6):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = hz(m)
    x = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * 2 * f * t) + 0.1 * np.sin(2 * np.pi * 3 * f * t)
    return x * np.exp(-t * 6) * np.minimum(1, t * 400)


def kick():
    n = int(0.35 * SR)
    t = np.arange(n) / SR
    f = 110 * np.exp(-t * 18) + 45
    fase = 2 * np.pi * np.cumsum(f) / SR
    return np.sin(fase) * np.exp(-t * 9)


def shaker():
    n = int(0.09 * SR)
    t = np.arange(n) / SR
    ruido = rng.standard_normal(n)
    ruido = ruido - np.convolve(ruido, np.ones(6) / 6, mode="same")  # quita graves
    return ruido * np.exp(-t * 45)


def campana(m):
    n = int(1.8 * SR)
    t = np.arange(n) / SR
    f = hz(m)
    x = np.sin(2 * np.pi * f * t) + 0.45 * np.sin(2 * np.pi * 2.76 * f * t) * np.exp(-t * 4)
    return x * np.exp(-t * 2.6) * np.minimum(1, t * 300)


compases = int(np.ceil(DUR / BAR))
ARPEGIO = [0, 1, 2, 3, 2, 1, 2, 3]  # índices dentro del acorde, en corcheas
for c in range(compases):
    t0 = c * BAR
    k = c % 4
    acorde = ACORDES[k]
    add(0.55 * pad(acorde, BAR + 0.6), t0)
    if c >= 1:
        for b in (0, 2):
            add(0.32 * bajo(BAJOS[k], BEAT * 1.8), t0 + b * BEAT)
    if c >= 2:
        for i, idx in enumerate(ARPEGIO):
            nota = acorde[idx] + 24
            add(0.11 * pluck(nota), t0 + i * BEAT / 2)
    final = t0 > DUR - 2 * BAR
    if 4 <= c and not final:
        for b in (0, 2):
            add(0.30 * kick(), t0 + b * BEAT)
        for i in range(8):
            if i % 2 == 1:
                add(0.05 * shaker(), t0 + i * BEAT / 2)

for i, s in enumerate(CAMBIOS):
    add(0.16 * campana(84 if i % 2 == 0 else 81), s - 0.05)

# fundido de entrada y salida
fade_in = np.minimum(1, t_total / 1.2)
fade_out = np.minimum(1, (DUR - t_total) / 3.5)
mix *= fade_in * fade_out

# normalizar a un nivel suave (pico -3 dB)
mix = mix / np.max(np.abs(mix)) * 0.7

estereo = np.stack([mix, mix], axis=1)
datos = (estereo * 32767).astype(np.int16)

os.makedirs("public/audio", exist_ok=True)
salida = "public/audio/trigliceridos-musica.wav"
with wave.open(salida, "wb") as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(datos.tobytes())
print(f"Listo: {salida} ({DUR:.0f} s)")
