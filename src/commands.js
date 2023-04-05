export const EMBED_COMMAND = {
    name: 'embed',
    description: 'Create an embed',
    options:[
        {
            type: 3,
            name: "title",
            description: "Embed Title",
            required: true
        },
        {
            type: 3,
            name: "description",
            description: "Embed Description",
            required: true
        },
        {
            type: 4,
            name: "color",
            description: "Embed Color - Decimal Value",
            required: true
        },
        {
            type: 3,
            name: "url",
            description: "Embed URL",
            required: true
        },
        {
            type: 3,
            name: "footer",
            description: "Text /// URL",
            required: true
        },
        {
            type: 3,
            name: "image",
            description: "URL /// Width - Height",
            required: true
        },
        {
            type: 3,
            name: "thumbnail",
            description: "URL /// Width - Height",
            required: true
        }
        
    ]
};