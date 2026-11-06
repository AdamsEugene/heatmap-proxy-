import { Inter as FontSans } from "next/font/google";

/** Only register fonts that are applied in the layout; unused `next/font` calls still preload. */
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
