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

    // Redirection vers Google Form au clic sur "Réponse"
    answerButton.addEventListener('click', function() {
        window.location.href = 'https://forms.gle/yVvHnqd2vV1eEqwY8'; // Remplace par le lien du Google Form
    });

    // Fonction pour générer et télécharger le PDF avec les images
    downloadButton.addEventListener('click', function() {
        const { jsPDF } = window.jspdf; // Assurer que jsPDF est bien importé

        const pdf = new jsPDF({
            orientation: 'portrait', // Orientation du PDF
            unit: 'px', // Unité en pixels
            format: [380,380] // Dimensions des images conservées
        });

        // Ajouter la première image (recto)
        pdf.addImage('card_recto.png', 'PNG', 0, 0, 380, 380);

        // Ajouter la deuxième image (verso)
        pdf.addPage();
        pdf.addImage('card_verso.png', 'PNG', 0, 0, 380, 380);

        // Ajouter la carte Henné
        pdf.addPage();
        pdf.addImage('henne.png', 'PNG', 0, 0, 380, 380);

        // Téléchargement du PDF
        pdf.save('Loryane et Nathanael.pdf');
    });
});
