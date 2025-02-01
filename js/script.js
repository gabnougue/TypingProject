const themes = {
    cuisine: ["cuisine", "recette", "plat", "ingrédient", "aliment", "nourriture", "repas", "déjeuner", "dîner", "boisson", "chef", "cuisinier", "pâtissier", "boulanger", "traiteur", "restaurant", "menu", "carte", "saveur", "goût", "odeur", "texture", "cuisson", "four", "poêle", "casserole", "marmite", "mixeur", "robot", "couteau", "fourchette", "cuillère", "assiette", "verre", "tasse", "serviette", "table", "chaise", "nappe", "pain", "riz", "pâtes", "viande", "poisson", "légume", "fruit", "herbe", "épice", "sel", "poivre", "sucre", "huile", "vinaigre", "eau", "lait", "vin", "bière", "fromage", "yaourt", "oeuf", "farine", "levure", "chocolat", "vanille", "café", "thé", "jus", "soupe", "salade", "gâteau", "tarte", "pizza", "burger", "sushi", "curry", "tajine", "paella", "couscous", "ragoût", "friture", "grillade", "vapeur", "bouilli", "rôti", "confit", "mariné", "fumé", "frais", "sec", "cuit", "cru"],
    fortnite: ["fortnite", "jeu", "multijoueur", "joueur", "victoire", "défaite", "saison", "chapitre", "tournoi", "stream", "youtubeur", "twitch", "esport", "île", "carte", "zones", "villes", "lieux", "bâtiments", "monuments", "paysages", "tempête", "bus", "armes", "fusils", "pompes", "pistolets", "mitraillettes", "assauts", "snipers", "roquettes", "grenades", "explosifs", "soin", "kits", "bandages", "boucliers", "potions", "armures", "véhicules", "voitures", "camions", "construire", "détruire", "tirer", "viser", "sauter", "courir", "accroupir", "ramper", "nager", "voler", "atterrir", "looter", "fouiller", "combattre", "survivre", "gagner", "perdre", "mourir", "réanimer", "collaborer", "skins", "personnages", "héros", "méchants", "émotes", "danses", "gestes", "accessoires", "cosmétiques", "tenues", "styles", "frag", "kill", "headshot", "noob", "pro", "bot", "lag", "ping", "stuff", "loot", "rush", "camper", "zone", "storm", "argent", "vbucks", "boutique", "pass", "niveau"],
    nature: ["nature", "environnement", "écologie", "biodiversité", "plante", "arbre", "fleur", "animal", "oiseau", "poisson", "insecte", "mammifère", "reptile", "amphibien", "montagne", "vallée", "colline", "plaine", "forêt", "prairie", "désert", "océan", "mer", "rivière", "lac", "cascade", "soleil", "lune", "étoile", "ciel", "nuage", "pluie", "neige", "vent", "température", "climat", "saison", "printemps", "été", "automne", "hiver", "terre", "sol", "roche", "minéral", "eau", "air", "feu", "écosystème", "habitat", "espèce", "population", "évolution", "adaptation", "survie", "protection", "conservation", "ressources", "énergie", "pollution", "déforestation", "changement climatique", "ozone", "oxygène", "photosynthèse", "chlorophylle", "racine", "tige", "feuille", "fruit", "graine", "sève", "bois", "marais", "savane", "toundra", "jungle"],
    technologie: ["technologie", "innovation", "numérique", "digital", "ordinateur", "portable", "smartphone", "tablette", "internet", "réseau", "logiciel", "application", "programme", "code", "données", "information", "communication", "téléphone", "télévision", "radio", "caméra", "musique", "vidéo", "jeu", "robotique", "drones", "capteur", "automatisme", "électronique", "électrique", "énergie", "science", "recherche", "développement", "ingénierie", "industrie", "production", "consommation", "futur", "progrès", "invention", "découverte", "processeur", "mémoire", "stockage", "écran", "clavier", "souris", "imprimante", "scanner", "connexion", "wifi", "bluetooth", "ethernet", "navigateur", "moteur", "email", "messagerie", "plateforme", "contenu"],
    voyage: ["voyage", "vacances", "tourisme", "destination", "hôtel", "avion", "train", "voiture", "bateau", "bus", "aéroport", "gare", "port", "route", "carte", "globe", "pays", "ville", "village", "région", "continent", "océan", "mer", "montagne", "plage", "forêt", "désert", "culture", "tradition", "langue", "cuisine", "art", "histoire", "monument", "musée", "hébergement", "transport", "itinéraire", "excursion", "aventure", "découverte", "exploration", "touriste", "voyageur", "guide", "restauration", "divertissement", "shopping", "souvenir", "photographie", "vidéo", "blog", "récit", "carnet", "budget", "organiser", "réserver", "planifier", "préparer", "partir", "arriver", "explorer", "découvrir", "apprendre", "rencontrer", "partager", "profiter", "détente"]
};
/* Main elements */
const gameArea = document.getElementById('game-area');
const wordInput = document.getElementById('word-input');
const scoreDisplay = document.getElementById('score');
/* Sounds */
const correctSound = document.getElementById('correct-sound');
const gameOverSound = document.getElementById('game-over-sound');
const wrongSound = document.getElementById('wrong-sound');
const recordSound = document.getElementById('record-sound');
/* Settings */
const difficulty = document.getElementById('difficulty');
const theme = document.getElementById('theme');
const replayButton = document.getElementById('replay-button');
/* Pop up */
const saveScore = document.getElementById('save-score');
const saveScorePopup = document.getElementById('save-score-popup');
const playerNameInput = document.getElementById('player-name');
const saveScoreBtn = document.getElementById('save-score-btn');
const cancelSaveScore = document.getElementById('cancel-save-score');
/* Leaderboard */
const leaderboardList = document.getElementById('leaderboard-list');
const leaderboardTitle = document.getElementById('leaderboard-title');
const resetLeaderboard = document.getElementById('reset-leaderboard');

