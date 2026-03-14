import { defineConfig } from "vitepress";

const hostname = "https://typescript-config.codecompose.dev";

export default defineConfig({
  title: "TypeScript Config",
  description: "Opinionated reusable TypeScript configurations",
  base: "/",
  cleanUrls: true,

  sitemap: {
    hostname,
  },

  transformHead({ pageData }) {
    const canonicalUrl = `${hostname}/${pageData.relativePath}`
      .replace(/index\.md$/, "")
      .replace(/\.md$/, "");

    return [["link", { rel: "canonical", href: canonicalUrl }]];
  },

  themeConfig: {
    sidebar: [
      {
        text: "Guide",
        items: [
          { text: "Introduction", link: "/" },
          { text: "Getting Started", link: "/getting-started" },
          { text: "Configurations", link: "/configurations" },
        ],
      },
      {
        text: "Topics",
        items: [
          { text: "Project References", link: "/project-references" },
          { text: "Publishing to NPM", link: "/publishing" },
          { text: "Migration from V2", link: "/migration" },
        ],
      },
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/0x80/typescript-config",
      },
    ],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright &copy; Thijs Koerselman",
    },
  },
});
