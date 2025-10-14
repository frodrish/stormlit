import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';
import react from '@astrojs/react';
import {remarkLinkExtensions,astroDebug} from "stormlit";

export default defineConfig({
    integrations: [
        react(),
        astroDebug(['docs'])
    ],
    markdown: {
        remarkPlugins: [remarkLinkExtensions],
    },
    vite: {
        plugins: [yaml()],
    },
});