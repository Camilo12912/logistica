import dotenv from "dotenv";

dotenv.config();

export const variables = {
    EXPRESS_PORT: process.env.EXPRESS_PORT || 3000,
    EXPRESS_HOST: process.env.EXPRESS_HOST || "localhost",
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: "tu_secreto_super_seguro"
};
