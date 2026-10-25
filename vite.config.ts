import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { imagetools } from "vite-imagetools";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 5187,
    proxy: { "/__l5e": { target: "https://ellamadari.com", changeOrigin: true } },
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), imagetools({
    // Production-only compression preserves source filenames used for topic classification.
    defaultDirectives: (url) => mode === "production" && /\.(png|jpe?g)$/i.test(url.pathname)
      ? new URLSearchParams({ format: 'webp', quality: '84' })
      : new URLSearchParams(),
  }), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
