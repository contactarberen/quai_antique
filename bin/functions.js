let jourReservationChoisi = '';
let dateChoisi = '';

let choixDate = document.querySelector('.date_choice');
let heureMidi = document.querySelector('.horaireMidi');
let heureSoir = document.querySelector('.horaireSoir');
let heureFerme = document.querySelector('.horaireFerme');
let heureInput = document.querySelector('.heure-input');
let nbCouvertRestant = document.querySelector('.nbCouvertRestant');
let form = document.querySelector('form');
let btnReserver = document.querySelector('.reserver');
let menuUser = document.querySelectorAll('.menu_items');
let menuAdmin = document.querySelectorAll('.menu_admin');
// QA-69
let nomReservation = document.querySelector('.nomReservation');
let nbCouvert = document.querySelector('.nbCouvert');
let allergie = document.querySelector('.allergie');

let horaire_premier = ['','']; // [midi,soir]
let horaire_deuxieme = ['',''];
let horaire_avant_dernier = ['',''];
let horaire_dernier = ['',''];

function getHoursFromTableHoraire(jour) {
    // trouver la table dans le HTML
    var table = document.querySelector('.tableHoraire.table');

    // trouver toutes les lignes (balises tr) de la table
    var rows = table.querySelectorAll('tr');

    // initialiser un tableau pour stocker les données de la table
    var data = [];
    // tableau avec les horaires par rapport au jour choisi
    var resultat = [];

    // parcourir chaque ligne de la table
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var rowData = [];

        // trouver toutes les colonnes (balises td) de la ligne
        var cols = row.querySelectorAll('td');

        // parcourir chaque colonne de la ligne
        for (var j = 0; j < cols.length; j++) {
            var col = cols[j];
            // completer la colonne 0 vide par le jour de la semaine dans la ligne précédente
            if (j == 0 && col.innerText =='') {
                col.innerText = data[i-1][0];
            }
            // ajouter le texte de la colonne au tableau de données
            rowData.push(col.textContent.trim());
        }

        // ajouter la ligne au tableau de données
        data.push(rowData);
        if (rowData[0] == jour) {
            resultat.push(rowData)
        }
    }
    return resultat;
}

// paramètres: tabJour *** rang=0:midi (ou soir dans le cas d'une seule plage);1:soir 
//             *** datechoisie
function getHeureOuvertureTab(tabJour,rang, date) {
    d = date.toISOString().slice(0, 10);
    
    const heureFin = new Date(`${d}T${tabJour[rang][2]}Z`);
    const heureDeb = new Date(`${d}T${tabJour[rang][1]}Z`);
        
    const differenceFuseauHoraire = heureDeb.getTimezoneOffset(); 
    const heureDeb2 = new Date(heureDeb.getTime() + (differenceFuseauHoraire * 60 * 1000));
    
    // calcul de la difference entre l'ouverture et fermeture
    const differenceEnMillisecondes = Math.abs(heureFin - heureDeb); 
    const differenceEnMinutes = Math.floor(differenceEnMillisecondes / 60000); 
    const nbHeure = (differenceEnMinutes - 60)/15;
    
    return [heureDeb2,nbHeure];
}
// paramètres: Jour et date choisis
function affichageHeures(jour, date) {
    let plagesHoraires = getHoursFromTableHoraire(jour);
    
    // ouvert à midi et le soir
    if (plagesHoraires.length == 2) {
        const tabHeureMidi = getHeureOuvertureTab(plagesHoraires,0, date)
        buttonCreation('midi', tabHeureMidi);
        const tabHeureSoir = getHeureOuvertureTab(plagesHoraires,1, date);
        buttonCreation('soir', tabHeureSoir );
    } else if (plagesHoraires[0][1] == 'Fermé') {
        heureFerme.innerHTML = '<p>Nous sommes fermés, veuillez choisir une autre date.</p>';
    } else if (plagesHoraires[0][1] >= '17:00') {
        const tabHeureSoir = getHeureOuvertureTab(plagesHoraires,0, date);
        buttonCreation('soir', tabHeureSoir );
    } else {
        const tabHeureMidi = getHeureOuvertureTab(plagesHoraires,0, date)
        buttonCreation('midi', tabHeureMidi);
    }
}

