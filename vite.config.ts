import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import fs from "node:fs";

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   server: {
      host: "0.0.0.0",
      port: 8000,
      // https: {
      //    key: fs.readFileSync("C:/SSL/localhost.key"),
      //    cert: fs.readFileSync("C:/SSL/localhost.crt"),
      // },
   },
});
