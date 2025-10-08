import type { AstroIntegration } from 'astro';
import type {Plugin} from 'vite';

import path from 'path';

import {fileURLToPath,pathToFileURL} from "url";
import remarkLinkExtensions from  '../remark/remarkLinkExtensions.js';


let resolvedRoutes: string = '[]';
let resolvedCol: string = '[]';
let resolvedConf: string = '{}';

export default function astroDebug(collections : string[] =[]): AstroIntegration {
    resolvedCol = JSON.stringify(collections, null, 2);
    return {
        name: 'astro-debug-plugin',
        hooks: {
            // This hook runs after all routes (static and dynamic) are resolved.
            'astro:routes:resolved': ({ routes }) => {
                resolvedRoutes = JSON.stringify(routes, null, 2); routes;
            },

            'astro:config:setup': ({ updateConfig, command,injectRoute }) => {
                if (command === 'dev') {
                    const __dirname = path.dirname(fileURLToPath(import.meta.url));
                    const  entrypoint =  new URL(pathToFileURL(path.resolve(__dirname, './debug.astro')))
                     injectRoute({
                        pattern: '/debug2',
                        entrypoint: entrypoint,
                    });
                    updateConfig({
                        markdown: {
                            remarkPlugins: [remarkLinkExtensions],
                        },
                        vite: {
                            plugins: [
                                 AstroDebugPlugin(),
                            ],
                        },
                    })
                }
            },

            'astro:config:done': ({ config }) => {
                resolvedConf = JSON.stringify(config, null, 2);
            },
        },
    };
}

function AstroDebugPlugin(): Plugin {


    return {
        name: 'vite-plugin-debug-astro',

        // 2. Access the stored config in the configureServer hook
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                if (req.url === '/debug2Route' || req.url ===  '/debug2Col' || req.url ===  '/debug2Conf') {
                    try {
                        res.setHeader('Content-Type', 'application/json')
                        if(req.url === '/debug2Route') {
                            res.end(resolvedRoutes);
                        } else if(req.url === '/debug2Col') {
                            res.end(resolvedCol);
                        } else {
                            res.end(resolvedConf);
                        }
                    } catch (err) {
                        res.statusCode = 500;
                        res.end('Failed to render debug.jsx: ' + err);
                    }
                    return;
                }
                next();
            });
        }
    };
}


