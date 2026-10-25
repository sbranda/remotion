import { Composition } from "remotion";
import { HelloWorld } from "./HelloWorld";
import { DURACION_TITANIC, Titanic } from "./titanic/Titanic";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{ titulo: "¡Hola, Remotion!" }}
      />
      <Composition
        id="Titanic"
        component={Titanic}
        durationInFrames={DURACION_TITANIC}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
