import { createTRPCRouter } from "~/server/api/trpc";
import { episodeRouter } from "./routers/episode";
import { characterRouter } from "./routers/character";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  episode: episodeRouter,
  character: characterRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
