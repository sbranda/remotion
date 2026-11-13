import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BreakRoom, Counter, Desk, MeetingRoom, MeetingTable, Office } from "./backgrounds";
import {
  BOSS,
  Bubble,
  Character,
  DANIEL,
  FONT,
  INK,
  LAURA,
  Narration,
  PopCard,
  Walker,
  usePose,
} from "./components";
import { Checklist, Deadline, Dim, Email, Report, Scale, Slide } from "./overlays";

// Standard two-shot positions: Laura on the left, Daniel on the right facing her.
const LX = 600;
const DX = 1320;
const HEAD = 350; // y of the bubble tail tip above standing heads

const L = (p: Omit<React.ComponentProps<typeof Bubble>, "name" | "color" | "side">) => (
  <Bubble {...p} name="Laura" color={LAURA} side="left" />
);
const D = (p: Omit<React.ComponentProps<typeof Bubble>, "name" | "color" | "side">) => (
  <Bubble {...p} name="Daniel" color={DANIEL} side="right" />
);

// 1 ----------------------------------------------------------------------------
export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = spring({ frame: frame - 8, fps, config: { damping: 12 } });
  const sub = interpolate(frame, [35, 55], [0, 1], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill>
      <Office time="morning" hour={8.5} clock={false} />
      <AbsoluteFill style={{ background: "rgba(20,24,40,0.35)" }} />
      <Character pose="w-idle" x={430} enter="left" delay={20} />
      <Character pose="m-idle" x={1500} flip enter="right" delay={26} />
      <AbsoluteFill style={{ alignItems: "center", top: 200 }}>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 170,
            color: "white",
            WebkitTextStroke: `12px ${INK}`,
            paintOrder: "stroke",
            transform: `scale(${t})`,
          }}
        >
          El Informe
        </div>
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 600,
            fontSize: 52,
            color: "white",
            background: "rgba(25,28,40,0.75)",
            padding: "10px 34px",
            borderRadius: 30,
            opacity: sub,
          }}
        >
          ¿Plazos o transparencia? Un dilema profesional
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// 2 ----------------------------------------------------------------------------
export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const daniel = usePose([[0, "m-idle"], [235, "m-thumbs"]]);
  return (
    <AbsoluteFill>
      <Office time="morning" hour={9} />
      <Walker who="w" from={-200} to={LX} start={0} end={100} stand={frame < 230 ? "w-wave" : "w-idle"} />
      <Character pose={daniel} x={DX} flip />
      <Narration from={0} to={145}>
        Laura y Daniel llevan tres meses preparando el informe más importante del año.
      </Narration>
      <L x={LX + 40} y={HEAD} from={150} to={228}>
        ¡Buenos días! ¿Último repaso?
      </L>
      <D x={DX - 40} y={HEAD - 20} from={235}>
        ¡El último! Mañana a las 9:00 lo presentamos.
      </D>
      <Deadline from={240} />
    </AbsoluteFill>
  );
};

// 3 ----------------------------------------------------------------------------
export const CelebrateScene: React.FC = () => {
  const daniel = usePose([[0, "m-laugh"], [225, "m-thumbs"]]);
  return (
    <AbsoluteFill>
      <Office time="morning" hour={11} />
      <Character pose="w-laugh" x={LX} />
      <Character pose={daniel} x={DX} flip />
      <D x={DX - 40} y={HEAD} from={10} to={110}>
        ¡Lo logramos! Solo falta enviarlo a dirección.
      </D>
      <L x={LX + 40} y={HEAD} from={118} to={218}>
        Tres meses de trabajo... ¡y por fin terminado!
      </L>
      <D x={DX - 40} y={HEAD - 20} from={225}>
        Si sale bien, el contrato es nuestro. Y el bono también.
      </D>
      <Deadline />
    </AbsoluteFill>
  );
};

// 4 ----------------------------------------------------------------------------
export const ReviewScene: React.FC = () => {
  const laura = usePose([[0, "w-sit"], [215, "w-sit-think"]]);
  return (
    <AbsoluteFill>
      <Office time="afternoon" hour={16} hourTo={17} dur={390} />
      <Character pose={laura} x={560} shadow={false} />
      <Desk x={300} w={900} glow />
      <Narration from={0} to={115}>
        Por la tarde, Laura hace una última revisión de los números.
      </Narration>
      <Dim from={120} to={290} />
      <PopCard from={125} to={290} x={360} y={170} width={1200}>
        <Report errorAt={205} />
      </PopCard>
      <Bubble x={600} y={470} from={305} side="left" thought color={LAURA} width={480}>
        Espera... esto no cuadra.
      </Bubble>
      <Deadline />
    </AbsoluteFill>
  );
};

