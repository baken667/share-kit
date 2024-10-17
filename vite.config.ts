import path from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ShareKit",
      formats: ["es", "cjs", "iife"],
      fileName: (format) => {
        if (format === "es") return "index.esm.js";
        if (format === "cjs") return "index.cjs.js";
        return "index.min.js";
      },
    },
    minify: "terser",
  },
  plugins: [dts()]
});
