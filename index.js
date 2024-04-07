const answers = document.querySelectorAll(".answer");
const question = document.querySelector(".question");
const nextButton = document.querySelector(".next-button");
const correctAnswer = document.querySelector(".correct-answer");
const questionsCount = document.querySelector(".questions-count");

let index = 0;
let data;
let correctAnswerCount = 0;
let correctIndex = undefined;
nextButton.disabled = true;

fetch("https://raw.githubusercontent.com/ChristinaAjemyan/js_group_1/master/data/questions.js")
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.text();
    })
    .then(res => {
        data = convertObj(res);
        updateQuestion();
        console.log(data);
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    });

function convertObj(string) {
    const trimmedString = string.replace(/^const\s+/g, '');
    const questionsArray = eval(trimmedString);
    return questionsArray;
}

function updateQuestion() {
    question.innerHTML = data[index].question;
    answers.forEach((el, i) => {
        el.innerHTML = data[index].content[i];
        el.classList.remove("true-answer");
        el.classList.remove("false-answer");
        el.addEventListener("click", handleAnswerClick);
    });
}

function handleAnswerClick(e) {
    correctAnswerCount++;
   if(index < data.length - 1){
    nextButton.disabled = false;
   }
    answers.forEach((answer, i) => {
        if (i === data[index].correct) {
            answer.classList.add("true-answer");
        } else {
            answer.classList.add("false-answer");
        }
    });
    answers.forEach(answer => {
        answer.removeEventListener("click", handleAnswerClick);
    });
}

function handleNextButtonClick() {
    if (index < data.length - 1) {
        index++;
        updateQuestion();
        nextButton.disabled = true;
    } else {
        nextButton.removeEventListener("click", handleNextButtonClick);
    }
}

nextButton.addEventListener("click", handleNextButtonClick);
