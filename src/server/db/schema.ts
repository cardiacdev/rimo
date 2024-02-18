import { relations, sql } from "drizzle-orm";
import {
  index,
  int,
  primaryKey,
  sqliteTableCreator,
  text,
} from "drizzle-orm/sqlite-core";
import { type AdapterAccount } from "next-auth/adapters";

export const createTable = sqliteTableCreator((name) => `rimo_${name}`);

export const users = createTable("user", {
  id: text("id", { length: 255 }).notNull().primaryKey(),
  name: text("name", { length: 255 }),
  email: text("email", { length: 255 }).notNull(),
  emailVerified: int("emailVerified", {
    mode: "timestamp",
  }).default(sql`CURRENT_TIMESTAMP`),
  image: text("image", { length: 255 }),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  favoriteCharacters: many(favoriteCharacters),
  favoriteEpisodes: many(favoriteEpisodes),
}));

export const favoriteEpisodes = createTable(
  "favorite_episode",
  {
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    episodeId: text("episodeId", { length: 255 }).notNull(),
  },
  (favoriteEpisode) => ({
    compoundKey: primaryKey({
      columns: [favoriteEpisode.userId, favoriteEpisode.episodeId],
    }),
  }),
);

export const favoriteEpisodesRelations = relations(
  favoriteEpisodes,
  ({ one }) => ({
    user: one(users, {
      fields: [favoriteEpisodes.userId],
      references: [users.id],
    }),
  }),
);

export const favoriteCharacters = createTable(
  "favorite_character",
  {
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    characterId: text("characterId", { length: 255 }).notNull(),
  },
  (favoriteCharacter) => ({
    compoundKey: primaryKey({
      columns: [favoriteCharacter.userId, favoriteCharacter.characterId],
    }),
  }),
);

export const favoriteCharactersRelations = relations(
  favoriteCharacters,
  ({ one }) => ({
    user: one(users, {
      fields: [favoriteCharacters.userId],
      references: [users.id],
    }),
  }),
);

export const accounts = createTable(
  "account",
  {
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: text("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: text("provider", { length: 255 }).notNull(),
    providerAccountId: text("providerAccountId", { length: 255 }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: int("expires_at"),
    token_type: text("token_type", { length: 255 }),
    scope: text("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: text("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_userId_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: text("sessionToken", { length: 255 }).notNull().primaryKey(),
    userId: text("userId", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_userId_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verificationToken",
  {
    identifier: text("identifier", { length: 255 }).notNull(),
    token: text("token", { length: 255 }).notNull(),
    expires: int("expires", { mode: "timestamp" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
