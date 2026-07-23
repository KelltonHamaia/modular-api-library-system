# 📚 Modular Library API
 
A REST API for managing a library — books, members, and loans — built as a hands-on exercise in **modular architecture** with Node.js/TypeScript.
 
This was my first practical deep dive into designing a backend around **business capabilities** (vertical modules) instead of technical layers. The goal wasn't "make it work fast" — it was understanding **where each rule should live** and **how modules should talk to each other without becoming coupled**.
So the idea wasn't to build something super complex, just to study the concept properly :D
 
## Stack
 
- **Node.js** + **TypeScript**
- **Express**
- **Drizzle ORM** + **PostgreSQL**
- **Zod** for input validation
## Architecture
 
The project is organized into vertical modules (`books`, `members`, `loans`), each split into layers with a single responsibility:
 
```
modules/
  <module>/
    domain/       → types, pure business rules (no I/O) and the repository contract
    data/         → concrete query implementation (Drizzle)
    http/         → controllers, routes and input validation (Zod)
    <module>.service.ts → orchestrates domain + data, the single entry point for business logic
    index.ts      → the module's public API — the only way another module is allowed to consume it
```
 
### Rules followed throughout the project
 
- **No module reaches directly into another module's table/schema.** All communication between `loans`, `books` and `members` goes through each module's `index.ts` — its public "front desk."
- **`domain/` never performs I/O.** It only receives data that was already fetched and decides (validates, calculates, builds objects).
- **Repository contracts are defined by whoever owns the data**, never by the consumer.
- Functions follow meaningful prefixes: `find*` (may not find anything, returns `null`), `get*` (guarantees a value or throws), `assert*/ensure*` (enforces a business rule), `build*` (constructs a new object), `count*` (database aggregation).
## Endpoints
 
### Books
| Method | Route | Description |
|---|---|---|
| `POST` | `/v1/books` | Creates a book |
| `GET` | `/v1/books` | Lists all books |
| `GET` | `/v1/books/:id` | Fetches a book by id |
 
### Members
| Method | Route | Description |
|---|---|---|
| `POST` | `/v1/members` | Registers a member (created with `ACTIVE` status) |
| `GET` | `/v1/members/:id` | Fetches a member by id |
| `PATCH` | `/v1/members/:id` | Updates status (`ACTIVE`/`SUSPENDED`) |
 
### Loans
| Method | Route | Description |
|---|---|---|
| `POST` | `/v1/loans` | Creates a loan |
| `PATCH` | `/v1/loans/:id/return` | Registers the return |
| `GET` | `/v1/loans` | Lists loans (accepts `?memberId=` to filter) |
 
## Implemented business rules
 
- A suspended member cannot borrow books.
- Limit of **3 active loans** per member.
- A book with no available copies cannot be borrowed.
- The same member cannot have two active loans for the same book at the same time.
- Returning a loan automatically calculates whether it was overdue (`overdue`), comparing the return date against the due date (`dueDate`, calculated as 14 days after the loan date).
- `availableCopies` never goes negative or exceeds `totalCopies` — enforced both by the update query's condition and by a follow-up domain check.
## Running the project
 
```bash
# Spin up the docker container + postgres
docker compose up -d
 
# install dependencies
npm install
 
# set up environment variables
cp .env.example .env
# fill in DATABASE_URL and PORT
 
# generate and apply migrations
npm run db:generate
npm run db:migrate
 
# start in development mode
npm run dev
```
 
## Known limitations / next steps
 
This project was built incrementally, with a focus on learning architecture — so a few things were consciously left for a future iteration:
 
- **Function naming isn't 100% standardized yet.** In a few places, the intended meaning of `assert*`/`ensure*` isn't fully consistent across modules — something I plan to fix as a single, upfront convention next time. Or in a new project altogether, since this one was focused on learning the architecture itself.
- **No transactions covering operations that touch more than one table.** For example, creating a loan and decrementing the book's available copies are two separate operations — under high concurrency, there's a small window of inconsistency between them. The current mitigation is an atomic condition on the `UPDATE` itself (`WHERE availableCopies > 0`), which prevents the value from going inconsistent at the database level, but doesn't cover the full scenario the way a real transaction would.
- **No explicit protection against returning the same loan twice.** Today this is only partially blocked once the copy increment hits the total limit.
- **No automated tests yet.** The architecture was designed with testability in mind (repository injected via a default parameter in every service), but the test suite itself hasn't been written.
## What I'd do differently in a v2
 
- Lock down the naming glossary *before* writing the first line of code, not midway through.
- Consider a factory per module for services (`makeLoansService(repository)`), reducing the repeated default-parameter boilerplate as modules grow.
- Wrap `createLoan` and `returnLoan` in real Drizzle transactions.
---
 
This README was put together alongside my studies and conversations with Claude, as a general wrap-up of the project.
