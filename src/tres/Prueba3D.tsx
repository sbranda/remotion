// Prueba de three.js en Remotion: glóbulos rojos en 3D que giran y flotan.
// Todo depende de useCurrentFrame(), así cada cuadro del video sale idéntico al renderizar.
// Render: npm run prueba3d  (usa --gl=swangle: dibuja el 3D por software, funciona sin placa de video)
import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";
import { SANS } from "../fuente";
import { FIRMA, P } from "../salud/pop";

/** Forma de glóbulo rojo: disco con el centro hundido (perfil girado con LatheGeometry) */
const useGeometriaGlobulo = () =>
  useMemo(() => {
    const puntos: THREE.Vector2[] = [];
    for (let i = 0; i <= 40; i++) {
      const t = (i / 40) * Math.PI;
      const r = Math.sin(t);
      // borde grueso y centro fino
      const grosor = 0.12 + 0.28 * Math.pow(r, 6);
      puntos.push(new THREE.Vector2(r, Math.cos(t) * grosor));
    }
    return new THREE.LatheGeometry(puntos, 64);
  }, []);

const GLOBULOS = Array.from({ length: 14 }).map((_, i) => ({
  x: ((i * 37) % 9) - 4,
  y: ((i * 53) % 11) - 5.5,
  z: -((i * 29) % 6) - 1,
  fase: i * 1.3,
  escala: 0.7 + ((i * 17) % 5) * 0.1,
}));

const Globulos: React.FC = () => {
  const frame = useCurrentFrame();
  const geo = useGeometriaGlobulo();
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 6, 6]} intensity={180} color="#ffffff" />
      <pointLight position={[-6, -4, 3]} intensity={90} color={P.cian} />
      {GLOBULOS.map((g, i) => {
        const t = frame / 30;
        const y = ((g.y + t * 0.6 + 6) % 12) - 6; // suben despacio y vuelven a entrar por abajo
        return (
          <mesh
            key={i}
            geometry={geo}
            position={[g.x + Math.sin(t + g.fase) * 0.4, y, g.z]}
            rotation={[t * 0.8 + g.fase, t * 0.5 + g.fase, 0]}
            scale={g.escala}
          >
            <meshStandardMaterial color="#d62839" roughness={0.35} metalness={0.1} emissive="#5a0010" />
          </mesh>
        );
      })}
    </>
  );
};

export const Prueba3D: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const op = interpolate(frame, [15, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 40%, #3a0d22 0%, ${P.fondo1} 75%)` }}>
      <ThreeCanvas width={width} height={height} camera={{ position: [0, 0, 8], fov: 60 }}>
        <Globulos />
      </ThreeCanvas>
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingBottom: 500 }}>
        <div style={{ opacity: op, fontFamily: SANS, fontWeight: 800, fontSize: 110, color: "#fff", textAlign: "center", textShadow: "0 6px 30px rgba(0,0,0,0.6)" }}>
          Glóbulos rojos
          <div style={{ fontSize: 56, color: P.amarillo }}>en 3D 🔴</div>
        </div>
      </AbsoluteFill>
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 420, display: "flex", justifyContent: "center" }}>
        <div style={{ fontFamily: SANS, fontWeight: 800, fontSize: 40, color: "#fff", background: "rgba(7,22,48,0.55)", borderRadius: 999, padding: "10px 34px" }}>{FIRMA}</div>
      </div>
    </AbsoluteFill>
  );
};
