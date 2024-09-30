document.getElementById('generate-citation').addEventListener('click', async function() {
    try {
        const response = await fetch('citations.json');
        const data = await response.json();
        const randomCitation = data.citations[Math.floor(Math.random() * data.citations.length)];

        // Faire disparaître le bouton
        const button = document.getElementById('generate-citation');
        button.classList.add('fade-out'); // Ajoute la classe pour l'effet de disparition
        button.disabled = true; // Désactive le bouton pour éviter de multiples clics

        // Afficher la citation après un délai
        setTimeout(() => {
            button.parentElement.innerHTML = `
                <div class="citation-container">
                    <p id="citation-text">"${randomCitation.text}"</p>
                    <p id="citation-author">- ${randomCitation.author}</p>
                    <p id="timer">Vous pourrez obtenir votre prochaine citation dans <span id="timer-countdown">24 heures</span>.</p>
                </div>
            `;
            startTimer(); // Démarre le timer
            document.querySelector('.share-container').style.display = 'block'; // Affiche le conteneur de partage
        }, 500);
    } catch (error) {
        console.error('Erreur lors de la récupération de la citation', error);
    }
});

function startTimer() {
    const countdownElement = document.getElementById('timer-countdown');
    let remainingTime = 24 * 60 * 60; // 24 heures en secondes

    const timerInterval = setInterval(() => {
        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;

        countdownElement.innerText = `${hours}h ${minutes}m ${seconds}s`;

        remainingTime--;

        if (remainingTime < 0) {
            clearInterval(timerInterval);
            countdownElement.innerText = "Il est temps de générer une nouvelle citation!";
        }
    }, 1000);
}

