export default class Pokedex {
  #content;
  constructor() {
    this.#content = Deno.readTextFile("./FE/public/data/pokemons.json")
      .then((content) => JSON.parse(content))
      .catch((e) => {
        console.log(e.message);
        return [];
      });
  }

  async getPokemonsOf(type) {
    const pokemons = await this.#content;
    if (type === "All") {
      return structuredClone(pokemons);
    }
    return pokemons.filter((p) => p.types.includes(type));
  }

  async fetchPokemonsByString(string) {
    const pokemons = await this.#content;
    const searchStr = string.toLowerCase();
    return pokemons.filter(p => p.pokeName.toLowerCase().startsWith(searchStr));
  }
}
