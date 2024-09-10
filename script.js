document.addEventListener('DOMContentLoaded', function() {
    const envelope = document.getElementById('envelope');
    const card = document.getElementById('card');
    const cardImage = document.getElementById('card-image');
    const henneCard = document.getElementById('henne-card');
    const music = document.getElementById('background-music');

    let cardFace = 'recto'; // Indique si on est sur le recto ou le verso
    let step = 1; // Contrôle les étapes de l'animation

    // Démarre la musique dès que la page est chargée
    music.play();

    // Clique sur l'enveloppe pour commencer l'animation
    envelope.addEventListener('click', function() {
        if (step === 1) {
            // Étape 1 : Faire sortir la carte (recto visible)
            card.style.display = 'block'; // Affiche la carte
            step++; // Passe à l'étape suivante
        } else if (step === 2) {
            // Étape 2 : Retourner la carte (verso visible)
            if (cardFace === 'recto') {
                cardImage.src = 'card_verso.png'; // Affiche le verso
                cardFace = 'verso';
            }
            step++; // Passe à l'étape suivante
        } else if (step === 3) {
            // Étape 3 : Afficher la carte du henné
            henneCard.style.display = 'block'; // Affiche la carte avec les indications du henné
            step++; // Fin du processus
        }
    });
});
