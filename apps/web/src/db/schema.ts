import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const waitlistUsersTable = pgTable("waitlist", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type SelectedWaitlistUser = typeof waitlistUsersTable.$inferSelect;
export type InsertWaitlistUser = typeof waitlistUsersTable.$inferInsert;
