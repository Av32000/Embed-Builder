import { Router } from 'itty-router';
import {
    InteractionResponseType,
    InteractionType,
    verifyKey,
} from 'discord-interactions';
import { EDIT_EMBED_COMMAND, EMBED_COMMAND } from './commands.js';
import { FormatEmbed, GetOptions } from './FormatEmbed.js';

class JsonResponse extends Response {
    constructor(body, init) {
        const jsonBody = JSON.stringify(body);
        init = init || {
            headers: {
                'content-type': 'application/json;charset=UTF-8',
            },
        };
        super(jsonBody, init);
    }
}

const router = Router();

router.get('/', (request, env) => {
    return new Response(`👋 ${env.DISCORD_APPLICATION_ID}`);
});

router.post('/', async (request, env) => {
    const message = await request.json();
    if (message.type === InteractionType.PING) {
        return new JsonResponse({
            type: InteractionResponseType.PONG,
        });
    }

    if (message.type === InteractionType.APPLICATION_COMMAND) {
        if (message.data.name.toLowerCase() == EMBED_COMMAND.name.toLowerCase()) {
            return new JsonResponse(await FormatEmbed(message, env.DISCORD_TOKEN))
        } else if (message.data.name.toLowerCase() == EDIT_EMBED_COMMAND.name.toLowerCase()) {
            const embed = (await FormatEmbed(message, env.DISCORD_TOKEN)).data
            let status
            await fetch(`https://discord.com/api/v10/channels/${message.channel_id}/messages/${GetOptions(message.data.options, "message-id").value}`, {
                method: 'PATCH', headers: {
                    Authorization: `Bot ${env.DISCORD_TOKEN}`,
                    'Content-Type': 'application/json; charset=UTF-8',
                    'User-Agent': 'Embed Builder'
                }, body: JSON.stringify(embed)
            }).then(response => {
                status = response.ok
            })


            return new JsonResponse({
                type: 4,
                data: {
                    content: status ? "✨ The message has been updated ✨" : "🚫 Unable to edit this message 🚫",
                    flags: 64,
                },
            });
        }
    }

    console.error('Unknown Type');
    return new JsonResponse({ error: 'Unknown Type' }, { status: 400 });
});

router.all('*', () => new Response('Not Found.', { status: 404 }));

export default {
    async fetch(request, env) {

        if (request.method === 'POST') {
            const signature = request.headers.get('x-signature-ed25519');
            const timestamp = request.headers.get('x-signature-timestamp');
            const body = await request.clone().arrayBuffer();
            const isValidRequest = verifyKey(
                body,
                signature,
                timestamp,
                env.DISCORD_PUBLIC_KEY
            );
            if (!isValidRequest) {
                console.error('Invalid Request');
                return new Response('Bad request signature.', { status: 401 });
            }
        }
        return router.handle(request, env);
    },
};