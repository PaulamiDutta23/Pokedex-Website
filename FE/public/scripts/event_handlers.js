const fetchAllPokemon = () =>
  fetch("./data/pokemons.json").then((data) => data.json());

const capitalizeFirstLetter = (string) => {
  const type = string.toLowerCase();
  const firstLetter = type[0].toUpperCase();
  return firstLetter.concat(type.slice(1));
};

const setBgStyle = ({ types }) => {
  const gradinets = types.map((t) => `hsl(var(--${t.toLowerCase()}) / 50%)`)
    .join(",");
  return `background: linear-gradient(135deg,${gradinets} , transparent 85%);`;
};

const createImg = ({ pokeName, id }) => [
  "img",
  {
    src:
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
    alt: `This is an image of ${pokeName}`,
  },
  "",
];

const createTypes = ({ types }) =>
  types.map((type) => ["div", { class: `type ${type.toLowerCase()}` }, type]);

const createRows = ({ weight, base_xp, hp, attack, defense, speed }) => {
  const stats = {
    "Weight": weight,
    "Base XP": base_xp,
    "HP": hp,
    "Attack": attack,
    "Defense": defense,
    "Speed": speed,
  };

  return Object.entries(stats).map((
    [key, value],
  ) => ["tr", {}, ["td", { class: "data" }, key], ["td", {
    class: "right-align",
  }, value ? value.toString() : "Unknown"]]);
};

const createFragments = ([tag, attrs, ...contents]) => {
  const element = document.createElement(tag);
  for (const [key, value] of Object.entries(attrs)) {
    element.setAttribute(key, value);
  }
  if (contents.length === 1 && typeof contents[0] === "string") {
    element.textContent = contents;
    return element;
  }
  element.append(...contents.map((content) => createFragments(content)));
  return element;
};

const createPokemonCard = (pokemon) => {
  const img = ["div", {
    class: "img-container",
    style: `${setBgStyle(pokemon)}`,
  }, createImg(pokemon)];
  const header = [
    "div",
    { class: "header" },
    ["h2", {}, pokemon.pokeName],
    ["div", { class: "types" }, ...createTypes(pokemon)],
  ];
  const stats = ["table", { class: "stats" }, ...createRows(pokemon)];
  return createFragments(["div", { class: "card" }, img, header, stats]);
};

const getParam = () => {
  const type = window.location.pathname.split("/").pop();
  return type === "all" ? "" : type;
};

const createItem = (type, currentType, param) =>
  type === currentType
    ? createFragments(["li", { class: `${type.toLowerCase()}` }, ["a", {
      href: `/${param}`,
      style: `color:white`,
    }, type]])
    : createFragments(["li", {}, ["a", {
      href: `/${type === "All" ? "" : type.toLowerCase()}`,
    }, type]]);

const getPokemonOnSearch = (allPokemon) => {
  const searchStr = new URLSearchParams(window.location.search).get("pokemon");
  return allPokemon
    .filter((p) => p.pokeName.toLowerCase().includes(searchStr.toLowerCase()));
};

const getPokemonOnType = (allPokemon, type, currentType) =>
  type ? allPokemon.filter((p) => p.types.includes(currentType)) : allPokemon;

const renderPage = (cardContainer, sidebarList, allPokemon, types) => {
  const param = getParam();
  const type = param ? capitalizeFirstLetter(param) : "All";
  sidebarList.append(...types.map((t) => createItem(t, type, param)));
  const filteredPokemon = param === "search"
    ? getPokemonOnSearch(allPokemon)
    : getPokemonOnType(allPokemon, param, type);
  return cardContainer.append(...filteredPokemon.map(createPokemonCard));
};

window.onload = async () => {
  const cardContainer = document.querySelector(".card-container");
  const sidebarList = document.querySelector(".sidebar-contents");
  const types = [
    "All",
    "Bug",
    "Dark",
    "Dragon",
    "Electric",
    "Fairy",
    "Fighting",
    "Fire",
    "Flying",
    "Ghost",
    "Grass",
    "Ground",
    "Ice",
    "Normal",
    "Poison",
    "Psychic",
    "Rock",
    "Steel",
    "Water",
  ];
  const allPokemon = await fetchAllPokemon();

  fetch(window.location.pathname)
    .then(() => renderPage(cardContainer, sidebarList, allPokemon, types));
};
