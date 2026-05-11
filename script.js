const menuButton = document.getElementById('menyKnapp');
const menu = document.getElementById('mobilmeny');

menuButton.addEventListener('click', () => {
    menu.classList.toggle('visa');
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
    let slides = document.getElementsByClassName("maskinBilder");
    if (n > slides.length) { slideNummer = 1; }
    if (n < 1) { slideNummer = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideNummer - 1].style.display = "block";
}

//Deklarerar alla const genom att hämta alla idn som behövs för valideringen av formuläret
const formular = document.getElementById("kontaktFormular");
const knapp = document.getElementById("Skickaknapp");
const fornamn = document.getElementById("fornamn");
const efternamn = document.getElementById("efternamn");
const epost = document.getElementById("epost");
const telefon = document.getElementById("telefon");
const meddelande = document.getElementById("meddelande");

//Individuell validering per input/textarea baserat på olika krav, t.ex att fält inte får vara tomma,
//måste innehålla vissa tecken eller vara en viss längd
//Kallar på eller tar bort en "error" classList som hanterar en röd border color
function valideraFornamn() {
    if (fornamn.value.trim() === "") {
        fornamn.classList.add("error");
        return false;
    } else {
        fornamn.classList.remove("error");
        return true;
    }
}
function valideraEfternamn() {
    if (efternamn.value.trim() === "") {
        efternamn.classList.add("error");
        return false;
    } else {
        efternamn.classList.remove("error");
        return true;
    }
}

function valideraEpost() {
    if (epost.value.trim() === "" || !epost.value.includes("@") || !epost.value.includes(".")) {
        epost.classList.add("error");
        return false;
    } else {
        epost.classList.remove("error");
        return true;
    }
}

function valideraTelefon() {
    if (!/^\d{10}$/.test(telefon.value.trim())) {
        telefon.classList.add("error");
        return false;
    } else {
        telefon.classList.remove("error");
        return true;
    }
}

function valideraMeddelande() {
    if (meddelande.value.trim().length < 10) {
        meddelande.classList.add("error");
        return false;
    } else {
        meddelande.classList.remove("error");
        return true;
    }
}

//Denna function kollar om fälten är antingen tomma eller har classListen "error" på sig
//och sätter knappen till disabled om "allaGiltiga" är false
function visaKnapp() {
    const allaGiltiga =
        fornamn.value.trim() !== "" && !fornamn.classList.contains("error") &&
        efternamn.value.trim() !== "" && !efternamn.classList.contains("error") &&
        epost.value.trim() !== "" && !epost.classList.contains("error") &&
        telefon.value.trim() !== "" && !telefon.classList.contains("error") &&
        meddelande.value.trim() !== "" && !meddelande.classList.contains("error");

    knapp.disabled = !allaGiltiga;
}

//Event listensers för varje fält som lyssnar på inputs i fälten
//Dessa kallar på varje individuell function och visaKnapp(); för att dynamiskt uppdatera färgen på ramen
//beroende på om kraven uppfylls eller inte
fornamn.addEventListener("input", () => {
    valideraFornamn();
    visaKnapp();
});

efternamn.addEventListener("input", () => {
    valideraEfternamn();
    visaKnapp();
});

epost.addEventListener("input", () => {
    valideraEpost();
    visaKnapp();
});

telefon.addEventListener("input", () => {
    valideraTelefon();
    visaKnapp();
});

meddelande.addEventListener("input", () => {
    valideraMeddelande();
    visaKnapp();
});


// En eventlistener som lyssnar på "submit" (skicka knappen)
// preventDefault stoppar standardbeteendet för formulär för att vi enbart ska simulera ett skick
// if satsen körs om alla returnerar valideringar returnerar "true" och då kommer det en alert och formuläret återställs
formular.addEventListener("submit", (skickaEvent) => {
    skickaEvent.preventDefault();

if (valideraFornamn() && valideraEfternamn() && valideraEpost() && valideraTelefon() && valideraMeddelande()) {
    alert("Formuläret skickades korrekt!")
    formular.reset();
}
});

