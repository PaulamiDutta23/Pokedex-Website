const fetchAllPokemon = () =>
  fetch("./data/pokemons.json").then((d) => d.json());

const capitalizeFirstLetter = (string) => {
  const type = string.toLowerCase();
  const firstLetter = type[0].toUpperCase();
  return firstLetter.concat(type.slice(1));
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
  element.append(...contents.map((c) => createFragments(c)));
  return element;
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

const createName = ({ pokeName }) => ["h2", {}, pokeName];

const createTypes = ({ types }) =>
  types.map((type) => ["div", { class: `type ${type.toLowerCase()}` }, type]);

const createRows = (
  { weight, base_experience, hp, attack, defense, speed },
) => {
  const stats = {
    "Weight": weight,
    "Base XP": base_experience,
    "HP": hp,
    "Attack": attack,
    "Defense": defense,
    "Speed": speed,
  };
  const statsContainer = [];
  for (const [key, value] of Object.entries(stats)) {
    statsContainer.push(["tr", {}, ["td", { class: "data" }, key], ["td", {
      class: "right-align",
    }, value ? value.toString() : "Unknown"]]);
  }
  return statsContainer;
};

const createPokemonCard = (pokemon) => {
  const img = ["div", { class: "img-container" }, createImg(pokemon)];
  const header = [
    "div",
    { class: "header" },
    createName(pokemon),
    ["div", { class: "types" }, ...createTypes(pokemon)],
  ];
  const stats = ["table", { class: "stats" }, ...createRows(pokemon)];
  return createFragments(["div", { class: "card" }, img, header, stats]);
};

const renderPage = (allPokemon, type, cardContainer) => {
  const currentType = type ? capitalizeFirstLetter(type) : "All";
  const pokemon = type
    ? allPokemon.filter((p) => p.types.includes(currentType))
    : allPokemon;
  cardContainer.append(...pokemon.map(createPokemonCard));
};

window.onload = async () => {
  const cardContainer = document.querySelector(".card-container");
  const allPokemon = await fetchAllPokemon();
  const type = window.location.pathname.split("/").pop();
  fetch(`/${type}`).then((res) => res.text()).then((_data) =>
    renderPage(allPokemon, type, cardContainer)
  );
};
