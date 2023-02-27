// No "use strict" or IIFE is needed, because webpack/babel do that for us!

function render(state, rootEl) {
  const { cats } = state; // Destructure cats property from state into new variable
  const html = generateCatCardsHtml(cats);
  rootEl.innerHTML = html;
}

function generateCatCardsHtml(cats) {
  const listHtml = Object.keys(cats).map( name => {
    return `
      <li class="card">
          ${generateCatCardHtml(cats[name])}
        </button>
      </li>
    `;
  }).join('');
  return `
    <ul class="cards">
      ${listHtml}
    </ul>
  `;
}

function generateCatCardHtml(cat) {
  const ageHtml = cat.age ? `<span class="card__age">Age: ${cat.age}</span>` : ``;
  const colorHtml = cat.color ? `<span class="card__color">Color: ${cat.color}</span>` : ``;
  const buttonHtml = cat.age ? '' : `<button class="card__load" data-name="${cat.name}">Load</button>`;
  const html = `
    <h2 class="card__name">${cat.name}</h2>
    ${ageHtml}
    ${colorHtml}
    ${buttonHtml}
  `;
  return html;
}

export default render;
