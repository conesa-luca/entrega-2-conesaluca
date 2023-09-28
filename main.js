let attempts = 10; // Intentos iniciales
let score = 0; // Puntuación del jugador
const guessHistory = []; // Historial de adivinanzas

function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setMessage(message) {
    document.getElementById("message").textContent = message;
}

function showImage(isCorrect) {
    const correctImage = document.getElementById("correct-image");
    const wrongImage = document.getElementById("wrong-image");
    correctImage.style.display = isCorrect ? "block" : "none";
    wrongImage.style.display = isCorrect ? "none" : "block";
}

function updateGuessHistory(guess, isCorrect) {
    guessHistory.push({ guess, isCorrect });
    renderGuessHistory();
}

function renderGuessHistory() {
    const guessHistoryElement = document.getElementById("guessHistory");
    guessHistoryElement.innerHTML = `<strong>Historial de Adivinanzas:</strong><br>`;
    guessHistory.forEach((item, index) => {
        guessHistoryElement.innerHTML += `Intento ${index + 1}: ${item.guess} (${item.isCorrect ? "Correcto" : "Incorrecto"})<br>`;
    });
}

function checkGuess() {
    const guess = parseInt(document.getElementById("guess").value);
    const resultElement = document.getElementById("result");

    if (isNaN(guess) || guess < 1 || guess > 15) {
        setMessage("Ingresa un número válido entre 1 y 15.");
    } else {
        attempts--;

        const computerGuess = generateRandomNumber(1, 15);

        if (guess === computerGuess) {
            score++;
            setMessage("¡Felicidades! Has adivinado el número.");
            showImage(true);
        } else if (guess < computerGuess) {
            setMessage("El número es mayor. Intenta de nuevo.");
            showImage(false);
        } else {
            setMessage("El número es menor. Intenta de nuevo.");
            showImage(false);
        }

        resultElement.textContent = `La computadora eligió: ${computerGuess}`;

        updateGuessHistory(guess, guess === computerGuess);

        if (attempts === 0) {
            setMessage(`¡Agotaste tus ${score} intentos! El número de la computadora era ${computerGuess}.`);
            document.getElementById("checkButton").disabled = true;
        }
    }

    document.getElementById("score").textContent = `Puntuación: ${score}`;
    document.getElementById("attempts").textContent = `Intentos restantes: ${attempts}`;
}

function resetGame() {
    attempts = 10;
    score = 0;
    guessHistory.length = 0;
    document.getElementById("guess").value = "";
    setMessage("");
    document.getElementById("result").textContent = "";
    document.getElementById("score").textContent = "Puntuación: 0";
    document.getElementById("attempts").textContent = "Intentos restantes: 10";
    document.getElementById("checkButton").disabled = false;
    document.getElementById("correct-image").style.display = "none";
    document.getElementById("wrong-image").style.display = "none";
    renderGuessHistory();
}

function showStatistics() {
    const statistics = getStatistics();
    setMessage(`
        Estadísticas:
        Aciertos: ${statistics.correctGuessesCount}
        Errores: ${statistics.incorrectGuessesCount}
        Total de intentos: ${statistics.totalGuesses}
        Tasa de éxito: ${statistics.successRate.toFixed(2)}%
    `);
}

function getStatistics() {
    const correctGuesses = guessHistory.filter(item => item.isCorrect);
    const incorrectGuesses = guessHistory.filter(item => !item.isCorrect);

    const correctGuessesCount = correctGuesses.length;
    const incorrectGuessesCount = incorrectGuesses.length;
    const totalGuesses = guessHistory.length;
    const successRate = (correctGuessesCount / totalGuesses) * 100;

    return {
        correctGuessesCount,
        incorrectGuessesCount,
        totalGuesses,
        successRate
    };
}

document.getElementById("checkButton").addEventListener("click", checkGuess);
document.getElementById("resetButton").addEventListener("click", resetGame);
document.getElementById("showStatisticsButton").addEventListener("click", showStatistics);

// Agregar evento para reiniciar el juego al cargar la página
window.addEventListener("load", resetGame);