// 5 ----------------------------------------------------------------------------
export const DiscoveryScene: React.FC = () => {
  const laura = usePose([[0, "w-point"], [215, "w-speak"]]);
  return (
    <AbsoluteFill>
      <Office time="afternoon" hour={17} />
      <Character pose={laura} x={LX - 60} />
      <Character pose="m-sit-think" x={1420} flip shadow={false} />
      <Desk x={1080} w={780} monitor={false} />
      <L x={LX} y={HEAD} from={10} to={118}>
        Daniel, ven a ver esto. Los costes están mal.
      </L>
      <D x={1380} y={470} from={125} to={208}>
        ¿Mal? ¿Cómo de mal?
      </D>
      <L x={LX} y={HEAD} from={215}>
        Invertimos dos cifras. El coste real es 2,1 millones, no 1,2.
      </L>
      <Deadline />
    </AbsoluteFill>
  );
};

// 6 ----------------------------------------------------------------------------
export const DanielViewScene: React.FC = () => {
  const daniel = usePose([[0, "m-explain"], [148, "m-speak"], [300, "m-explain"]]);
  return (
    <AbsoluteFill>
      <Office time="evening" hour={18} />
      <Character pose="w-cross" x={LX} />
      <Character pose={daniel} x={DX} flip />
      <D x={DX - 60} y={HEAD} from={10} to={140} width={620}>
        Si lo decimos hoy, la presentación se cae: penalización por retraso y la dirección furiosa.
      </D>
      <D x={DX - 60} y={HEAD} from={148} to={292} width={620}>
        Lo presentamos así y lo corregimos sobre la marcha. En unas semanas nadie se acordará.
      </D>
      <D x={DX - 60} y={HEAD} from={300} width={560}>
        No es mentir, Laura... es ganar tiempo.
      </D>
      <Deadline />
    </AbsoluteFill>
  );
};

// 7 ----------------------------------------------------------------------------
export const LauraViewScene: React.FC = () => {
  const laura = usePose([[0, "w-speak"], [285, "w-point"]]);
  return (
    <AbsoluteFill>
      <Office time="evening" hour={18.5} />
      <Character pose={laura} x={LX - 40} />
      <Character pose="m-idle" x={DX} flip />
      <L x={LX} y={HEAD} from={10} to={140} width={620}>
        ¿Y si se dan cuenta? El cliente va a firmar un contrato con cifras falsas.
      </L>
      <L x={LX} y={HEAD} from={148} to={278}>
        Un retraso se perdona. Un engaño, no.
      </L>
      <L x={LX} y={HEAD} from={285} width={640}>
        Prefiero una mala reunión mañana a perder su confianza para siempre.
      </L>
      <Deadline />
    </AbsoluteFill>
  );
};

// 8 ----------------------------------------------------------------------------
export const ClashScene: React.FC = () => {
  const frame = useCurrentFrame();
  const tilt = Math.sin(frame / 22) * 14;
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: `linear-gradient(90deg, ${LAURA} 0%, #1f6f66 49.9%, #2c4364 50.1%, ${DANIEL} 100%)` }} />
      <AbsoluteFill style={{ background: "radial-gradient(circle at 50% 60%, rgba(255,255,255,0.18), transparent 60%)" }} />
      <div style={{ position: "absolute", left: 510, top: 400 }}>
        <Scale tilt={tilt} />
      </div>
      <Character pose="w-point" x={330} y={1060} scale={1.2} shadow={false} enter="left" />
      <Character pose="m-speak" x={1600} y={1060} scale={1.2} flip shadow={false} enter="right" />
      <D x={1560} y={250} from={15} to={105} width={520}>
        ¡Nos vas a hundir a los dos!
      </D>
      <L x={380} y={250} from={112} to={210} width={560}>
        ¡Nos hundiría que el cliente lo descubra solo!
      </L>
      <Narration from={218} to={358}>
        {"¿Qué pesa más:\nla lealtad a los plazos o la transparencia profesional?"}
      </Narration>
    </AbsoluteFill>
  );
};

