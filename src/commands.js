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
    ]
};