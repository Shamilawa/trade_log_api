## Project info

### prisma migration script step
1. Create migration

`npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql`

Replace `prisma/migrations/0_init/migration.sql` with your migration folder

2. Review the migration - check the generated migration file to check everything is okay

3. Next, mark the migration as applied using `prisma migrate resolve` with the `--applied` argument.

`npx prisma migrate resolve --applied 0_init`
