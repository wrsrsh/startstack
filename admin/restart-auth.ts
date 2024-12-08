import env from "@/env";
import postgres from "postgres";

// THIS SCRIPT CAN AND SHOULD BE ONLY EXECUTED IN DEVELOPMENT ENVIRONMENTS

const TABLES = [
  "users",
  "accounts",
  "sessions",
  "verifications",
  "organizations",
  "members",
  "invitations",
];

async function main() {
  // Create postgres connection
  const sql = postgres(env.DATABASE_URL_DEVELOPMENT, {
    // Ensure we're in a development environment
    max: 1, // Use a single connection for this script
    idle_timeout: 20, // Close connection after 20 seconds of inactivity
  });

  // Confirmation prompt
  const confirmation = prompt(`
    Are you sure you want to truncate the following tables?
    ${TABLES.join(", ")}
    
    This will delete all rows, reset the identity, and cascade where applicable.
    Type "yes" to confirm: 
  `);

  if (confirmation?.toLowerCase() === "yes") {
    try {
      for (const table of TABLES) {
        const query = `TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE;`;
        await sql.unsafe(query);
        console.log(`✅ Table "${table}" truncated successfully!`);
      }
      console.log("\n✨ All tables truncated successfully!");
    } catch (error) {
      console.error("❌ Error truncating tables:", error);
      process.exit(1);
    } finally {
      // Ensure we close the connection
      await sql.end();
      process.exit(0);
    }
  } else {
    console.log("❌ Truncation canceled.");
    process.exit(0);
  }
}

// Run the script
main().catch((error) => {
  console.error("❌ Unhandled error:", error);
  process.exit(1);
});
