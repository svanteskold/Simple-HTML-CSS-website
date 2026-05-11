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
    let slides = document.getElementsByClassName("bildSpel");
    if (n > slides.length) { slideNummer = 1; }
    if (n < 1) { slideNummer = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideNummer - 1].style.display = "block";
}

let projekt = [];
let filtreradLista = [];

axios.get("joel.json")
    .then(response => {
        projekt = response.data;
        filtreradLista = [...projekt];
        renderLista();
    })
    .catch(error => console.error("Fel vid hämtning:", error));

function renderLista() {
    const ul = document.getElementById("projektLista");
    ul.innerHTML = "";

    filtreradLista.forEach(p => {
        const li = document.createElement("li");
        li.textContent = `${p.namn} – ${p.beskrivning} (${p.kategori})`;
        li.style.cursor = "pointer";

        li.addEventListener("click", () => {
            const target = document.getElementById(p.id);
            if (target) {
                target.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        });

        ul.appendChild(li);
    });
}

document.getElementById("filterInput").addEventListener("input", (e) => {
    const filterText = e.target.value.toLowerCase();
    filtreradLista = projekt.filter(p => p.namn.toLowerCase().includes(filterText));
    renderLista();
});

document.getElementById("sortAZ").addEventListener("click", () => {
    filtreradLista.sort((a, b) => a.namn.localeCompare(b.namn));
    renderLista();
});

document.getElementById("sortZA").addEventListener("click", () => {
    filtreradLista.sort((a, b) => b.namn.localeCompare(a.namn));
    renderLista();
});


function initieraFlashAnimation() {
    const flashVariabel = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                entry.target.classList.add('flash-animation');
                setTimeout(() => {
                    entry.target.classList.remove('flash-animation');
                }, 600);
            }
        });
    }, {
        threshold: 0.3
    });


    const allaProjektBilder = document.querySelectorAll('.projekt img');

    allaProjektBilder.forEach(bild => {

        flashVariabel.observe(bild);
    });
}

window.addEventListener('load', initieraFlashAnimation);
