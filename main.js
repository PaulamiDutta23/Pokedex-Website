import {createApp} from "./src/app.js";
import Pokedex from "./src/register.js";
import {Eta} from "eta";

const main = () => {
  const eta = new Eta({views : "public/templates"});
  const pokedex = new Pokedex();
  const app = createApp({eta, pokedex});
  Deno.serve({port:8001}, app.fetch);
};

main();