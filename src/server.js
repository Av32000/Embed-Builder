import { Router } from 'itty-router';
import {
    InteractionResponseType,
    InteractionType,
    verifyKey,
} from 'discord-interactions';
import { EMBED_COMMAND } from './commands.js';

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

const GetOptions = (options, name) => {
    return options.find(function (objet) {
        return objet.name === name;
    });
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
            const options = message.data.options
            const hideAuthor = GetOptions(options, "hide-author")?.value
            const customAuthorId = GetOptions(options, "custom-author")?.value

            const customAuthor = customAuthorId != null && await GetUserData(customAuthorId, env.DISCORD_TOKEN)

            return new JsonResponse({
                type: 4,
                data: {
                    embeds: [
                        {
                            title: GetOptions(options, "title").value,
                            description: GetOptions(options, "description")?.value.split("\\n").join("\n"),
                            color: GetOptions(options, "color")?.value,
                            url: GetOptions(options, "url")?.value,
                            author: (hideAuthor == null || !hideAuthor) && {
                                name: customAuthorId != null ? customAuthor.username : message.member.user.username, icon_url: customAuthorId != null ? (customAuthor.avatar != null ? `https://cdn.discordapp.com/avatars/${customAuthorId.toString()}/${customAuthor.avatar}.png` : `https://cdn.discordapp.com/embed/avatars/${customAuthor.discriminator % 5}.png`) : `https://cdn.discordapp.com/avatars/${message.member.user.id.toString()}/${message.member.user.avatar}.png`
                            },
                            footer: {
                                text: GetOptions(options, "footer")?.value.split(" /// ")[0],
                                icon_url: GetOptions(options, "footer")?.value.split(" /// ")[1]
                            },
                            image: {
                                url: GetOptions(options, "image")?.value
                            },
                            thumbnail: {
                                url: GetOptions(options, "image")?.value
                            }
                        }
                    ]
                },
            });
        }
    }

    console.error('Unknown Type');
    return new JsonResponse({ error: 'Unknown Type' }, { status: 400 });
});

async function GetUserData(id, token) {
    const url = `https://discord.com/api/v10/users/${id}`

    return await fetch(url, { headers: { Authorization: `Bot ${token}`, } }).then(async res => {
        return await res.json()
    })
}

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