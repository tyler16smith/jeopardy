# Play Jeopardy - Full Stack Web App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## How to get started

1. Clone this repository locally: ```git clone https://github.com/tyler16smith/jeopardy.git```
2. Copy the ```.env.example``` and paste it as ```.env```. From there, copy over the DATABASE_URL, SUPABASE_ANON_KEY, and SUPABASE_SECRET_KEY all from supabase. The DATABASE_URL is the connection string which you can find in the settings tab.
2. Go to the root folder and run ```pnpm install```
3. Click the "Run and Debug" button, then select "Full Stack" and press play. OR you can go to the root and run ```pnpm dev```. I highly recommend running the debugger for local development so you can add breakpoints anywhere in the frontend or backend.
4. Get building 🚀

## Technologies used in this project

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [tRPC](https://trpc.io) - library for building type-safe API's in typescript
- [PNPM](https://pnpm.io/) - Wicked fast package manager
- [Tailwind CSS](https://tailwindcss.com) - CSS library
- [Prisma](https://prisma.io) - ORM
- [Supabase](https://supabase.com) - Postgres Database Management

Auth Recommendation (not implemented yet):
- [Clerk](https://clerk.com/)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

My personal favorite and recommendation would be Vercel. Follow the deployment guides for [here](https://create.t3.gg/en/deployment/vercel)
