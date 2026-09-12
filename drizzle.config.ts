import { readConfig } from "./src/config.ts"
import { defineConfig } from "drizzle-kit"

const config = readConfig()

export default defineConfig({
    schema: "src/lib/db/schema.ts",
    out: "src/lib/db/generated_files",
    dialect: "postgresql",
    dbCredentials: {
        url: config.dbUrl,
    }
});