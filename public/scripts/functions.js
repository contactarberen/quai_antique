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

function formatMinute(heure) {
    minuteF = heure.getMinutes();
    if (minuteF < 10) {
        minuteF = '0' + minuteF;
    }
    return minuteF;
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
    console.log('ultime controle',heureInput.value,horaire_premier);
    switch (heureInput.value) {
        case(horaire_premier[t]):
            let uneHeureApres = new Date();
            uneHeureApres.setHours(heure.getHours());
            uneHeureApres.setMinutes(heure.getMinutes());
            uneHeureApres.setHours(uneHeureApres.getHours() + 1);
            let uneHeureApres2 = `${uneHeureApres.getHours()}:${formatMinute(uneHeureApres)}`;
            startTime = heureInput.value;
            endTime = uneHeureApres2;
            console.log('startTime',startTime);
            console.log('endTime',endTime);
            break;
        case(horaire_deuxieme[t]):
            let quinzeMinAvant = new Date();
            quinzeMinAvant.setHours(heure.getHours());
            quinzeMinAvant.setMinutes(heure.getMinutes());
            quinzeMinAvant.setMinutes(quinzeMinAvant.getMinutes() - 15);
            let quinzeMinAvant2 = `${quinzeMinAvant.getHours()}:${formatMinute(quinzeMinAvant)}`;
            let t45minApres = new Date();
            t45minApres.setHours(heure.getHours());
            t45minApres.setMinutes(heure.getMinutes());
            t45minApres.setMinutes(t45minApres.getMinutes() + 45);
            let t45minApres2 = `${t45minApres.getHours()}:${formatMinute(t45minApres)}`;
            startTime = quinzeMinAvant2;
            endTime = t45minApres2;
            console.log('startTime',startTime);
            console.log('endTime',endTime);
            break;
        case(horaire_avant_dernier[t]):
            let t45minAvant = new Date();
            t45minAvant.setHours(heure.getHours());
            t45minAvant.setMinutes(heure.getMinutes());
            t45minAvant.setMinutes(t45minAvant.getMinutes() - 45);
            let t45minAvant2 = `${t45minAvant.getHours()}:${formatMinute(t45minAvant)}`;
            let quinzeMinApres = new Date();
            quinzeMinApres.setHours(heure.getHours());
            quinzeMinApres.setMinutes(heure.getMinutes());
            quinzeMinApres.setMinutes(quinzeMinApres.getMinutes() + 15);
            let quinzeMinApres2 = `${quinzeMinApres.getHours()}:${formatMinute(quinzeMinApres)}`;
            startTime = t45minAvant2;
            endTime = quinzeMinApres2;
            console.log('startTime',startTime);
            console.log('endTime',endTime);
            break;
        case(horaire_dernier[t]):
            let uneHeureAvant = new Date();
            uneHeureAvant.setHours(heure.getHours());
            uneHeureAvant.setMinutes(heure.getMinutes());
            uneHeureAvant.setHours(uneHeureAvant.getHours() - 1);
            let uneHeureAvant2 = `${uneHeureAvant.getHours()}:${formatMinute(uneHeureAvant)}`;
            startTime = uneHeureAvant2;
            endTime = heureInput.value;
            console.log('startTime',startTime);
            console.log('endTime',endTime);
            break;
        default:
            let t30minAvant = new Date();
            t30minAvant.setHours(heure.getHours());
            t30minAvant.setMinutes(heure.getMinutes());
            t30minAvant.setMinutes(t30minAvant.getMinutes() - 30);
            let t30minAvant2 = `${t30minAvant.getHours()}:${formatMinute(t30minAvant)}`;
            let t30MinApres = new Date();
            t30MinApres.setHours(heure.getHours());
            t30MinApres.setMinutes(heure.getMinutes());
            t30MinApres.setMinutes(t30MinApres.getMinutes() + 30);
            let t30MinApres2 = `${t30MinApres.getHours()}:${formatMinute(t30MinApres)}`;
            startTime = t30minAvant2;
            endTime = t30MinApres2;
            console.log('startTime',startTime);
            console.log('endTime',endTime);
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