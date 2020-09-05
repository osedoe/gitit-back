import * as dotenv from "dotenv";

const env = dotenv.config();

db.createUser(
  {
    user: env.parsed.dbUsername,
    pwd: env.parsed.dbPassword,
    roles: [
      {
        role: "readWrite",
        db: env.parsed.dbName
      }
    ]
  }
)
