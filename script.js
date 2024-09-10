document.addEventListener('DOMContentLoaded', function() {
    const card = document.getElementById('card');
    const cardImage = document.getElementById('card-image');
    const henneCard = document.getElementById('henne-card');
    const downloadButton = document.getElementById('download-button');
    let isCardFlipped = false; // Indique si la carte est retournée ou non
    let step = 1; // Pour suivre l'étape actuelle

    // Musique automatique (autoplay est activé dans le HTML)

    card.addEventListener('click', function() {
        if (step === 1) {
            // Premier clic : retourner la carte pour afficher le verso
            card.style.transform = 'rotateY(180deg)';
            setTimeout(() => {
                cardImage.src = 'card_verso.png'; // Affiche le verso après le retournement
                card.style.transform = 'rotateY(0deg)'; // Revenir à 0 degré
            }, 500); // Délai pour que le retournement se fasse de manière naturelle
            step++;
        } else if (step === 2) {
            // Deuxième clic : faire réapparaître le recto et afficher la carte henné
            card.style.display = 'none'; // Cache la carte recto/verso
            henneCard.style.display = 'block'; // Affiche la carte henné
            step++;
        } else if (step === 3) {
            // Troisième clic : faire apparaître le bouton de téléchargement
            downloadButton.style.display = 'block'; // Affiche le bouton de téléchargement
            step++;
        }
    });

    // Fonction pour générer et télécharger un PDF avec les trois images
    downloadButton.addEventListener('click', function() {
        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF(); // Créer un nouveau PDF

        // Ajouter la première image (recto)
        pdf.addImage('card_recto.png', 'PNG', 10, 10, 180, 180);

        // Ajouter la deuxième image (verso)
        pdf.addPage();
        pdf.addImage('card_verso.png', 'PNG', 10, 10, 180, 180);

        // Ajouter la carte henné
        pdf.addPage();
        pdf.addImage('henne.png', 'PNG', 10, 10, 180, 180);

        // Téléchargement du PDF
        pdf.save('invitation.pdf');
    });
});
