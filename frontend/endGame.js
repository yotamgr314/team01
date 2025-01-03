document.addEventListener('DOMContentLoaded', () => {
    const correctAnswersElement = document.getElementById('correctAnswers');
    const durationElement = document.getElementById('gameDuration');
  
    // Fetch game results from backend
    async function fetchGameResults() {
      try {
        // Replace the URL below with your Render backend URL
        const response = await fetch('https://your-render-backend-url/api/users/trivia/results'); 
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        correctAnswersElement.innerText = `${data.correctAnswers}`;
        durationElement.innerText = `${data.duration}`;
      } catch (error) {
        console.error('Error fetching game results:', error);
        correctAnswersElement.innerHTML = "N/A";
        durationElement.innerHTML = "N/A";
      }
    }
  
    // Handle new game button click
    document.getElementById('newGameButton').addEventListener('click', () => {
      window.location.href = "chooseGame.html";
    });
  
    // Initialize
    fetchGameResults();
  });
  