CREATE TYPE "status" AS ENUM('ACTIVE', 'SUSPENDED');--> statement-breakpoint
CREATE TABLE "books" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"title" varchar(255) NOT NULL,
	"author" varchar(255) NOT NULL,
	"total_copies" integer NOT NULL,
	"available_copies" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "loans" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"loanDate" timestamp DEFAULT now() NOT NULL,
	"dueDate" timestamp DEFAULT now() + interval '14 days' NOT NULL,
	"returnDate" timestamp,
	"overdue" boolean NOT NULL,
	"bookId" uuid,
	"memberId" uuid
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" uuid PRIMARY KEY DEFAULT uuidv7(),
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL CONSTRAINT "unique-email-string" UNIQUE,
	"status" "status" DEFAULT 'ACTIVE'::"status" NOT NULL
);
--> statement-breakpoint
ALTER TABLE "loans" ADD CONSTRAINT "loans_bookId_books_id_fkey" FOREIGN KEY ("bookId") REFERENCES "books"("id");--> statement-breakpoint
ALTER TABLE "loans" ADD CONSTRAINT "loans_memberId_members_id_fkey" FOREIGN KEY ("memberId") REFERENCES "members"("id");