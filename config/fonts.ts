import { Inter as FontSans } from "next/font/google";

/** Matches heatmap-source portal: Inter at portal text sizes/weights. */
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
