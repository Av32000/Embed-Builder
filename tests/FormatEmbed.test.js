const { FormatEmbed } = require("../src/FormatEmbed");

function GenerateMessage() {
  return {
    data: {
      options: [
        {
          type: 3,
          name: "title",
          value: "Test",
        },
      ],
    },
    member: {
      user: {
        id: "593436735380127770",
        username: "Av32000",
        avatar: "9f0e55cee1f72b7e02d44b6a75b618bf",
        discriminator: "9052",
      },
    },
  };
}

describe("Embed Builder", () => {
  test("Title", async () => {
    const message = GenerateMessage();
    const embed = await (await FormatEmbed(message, "")).data.embeds[0];
    expect(embed.title).toBe("Test");
    expect(embed.author).toStrictEqual({
      name: "Av32000",
      icon_url: `https://cdn.discordapp.com/avatars/593436735380127770/9f0e55cee1f72b7e02d44b6a75b618bf.png`,
    });
  });

  test("Author Without Icon", async () => {
    const message = GenerateMessage();
    message.member.user.avatar = null
    const embed = await (await FormatEmbed(message, "")).data.embeds[0];
    expect(embed.title).toBe("Test");
    expect(embed.author).toStrictEqual({
      name: "Av32000",
      icon_url: `https://cdn.discordapp.com/embed/avatars/2.png`,
    });
  });

  test("Classic parameters", async () => {
    const message = GenerateMessage();

    // Config
    message.data.options.push({
      type: 3,
      name: "description",
      value: "Test Description",
    });
    message.data.options.push({ type: 4, name: "color", value: 3093151 });
    message.data.options.push({
      type: 3,
      name: "url",
      value: "https://github.com",
    });

    const embed = await (await FormatEmbed(message, "")).data.embeds[0];
    expect(embed.title).toBe("Test");
    expect(embed.description).toBe("Test Description");
    expect(embed.color).toBe(3093151);
    expect(embed.author).toStrictEqual({
      name: "Av32000",
      icon_url: `https://cdn.discordapp.com/avatars/593436735380127770/9f0e55cee1f72b7e02d44b6a75b618bf.png`,
    });
  });

  test("Footer Without URL", async () => {
    const message = GenerateMessage();

    // Config
    message.data.options.push({ type: 3, name: "footer", value: "Footer" });

    const embed = await (await FormatEmbed(message, "")).data.embeds[0];
    expect(embed.title).toBe("Test");
    expect(embed.footer.text).toBe("Footer");
    expect(embed.author).toStrictEqual({
      name: "Av32000",
      icon_url: `https://cdn.discordapp.com/avatars/593436735380127770/9f0e55cee1f72b7e02d44b6a75b618bf.png`,
    });
  });

  test("Footer With URL", async () => {
    const message = GenerateMessage();

    // Config
    message.data.options.push({
      type: 3,
      name: "footer",
      value:
        "Footer /// https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    });

    const embed = await (await FormatEmbed(message, "")).data.embeds[0];
    expect(embed.title).toBe("Test");
    expect(embed.footer.text).toBe("Footer");
    expect(embed.footer.icon_url).toBe(
      "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
    );
    expect(embed.author).toStrictEqual({
      name: "Av32000",
      icon_url: `https://cdn.discordapp.com/avatars/593436735380127770/9f0e55cee1f72b7e02d44b6a75b618bf.png`,
    });
  });

  test("Image", async () => {
    const message = GenerateMessage();

    // Config
    message.data.options.push({
      type: 3,
      name: "image",
      value:
        "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    });

    const embed = await (await FormatEmbed(message, "")).data.embeds[0];
    expect(embed.title).toBe("Test");
    expect(embed.image.url).toBe(
      "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
    );
    expect(embed.author).toStrictEqual({
      name: "Av32000",
      icon_url: `https://cdn.discordapp.com/avatars/593436735380127770/9f0e55cee1f72b7e02d44b6a75b618bf.png`,
    });
  });

  test("Thumbnail", async () => {
    const message = GenerateMessage();

    // Config
    message.data.options.push({
      type: 3,
      name: "thumbnail",
      value:
        "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    });

    const embed = await (await FormatEmbed(message, "")).data.embeds[0];
    expect(embed.title).toBe("Test");
    expect(embed.thumbnail.url).toBe(
      "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
    );
    expect(embed.author).toStrictEqual({
      name: "Av32000",
      icon_url: `https://cdn.discordapp.com/avatars/593436735380127770/9f0e55cee1f72b7e02d44b6a75b618bf.png`,
    });
  });

  test("Hide Author (True)", async () => {
    const message = GenerateMessage();

    // Config
    message.data.options.push({ type: 5, name: "hide-author", value: true });

    const embed = await (await FormatEmbed(message, "")).data.embeds[0];
    expect(embed.title).toBe("Test");
    expect(embed.author).toBe(false);
  });

  test("Hide Author (False)", async () => {
    const message = GenerateMessage();

    // Config
    message.data.options.push({ type: 5, name: "hide-author", value: false });

    const embed = await (await FormatEmbed(message, "")).data.embeds[0];
    expect(embed.title).toBe("Test");
    expect(embed.author).toStrictEqual({
      name: "Av32000",
      icon_url: `https://cdn.discordapp.com/avatars/593436735380127770/9f0e55cee1f72b7e02d44b6a75b618bf.png`,
    });
  });

  test("Custom Author", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: "1093105357800357908",
            username: "Embed Builder",
            avatar: "ff81884116f3de78dea32ba1e69ddaa5",
            discriminator: "8905",
          }),
      })
    );

    const message = GenerateMessage();

    // Config
    message.data.options.push({
      type: 6,
      name: "custom-author",
      value: "1093105357800357908",
    });

    const embed = await (await FormatEmbed(message, "")).data.embeds[0];
    expect(embed.title).toBe("Test");
    expect(embed.author).toStrictEqual({
      name: "Embed Builder",
      icon_url: `https://cdn.discordapp.com/avatars/1093105357800357908/ff81884116f3de78dea32ba1e69ddaa5.png`,
    });
  });

  test("Custom Author (Without Icon)", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: "1093105357800357908",
            username: "Embed Builder",
            avatar: null,
            discriminator: "8905",
          }),
      })
    );

    const message = GenerateMessage();

    // Config
    message.data.options.push({
      type: 6,
      name: "custom-author",
      value: "1093105357800357908",
    });

    const embed = await (await FormatEmbed(message, "")).data.embeds[0];
    expect(embed.title).toBe("Test");
    expect(embed.author).toStrictEqual({
      name: "Embed Builder",
      icon_url: `https://cdn.discordapp.com/embed/avatars/0.png`,
    });
  });

  test("Custom Author (With Hide Author)", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            id: "1093105357800357908",
            username: "Embed Builder",
            avatar: "ff81884116f3de78dea32ba1e69ddaa5",
            discriminator: "8905",
          }),
      })
    );
    const message = GenerateMessage();

    // Config
    message.data.options.push({
      type: 6,
      name: "custom-author",
      value: "1093105357800357908",
    });
    message.data.options.push({ type: 5, name: "hide-author", value: true });

    const embed = await (await FormatEmbed(message, "")).data.embeds[0];
    expect(embed.title).toBe("Test");
    expect(embed.author).toBe(false);
  });
});
