document.addEventListener('DOMContentLoaded', function() {
    const card = document.getElementById('card');
    const cardImage = document.getElementById('card-image');
    const henneCard = document.getElementById('henne-card');
    const downloadButton = document.getElementById('download-button');
    let step = 1;

    // Clic sur la carte pour commencer les interactions
    card.addEventListener('click', function() {
        if (step === 1) {
            // Premier clic : retour de la carte
            card.style.transform = 'rotateY(180deg)';
            setTimeout(() => {
                cardImage.src = 'card_verso.png'; // Affiche le verso après l'animation
                card.style.transform = 'rotateY(0deg)'; // Remet à l'état normal
            }, 500);
            step++;
        } else if (step === 2) {
            // Deuxième clic : cacher la carte et afficher la carte Henné
            card.style.display = 'none';
            henneCard.style.display = 'block'; // Affiche la carte Henné
            step++;
        } else if (step === 3) {
            // Troisième clic : afficher le bouton de téléchargement
            downloadButton.style.display = 'block'; // Affiche le bouton de téléchargement
            step++;
        }
    });

    // Télécharger le PDF avec les trois images
    downloadButton.addEventListener('click', function() {
        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF(); // Créer un nouveau PDF

        // Ajouter la première image (recto)
        pdf.addImage('card_recto.png', 'PNG', 10, 10, 180, 180);

        // Ajouter la deuxième image (verso)
        pdf.addPage();
        pdf.addImage('card_verso.png', 'PNG', 10, 10, 180, 180);

        // Ajouter la carte Henné
        pdf.addPage();
        pdf.addImage('henne.png', 'PNG', 10, 10, 180, 180);

        // Téléchargement du PDF
        pdf.save('invitation.pdf');
    });
});
