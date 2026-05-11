let slideNummer = 1;
showSlides(slideNummer);

function plusSlides(n) {
    showSlides(slideNummer += n);
}

function currentSlide(n) {
    showSlides(slideNummer = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("bildspelBilder");
    if (n > slides.length) { slideNummer = 1; }
    if (n < 1) { slideNummer = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideNummer - 1].style.display = "block";
}


axios.get('svante.json')
  .then(response => {
    const projects = response.data;
    const container = document.getElementById('projekt-container');

    projects.forEach(project => {
      const card = document.createElement('div');
      card.classList.add('projekt-kort');

      card.innerHTML = `
        <h2>${project.titel}</h2>
        <h3>Kund: ${project.kund}</h3>
        <p>${project.beskrivning}</p>
        <small>${project.mer_info}</small>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Fel vid hämtning av projekt:", error);
  });