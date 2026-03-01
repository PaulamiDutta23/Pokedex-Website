export const servePage = async (c) => {
  const register = c.get("register");
  console.log(await register.fetchAll());
  return c.render("index.eta", {});
};