let endMessage = document.getElementById('end-message');
let recordMessage = document.getElementById('record-message');

/* Game variables */
let activeWords = [];
let gameRunning = true;
let score = 0;
let anim_duration = 7;
const difficultyValues = {9 : 'Débutant', 7: 'Amateur', 5: 'Confirmé', 3: 'Expert', 2: 'Maître'};
let wrongSoundPlayed = false;
let recordSoundPlayed = false;
let interval;
let theme_name = 'technologie';
let isComposing = false;

function updateScore() {
    scoreDisplay.textContent = `Score : ${score}`;
}

function updateSettings() {
    anim_duration = difficulty.value;
}

function updateTheme() {
    theme_name = theme.value;
    words = themes[theme_name];
}

let leaderboard = JSON.parse(localStorage.getItem(`leaderboard_${anim_duration}`)) || [];

saveScore.addEventListener('click', () => {
    saveScorePopup.style.display = 'flex';
    /* Focus sur l'input */
    playerNameInput.focus();
});

cancelSaveScore.addEventListener('click', () => {
    saveScorePopup.style.display = 'none';
});

saveScoreBtn.addEventListener('click', () => {
    const playerName = playerNameInput.value.trim();

    if (!playerName) {
        alert('Veuillez entrer un nom.');
        return;
    }

    leaderboard.push({
        playerName: playerName,
        score: score
    });

    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10);


    localStorage.setItem(`leaderboard_${anim_duration}`, JSON.stringify(leaderboard));

    saveScorePopup.style.display = 'none';
    playerNameInput.value = '';

    saveScore.classList.remove('show');

    loadLeaderboard();
});

function loadLeaderboard() {
    leaderboardTitle.innerHTML = `Classement <span style="font-size: 0.7em; font-weight: normal;">(${difficultyValues[anim_duration]})</span>`;
    leaderboardList.innerHTML = ''; 
    leaderboard.forEach(score => {
        const li = document.createElement('li');
        li.textContent = `${score.playerName} : ${score.score}`;
        leaderboardList.appendChild(li);
    });

    if (leaderboard.length === 0) {
        const li = document.createElement('li');
        li.textContent = 'Aucun score enregistré.';
        li.classList.add('no-icon');
        li.style.paadingRight = '10px';
        leaderboardList.appendChild(li);
        resetLeaderboard.style.display = 'none';
    } 
}

resetLeaderboard.addEventListener('click', () => {
    leaderboard = [];
    localStorage.removeItem(`leaderboard_${anim_duration}`);
    loadLeaderboard();
    resetLeaderboard.style.display = 'none';
});

// Forcer les états car le select ne se met pas à jour automatiquement
function forceSelectStates() {
    theme.value = theme_name;
    difficulty.value = anim_duration;
}

function resetInput(){
    wordInput.value = '';
}

forceSelectStates();
resetInput();

document.addEventListener('DOMContentLoaded', loadLeaderboard);

difficulty.addEventListener('change', () => {
    updateSettings();
    console.log(`leaderboard_${anim_duration}`);
    leaderboard = JSON.parse(localStorage.getItem(`leaderboard_${anim_duration}`)) || [];
    saveScore.classList.remove('show');
    resetLeaderboard.style.display = 'block';
    loadLeaderboard();
    resetAll()
});

function addWord() {
    if (!gameRunning) return;

    const randomWord = words[Math.floor(Math.random() * words.length)];
    const wordElement = document.createElement('div');
    wordElement.style.fontSize = "3.5em";
    wordElement.className = 'word';
    wordElement.textContent = randomWord;
    wordElement.style.animationDuration = `${anim_duration}s`;

    // Supprimer le mot s'il atteint le bas
    wordElement.addEventListener('animationend', () => {
        if (gameRunning) {
            gameArea.removeChild(wordElement);
            activeWords.shift();
            endGame();
        }
    });

    gameArea.appendChild(wordElement);
    activeWords.push(wordElement);
}

