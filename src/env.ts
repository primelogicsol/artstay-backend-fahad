import { cleanEnv, str, port, json } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: port({ default: 3001 }),
  NODE_ENV: str({
    choices: ["development", "test", "production"],
    default: "development",
  }),
  DATABASE_URL: str(),
  JWT_SECRET: str(),
  COOKIE_SECRET: str(),
  ALLOWED_ORIGINS: json({
    desc: "Array of allowed origins for CORS",
    default: '["http://localhost:5010"]',
  }),
  STRIPE_WEBHOOK: str(),
  STRIPE_CLIENT: str(),
  STRIPE_SECRET: str(),
  STRIPE_URL:str()
});
