CREATE TABLE `profiles` (
	`user_id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `profiles_name_unique` ON `profiles` (`name`);--> statement-breakpoint
CREATE TABLE `records` (
	`id` text PRIMARY KEY NOT NULL,
	`kind` text NOT NULL,
	`data` text NOT NULL,
	`author` text NOT NULL,
	`created` text NOT NULL,
	`deleted` integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_records_kind_deleted` ON `records` (`kind`,`deleted`);--> statement-breakpoint
CREATE TABLE `votes` (
	`id` text PRIMARY KEY NOT NULL,
	`decision` text NOT NULL,
	`user_id` text NOT NULL,
	`choice` text NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_votes_decision` ON `votes` (`decision`);