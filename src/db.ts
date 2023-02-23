import { DataSource } from "typeorm";
import { User } from "./entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "dev",
  password: "root123",
  port: 5432,
  database: "typeormdb",
  entities: [User],
  logging: true,
  synchronize: true,
});
