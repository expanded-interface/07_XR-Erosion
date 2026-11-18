import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

// HTTPS on the LAN so Quest Browser can open WebXR from your computer:
//   npm run dev  ->  https://<your-computer-ip>:5173
export default defineConfig({
  base: './',
  plugins: [basicSsl()],
  server: { host: true, port: 5173 },
  build: {
    target: 'es2022',
    rollupOptions: {
      // Optional XR Blocks features this experiment never loads (AI, ML,
      // WebGPU UI). They stay as lazy imports that are never executed.
      external: [
        '@pmndrs/uikit/webgpu',
        '@google/genai',
        'openai',
        '@litertjs/core',
        /^@mediapipe\//,
        'three-pathfinding',
        /^@tensorflow\//,
      ],
    },
    chunkSizeWarningLimit: 4000,
  },
});
