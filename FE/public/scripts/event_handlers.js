const capitalizeFirstLetter = (string) => {
  const type = string.toLowerCase();
  const firstLetter = type[0].toUpperCase();
  return firstLetter.concat(type.slice(1));
};

const renderPage = async (currentType, cardContainer) => {
  const type = capitalizeFirstLetter(currentType || "all");
  const data = await fetch("./data/pokemons.json").then((d) => d.json());
  const pokemons = currentType ? data.filter((p) => p.types.includes(type)) : data;
  const card = document.createElement("h2");
  card.append(`${pokemons[0].pokeName}`);
  cardContainer.append(card);
};

window.onload = () => {
  const cardContainer = document.querySelector(".card-container");
  const type = window.location.pathname.split("/").pop();
  fetch(`/${type}`).then((res) => res.text()).then((_data) =>
    renderPage(type, cardContainer)
  );
};
