// Filters the support guide index in the browser. No document search or network requests.
const input = document.querySelector('#topic-search');
if (input) {
  const cards = [...document.querySelectorAll('.topic-card')];
  const clear = document.querySelector('#clear-search');
  const status = document.querySelector('#search-status');
  const empty = document.querySelector('#no-results');
  const update = () => {
    const words = input.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    let visible = 0;
    for (const card of cards) {
      const text = `${card.textContent} ${card.dataset.keywords}`.toLocaleLowerCase();
      card.hidden = !words.every(word => text.includes(word));
      if (!card.hidden) visible++;
    }
    clear.hidden = !input.value;
    empty.hidden = visible !== 0;
    status.textContent = words.length ? `${visible} matching guide${visible === 1 ? '' : 's'}.` : `Browse all ${cards.length} guides below.`;
  };
  input.addEventListener('input', update);
  clear.addEventListener('click', () => { input.value = ''; update(); input.focus(); });
  input.addEventListener('keydown', event => { if (event.key === 'Escape') { input.value = ''; update(); } });
}
