document.addEventListener('DOMContentLoaded', function() {
    const cardContainer = document.querySelector('.card-container');
    const card = document.getElementById('card');
    const downloadButton = document.getElementById('download-button');
    const answerButton = document.getElementById('answer-button');
    const backgroundMusic = document.getElementById('background-music');
    const loader = document.getElementById('loader'); // Loader
    const backgroundVideo = document.getElementById('background-video'); // Vidéo de fond
    let step = 1;

    // Fonction pour précharger les images
    function preloadImages(callback) {
        const images = ['card_verso.pdf', 'henne.pdf'];
        let loadedImages = 0;

        // Vérifier quand toutes les images sont chargées
        images.forEach((imageSrc) => {
            const img = new Image();
            img.src = imageSrc;

            img.onload = function() {
                loadedImages++;
                if (loadedImages === images.length) {
                    callback(); // Appeler la fonction de callback quand toutes les images sont chargées
                }
            };

            img.onerror = function() {
                console.error("Erreur lors du chargement de l'image : " + imageSrc);
                loadedImages++;
                if (loadedImages === images.length) {
                    callback(); // Même en cas d'erreur, continuer pour ne pas bloquer
                }
            };
        });
    }

    // Quand les images sont préchargées, cacher le loader et essayer de jouer la vidéo de fond
    preloadImages(function() {
        loader.style.display = 'none'; // Cacher le loader
        cardContainer.style.display = 'block'; // Afficher la carte
        backgroundVideo.style.display = 'block'; // Afficher la vidéo de fond

        // S'assurer que la vidéo est mutée et essayer de la jouer
        backgroundVideo.muted = true;  // Forcer la vidéo à être muette pour les politiques d'autoplay
        backgroundVideo.play().catch(function(error) {
            console.log("Autoplay échoué : interaction nécessaire", error);
            // Si autoplay échoue, demander à l'utilisateur d'interagir
            document.addEventListener('click', function() {
                backgroundVideo.play();
            }, { once: true });
        });
    });

    // Ajout du bouton pour démarrer la musique
    document.getElementById('play-music').addEventListener('click', function() {
        backgroundMusic.play(); // Démarre la musique après le clic
    });

    // Premier clic : retourne la carte (recto -> verso)
    cardContainer.addEventListener('click', function() {
        if (step === 1) {
            cardContainer.style.transform = 'rotateY(180deg)'; // Effet de retournement 3D
            setTimeout(() => {
                card.src = 'card_verso.pdf'; // Change l'image pour afficher le verso
                cardContainer.style.transform = 'rotateY(0deg)'; // Retourner la carte
            }, 500); // Délai pour l'animation
            step++;
        } else if (step === 2) {
            // Deuxième clic : afficher la carte Henné
            cardContainer.style.transform = 'rotateY(180deg)';
            setTimeout(() => {
                card.src = 'henne.pdf'; // Afficher la carte Henné
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
        window.location.href = 'https://forms.gle/XDoqUYNLDYwuiema9'; // Remplace par le lien du Google Form
    });

    // Fonction pour générer et télécharger le PDF avec les images
    downloadButton.addEventListener('click', function() {
        const { jsPDF } = window.jspdf; // Assurer que jsPDF est bien importé

        const pdf = new jsPDF({
            orientation: 'portrait', // Orientation du PDF
            unit: 'px', // Unité en pixels
            format: [380, 380] // Dimensions des images conservées
        });

        // Ajouter la première image (recto)
        pdf.addImage('card_recto.pdf', 'PDF', 0, 0, 380, 380);

        // Ajouter la deuxième image (verso)
        pdf.addPage();
        pdf.addImage('card_verso.pdf', 'PDF', 0, 0, 380, 380);

        // Ajouter la carte Henné
        pdf.addPage();
        pdf.addImage('henne.pdf', 'PDF', 0, 0, 380, 380);

        // Téléchargement du PDF
        pdf.save('Loryane et Nathanael.pdf');
    });
});
