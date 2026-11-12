import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Classroom, SchoolYard } from "./backgrounds";
import {
  Bubble,
  Character,
  Confetti,
  FONT,
  Narration,
  Walker,
  sprite,
} from "./components";

const KID = 440;
const SIT = 330;

// 1. Title -------------------------------------------------------------------
export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - 10, fps, config: { damping: 10 } });
  const sub = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <SchoolYard mood="day" />
      <Character src={sprite("sam-idle")} x={760} h={KID} enter="pop" delay={20} />
      <Character src={sprite("mia-idle")} x={1160} h={KID} enter="pop" delay={28} />
      <AbsoluteFill style={{ alignItems: "center", top: 120 }}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 150,
            color: "#fff",
            WebkitTextStroke: "10px #5b3a29",
            paintOrder: "stroke",
            textShadow: "0 12px 0 rgba(0,0,0,0.2)",
            transform: `scale(${t}) rotate(${(1 - t) * -8}deg)`,
          }}
        >
          Nadie está solo
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 500,
            fontSize: 54,
            color: "#5b3a29",
            marginTop: 10,
            opacity: sub,
          }}
        >
          Una historia sobre el bullying
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// 2. Sam arrives ---------------------------------------------------------------
export const ArrivalScene: React.FC = () => (
  <AbsoluteFill>
    <SchoolYard mood="day" />
    <Walker
      frames={[sprite("sam-walk1"), sprite("sam-walk2")]}
      from={-150}
      to={900}
      start={0}
      end={110}
      h={KID}
      stand={sprite("sam-idle")}
    />
    <Narration from={5} to={175}>
      Era el primer día de Sam en una escuela nueva.
    </Narration>
    <Bubble x={950} y={560} from={120} side="left" width={480}>
      Ojalá haga amigos...
    </Bubble>
  </AbsoluteFill>
);

// 3. Leo mocks Sam -------------------------------------------------------------
export const MockingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const thrown = frame >= 120;
  const hit = frame >= 150;
  const t = interpolate(frame, [125, 150], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ballX = interpolate(t, [0, 1], [760, 1320]);
  const ballY = 600 - Math.sin(t * Math.PI) * 180;
  return (
    <AbsoluteFill>
      <SchoolYard mood="day" />
      <Character
        src={sprite(hit ? "sam-lookup" : "sam-idle")}
        x={1380}
        h={hit ? SIT + 30 : KID}
      />
      <Character
        src={sprite(thrown ? "leo-throw" : "leo-celebrate")}
        x={600}
        h={thrown ? KID - 20 : KID + 20}
        enter="left"
        delay={0}
      />
      {frame >= 125 && frame < 152 ? (
        <div
          style={{
            position: "absolute",
            left: ballX,
            top: ballY,
            width: 46,
            height: 46,
            borderRadius: "50%",
            background: "radial-gradient(circle at 35% 35%, #fff, #d8d2c4)",
            border: "3px solid #9c9282",
          }}
        />
      ) : null}
      <Bubble x={620} y={480} from={25} to={115} side="left" width={600}>
        ¡Jaja! ¡Miren al cuatro ojos con su camarita!
      </Bubble>
      <Bubble x={1360} y={600} from={165} side="right" width={300}>
        ¡Ay!
      </Bubble>
      <Narration from={150} to={235}>
        Desde ese día, Leo se burlaba de él.
      </Narration>
    </AbsoluteFill>
  );
};

// 4. Loneliness ------------------------------------------------------------------
export const LonelyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const grey = "saturate(0.45) brightness(0.9)";
  return (
    <AbsoluteFill>
      <SchoolYard mood="gloomy" rain />
      {/* Classmates far away, not paying attention */}
      <Character src={sprite("ana-wave")} x={1250} y={830} h={250} tint={grey} />
      <Character src={sprite("zuri-wave")} x={1450} y={830} h={260} tint={grey} />
      <Character
        src={sprite("pip-run")}
        x={interpolate(frame, [0, 200], [1900, 1600])}
        y={835}
        h={240}
        tint={grey}
        flip
      />
      <Character src={sprite("sam-sit")} x={480} h={SIT} tint="saturate(0.7)" />
      <Narration from={5} to={205}>
        {"Cada día, Sam se sentía más solo.\nTodos lo veían... pero nadie decía nada."}
      </Narration>
    </AbsoluteFill>
  );
};

// 5. Mia notices ---------------------------------------------------------------
export const NoticeScene: React.FC = () => (
  <AbsoluteFill>
    <SchoolYard mood="gloomy" />
    <Character src={sprite("sam-sit")} x={360} y={880} h={260} tint="saturate(0.7)" />
    <Character src={sprite("mia-lookup")} x={1300} h={KID} enter="right" />
    <Bubble x={1220} y={540} from={40} side="right" thought width={460}>
      Esto no está bien...
    </Bubble>
    <Narration from={5} to={175}>
      Hasta que Mia decidió no mirar hacia otro lado.
    </Narration>
  </AbsoluteFill>
);

// 6. Mia sits with Sam -----------------------------------------------------------
export const FriendScene: React.FC = () => {
  const frame = useCurrentFrame();
  const sat = frame >= 95;
  const warm = interpolate(frame, [95, 200], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ opacity: 1 - warm }}>
        <SchoolYard mood="gloomy" />
      </AbsoluteFill>
      <AbsoluteFill style={{ opacity: warm }}>
        <SchoolYard mood="day" />
      </AbsoluteFill>
      <Character src={sprite("sam-sit")} x={620} h={SIT} />
      {sat ? (
        <Character src={sprite("mia-crouch")} x={1000} h={SIT + 10} />
      ) : (
        <Walker
          frames={[sprite("mia-walk1"), sprite("mia-walk2")]}
          from={1950}
          to={1000}
          start={0}
          end={95}
          h={KID}
          flip
        />
      )}
      <Bubble x={1020} y={620} from={100} to={165} side="right" width={500}>
        Hola, soy Mia. ¿Puedo sentarme contigo?
      </Bubble>
      <Bubble x={600} y={620} from={170} side="left" width={460}>
        ¿De verdad? ¡Claro que sí!
      </Bubble>
    </AbsoluteFill>
  );
};

