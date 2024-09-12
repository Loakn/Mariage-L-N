document.addEventListener('DOMContentLoaded', function() {
    const cardContainer = document.querySelector('.card-container');
    const card = document.getElementById('card');
    const downloadButton = document.getElementById('download-button');
    const answerButton = document.getElementById('answer-button');
    const backgroundMusic = document.getElementById('background-music');
    let step = 1;

    // Ajout du bouton pour démarrer la musique
    document.getElementById('play-music').addEventListener('click', function() {
        backgroundMusic.play(); // Démarre la musique après le clic
    });

    // Premier clic : retourne la carte (recto -> verso)
    cardContainer.addEventListener('click', function() {
        if (step === 1) {
            cardContainer.style.transform = 'rotateY(180deg)'; // Effet de retournement 3D
            setTimeout(() => {
                card.src = 'card_verso.png'; // Change l'image pour afficher le verso
                cardContainer.style.transform = 'rotateY(0deg)'; // Retourner la carte
            }, 500); // Délai pour l'animation
            step++;
        } else if (step === 2) {
            // Deuxième clic : afficher la carte Henné
            cardContainer.style.transform = 'rotateY(180deg)';
            setTimeout(() => {
                card.src = 'henne.png'; // Afficher la carte Henné
                cardContainer.style.transform = 'rotateY(0deg)';
            }, 500);
            step++;
        } else if (step === 3) {
            // Troisième clic : afficher les boutons de téléchargement et réponse, cacher la carte Henné
            cardContainer.style.display = 'none'; // Cache la carte Henné
            downloadButton.style.display = 'block'; // Affiche le bouton de téléchargement
            answerButton.style.display = 'block'; // Affiche le bouton de réponse
        }
    });
});
