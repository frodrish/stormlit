import { defineDb, defineTable, column } from 'astro:db';

const Queries = defineTable({
    columns: {
        id: column.text({ primaryKey: true }),
        sql: column.text(),
    }
})

export default defineDb({
    tables: { Queries },
})