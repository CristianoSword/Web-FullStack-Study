function renderAchievementCard(props) {
  const card = document.createElement("article");
  card.className = "achievement-card";
  card.innerHTML = `<h2>${props.title}</h2><p>${props.description}</p>`;
  return card;
}

module.exports = { renderAchievementCard };
