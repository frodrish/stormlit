import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';
import {remarkLinkExtensions,astroDebug} from "stormlit";
import react from '@astrojs/react';



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