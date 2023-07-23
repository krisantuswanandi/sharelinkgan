import { defineConfig, presetUno, presetWebFonts } from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetWebFonts({
      provider: "google",
      fonts: {
        sans: {
          name: "Inter",
          weights: [400, 700],
        },
        mono: "Fira Code",
      },
    }),
  ],
});
