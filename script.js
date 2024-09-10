document.addEventListener('DOMContentLoaded', function() {
    const card = document.getElementById('card');
    const henneCard = document.getElementById('henne-card');
    const downloadButton = document.getElementById('download-button');
    const cardContainer = document.querySelector('.card-container');
    let step = 1;

    // Premier clic : retourne la carte (recto -> verso)
    cardContainer.addEventListener('click', function() {
        if (step === 1) {
            cardContainer.style.transform = 'rotateY(180deg)'; // Effet de retournement 3D
            setTimeout(() => {
                card.src = 'card_verso.png'; // Change l'image pour afficher le verso
                cardContainer.style.transform = 'rotateY(0deg)'; // Revenir à 0 après l'animation
            }, 500); // Délai pour l'effet de retournement
            step++;
        } else if (step === 2) {
            // Deuxième clic : retour pour la carte Henné
            cardContainer.style.transform = 'rotateY(180deg)'; // Effet de retournement
            setTimeout(() => {
                card.src = 'henne.png'; // Change l'image pour afficher la carte henné
                cardContainer.style.transform = 'rotateY(0deg)'; // Revenir à 0 après l'animation
            }, 500); // Délai pour l'effet de retournement
            step++;
        } else if (step === 3) {
            // Troisième clic : afficher le bouton de téléchargement
            downloadButton.style.display = 'block'; // Affiche le bouton de téléchargement
            step++;
        }
    });

    // Fonction pour générer et télécharger le PDF avec les images
    downloadButton.addEventListener('click', function() {
        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF({
            orientation: 'portrait', // Orientation du PDF
            unit: 'px', // Unité en pixels
            format: [1772, 1772] // Dimensions des images conservées
        });

        // Ajouter la première image (recto)
        pdf.addImage('card_recto.png', 'PNG', 0, 0, 1772, 1772);

        // Ajouter la deuxième image (verso)
        pdf.addPage();
        pdf.addImage('card_verso.png', 'PNG', 0, 0, 1772, 1772);

        // Ajouter la carte henné
        pdf.addPage();
        pdf.addImage('henne.png', 'PNG', 0, 0, 1772, 1772);

        // Téléchargement du PDF
        pdf.save('invitation.pdf');
    });
});
