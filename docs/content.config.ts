import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';


const docs = defineCollection({
    loader: glob({ pattern: '**/*.(md|mdx)', base: './docs' }),
    schema: null,
})

export const collections = {docs};
