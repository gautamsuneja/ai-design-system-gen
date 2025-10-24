export interface ColorToken {
  hex: string;
  usage: string;
}

export interface ColorScale {
  [key: string]: string;
}

export interface Colors {
  primary?: ColorToken;
  secondary?: ColorToken;
  accent?: ColorToken;
  neutral?: ColorScale;
  semantic?: {
    success?: ColorToken;
    warning?: ColorToken;
    error?: ColorToken;
    info?: ColorToken;
  };
  [key: string]: ColorToken | ColorScale | { [key: string]: ColorToken } | undefined;
}

export interface Typography {
  baseFont: string;
  scale: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    [key: string]: number;
  };
  weights: {
    regular: number;
    medium?: number;
    semibold?: number;
    bold: number;
    [key: string]: number | undefined;
  };
  lineHeights?: {
    tight?: number;
    normal?: number;
    relaxed?: number;
    [key: string]: number | undefined;
  };
}

export interface Spacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  [key: string]: number;
}

export interface Radii {
  sm: number;
  md: number;
  lg: number;
  [key: string]: number;
}

export interface Shadows {
  sm: string;
  md: string;
  lg?: string;
  [key: string]: string | undefined;
}

export interface ComponentVariant {
  name: string;
  background: string;
  textColor: string;
  padding?: string;
  border?: string;
  hover?: {
    background?: string;
    textColor?: string;
  };
}

export interface ComponentVariants {
  button?: ComponentVariant[];
  input?: ComponentVariant[];
  card?: ComponentVariant[];
  [key: string]: ComponentVariant[] | undefined;
}

export interface DesignTokens {
  name: string;
  description?: string;
  colors: Colors;
  typography: Typography;
  spacing: Spacing;
  radii: Radii;
  shadows: Shadows;
  componentVariants?: ComponentVariants;
}

export interface GenerateResponse {
  tokens: DesignTokens;
  rawModelOutput: string;
}

export interface FigmaStyleResponse {
  figmaFileUrl: string;
  createdStyles: string[];
  message?: string;
}

export interface AIProvider {
  name: string;
  envVarName: string;
  available: boolean;
}
