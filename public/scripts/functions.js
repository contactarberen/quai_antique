let jourReservationChoisi = '';

let choixDate = document.querySelector('.date_choice');
let heureMidi = document.querySelector('.horaireMidi');
let heureSoir = document.querySelector('.horaireSoir');
let heureFerme = document.querySelector('.horaireFerme');
let heureInput = document.querySelector('.heure-input');
let form = document.querySelector('form');
let submitButton = document.querySelector('.sinscrire');

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
        heureFerme.innerHTML = '<p>Nous sommes fermés, veuillez svp choisir une autre date.</p>';
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

    for(let i=0; i<=tabHeure[1];i++ ) {
        let label = document.createElement('label');
        if (temps =='midi') {
            heureMidi.append(label);
        } else {
            heureSoir.append(label);
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
        
        tabHeure[0].setMinutes(tabHeure[0].getMinutes() + 15);
        radioBtn.addEventListener("click", callbackBtnToggle);
    }
}

const callbackBtnToggle = (event) => {
    var initElem = event.target;
    
    heure = new Date();
    heure.setHours(initElem.value.slice(0, 2));
    heure.setMinutes(initElem.value.slice(3, 5));
    
    heureF = heure.getHours();
    minuteF = heure.getMinutes();
    // Si les minutes sont inférieures à 10, ajoutez un zéro devant pour les formater correctement
    if (minuteF < 10) {
        minuteF = '0' + minuteF;
    }

    heureInput.value = `${heureF}:${minuteF}`;
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

choixDate.addEventListener("change", function(event){
    const date = new Date(event.target.value);
    const joursSemaine = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    const jour = joursSemaine[date.getDay()]; // récupération du jour de la semaine correspondant à la date
    jourReservationChoisi = jour; // affichage du jour de la semaine 

    buttonErase();
    // Affichage des heures possibles suivant le choix de l'utilisateur
    affichageHeures(jourReservationChoisi, date);
});

form.addEventListener('submit', (event => {
    heureInput.disabled = false;    
  }))
