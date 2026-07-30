CREATE TABLE `lessons` (
	`lesson_id` text PRIMARY KEY NOT NULL,
	`lesson_name` text NOT NULL,
	`language` text NOT NULL,
	`premium_required` integer DEFAULT false,
	`content` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`sync_status` text DEFAULT 'synced',
	`last_synced` integer
);
--> statement-breakpoint
CREATE TABLE `userProfile` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`userId` text NOT NULL,
	`profileImage` text DEFAULT 'https://...',
	`status` text DEFAULT 'free',
	`nativeLanguage` text DEFAULT 'English',
	`learningLanguage` text NOT NULL,
	`goalTime` integer NOT NULL,
	`favoriteWords` text DEFAULT '[]',
	FOREIGN KEY (`userId`) REFERENCES `Users`(`userId`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `userProfile_userId_unique` ON `userProfile` (`userId`);--> statement-breakpoint
CREATE TABLE `user_profile` (
	`user_id` text PRIMARY KEY NOT NULL,
	`username` text,
	`email` text,
	`profile_image` text,
	`goal_time` text
);
--> statement-breakpoint
CREATE TABLE `user_session` (
	`id` integer PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`is_logged_in` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`userId` text PRIMARY KEY NOT NULL,
	`full_name` text NOT NULL,
	`email` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`sync_status` text DEFAULT 'synced',
	`last_synced` integer
);
