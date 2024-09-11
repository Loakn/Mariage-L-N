document.addEventListener('DOMContentLoaded', function() {
    const cardContainer = document.querySelector('.card-container');
    const card = document.getElementById('card');
    const downloadButton = document.getElementById('download-button');
    let step = 1;

    cardContainer.addEventListener('click', function() {
        if (step === 1) {
            cardContainer.style.transform = 'rotateY(180deg)'; // Effet de retournement 3D
            setTimeout(() => {
                card.src = 'card_verso.png'; // Afficher le verso
                cardContainer.style.transform = 'rotateY(0deg)'; // Retourner la carte
            }, 500); // Délai pour l'animation
            step++;
        } else if (step === 2) {
            cardContainer.style.transform = 'rotateY(180deg)'; // Retournement pour la carte Henné
            setTimeout(() => {
                card.src = 'henne.png'; // Afficher la carte Henné
                cardContainer.style.transform = 'rotateY(0deg)'; // Retourner à l'avant
            }, 500);
            step++;
        } else if (step === 3) {
            downloadButton.style.display = 'block'; // Affiche le bouton de téléchargement
            step++;
        }
    });

    // Fonction pour télécharger le PDF
    downloadButton.addEventListener('click', function() {
        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [1772, 1772]
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
