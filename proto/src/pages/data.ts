import data from '../test.yaml';
import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {

    return new Response(
        JSON.stringify(data.users),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );
};