// 7. Telling a trusted adult ---------------------------------------------------------
export const TeacherScene: React.FC = () => (
  <AbsoluteFill>
    <Classroom />
    <Character src={sprite("mia-idle")} x={430} h={KID} />
    <Character src={sprite("sam-idle")} x={700} h={KID} />
    <Character src={sprite("teacher2")} x={1500} h={480} flip />
    <Bubble x={470} y={520} from={15} to={110} side="left" width={600}>
      Don Tomás, a Sam lo están molestando.
    </Bubble>
    <Bubble x={1420} y={600} from={120} side="right" width={640}>
      Gracias por contármelo. Pedir ayuda es de valientes.
    </Bubble>
    <Narration from={120} to={265}>
      Contarle a un adulto no es ser chismoso: es cuidar a alguien.
    </Narration>
  </AbsoluteFill>
);

// 8. Standing together -----------------------------------------------------------
export const StandTogetherScene: React.FC = () => {
  const frame = useCurrentFrame();
  const surprised = frame >= 175;
  return (
    <AbsoluteFill>
      <SchoolYard mood="day" />
      <Character
        src={sprite(surprised ? "leo-map" : "leo-celebrate")}
        x={420}
        h={KID + 20}
        enter="left"
      />
      <Character src={sprite("sam-idle")} x={1000} h={KID} />
      <Character src={sprite("mia-idle")} x={1230} h={KID} enter="right" delay={75} />
      <Character src={sprite("ana-wave")} x={1460} h={KID - 10} enter="right" delay={85} />
      <Character src={sprite("zuri-wave")} x={1700} h={KID + 20} enter="right" delay={95} />
      <Bubble x={440} y={470} from={15} to={70} side="left" width={520}>
        ¿Otra vez solo, cuatro ojos?
      </Bubble>
      <Bubble x={1200} y={500} from={110} to={190} side="right" width={560}>
        No está solo. ¡Está con nosotros!
      </Bubble>
      <Narration from={190} to={295}>
        Cuando los amigos se unen, el bullying pierde su fuerza.
      </Narration>
    </AbsoluteFill>
  );
};

// 9. Apology ----------------------------------------------------------------------
export const ApologyScene: React.FC = () => (
  <AbsoluteFill>
    <SchoolYard mood="golden" />
    <Character src={sprite("leo-item")} x={620} h={KID} />
    <Character src={sprite("sam-idle")} x={1150} h={KID} />
    <Character src={sprite("mia-idle")} x={1420} h={KID} />
    <Bubble x={640} y={500} from={15} to={110} side="left" width={540}>
      Perdón, Sam. No estuvo bien lo que hice.
    </Bubble>
    <Bubble x={1150} y={500} from={120} side="right" width={600}>
      Te perdono. ¿Quieres jugar con nosotros?
    </Bubble>
  </AbsoluteFill>
);

// 10. Celebration --------------------------------------------------------------------
export const CelebrationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const jump = (offset: number) =>
    Math.max(0, Math.sin(((frame + offset) * Math.PI) / 18)) * 40;
  return (
    <AbsoluteFill>
      <SchoolYard mood="golden" />
      <Character src={sprite("leo-celebrate")} x={300} y={960 - jump(0)} h={KID + 20} />
      <Character src={sprite("ana-wave")} x={600} y={960 - jump(6)} h={KID - 10} />
      <Character src={sprite("sam-celebrate")} x={900} y={960 - jump(12)} h={KID} />
      <Character src={sprite("mia-jump")} x={1190} y={960 - jump(3)} h={KID} />
      <Character src={sprite("zuri-wave")} x={1480} y={960 - jump(9)} h={KID + 20} />
      <Character src={sprite("pip-run")} x={1740} y={960 - jump(15)} h={KID - 30} flip />
      <Confetti />
      <Narration from={10} to={175}>
        Porque nadie debería estar solo.
      </Narration>
    </AbsoluteFill>
  );
};

// 11. Message card ---------------------------------------------------------------------
export const MessageScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const lines: { text: string; color: string }[] = [
    { text: "Habla con un adulto.", color: "#ff5d73" },
    { text: "Acompaña a quien está solo.", color: "#3bceac" },
    { text: "Incluye a todos.", color: "#7b5cff" },
  ];
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #fff4e0, #ffd9a8)",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: FONT,
        color: "#3b2a1a",
      }}
    >
      <div style={{ fontSize: 84, fontWeight: 700, marginBottom: 50 }}>
        Si ves bullying, no te quedes callado:
      </div>
      {lines.map((l, i) => {
        const p = spring({ frame: frame - 25 - i * 22, fps, config: { damping: 12 } });
        return (
          <div
            key={l.text}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 30,
              fontSize: 70,
              fontWeight: 600,
              margin: "14px 0",
              opacity: p,
              transform: `translateX(${(1 - p) * -80}px)`,
            }}
          >
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: l.color }} />
            {l.text}
          </div>
        );
      })}
      <Character src={sprite("sam-celebrate")} x={230} h={360} enter="pop" delay={90} />
      <Character src={sprite("mia-jump")} x={1690} h={360} enter="pop" delay={100} />
    </AbsoluteFill>
  );
};
