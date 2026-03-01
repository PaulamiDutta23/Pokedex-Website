export const servePage = async (c) => {
  const register = c.get("register");
  console.log(c.req.path);
  return c.render("index.eta", {activePage: c.req.path, pokemons: await register.fetchAll()});
};