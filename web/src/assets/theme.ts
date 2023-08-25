"use client";

import { createTheme } from "@mui/material/styles";
import { Open_Sans } from "next/font/google";

import { customColors } from "./colors";

const openSansFont = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

declare module "@mui/material/styles" {
  interface TypographyVariants {
    body1r: React.CSSProperties;
    body1b: React.CSSProperties;
    body2r: React.CSSProperties;
    body2b: React.CSSProperties;
    body3r: React.CSSProperties;
    body3b: React.CSSProperties;
    label1r: React.CSSProperties;
    label1b: React.CSSProperties;
    label2r: React.CSSProperties;
    label2b: React.CSSProperties;
    label3r: React.CSSProperties;
    label3b: React.CSSProperties;
    label4r: React.CSSProperties;
    label4b: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    body1r: React.CSSProperties;
    body1b: React.CSSProperties;
    body2r: React.CSSProperties;
    body2b: React.CSSProperties;
    body3r: React.CSSProperties;
    body3b: React.CSSProperties;
    label1r: React.CSSProperties;
    label1b: React.CSSProperties;
    label2r: React.CSSProperties;
    label2b: React.CSSProperties;
    label3r: React.CSSProperties;
    label3b: React.CSSProperties;
    label4r: React.CSSProperties;
    label4b: React.CSSProperties;
  }

  interface Palette {
    dark: string;
    neutral: string;
    disabled: string;
    light: string;
    white: string;
    "background-primary": string;
    "background-secondary": string;
  }
  interface PaletteOptions {
    dark?: string;
    neutral?: string;
    disabled?: string;
    light?: string;
    white?: string;
    "background-primary"?: string;
    "background-secondary"?: string;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    body1r: true;
    body1b: true;
    body2r: true;
    body2b: true;
    body3r: true;
    body3b: true;
    label1r: true;
    label1b: true;
    label2r: true;
    label2b: true;
    label3r: true;
    label3b: true;
    label4r: true;
    label4b: true;
  }
}

const customDefaultFontFamily = {
  fontFamily: openSansFont.style.fontFamily,
};

export const theme = createTheme({
  palette: { ...customColors },
  typography: {
    allVariants: {
      ...customDefaultFontFamily,
      color: customColors.dark,
    },
    label1r: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: "125%",
      color: customColors.dark,
    },
    label1b: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: "125%",
      color: customColors.dark,
    },
    label2r: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: "125%",
      color: customColors.dark,
    },
    label2b: {
      fontSize: 14,
      fontWeight: 600,
      lineHeight: "125%",
      color: customColors.dark,
    },
    label3r: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: "125%",
      color: customColors.dark,
    },
    label3b: {
      fontSize: 12,
      fontWeight: 600,
      lineHeight: "125%",
      color: customColors.dark,
    },
    label4r: {
      fontSize: 10,
      fontWeight: 400,
      lineHeight: "125%",
      color: customColors.dark,
    },
    label4b: {
      fontSize: 10,
      fontWeight: 600,
      lineHeight: "125%",
      color: customColors.dark,
    },
    body1r: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: "150%",
      color: customColors.dark,
    },
    body1b: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: "150%",
      color: customColors.dark,
    },
    body2r: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: "150%",
      color: customColors.dark,
    },
    body2b: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: "150%",
      color: customColors.dark,
    },
    body3r: {
      fontSize: 12,
      fontWeight: 400,
      lineHeight: "150%",
      color: customColors.dark,
    },
    body3b: {
      fontSize: 12,
      fontWeight: 500,
      lineHeight: "150%",
      color: customColors.dark,
    },
    h1: {
      fontSize: 40,
      fontWeight: 600,
      lineHeight: "125%",
      color: customColors.dark,
    },
    h2: {
      fontSize: 32,
      fontWeight: 600,
      lineHeight: "125%",
      color: customColors.dark,
    },
    h3: {
      fontSize: 24,
      fontWeight: 600,
      lineHeight: "125%",
      color: customColors.dark,
    },
    h4: {
      fontSize: 18,
      fontWeight: 600,
      lineHeight: "125%",
      color: customColors.dark,
    },
    h5: {
      fontSize: 14,
      fontWeight: 600,
      lineHeight: "125%",
      color: customColors.dark,
    },
  },
});
