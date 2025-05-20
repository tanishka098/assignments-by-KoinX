
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { reactComponentTagger } from "react-component-tagger";


export default defineConfig({
  server: {
    host: "localhost",
    port: 8080,
    strictPort: false, 
    open: true, 
  },
  plugins: [
    react(),
    {
      ...reactComponentTagger(),
      apply: 'build'
    }
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
