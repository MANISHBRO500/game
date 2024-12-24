const questionInput = document.getElementById('questionInput');
const addQuestion = document.getElementById('addQuestion');
const questionList = document.getElementById('questionList');

const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spinButton');
const selectedQuestion = document.getElementById('selectedQuestion');

const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');

const totalQuestions = document.getElementById('totalQuestions');
const totalVotes = document.getElementById('totalVotes');
const yesVotes = document.getElementById('yesVotes');
const noVotes = document.getElementById('noVotes');
const yesPercentage = document.getElementById('yesPercentage');
const noPercentage = document.getElementById('noPercentage');
const resetButton = document.getElementById('resetButton');
const resultDisplay = document.getElementById('resultDisplay');

let questions = [];
let votes = { yes: 0, no: 0 };

// Add question to the list
addQuestion.addEventListener('click', () => {
  const question = questionInput.value.trim();
  if (question) {
    questions.push(question);
    const li = document.createElement('li');
    li.textContent = question;
    questionList.appendChild(li);
    questionInput.value = '';
  } else {
    alert('Please enter a valid question.');
  }
  updateQuestionCount();
});

// Spin the wheel
spinButton.addEventListener('click', () => {
  if (questions.length === 0) {
    alert('Please add at least one question.');
    return;
  }

  wheel.classList.add('spin');
  setTimeout(() => {
    wheel.classList.remove('spin');
    const randomIndex = Math.floor(Math.random() * questions.length);
    const selected = questions[randomIndex];

    // Display selected question
    selectedQuestion.textContent = selected;

    // Remove selected question from the list
    questions.splice(randomIndex, 1);
    updateQuestionList();
    updateQuestionCount();
  }, 4000);
});

// Update the question list displayed
function updateQuestionList() {
  questionList.innerHTML = '';
  questions.forEach((question) => {
    const li = document.createElement('li');
    li.textContent = question;
    questionList.appendChild(li);
  });
}

// Handle voting
yesButton.addEventListener('click', () => {
  votes.yes++;
  updateResults();
});

noButton.addEventListener('click', () => {
  votes.no++;
  updateResults();
});

// Update results
function updateResults() {
  const total = votes.yes + votes.no;
  const yesPercent = ((votes.yes / total) * 100).toFixed(2) || 0;
  const noPercent = ((votes.no / total) * 100).toFixed(2) || 0;

  yesVotes.textContent = votes.yes;
  noVotes.textContent = votes.no;
  yesPercentage.textContent = ${yesPercent}%;
  noPercentage.textContent = ${noPercent}%;
  totalVotes.textContent = total;
  totalQuestions.textContent = questions.length;

  resultDisplay.style.display = 'block';
}

// Update the question count displayed
function updateQuestionCount() {
  totalQuestions.textContent = questions.length;
}

// Reset the game
resetButton.addEventListener('click', () => {
  questions = [];
  votes = { yes: 0, no: 0 };
  questionList.innerHTML = '';
  selectedQuestion.textContent = 'Your question will appear here';
  resultDisplay.style.display = 'none';
  updateQuestionCount();
});