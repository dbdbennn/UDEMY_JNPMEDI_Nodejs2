import {
  MongoClient,
  Database,
} from "https://deno.land/x/mongo@v0.31.0/mod.ts";

let db: Database | null = null; // 데이터베이스 클라이언트 객체를 저장할 변수

export async function connect() {
  const URI =
    "mongodb+srv://root:1234@atlascluster.or9umnt.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(URI);

  await client.connect();
  db = client.database("your-database-name"); // 여기서 'your-database-name'은 연결할 데이터베이스의 이름입니다.
}

export function getDb(): Database {
  if (!db) {
    throw new Error("Database not connected. Call connect() first.");
  }
  return db;
}
