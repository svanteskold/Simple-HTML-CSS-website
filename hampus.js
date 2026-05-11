document.addEventListener('DOMContentLoaded', () => {
  
  const show = document.querySelector('.maskinshow');
  if (!show) return;
    const slides = Array.from(show.querySelectorAll('.projektBilder'));
    const prev = show.querySelector('.prev');
    const next = show.querySelector('.next');
    if (!slides.length) return;

    let i = slides.findIndex(s => s.classList.contains("active"))
    if (i < 0) i = 0;

    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));

    const go = (dir) => {
    slides[i].classList.remove('active');
    i = (i + dir + slides.length) % slides.length;
    slides[i].classList.add('active');
  };

  prev?.addEventListener('click', () => go(-1));
  next?.addEventListener('click', () => go(1));

  });



axios.get('hampus.json')
  .then(response => {
    const projects = response.data;
    const container = document.getElementById('projektruta');

    projects.forEach(project => {
      const card = document.createElement('div');
      card.classList.add('minaprojektkort');

      card.innerHTML = `
        <h2>${project['Projekt'] || ''}</h2>
        <h3>Beskrivning: ${(project['Beskrivning'] ?? project['Beskriving']) || ''}</h3>
        ${project['År'] ? `<small>År: ${project['År']}</small>` : ''}
        `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Fel vid hämtning av projekt:", error);
  });