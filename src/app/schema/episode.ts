import { z } from "zod";

export const episodeCollectionSchema = z.object({
  info: z.object({
    count: z.number(),
    pages: z.number(),
    next: z.string().nullable(),
    prev: z.string().nullable(),
  }),
  results: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      air_date: z.string(),
      episode: z.string(),
      characters: z.array(z.string()),
      url: z.string(),
      created: z.string(),
    }),
  ),
});

export type EpisodeCollection = z.infer<typeof episodeCollectionSchema>;

export const isEpisodeCollection = (
  input: unknown,
): input is EpisodeCollection =>
  episodeCollectionSchema.safeParse(input).success;

export const episodeSchema = z.object({
  id: z.number(),
  name: z.string(),
  air_date: z.string(),
  episode: z.string(),
  characters: z.array(z.string()),
  url: z.string(),
  created: z.string(),
});

export type Episode = z.infer<typeof episodeSchema>;

export const isEpisode = (input: unknown): input is Episode =>
  episodeSchema.safeParse(input).success;

export const episodeArraySchema = z.array(episodeSchema);

export type EpisodeArray = z.infer<typeof episodeArraySchema>;

export const isEpisodeArray = (input: unknown): input is EpisodeArray =>
  episodeArraySchema.safeParse(input).success;
