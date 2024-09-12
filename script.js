document.addEventListener('DOMContentLoaded', function() {
    const cardContainer = document.querySelector('.card-container');
    const card = document.getElementById('card');
    const downloadButton = document.getElementById('download-button');
    const answerButton = document.getElementById('answer-button');
    const responseForm = document.getElementById('response-form');
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
            // Troisième clic : afficher le bouton de téléchargement et cacher la carte Henné
            cardContainer.style.display = 'none'; // Cache la carte Henné
            downloadButton.style.display = 'block'; // Affiche le bouton de téléchargement
        }
    });

    // Afficher le formulaire de réponse
    answerButton.addEventListener('click', function() {
        responseForm.style.display = 'block'; // Affiche le formulaire de réponse
    });

    // Montrer le champ du nombre d'invités si "Oui" est sélectionné
    document.querySelectorAll('input[name="participation"]').forEach((input) => {
        input.addEventListener('change', function() {
            if (this.value === 'Oui') {
                document.getElementById('guest-number').style.display = 'block';
            } else {
                document.getElementById('guest-number').style.display = 'none';
            }
        });
    });

    // Soumission du formulaire
    document.getElementById('submit-response').addEventListener('click', function() {
        const participation = document.querySelector('input[name="participation"]:checked').value;
        const numInvites = document.getElementById('num-invites').value || 0;

        // URL de soumission du formulaire Google
        const googleFormUrl = 'https://docs.google.com/forms/d/e/[FORM_ID]/formResponse';

        // Paramètres de soumission
        const formData = new URLSearchParams();
        formData.append('entry.739196', participation); // Remplace XXXXXX par l'ID du champ Google Forms
        formData.append('entry.1756875527', numInvites); // Remplace YYYYYYY par l'ID du champ du nombre d'invités

        // Soumettre les réponses
        fetch(googleFormUrl, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Permet de contourner les restrictions CORS
        }).then(() => {
            alert('Merci pour votre réponse !');
            responseForm.style.display = 'none'; // Cache le formulaire après soumission
        }).catch(() => {
            alert('Erreur lors de l\'envoi. Veuillez réessayer.');
        });
    });
});
