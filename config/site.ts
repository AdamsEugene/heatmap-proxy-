export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Heatmap-proxy",
  description: "Add site to the proxy list of heatmap",
  navItems: [
    {
      label: "Origins",
      href: "/",
    },
    {
      label: "SPAs",
      href: "/spa",
    },
    {
      label: "Proxy4",
      href: "/proxy4",
    },
    {
      label: "Proxy5",
      href: "/proxy5",
    },
    {
      label: "Proxy6",
      href: "/proxy6",
    },
  ],
  navMenuItems: [
    {
      label: "Origins",
      href: "/",
    },
    {
      label: "SPAs",
      href: "/spa",
    },
    {
      label: "Proxy4",
      href: "/proxy4",
    },
    {
      label: "Proxy5",
      href: "/proxy5",
    },
    {
      label: "Proxy6",
      href: "/proxy6",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
