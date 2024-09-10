document.addEventListener('DOMContentLoaded', function() {
    const card = document.getElementById('card');
    const henneCard = document.getElementById('henne-card');
    const downloadButton = document.getElementById('download-button');
    let step = 1;

    // Premier clic : retourne la carte
    card.addEventListener('click', function() {
        if (step === 1) {
            // Animation pour retourner la carte
            card.style.transform = 'rotateY(180deg)';
            setTimeout(() => {
                card.src = 'card_verso.png'; // Affiche le verso
                card.style.transform = 'rotateY(0deg)'; // Revenir à 0 degré
            }, 500); // Délai pour que l'animation se fasse
            step++;
        } else if (step === 2) {
            // Deuxième clic : afficher la carte henné et cacher la carte principale
            card.style.display = 'none'; // Cache la carte
            henneCard.style.display = 'block'; // Affiche la carte Henné
            step++;
        } else if (step === 3) {
            // Troisième clic : faire apparaître le bouton de téléchargement
            downloadButton.style.display = 'block'; // Affiche le bouton de téléchargement
            step++;
        }
    });

    // Fonction pour générer et télécharger le PDF avec les images
    downloadButton.addEventListener('click', function() {
        const { jsPDF } = window.jspdf;

        const pdf = new jsPDF({
            orientation: 'portrait', // Orientation de l'image
            unit: 'px', // Unité en pixels
            format: [1772, 1772] // Dimensions en pixels, conserve celles de l'image
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
