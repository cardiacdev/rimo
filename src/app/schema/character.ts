import { z } from "zod";

const characterCollectionSchema = z.object({
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
      status: z.string(),
      species: z.string(),
      type: z.string().nullable(),
      gender: z.string(),
      origin: z.object({
        name: z.string(),
        url: z.string(),
      }),
      location: z.object({
        name: z.string(),
        url: z.string(),
      }),
      image: z.string(),
      episode: z.array(z.string()),
      url: z.string(),
      created: z.string(),
    }),
  ),
});

export type CharacterCollection = z.infer<typeof characterCollectionSchema>;

export const isCharacterCollection = (
  input: unknown,
): input is CharacterCollection =>
  characterCollectionSchema.safeParse(input).success;

export const characterSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  species: z.string(),
  type: z.string().nullable(),
  gender: z.string(),
  origin: z.object({
    name: z.string(),
    url: z.string(),
  }),
  location: z.object({
    name: z.string(),
    url: z.string(),
  }),
  image: z.string(),
  episode: z.array(z.string()),
  url: z.string(),
  created: z.string(),
});

export type Character = z.infer<typeof characterSchema>;

export const isCharacter = (input: unknown): input is Character =>
  characterSchema.safeParse(input).success;

export const characterArraySchema = z.array(characterSchema);

export type CharacterArray = z.infer<typeof characterArraySchema>;

export const isCharacterArray = (input: unknown): input is CharacterArray =>
  characterArraySchema.safeParse(input).success;
