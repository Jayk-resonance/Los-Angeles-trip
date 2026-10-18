// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
export const records = sqliteTable('records', {
 id: text('id').primaryKey(), kind: text('kind').notNull(), data: text('data').notNull(),
 author: text('author').notNull(), created: text('created').notNull(), deleted: integer('deleted').notNull().default(0),
}, t => [index('idx_records_kind_deleted').on(t.kind,t.deleted)]);
export const votes = sqliteTable('votes', { id:text('id').primaryKey(), decision:text('decision').notNull(), userId:text('user_id').notNull(), choice:text('choice').notNull(), name:text('name').notNull() },t=>[index('idx_votes_decision').on(t.decision)]);
export const profiles = sqliteTable('profiles', { userId:text('user_id').primaryKey(), name:text('name').notNull().unique() });
