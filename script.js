document.getElementById('generate-citation').addEventListener('click', async function() {
    try {
        const response = await fetch('citations.json'); // Charger le fichier JSON des citations
        const data = await response.json();
        const randomCitation = data.citations[Math.floor(Math.random() * data.citations.length)];

        // Afficher la citation
        document.querySelector('.citation-container').style.display = 'block';
        document.getElementById('citation-text').innerText = `"${randomCitation.text}"`;
        document.getElementById('citation-author').innerText = `- ${randomCitation.author}`;

        // Encodage de la citation pour l'URL
        const shareMessage = encodeURIComponent(`"${randomCitation.text}" - ${randomCitation.author}`);
        const baseURL = 'http://127.0.0.1:5500/index.html'; // URL de ton site local ou en ligne

        // Lien de partage LinkedIn
        document.getElementById('linkedin-share').href = `https://www.linkedin.com/sharing/share-offsite/?url=${baseURL}&title=${shareMessage}`;

        // Mise à jour des liens de partage pour les autres réseaux sociaux
        document.getElementById('twitter-share').href = `https://twitter.com/intent/tweet?text=${shareMessage}&url=${baseURL}`;
        document.getElementById('whatsapp-share').href = `https://api.whatsapp.com/send?text=${shareMessage}`;

        // Afficher la section de partage
        document.querySelector('.share-container').style.display = 'block';

        // Stocker la citation affichée dans le localStorage
        localStorage.setItem('citation', JSON.stringify(randomCitation));

    } catch (error) {
        console.error('Erreur lors de la récupération de la citation', error);
    }
});

// Restaurer l'état si une citation a déjà été générée
window.onload = function() {
    const savedCitation = localStorage.getItem('citation');

    if (savedCitation) {
        const citation = JSON.parse(savedCitation);

        // Afficher la citation sauvegardée
        displayCitation(citation);
        document.querySelector('.share-container').style.display = 'block';
    }
};

// Fonction pour afficher la citation
function displayCitation(citation) {
    document.querySelector('.citation-container').style.display = 'block';
    document.getElementById('citation-text').innerText = `"${citation.text}"`;
    document.getElementById('citation-author').innerText = `- ${citation.author}`;
}
