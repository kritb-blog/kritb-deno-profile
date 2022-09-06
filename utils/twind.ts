import { IS_BROWSER } from "$fresh/runtime.ts";
import { Configuration, setup } from "twind";
export * from "twind";
export const config: Configuration = {
  darkMode: "class",
  mode: "silent",
  theme: {
    extend: {
      fontFamily: {
        sans: "Sarabun, Roboto, sans-serif",
      },
    },
  },
  preflight: {
    // Import external stylesheet
    "@import": `url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,700;1,400&display=swap')`,
    // Declare font face
    "@font-face": [
      {
        fontFamily: "Sarabun",
        fontWeight: "400",
        src: 'url(/fonts/Sarabun-Regular.ttf) format("ttf")',
      },
      {
        fontFamily: "Sarabun",
        fontWeight: "500",
        src: 'url(/fonts/Sarabun-SemiBold.ttf) format("ttf")',
      },
      {
        fontFamily: "Sarabun",
        fontWeight: "600",
        src: 'url(/fonts/Sarabun-Bold.ttf) format("ttf")',
      },
    ],
  },
};
if (IS_BROWSER) setup(config);
