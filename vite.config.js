import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from '@tailwindcss/vite';
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [
      vue({
        template: {
          transformAssetUrls: {
            includeAbsolute: false,
          },
        },
      }),
      tailwindcss(),
    ],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_APIURL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
