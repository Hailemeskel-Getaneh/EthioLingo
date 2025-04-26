CREATE TABLE `lessons` (
	`lesson_id` text PRIMARY KEY NOT NULL,
	`lesson_name` text NOT NULL,
	`language` text NOT NULL,
	`premium_required` integer DEFAULT false,
	`content` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`sync_status` text DEFAULT 'synced'
);