// 9 ----------------------------------------------------------------------------
export const NightScene: React.FC = () => {
  const frame = useCurrentFrame();
  const second = frame >= 240;
  const flash = interpolate(frame, [228, 240, 252], [0, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill>
      <BreakRoom />
      {second ? (
        <Character pose="w-coffee" x={1060} y={1000} scale={1.1} shadow={false} />
      ) : (
        <Character pose="m-water" x={860} y={1000} scale={1.1} shadow={false} />
      )}
      <Counter x={160} w={1600} top={800} />
      <Narration from={0} to={82}>
        Esa noche, ninguno de los dos podía dejar de pensar.
      </Narration>
      <Bubble x={980} y={450} from={88} to={160} thought color={DANIEL} side="left" width={600}>
        Si retrasamos, todo el equipo paga la multa...
      </Bubble>
      <Bubble x={980} y={450} from={166} to={232} thought color={DANIEL} side="left" width={600}>
        Pero si el cliente lo descubre después... ¿quién volverá a confiar en nosotros?
      </Bubble>
      <Bubble x={950} y={450} from={255} to={360} thought color={LAURA} side="right" width={600}>
        ¿Y si estoy exagerando? Quizá él tiene razón...
      </Bubble>
      <Bubble x={950} y={450} from={366} thought color={LAURA} side="right" width={600}>
        No. Firmar algo que sé que es falso... esa no soy yo.
      </Bubble>
      <AbsoluteFill style={{ background: `rgba(0,0,0,${flash})`, zIndex: 30 }} />
      <Deadline text="Presentación: en 10 horas" />
    </AbsoluteFill>
  );
};

// 10 ---------------------------------------------------------------------------
export const EmailScene: React.FC = () => {
  const daniel = usePose([[0, "m-sit"], [150, "m-sit-think"]]);
  return (
    <AbsoluteFill>
      <Office time="night" hour={22.75} />
      <Character pose={daniel} x={1450} flip shadow={false} />
      <Desk x={1100} w={760} night glow monitor={false} />
      <PopCard from={25} x={60} y={170} width={860} rotate={-1.5}>
        <Email highlightAt={110} />
      </PopCard>
      <Bubble x={1400} y={470} from={180} thought color={DANIEL} side="right" width={460}>
        ...basándose en nuestras cifras.
      </Bubble>
      <Deadline text="Presentación: en 10 horas" />
    </AbsoluteFill>
  );
};

// 11 ---------------------------------------------------------------------------
export const DecisionScene: React.FC = () => {
  const laura = usePose([[0, "w-think"], [305, "w-laugh"]]);
  return (
    <AbsoluteFill>
      <Office time="dawn" hour={7} />
      <Character pose={laura} x={560} shadow={false} />
      <Desk x={240} w={720} monitor={false} />
      <Walker who="m" from={2150} to={DX} start={0} end={90} stand="m-speak" flip />
      <D x={DX - 60} y={HEAD} from={95} to={198} width={620}>
        No he dormido nada. Tienes razón: si lo escondemos, el problema crece.
      </D>
      <D x={DX - 60} y={HEAD} from={205} to={298} width={600}>
        Pero no vamos solo con el error. Vamos con la solución.
      </D>
      <L x={600} y={380} from={305} width={560}>
        ¡Trato hecho! Error, causa, plan y nuevo plazo.
      </L>
      <Deadline text="Presentación: en 2 horas" />
    </AbsoluteFill>
  );
};

// 12 ---------------------------------------------------------------------------
export const WorkingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const laura = usePose([[0, "w-sit-think"], [150, "w-sit"]]);
  const daniel = usePose([[0, "m-sit"], [120, "m-sit-think"], [230, "m-sit"]]);
  const left = Math.max(0, Math.round(interpolate(frame, [0, 300], [120, 15])));
  return (
    <AbsoluteFill>
      <Office time="morning" hour={7} hourTo={8.75} dur={300} />
      <Character pose={laura} x={620} shadow={false} />
      <Character pose={daniel} x={1220} flip shadow={false} />
      <Desk x={360} w={1140} monitor={false} />
      <PopCard from={10} x={520} y={60} width={880}>
        <Checklist
          items={[
            "Cifras corregidas",
            "Causa del error identificada",
            "Plan de corrección: 2 semanas",
            "Impacto en el presupuesto explicado",
          ]}
          at={[60, 120, 180, 240]}
        />
      </PopCard>
      <Deadline text={`Presentación: en ${left} min`} urgent={left < 40} />
    </AbsoluteFill>
  );
};

