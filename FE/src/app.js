import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/deno";

export const createApp = () => {
  const app = new Hono();
  app.use(logger());
  app.get("/:type?", serveStatic({ root: "public", path: "index.html" }));
  app.get("*", serveStatic({ root: "public" }));
  return app;
};
