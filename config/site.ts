export type NavIconKey = "world" | "spa" | "server";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Heatmap",
  description: "Manage proxy origins for Heatmap",
  navItems: [
    {
      label: "Origins",
      href: "/",
      icon: "world" as const,
    },
    {
      label: "SPAs",
      href: "/spa",
      icon: "spa" as const,
    },
    {
      label: "Proxy4",
      href: "/proxy4",
      icon: "server" as const,
    },
    {
      label: "Proxy5",
      href: "/proxy5",
      icon: "server" as const,
    },
    {
      label: "Proxy6",
      href: "/proxy6",
      icon: "server" as const,
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
