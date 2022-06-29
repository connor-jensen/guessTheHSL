import { createContext } from "react";

interface HSLContextInterface {
  hue: number;
  saturation: number;
  lightness: number;
  setHSL: (hue: number | null, saturation: number | null, lightness: number | null) => void;
}

export const HSLContext = createContext<HSLContextInterface>(undefined!);