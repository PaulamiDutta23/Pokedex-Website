const capitalizeFirstLetter = (type) => {
  const string = type.toLowerCase();
  const firstLetter = string[0].toUpperCase();
  return firstLetter.concat(string.slice(1));
};

export const servePage = async (c) => {
  const register = c.get("register");
  let type = c.req.param("type");
  console.log(type);
  if (type === undefined || type === "index") {
    type = "all";
  }
  const activeType = capitalizeFirstLetter(type);
  console.log(activeType, c.req.path);
  return c.render("index.eta", {
    activeType,
    pokemons: await register.getPokemonsOf(activeType),
  });
};