// 13 ---------------------------------------------------------------------------
export const MeetingScene: React.FC = () => {
  const laura = usePose([[0, "w-idle"], [265, "w-point"]]);
  const daniel = usePose([[0, "m-idle"], [135, "m-explain"]]);
  return (
    <AbsoluteFill>
      <MeetingRoom>
        <Slide />
      </MeetingRoom>
      <Character pose={laura} x={330} />
      <Character pose={daniel} x={1640} flip />
      <MeetingTable />
      <Bubble x={1880} y={330} from={20} to={128} side="right" name="Dirección General" color={BOSS} width={640}>
        ¿Me están diciendo que el informe tenía un error?
      </Bubble>
      <D x={1600} y={HEAD} from={135} to={258} width={660}>
        Sí. Y preferimos que lo sepan hoy por nosotros, y no mañana por el cliente.
      </D>
      <L x={360} y={HEAD} from={265} to={368} width={560}>
        Aquí tienen la causa, la corrección y el nuevo plazo.
      </L>
      <Bubble x={1880} y={330} from={375} side="right" name="Dirección General" color={BOSS} width={740}>
        El retraso tendrá un coste. Pero un error oculto nos habría costado el contrato... y la confianza. Bien hecho.
      </Bubble>
    </AbsoluteFill>
  );
};

// 14 ---------------------------------------------------------------------------
export const AftermathScene: React.FC = () => {
  const laura = usePose([[0, "w-idle"], [130, "w-laugh"], [235, "w-dance"]]);
  return (
    <AbsoluteFill>
      <Office time="afternoon" hour={13} />
      <Character pose={laura} x={LX} />
      <Character pose="m-thumbs" x={DX} flip />
      <D x={DX - 40} y={HEAD - 20} from={15} to={122}>
        Oye... gracias por no dejarme hacerlo.
      </D>
      <L x={LX + 40} y={HEAD} from={130} to={228}>
        Para eso está un equipo.
      </L>
      <Narration from={235} to={330}>
        Dos semanas después, el cliente firmó. Con las cifras correctas.
      </Narration>
    </AbsoluteFill>
  );
};

// 15 ---------------------------------------------------------------------------
export const ReflectionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const q = spring({ frame: frame - 10, fps, config: { damping: 14 } });
  const prompts = [
    "¿Qué habrías hecho tú en el lugar de Daniel? ¿Y en el de Laura?",
    "¿Hay casos en los que «arreglarlo sobre la marcha» sea aceptable?",
    "¿Qué hace que en un equipo sea seguro admitir un error?",
  ];
  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(160deg, #1d2240, #2c3e66)",
        alignItems: "center",
        fontFamily: FONT,
        color: "white",
        paddingTop: 110,
      }}
    >
      <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: 4, color: "#e9c46a", opacity: q }}>
        PARA REFLEXIONAR
      </div>
      <div
        style={{
          fontSize: 72,
          fontWeight: 700,
          textAlign: "center",
          maxWidth: 1400,
          lineHeight: 1.15,
          margin: "18px 0 50px",
          transform: `scale(${0.9 + 0.1 * q})`,
          opacity: q,
        }}
      >
        ¿Qué pesa más: la lealtad a los plazos o la transparencia profesional?
      </div>
      {prompts.map((p, i) => {
        const s = spring({ frame: frame - 80 - i * 45, fps, config: { damping: 14 } });
        return (
          <div
            key={p}
            style={{
              fontSize: 40,
              fontWeight: 500,
              background: "rgba(255,255,255,0.1)",
              borderLeft: `8px solid ${[LAURA, DANIEL, "#e9c46a"][i]}`,
              padding: "14px 30px",
              borderRadius: 12,
              margin: "10px 0",
              width: 1240,
              opacity: s,
              transform: `translateY(${(1 - s) * 30}px)`,
            }}
          >
            {p}
          </div>
        );
      })}
      <Character pose="w-idle" x={150} scale={0.6} enter="up" delay={60} />
      <Character pose="m-idle" x={1770} scale={0.6} flip enter="up" delay={66} />
    </AbsoluteFill>
  );
};
