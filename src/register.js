export default class Pokedex {
  #content;
  constructor() {
    this.#content = Deno.readTextFile("./data/pokemons.json")
      .then((content) => JSON.parse(content))
      .catch((e) => {
        console.log(e.message);
        return [];
      });
  }

  async fetchAll() {
    return structuredClone(await this.#content);
  }

  async getPokemonsOf(type) {
    return await this.#content.filter(p => p.types.includes(type));
  }
}
