import { defineConfig } from 'astro/config';
import yaml from '@rollup/plugin-yaml';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import {remarkLinkExtensions,astroDebug} from "stormlit";

export default defineConfig({
    integrations: [
        mdx(),
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