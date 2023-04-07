<h1 align="center">Embed Builder</h1>
<p align=center>
<br/>
<a href="https://discord.com/api/oauth2/authorize?client_id=1093105357800357908&permissions=326417574976&scope=bot%20applications.commands"><img src="https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white" /></a>
<img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white" />
<img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
</p>

</br>
Discord Bot to create and send customizable embeds in few seconds.

Let's invite the Bot by clicking on this button:

[![Discord](https://img.shields.io/badge/Discord-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/api/oauth2/authorize?client_id=1093105357800357908&permissions=326417574976&scope=bot%20applications.commands)

## Usage

The bot has one simple command : `/embed`:

```
/embed <title> [description] [color] [url] [footer] [image] [thumbnail] [hide-author] [custom-author]
```

- `title` => Title of the embed (String) (Required)
- `description` => Content / Description of the embed (String)
- `color` => Decimal code of the color (Integer)
- `url` => URL opened when clicking on the title
- `footer` => Footer of the embed (Text /// URL)
- `image` => Embed Image
- `thumbnail` => Embed Thumbnail
- `hide-author` => By default the author of the interaction is designated as the author of the embed. Set this on `True` to hide it (Boolean)
- `custom-author` => Set another user as embed author (User)

## Run Localy

To run the bot localy you need Node.Js and an application on [Discord Developer Portal](https://discord.com/developers/applications/) then, follow this steps :

1. Clone this repo
2. Install dependencies (`npm install`)
3. Connect to cloudflare in wrangler (`wrangler login`)
4. Add your bot information :

```
$ wrangler secret put DISCORD_TOKEN
$ wrangler secret put DISCORD_PUBLIC_KEY
$ wrangler secret put DISCORD_APPLICATION_ID
```

5. Run `npm run dev`

## Contributions

All contributions are welcome! Thank you to everyone who will open issues and pull requests to participate in the project. You are free to propose corrections/improvements as well as feature additions in compliance with [Discord Guidelines](https://discord.com/guidelines)!
