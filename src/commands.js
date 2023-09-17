export const EMBED_COMMAND = {
    name: 'embed',
    description: 'Create an embed',
    options: [
        {
            type: 3,
            name: "title",
            description: "Embed Title",
            required: true
        },
        {
            type: 3,
            name: "description",
            description: "Embed Description"
        },
        {
            type: 4,
            name: "color",
            description: "Embed Color - Decimal Value"
        },
        {
            type: 3,
            name: "url",
            description: "Embed URL"
        },
        {
            type: 3,
            name: "footer",
            description: "Text /// URL"
        },
        {
            type: 3,
            name: "image",
            description: "Image URL"
        },
        {
            type: 3,
            name: "thumbnail",
            description: "Thumbnail URL"
        },
        {
            type: 5,
            name: "hide-author",
            description: "True to hide the author (default : false)"
        },
        {
            type: 6,
            name: "custom-author",
            description: "Set another user as embed author"
        }
    ]
};

export const GENERATE_JSON = {
    name: "generate-json",
    description: "Generate the JSON of the Embed",
    options: EMBED_COMMAND.options
}

export const EDIT_EMBED_COMMAND = {
    name: 'edit-embed',
    description: 'Edit an embed',
    options: [
        {
            type: 3,
            name: "message-id",
            description: "id of the original message",
            required: true
        },
        {
            type: 3,
            name: "title",
            description: "Embed Title",
            required: true
        },
        {
            type: 3,
            name: "description",
            description: "Embed Description"
        },
        {
            type: 4,
            name: "color",
            description: "Embed Color - Decimal Value"
        },
        {
            type: 3,
            name: "url",
            description: "Embed URL"
        },
        {
            type: 3,
            name: "footer",
            description: "Text /// URL"
        },
        {
            type: 3,
            name: "image",
            description: "Image URL"
        },
        {
            type: 3,
            name: "thumbnail",
            description: "Thumbnail URL"
        },
        {
            type: 5,
            name: "hide-author",
            description: "True to hide the author (default : false)"
        },
        {
            type: 6,
            name: "custom-author",
            description: "Set another user as embed author"
        }
    ]
};