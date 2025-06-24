import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const waitlist = pgTable("waitlist", {
	id: text("id").primaryKey().notNull(),
	email: text("email").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
});

export type Waitlist = typeof waitlist.$inferSelect;
export type NewWaitlist = typeof waitlist.$inferInsert;
