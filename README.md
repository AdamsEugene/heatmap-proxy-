# Next.js & NextUI Template

This is a template for creating applications using Next.js 14 (app directory) and NextUI (v2).

[Try it on CodeSandbox](https://githubbox.com/nextui-org/next-app-template)

## Look & feel

The UI follows the **Heatmap portal (V3)** visual language from `pilgrim/heatmap-source`: Inter, brand green `#10b068`, warm neutral tint `#ebdbbc`, content width `--content` (1072px), and a **settings-style** shell (sidebar nav + main column).

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## How to Use

### Use the template with create-next-app

To create a new project based on this template using `create-next-app`, run the following command:

```bash
npx create-next-app -e https://github.com/nextui-org/next-app-template
```

### Environment (Heatmap API)

The UI calls the Heatmap `manageorigin` endpoint for listing and updating origins. Copy `.env.example` to `.env` and set `NEXT_PUBLIC_BASE_URL` (or `BASE_URL`) to the **full base URL of that endpoint** (path only, no `?` query string). Example:

```bash
NEXT_PUBLIC_BASE_URL=https://stage9.heatmapcore.com/backend/settings/manageorigin
```

If that endpoint returns 404 or is unreachable, the app still loads and shows "Sorry, no data found." for empty lists.

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@nextui-org/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).
