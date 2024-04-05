const answers = document.querySelectorAll(".answer");
const question = document.querySelector(".question");
const nextButton = document.querySelector(".next-button");
const correctAnswer = document.querySelector(".correct-answer");
const questionsCount = document.querySelector(".questions-count")

let index = 0;
let data
let correct = false
let correctAnswerCount=0;
let wrongAnswerCount=0;
nextButton.disabled = true

fetch("https://raw.githubusercontent.com/ChristinaAjemyan/js_group_1/master/data/questions.js")
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.text();
  })
  .then(res => {
    data = convertObj(res)
  question.innerHTML = data[index].question
    answers.forEach((el,i)=>{
        el.innerHTML = data[index].content[i]
    })
    console.log(data)
  })
  .catch(error => {
    console.error("There was a problem with the fetch operation:", error);
  });

function convertObj(string){
    const trimmedString = string.replace(/^const\s+/g, '');
    const questionsArray = eval(trimmedString);
    
    return questionsArray
}


const handleClick = (e) => {
    nextButton.disabled = true;
    correct = false;
    if (index < data.length - 1) {
        index += 1;
        question.innerHTML = data[index].question;
        answers.forEach((el, i) => {
            el.classList.remove("true-answer");
            el.classList.remove("false-answer");
            el.innerHTML = data[index].content[i];
        });
    } else {
        nextButton.removeEventListener("click", handleClick);
    }
};

nextButton.addEventListener("click", handleClick);


function handleAnswerClick(answer, i) {
    return function() {
        if (!correct) {
            if (i === data[index].correct) {
                answer.classList.add("true-answer");
                nextButton.disabled = false;
                correctAnswerCount += 1;
                correctAnswer.innerHTML = correctAnswerCount;
                answer.disabled
                correct = true;
            } else {
                answer.classList.add("false-answer");        
            }
        }
    };
}

answers.forEach((answer, i) => {
    answer.addEventListener("click", handleAnswerClick(answer, i));
});

