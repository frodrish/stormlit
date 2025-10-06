import { defineConfig } from 'astro/config';
import yaml from "@rollup/plugin-yaml";
import {astroDebug} from 'stormlit';
import starlight from '@astrojs/starlight';
import remarkLinkExtensions from "./packages/stormlit/plugin/remark/remarkLinkExtensions.js";


export default defineConfig({
    root: '../',
    srcDir : '../docs',
    markdown: {
        remarkPlugins: [remarkLinkExtensions],
    },
    integrations: [
        astroDebug(['docs']),
        starlight({
            title: 'Stormlit',
            sidebar: [],
        })
    ],
    vite: {
        plugins: [
            yaml(),
        ],
    },
});
