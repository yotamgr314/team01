document.addEventListener('DOMContentLoaded', () => {
    const currentQuestion = document.getElementById('currentQuestion');
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
  
    let questionIndex = 1;
    let correctAnswers = 0;
    let questions = [];
  
    // Fetch questions from the backend
    async function fetchQuestions() {
      try {
        const response = await fetch('https://team01.onrender.com/api/users/trivia/start?category=9&difficulty=easy'); 
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        questions = data.questions.map((item) => ({
          question: item.question,
          options: shuffleOptions([...item.incorrect_answers, item.correct_answer]),
          correctAnswer: item.correct_answer,
        }));
  
        loadQuestion();
      } catch (error) {
        console.error('Error fetching questions:', error);
        questionText.innerHTML = "Failed to load questions. Please try again later.";
      }
    }
  
    // Shuffle options to randomize their order
    function shuffleOptions(options) {
      return options.sort(() => Math.random() - 0.5);
    }
  
    // Load the current question
    function loadQuestion() {
      const current = questions[questionIndex - 1];
      questionText.innerHTML = current.question; // Use `innerHTML` for special characters
      optionsContainer.innerHTML = "";
  
      current.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-outline-secondary', 'w-100', 'mb-2');
        button.innerText = `${String.fromCharCode(65 + index)}. ${option}`;
        button.addEventListener('click', () => {
          clearSelections();
          button.classList.add('selected');
          checkAnswer(option);
        });
        optionsContainer.appendChild(button);
      });
    }
  
    // Clear previously selected options
    function clearSelections() {
      document.querySelectorAll('#optionsContainer .btn').forEach((btn) => {
        btn.classList.remove('selected');
      });
    }
  
    // Check the selected answer
    function checkAnswer(selected) {
      const current = questions[questionIndex - 1];
      if (selected === current.correctAnswer) {
        correctAnswers++;
      }
  
      if (questionIndex < questions.length) {
        questionIndex++;
        currentQuestion.innerText = questionIndex;
        loadQuestion();
      } else {
        endGame();
      }
    }
  
    // End the game
    function endGame() {
      localStorage.setItem('correctAnswers', correctAnswers);
      localStorage.setItem('totalQuestions', questions.length);
      window.location.href = "endGame.html";
    }
  
    // Initialize game
    fetchQuestions();
  });
  