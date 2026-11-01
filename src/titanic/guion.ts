// Narración del guion "Yo estuve en el Titanic".
// Cada string es un párrafo de la voz en off. Lo que va entre corchetes es una
// indicación de actuación: no se muestra en los subtítulos, pero suma una pausa.

export type EscenaId =
  | "prologo"
  | "embarque"
  | "aBordo"
  | "choque"
  | "botes"
  | "bote13"
  | "hundimiento"
  | "carpathia"
  | "epilogo";

export type Capitulo = {
  id: EscenaId;
  numero: number;
  titulo: string;
  /** Lugar / fecha / hora que aparece en la tarjeta del capítulo */
  rotulo: string;
  parrafos: string[];
};

export const CAPITULOS: Capitulo[] = [
  {
    id: "prologo",
    numero: 1,
    titulo: "Prólogo",
    rotulo: "Yo estuve en el Titanic",
    parrafos: [
      "[Pausado, casi en susurro] Todavía hoy, cuando cierro los ojos, escucho el agua.",
      "No el mar tranquilo de aquella noche. Escucho el agua entrando donde no debía entrar.",
      "Mucha gente me pregunta por el barco más grande del mundo. Por el lujo, por las lámparas, por el iceberg. Yo no les cuento una leyenda.",
      "Yo estuve ahí. Lo vi con mis propios ojos.",
      "Esta es la historia de las últimas horas del Titanic. Y de las mías, de las que casi fueron las últimas.",
    ],
  },
  {
    id: "embarque",
    numero: 2,
    titulo: "Embarque en Southampton",
    rotulo: "10 de abril de 1912 · Southampton",
    parrafos: [
      "Miércoles 10 de abril de 1912. Puerto de Southampton, Inglaterra.",
      "Recuerdo que tuve que echar la cabeza hacia atrás para verlo entero. 269 metros de largo. Cuatro chimeneas. Era como si alguien hubiera puesto una ciudad a flotar.",
      "Yo llevaba un billete de segunda clase y una maleta con todo lo que tenía. Iba a Nueva York a empezar de nuevo. Como casi todos ahí.",
      "En el muelle alguien repetía la palabra que estaba en todos los diarios: “insumergible”. Y yo lo creí.",
      "A mediodía soltaron amarras. Al pasar junto a otro barco, el New York, la fuerza del agua lo arrastró hacia nosotros. Faltaron un par de metros para el choque. La gente se rió, nerviosa. Nadie lo tomó como un aviso.",
      "Esa noche paramos en Cherburgo, Francia. Al día siguiente, en Queenstown, Irlanda. Después, solo el océano. Más de 2.200 personas a bordo, rumbo al oeste.",
    ],
  },
  {
    id: "aBordo",
    numero: 3,
    titulo: "Vida a bordo",
    rotulo: "14 de abril · Seis avisos de hielo",
    parrafos: [
      "Los primeros días fueron un sueño. Comida mejor que la de cualquier hotel que yo conociera, una biblioteca, cubiertas para caminar al sol. Y eso era la segunda clase.",
      "El domingo 14 de abril, el barco iba a más de 40 kilómetros por hora. El mar estaba tan quieto que parecía de vidrio.",
      "Lo que yo no sabía es que ese mismo día, en la sala de radio, llegaban mensajes de otros barcos. Uno detrás de otro. Todos decían lo mismo: hielo. Icebergs y campos de hielo más adelante, en nuestra ruta.",
      "Al atardecer, la temperatura cayó de golpe. En pocas horas, el aire pasó a cortar la cara. La gente se metió adentro.",
      "Esa noche, en nuestro comedor, un grupo de pasajeros se juntó a cantar himnos. Recuerdo uno en especial, una plegaria por los que están en peligro en el mar. Lo cantamos sin pensar en lo que decía.",
      "Me fui a dormir temprano. No había luna. Solo estrellas, muchísimas, y un frío que no había sentido nunca.",
    ],
  },
  {
    id: "choque",
    numero: 4,
    titulo: "El choque",
    rotulo: "23:40 · 14 de abril de 1912",
    parrafos: [
      "A las once y cuarenta de la noche, el vigía vio algo delante. Tocó la campana tres veces y gritó al puente: “¡Iceberg, justo al frente!”.",
      "Pasaron unos 37 segundos. El barco empezó a girar. Muy despacio. No alcanzó.",
      "Yo estaba en la cama, leyendo. Sentí apenas un temblor. Un roce. Nada que me asustara.",
      "Lo que me hizo levantar fue otra cosa: el silencio. Los motores, que habían sonado día y noche desde Southampton, se habían detenido.",
      "Subí a cubierta con el abrigo encima del pijama. En la proa había pedazos de hielo desparramados. Algunos pasajeros jugaban con ellos, se los tiraban como bolas de nieve. Un oficial nos dijo que no pasaba nada.",
      "[Pausa] Debajo de nosotros, el hielo había abierto el casco a lo largo de casi 90 metros.",
    ],
  },
  {
    id: "botes",
    numero: 5,
    titulo: "Los botes salvavidas",
    rotulo: "00:05 · Se ordena preparar los botes",
    parrafos: [
      "Pasada la medianoche, un camarero golpeó mi puerta: “Pónganse los chalecos y suban. Es solo una precaución”.",
      "Arriba, el ruido era ensordecedor. Las calderas soltaban vapor por las chimeneas y no se oía ni la propia voz.",
      "Lo que nadie nos decía era lo que el constructor del barco ya le había dicho al capitán: el Titanic se iba a hundir. Quedaban una hora, quizás dos.",
      "Y había algo peor. Había botes salvavidas para 1.178 personas. Éramos más de 2.200.",
      "Los primeros botes bajaron medio vacíos. La gente no quería subir: el barco se veía firme, iluminado, enorme. Bajar 20 metros en un bote de madera hacia un mar negro parecía lo más peligroso.",
      "Desde el puente lanzaban cohetes blancos al cielo. En el horizonte se veía la luz de otro barco. Tan cerca. Nunca vino.",
      "Por la radio, los operadores pidieron auxilio sin parar. Respondió el Carpathia. Estaba a casi cuatro horas de distancia.",
    ],
  },
  {
    id: "bote13",
    numero: 6,
    titulo: "El bote 13",
    rotulo: "1:40 · Bote salvavidas n.º 13",
    parrafos: [
      "Eran casi las dos menos veinte. La cubierta ya no estaba derecha: se sentía en las piernas que el barco se inclinaba hacia la proa.",
      "Y la orquesta tocaba. Música alegre, como si fuera un baile. Nunca lo voy a entender. Nunca lo voy a olvidar.",
      "Me tocó el bote 13. Un oficial gritaba: “¿Hay más mujeres? ¿Más niños?”. Nadie respondió. Me miró y dijo: “Usted. Salte”.",
      "Salté.",
      "El bote bajó a sacudones, rozando el casco. Pasamos frente a ventanas encendidas, camarotes vacíos con la luz prendida.",
      "Al tocar el agua, un chorro enorme que salía del costado del barco nos empujó hacia atrás. Y entonces alguien miró hacia arriba y gritó.",
      "El bote 15 venía bajando. Justo encima de nosotros.",
      "No podíamos soltar las cuerdas. Gritamos que pararan, pero arriba nadie oía. Un marinero sacó un cuchillo y cortó. El bote 15 cayó al agua a un brazo de distancia.",
      "[Respira] Remamos. Remamos lejos del barco, sin mirar atrás. Hasta que no pudimos evitarlo.",
    ],
  },
  {
    id: "hundimiento",
    numero: 7,
    titulo: "El hundimiento",
    rotulo: "2:20 · 15 de abril de 1912",
    parrafos: [
      "Desde el bote lo vimos todo. La proa ya estaba bajo el agua. La popa se levantaba, lentamente, hacia el cielo.",
      "Las luces seguían encendidas. Fila tras fila de ventanas brillando, inclinándose. Era hermoso. Era lo más terrible que vi en mi vida.",
      "Entonces las luces parpadearon. Una vez. Dos. Y se apagaron para siempre.",
      "Llegó un ruido que no sé describir. Un rugido que vino de adentro del barco. Todo lo que había adentro, calderas, muebles, vajilla, se deslizaba hacia la proa. Hoy sabemos que en ese momento el Titanic se partió en dos.",
      "La popa se quedó un instante de pie. Negra contra las estrellas. Como si dudara.",
      "Y se fue.",
      "[Silencio de tres segundos]",
      "Eran las dos y veinte de la madrugada del 15 de abril. Dos horas y cuarenta minutos después del choque.",
    ],
  },
  {
    id: "carpathia",
    numero: 8,
    titulo: "El silencio y el Carpathia",
    rotulo: "4:00 · Llega el Carpathia",
    parrafos: [
      "Después vinieron los gritos. Cientos de personas en el agua, llamando. El mar estaba a dos grados bajo cero.",
      "No volvimos. Teníamos miedo de que, si nos acercábamos, el bote se diera vuelta. Esa decisión la cargo todos los días.",
      "Los gritos duraron un rato largo. Después se fueron apagando. Y después, nada. Ese silencio fue peor que todo lo anterior.",
      "Pasamos horas en la oscuridad, sin sentir los dedos. Hasta que alguien vio una luz verde en el horizonte. Un cohete. Era el Carpathia. Había navegado toda la noche entre el hielo para llegar a nosotros.",
      "Cuando amaneció, vimos dónde estábamos. Icebergs por todas partes, enormes, teñidos de rosa por el sol. Una belleza que no le perdono al mar.",
      "Subí por una escalera de cuerda. Alguien me puso una manta y una taza caliente en las manos. Me temblaban tanto que no podía beber.",
    ],
  },
  {
    id: "epilogo",
    numero: 9,
    titulo: "Epílogo",
    rotulo: "18 de abril de 1912 · Nueva York",
    parrafos: [
      "El 18 de abril, de noche y bajo la lluvia, el Carpathia llegó a Nueva York. Miles de personas esperaban en el muelle. Buscaban caras. Muchas no aparecieron nunca.",
      "Murieron más de 1.500 personas. Sobrevivimos unas 700.",
      "Después del Titanic, el mundo cambió las reglas: botes salvavidas para todos, radio encendida día y noche, patrullas que vigilan el hielo en el Atlántico. Fueron necesarias 1.500 vidas para aprenderlo.",
      "[Mirando a cámara] A veces me preguntan si tengo miedo al mar. No. Le tengo miedo a otra cosa: a creer que algo es insumergible.",
      "Yo estuve ahí. Y mientras pueda contarlo, el Titanic no se va a hundir del todo.",
    ],
  },
];
