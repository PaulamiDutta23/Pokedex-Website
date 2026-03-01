import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/deno";
import { servePage } from "./handlers.js";

export const createApp = ({ eta, pokedex }) => {
  const app = new Hono();
  app.use(logger());
  app.use((c, next) => {
    c.set("register", pokedex);
    return next();
  });
  app.use((c, next) => {
    c.setRenderer((path, data) => {
      const content = eta.render(path, data);
      return c.html(content);
    });
    return next();
  });
  app.get("/", servePage);
  app.get("/index.html", servePage);
  app.get("*", serveStatic({ root: "public" }));
  return app;
};
