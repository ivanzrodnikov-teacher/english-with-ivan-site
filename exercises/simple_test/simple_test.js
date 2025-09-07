var correctSnd = new Audio("sounds/correct_answer.mp3");
var incorrectSnd = new Audio("sounds/wrong_answer.mp3");

const questions = [
  {
    question: "On the sands of sweet Serkonos, did we ... in the sun",
    answers: [
      { text: "bathe", correct: true },
      { text: "bathed", correct: false },
      { text: "bathing", correct: false },
    ]
  },

  {
    question: "Now the sands of Serkonos, they ... in the sun",
    answers: [
      { text: "burned", correct: false },
      { text: "have burnt", correct: false },
      { text: "are burning", correct: true },
    ]
  },
  
  {
    question: "The name of the ship ... Billy of Tea",
    answers: [
      { text: "was", correct: true },
      { text: "will", correct: false },
      { text: "has", correct: false },
    ]
  },
  
  {
    question: "Baby, we ... this house on memories",
    answers: [
      { text: "building", correct: false },
      { text: "has been built", correct: false },
      { text: "built", correct: true },
    ]
  },
  
  {
    question: "He ...",
    answers: [
      { text: "never gave you up", correct: true },
      { text: "will never give you up", correct: true },
      { text: "is never going to give you up", correct: true },
    ]
  },  
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
};

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
    correctSnd.play();
    correctSnd.currentTime = 0;
  }else{
    selectedBtn.classList.add("incorrect");
    incorrectSnd.play();
    incorrectSnd.currentTime = 0;
  }
  Array.from(answerButtons.children).forEach(button =>{
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  //nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore()
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});

startQuiz(); 