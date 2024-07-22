import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src": "/src",
      "@pages": "/src/pages",
      "@components": "/src/components",
      "@services": "/src/services",
      "@routers": "/src/routers",
      "@types": "/src/types",
      "@theme": "/src/theme",
      "@assets": "/src/assets",
      "@hooks": "/src/hooks",
      "@utils": "/src/utils",
    },
  },
})
