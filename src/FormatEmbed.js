async function GetUserData(id, token) {
    const url = `https://discord.com/api/v10/users/${id}`

    return await fetch(url, { headers: { Authorization: `Bot ${token}`, } }).then(async res => {
        return await res.json()
    })
}

const GetOptions = (options, name) => {
    return options.find(function (objet) {
        return objet.name === name;
    });
}

const FormatColor = (color) => {
    let s = color.toString()
    if (s.startsWith("#")) {
        s = s.replace("#", "");
        let decimalColor = parseInt(s, 16);
        return decimalColor;
    } else if (s.startsWith("rgb") && s.split(",").length == 3) {
        s = s.split("(")[1].split(")")[0]
        color = {
            r: parseInt(s.split(",")[0]),
            g: parseInt(s.split(",")[1]),
            b: parseInt(s.split(",")[2]),
        }
        return (color.r << 16) + (color.g << 8) + (color.b)
    } else {
        return parseInt(color)
    }
}

async function FormatEmbed(message, token) {
    const options = message.data.options
    const hideAuthor = GetOptions(options, "hide-author")?.value
    const customAuthorId = GetOptions(options, "custom-author")?.value

    const customAuthor = customAuthorId != null && await GetUserData(customAuthorId, token)

    return {
        type: 4,
        data: {
            embeds: [
                {
                    title: GetOptions(options, "title")?.value,
                    description: GetOptions(options, "description")?.value.split("\\n").join("\n"),
                    color: GetOptions(options, "color")?.value != null && FormatColor(GetOptions(options, "color")?.value),
                    url: GetOptions(options, "url")?.value,
                    author: (hideAuthor == null || !hideAuthor) && {
                        name: customAuthorId != null ? (customAuthor.global_name || customAuthor.username) : (message.member.user.global_name || message.member.user.username),
                        icon_url: customAuthorId != null ? (customAuthor.avatar != null ? `https://cdn.discordapp.com/avatars/${customAuthorId.toString()}/${customAuthor.avatar}.png` : `https://cdn.discordapp.com/embed/avatars/${Math.abs((parseInt(customAuthor.id) >> 22) % 6)}.png`) : (message.member.user.avatar != null ? `https://cdn.discordapp.com/avatars/${message.member.user.id.toString()}/${message.member.user.avatar}.png` : `https://cdn.discordapp.com/embed/avatars/${Math.abs((parseInt(message.member.user.id) >> 22) % 6)}.png`)
                    },
                    footer: {
                        text: GetOptions(options, "footer")?.value.split(" /// ")[0],
                        icon_url: GetOptions(options, "footer")?.value.split(" /// ")[1]
                    },
                    image: {
                        url: GetOptions(options, "image")?.value
                    },
                    thumbnail: {
                        url: GetOptions(options, "thumbnail")?.value
                    }
                }
            ]
        },
    };
}

export {
    FormatEmbed,
    GetOptions
}