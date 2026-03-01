const capitalizeFirstLetter = (type) => {
  const string = type.toLowerCase();
  const firstLetter = string[0].toUpperCase();
  return firstLetter.concat(string.slice(1));
};

export const servePage = async (c) => {
  const register = c.get("register");
  let type = c.req.param("type");
  if (type === undefined || type === "index") {
    type = "all";
  }
  const activeType = capitalizeFirstLetter(type);
  const pokemons = await register.getPokemonsOf(activeType);
  return c.render("index.eta", { activeType, pokemons });
};

export const serveSearchPokemon = async (c) => {
  const register = c.get("register");
  const string = c.req.query("pokemon");
  const pokemons = await register.fetchPokemonsByString(string);
  return c.render("index.eta", { activeType: "", pokemons });
};
