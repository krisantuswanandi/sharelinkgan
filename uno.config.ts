import { defineConfig, presetUno, presetIcons, presetWebFonts } from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
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
