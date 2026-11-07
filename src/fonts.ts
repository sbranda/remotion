import { loadFont as loadSerif } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadSans } from "@remotion/google-fonts/Montserrat";

const serif = loadSerif("normal", { weights: ["400", "500", "600"], subsets: ["latin", "latin-ext"] });
loadSerif("italic", { weights: ["400", "500"], subsets: ["latin", "latin-ext"] });
const sans = loadSans("normal", { weights: ["300", "500"], subsets: ["latin", "latin-ext"] });

export const SERIF = serif.fontFamily;
export const SANS = sans.fontFamily;
