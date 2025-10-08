import { defineConfig } from 'astro/config';
import yaml from "@rollup/plugin-yaml";
import {astroDebug,remarkLinkExtensions,generateSidebar} from 'stormlit';
import starlight from '@astrojs/starlight';

const srcDir = '.';
const customSidebar = generateSidebar(srcDir + '/sidebar.md');

console.log("Sidebar:", JSON.stringify(customSidebar));

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
            sidebar: customSidebar,
        })
    ],
    vite: {
        plugins: [
            yaml(),
        ],
    },
});