wordInput.addEventListener("compositionstart", () => {
    isComposing = true;
});

wordInput.addEventListener("compositionend", () => {
    isComposing = false;
});

// Vérifier si le mot saisi est correct et surligner les lettres
wordInput.addEventListener('input', (event) => {
    if (isComposing) return;

    const inputText = wordInput.value.trim();

    if (activeWords.length > 0) {
        const wordElement = activeWords[0];
        const wordText = wordElement.textContent;

        // Surligner les lettres correctes et incorrectes
        let highlightedText = '';
        let hasError = false;

        for (let i = 0; i < wordText.length; i++) {
            if (i < inputText.length) {
                if (inputText[i] === wordText[i]) {
                    highlightedText += `<span class="correct">${wordText[i]}</span>`;
                } else {
                    highlightedText += `<span class="incorrect">${wordText[i]}</span>`;
                    hasError = true;
                }
            } else {
                highlightedText += wordText[i];
            }
        }

        wordElement.innerHTML = highlightedText;

        // Jouer le son d'erreur uniquement une fois : hasError = true tant que l'erreur est présente
        // et wrongSoundPlayed reste vrai jusqu'à ce que l'erreur soit corrigée (l187)
        if (hasError && !wrongSoundPlayed) {
            if (event.inputType !== 'deleteContentBackward') {
                wrongSound.currentTime = 0;
                wrongSound.play();
                document.body.style.backgroundColor = "rgba(255, 99, 71, 0.5)";
                setTimeout(() => {
                    document.body.style.backgroundColor = "#f0e6f6";
                }, 300);
                wrongSoundPlayed = true;
            }
        }

        // Réinitialiser le flag si l'erreur est corrigée
        if (!hasError) {
            wrongSoundPlayed = false;
        }

        if (wordText === inputText) {
            gameArea.removeChild(wordElement);
            activeWords.shift();
            wordInput.value = '';
            score += 1;
            updateScore();

            // Recrd battu ?
            if (!recordSoundPlayed && leaderboard.length > 0 && score > leaderboard[0].score) {
                recordSound.currentTime = 0;
                recordSound.play();
                recordSoundPlayed = true;
                // Déclenche les confettis
                confetti.create(document.getElementById('confetti'), {
                    resize: true,
                    useWorker: true,
                });
            } else {
                correctSound.currentTime = 0;
                correctSound.play();
            }

            document.body.style.backgroundColor = "rgba(144, 238, 144, 0.5)";
            setTimeout(() => {
                document.body.style.backgroundColor = "#f0e6f6";
            }, 300);
        }
    }
});

function resetAll() {
    gameRunning = false;
    score = 0;
    updateScore();
    gameArea.innerHTML = '';
    activeWords = [];
    wordInput.value = '';
    wordInput.placeholder = 'Appuyez sur "Jouer" pour recommencer';
    wordInput.style.pointerEvents = 'none';
    wordInput.blur();
    replayButton.textContent = 'Jouer';
    saveScore.classList.remove('show');
    endMessage.style.opacity=0;
    recordMessage.style.opacity=0;
    setTimeout(() => {
        endMessage.style.top='55%';
    }, 600);
    wrongSoundPlayed = false;
    recordSoundPlayed = false;
    document.body.style.backgroundColor = "#f0e6f6";
    clearInterval(interval);
}


function endGame() {
    gameRunning = false;
    saveScore.classList.add('show');
    wordInput.placeholder = 'Appuyez sur "Rejouer" pour recommencer';
    wordInput.style.pointerEvents = 'none';
    wordInput.value = '';
    wordInput.blur();
    activeWords = [];
    gameArea.innerHTML = '';
    // ajout du message de fin de partie
    if (recordSoundPlayed) {
        recordMessage.style.opacity=1;
        endMessage.style.top='50%';
    }
    endMessage.style.opacity=1;
    
    clearInterval(interval);

    gameOverSound.currentTime = 0;
    gameOverSound.play();

    document.body.style.backgroundColor = "rgba(255, 99, 71, 0.5)";
    setTimeout(() => {
        document.body.style.backgroundColor = "#f0e6f6";
    }, 300);
}

function resetGame() {
    updateSettings();
    updateTheme();
    gameRunning = true;
    score = 0;
    updateScore();
    gameArea.innerHTML = '';
    saveScore.classList.remove('show');
    replayButton.textContent = 'Rejouer';
    wordInput.placeholder = 'Tapez le mot ici';
    wordInput.style.pointerEvents = 'auto';
    wordInput.value = '';
    endMessage.style.opacity=0;
    recordMessage.style.opacity=0;
    setTimeout(() => {
        endMessage.style.top='55%';
    }, 600);
    activeWords.forEach(word => gameArea.removeChild(word));
    activeWords = [];
    wrongSoundPlayed = false;
    recordSoundPlayed = false;
    wordInput.focus();
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => {
        if (gameRunning) addWord();
    }, 2000);
}

replayButton.addEventListener('click', resetGame);
