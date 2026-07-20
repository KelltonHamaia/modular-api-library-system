ALTER TABLE "loans" ALTER COLUMN "dueDate" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "loans" ALTER COLUMN "overdue" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "loans" ALTER COLUMN "bookId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "loans" ALTER COLUMN "memberId" SET NOT NULL;