//Hämtar idn
const projektJSON = document.getElementById('projektJSON')

//Skapar en tom projektlista
let projektlista = [];

//Hämtar json filen med hjälp av axios och lagrar det i projektlista, samt visar listan med hjälp av visaLista();
//Catchar även om det blir något fel i hämtningen
axios.get('adam.json').then(svar => {
    projektlista = svar.data;
    visaLista(projektlista);
})
    .catch(error => {
        console.error('Kunde inte hämta projekten', error);
    });


function visaLista(lista) {
    projektJSON.innerHTML = '<h1>PROJEKT</h1>';
    lista.forEach(projekt => {
        const ettprojekt = document.createElement('div');
        ettprojekt.classList.add('projekt')

        ettprojekt.innerHTML =
            `
    <h2>${projekt.Projekt}</h2>
    <p><b>Beskrivning: </b>${projekt.Beskrivning}</p>
    <p><b>Datum: </b>${projekt.Datum}</p>
    <p><b>Längd: </b>${projekt.Längd} dagar</p>
    `;

        projektJSON.appendChild(ettprojekt);
    });
}

const sorteraLangdKnapp = document.getElementById('sorteraLangd')
let lågHögLangd = true;

sorteraLangdKnapp.addEventListener('click', () => {
    let langdSortering;

    if (lågHögLangd) {
        // Sortera stigande
        langdSortering = [...projektlista].sort((a, b) => {
            return parseInt(a.Längd) - parseInt(b.Längd);
        });
        sorteraLangdKnapp.textContent = 'Sortera längd fallande';
    } else {
        // Sortera fallande
        langdSortering = [...projektlista].sort((a, b) => {
            return parseInt(b.Längd) - parseInt(a.Längd);
        });
        sorteraLangdKnapp.textContent = 'Sortera längd stigande';
    }

    visaLista(langdSortering);

    // Byt riktning till nästa klick
    lågHögLangd = !lågHögLangd;
});


const sorteraDatumKnapp = document.getElementById('sorteraDatum')
let lågHögDatum = true;

sorteraDatumKnapp.addEventListener('click', () => {
    let datumSortering;

    if (lågHögDatum) {
        // Sortera stigande (äldst först)
        datumSortering = [...projektlista].sort((a, b) => {
            return new Date(a.Datum) - new Date(b.Datum);
        });
        sorteraDatumKnapp.textContent = 'Sortera datum fallande';
    } else {
        // Sortera fallande (nyast först)
        datumSortering = [...projektlista].sort((a, b) => {
            return new Date(b.Datum) - new Date(a.Datum);
        });
        sorteraDatumKnapp.textContent = 'Sortera datum stigande';
    }

    visaLista(datumSortering);

    // Byt riktning till nästa klick
    lågHögDatum = !lågHögDatum;
});


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
    let slides = document.getElementsByClassName("adamBilder");
    if (n > slides.length) { slideNummer = 1; }
    if (n < 1) { slideNummer = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideNummer - 1].style.display = "block";
}


//Animation för förstoring av första bilden i slideshow när den kommer in i viewporten
const förstaSlide = document.querySelector(".adamBilder:first-child img");

function kollaScroll() {
    const bildPosition = förstaSlide.getBoundingClientRect();
    const viewportHöjd = window.innerHeight || document.documentElement.clientHeight;

    if (bildPosition.top < viewportHöjd && bildPosition.bottom > 0) {
        förstaSlide.classList.add("synligBild");
    } else {
        förstaSlide.classList.remove("synligBild");
    }
}

window.addEventListener("scroll", kollaScroll);
window.addEventListener("resize", kollaScroll);

kollaScroll();