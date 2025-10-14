import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import googleAnalytics from 'astro-google-analytics';
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), googleAnalytics({
    measurementId: 'G-J9C85BJ5H4',
  })],
  output: "server",
  adapter: vercel()
});