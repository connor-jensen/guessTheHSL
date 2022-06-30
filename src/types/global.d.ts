export {}
import * as CSS from 'csstype';

declare module 'csstype' {
  interface Properties {
    [index: string]: any;
  }
}

declare global {
  interface HSL {
    hue: number;
    saturation: number;
    lightness: number;
  }
}