// tabHeure[0] = heure de début de la tranche
// tabHeure[1] = nbre de boutton à créer
function buttonCreation(temps, tabHeure) {
    let br = document.createElement('br');
    heureMidi.append(br);
    let br2 = document.createElement('br');
    heureSoir.append(br2);
    let t = 0;

    for(let i=0; i<=tabHeure[1];i++ ) {
        let label = document.createElement('label');
        if (temps =='midi') {
            heureMidi.append(label);
            t = 0;
        } else {
            heureSoir.append(label);
            t = 1;
        }
        
        const heureLocale = tabHeure[0].toLocaleTimeString().slice(0, 5);
        let radioBtn = document.createElement('input');
        radioBtn.type = 'radio';
        radioBtn.name = 'option';
        radioBtn.value = heureLocale;
        label.append(radioBtn);
        let spanBtn = document.createElement('span');
        spanBtn.className = 'btnHeure';
        spanBtn.innerText = heureLocale;
        label.append(spanBtn);
        
        switch (i) {
            case(0):
                horaire_premier[t] = heureLocale;
                break;
            case(1):
                horaire_deuxieme[t] = heureLocale;
                break;
            case(tabHeure[1]-1):
                horaire_avant_dernier[t] = heureLocale;
                break;
            case(tabHeure[1]):
                horaire_dernier[t] = heureLocale;
                break;
        }
        tabHeure[0].setMinutes(tabHeure[0].getMinutes() + 15);
        radioBtn.addEventListener("click", callbackBtnToggle);
    }
}
// QA-71
function formatMinute(heure) {
    minuteF = heure.getMinutes();
    if (minuteF < 10) {
        minuteF = '0' + minuteF;
    }
    return minuteF;
}
// QA-71
function retourneTimeHourModified(x, heure) {    // Retourne l'heure x heures après si positif et x heures avant si négatif
    let date = new Date();
    date.setHours(heure.getHours());
    date.setMinutes(heure.getMinutes());
    date.setHours(date.getHours() + x);
    return `${date.getHours()}:${formatMinute(date)}`;
}
// QA-71
function retourneTimeMinModified(x, heure) {    // Retourne l'heure x minutes après si positif et x minutes avant si négatif
    let date = new Date();
    date.setHours(heure.getHours());
    date.setMinutes(heure.getMinutes());
    date.setMinutes(date.getMinutes() + x);
    return `${date.getHours()}:${formatMinute(date)}`;
}

const callbackBtnToggle = (event) => {
    let initElem = event.target;
    let heure = new Date();
    let startTime;
    let endTime;
    heure.setHours(initElem.value.slice(0, 2));
    heure.setMinutes(initElem.value.slice(3, 5));
    
    let heureF = heure.getHours();
    let minuteF = formatMinute(heure);
    
    t = (heureF > 17) ? 1 : 0;

    heureInput.value = `${heureF}:${minuteF}`;
    // QA-71
    switch (heureInput.value) {
        case(horaire_premier[t]):
            startTime = heureInput.value;
            endTime = retourneTimeHourModified(1, heure) // 1 heure après
            break;
        case(horaire_deuxieme[t]):
            startTime = retourneTimeMinModified(-15, heure);// 15 minutes avant
            endTime = retourneTimeMinModified(45, heure); // 45 minutes après
            break;
        case(horaire_avant_dernier[t]):
            startTime = retourneTimeMinModified(-45, heure);// 45 minutes avant
            endTime = retourneTimeMinModified(15, heure); // 15 minutes après
            break;
        case(horaire_dernier[t]):
            startTime = retourneTimeHourModified(-1, heure) // 1 heure avant
            endTime = heureInput.value;
            break;
        default:
            startTime = retourneTimeMinModified(-30, heure);// 30 minutes avant
            endTime = retourneTimeMinModified(30, heure); // 30 minutes après
    }
        
    // requête ajax
    let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                var response = JSON.parse(this.responseText);
                // Traitement de la réponse
                nbCouvertRestant.innerText = response;
            }
        };
        // QA-71
        xhr.open('GET', `/reservation/getdata/${dateChoisi}/${startTime}/${endTime}`, true);
        xhr.send();
}

function buttonErase() {
    while (heureMidi.firstElementChild) {
        heureMidi.removeChild(heureMidi.firstElementChild);
      }
    while (heureSoir.firstElementChild) {
        heureSoir.removeChild(heureSoir.firstElementChild);
    }
    heureFerme.innerHTML = '';
}

if (choixDate !== null) {
    choixDate.addEventListener("change", function(event){
        const date = new Date(event.target.value);
        const joursSemaine = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        const jour = joursSemaine[date.getDay()]; // récupération du jour de la semaine correspondant à la date
        // QA-63
        const currentDate = new Date();
        
        // QA-63
        if (date < currentDate) {
            alert('Veuillez choisir une date convenable (supérieure à la date du jour).');
            event.target.value = '';
        } else {
            jourReservationChoisi = jour; // affichage du jour de la semaine 
            dateChoisi = date.toISOString().slice(0, 10);
            buttonErase();
            // Affichage des heures possibles suivant le choix de l'utilisateur
            affichageHeures(jourReservationChoisi, date);
        }
        
    });
}

if (form !== null) {
    form.addEventListener('submit', (event => {
        heureInput.disabled = false;
        event.preventDefault();
        // QA-70 - QA-69
        if ((nbCouvertRestant.innerText != 0) && (nbCouvert.value !== "") && (+nbCouvert.value > +nbCouvertRestant.innerText)) {
            alert('Il n\'y a plus de place pour le créneau choisi. Veuillez sélectionner une autre heure.');
        } else if ((nbCouvertRestant.innerText != 0) && (nomReservation.value !== "") 
                && (nbCouvert.value !== "") && (allergie.value !== "")) {
            alert(`Réservation enregistrée pour le ${dateChoisi} à ${heureInput.value}. Merci de votre confiance !`);
            form.submit();
        }
    }))
}

menuUser.forEach(function(item) {
    item.addEventListener('click', function() {
        menuUser.forEach(function(item) {
        item.classList.remove('active');
        console.log(item.innerText,item.classList);
      });
     this.classList.add('active');
      console.log(item.innerText,item.classList);
    });
});

menuAdmin.forEach(function(item) {
    item.addEventListener('click', function() {
        menuAdmin.forEach(function(item) {
        item.classList.remove('active');
        console.log(item.innerText,item.classList);
      });
      this.classList.add('active');
      console.log(item.innerText,item.classList);
    });
});