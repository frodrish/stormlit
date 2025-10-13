import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';
import {remarkLinkExtensions,astroDebug} from "stormlit";
import react from '@astrojs/react';
import db from '@astrojs/db';



export default defineConfig({
    integrations: [
        db(),
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