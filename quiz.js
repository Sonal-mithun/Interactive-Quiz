// Questions by category
const questions = {
  html: [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Making Language",
        "Hyperlinks and Text Markup Language"
      ],
      answer: 0
    },
    {
      question: "Which tag is used for the largest heading?",
      options: ["&lt;h6&gt;", "&lt;h1&gt;", "&lt;heading&gt;"],
      answer: 1
    },
    {
      question: "Which tag is used to create a hyperlink?",
      options: ["&lt;link&gt;", "&lt;a&gt;", "&lt;href&gt;"],
      answer: 1
    }
  ],
  css: [
    {
      question: "Which property changes text color in CSS?",
      options: ["background-color", "font-style", "color"],
      answer: 2
    },
    {
      question: "Which CSS property is used to change font?",
      options: ["font-family", "text-style", "font-weight"],
      answer: 0
    },
    {
      question: "How do you select an element with id='demo'?",
      options: ["#demo", ".demo", "demo"],
      answer: 0
    }
  ],
  js: [
    {
      question: "Which keyword declares a variable in JavaScript?",
      options: ["var", "int", "declare"],
      answer: 0
    },
    {
      question: "Which symbol is used for comments in JavaScript?",
      options: ["//", "/* */", "#"],
      answer: 0
    },
    {
      question: "Which method displays a message in the browser console?",
      options: ["alert()", "console.log()", "prompt()"],
      answer: 1
    }
  ]
};

let currentCategory = "";
let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timerId;

// Start quiz for selected category
function startQuiz(category) {
  currentCategory = category;
  currentQuestion = 0;
  score = 0;

  document.getElementById("category-container").style.display = "none";
  document.getElementById("quiz-section").style.display = "block";
  document.getElementById("home-page").style.display="block";

  loadQuestion();
}

// Load one question at a time
function loadQuestion() {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = "";

  let q = questions[currentCategory][currentQuestion];
  let questionHTML = `
    <div class="question">
      <p><strong>Question ${currentQuestion + 1} of ${questions[currentCategory].length}:</strong> ${q.question}</p>
      ${q.options
        .map(
          (option, i) =>
            `<label>
               <input type="radio" name="q${currentQuestion}" value="${i}"> ${option}
             </label><br>`
        )
        .join("")}
    </div>
  `;
  quizContainer.innerHTML = questionHTML;

  resetTimer();
}

// Check selected answer
function checkAnswer() {
  const selected = document.querySelector(`input[name="q${currentQuestion}"]:checked`);
  if (selected && parseInt(selected.value) === questions[currentCategory][currentQuestion].answer) {
    score++;
  }
}

// Go to next question or finish quiz
function nextQuestion() {
  checkAnswer();
  currentQuestion++;

  if (currentQuestion < questions[currentCategory].length) {
    loadQuestion();
  } else {
    clearInterval(timerId);
    document.getElementById("quiz-container").innerHTML = "";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("result").innerText =
      `✅ ${currentCategory.toUpperCase()} Quiz finished! Your score: ${score} / ${questions[currentCategory].length}`;
  }
}

// Timer for each question
function resetTimer() {
  clearInterval(timerId);
  timeLeft = 30;
  document.getElementById("timer").textContent = timeLeft;

  timerId = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft < 0) {
      nextQuestion(); // auto move to next question
    }
  }, 1000);
}

// Event listeners
document.getElementById("nextBtn").addEventListener("click", nextQuestion);
