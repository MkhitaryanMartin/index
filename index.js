const answers = document.querySelectorAll(".answer");
const question = document.querySelector(".question");
const nextButton = document.querySelector(".next-button");
const correctAnswer = document.querySelector(".correct-answer");
const questionsCount = document.querySelector(".questions-count");
const helper = document.querySelector(".helper");
const reset = document.querySelector(".reset");
let helperActive = true;
let click = false;
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
    })
    .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
    });

function convertObj(string) {
    const trimmedString = string.replace(/^const\s+/g, '');
    const questionsArray = eval(trimmedString);
    return questionsArray;
}
function generateRandomExcluding(exclude) {
   let randomNumber;
    do {
        randomNumber = Math.floor(Math.random() * 4); 
    } while (randomNumber === exclude);
    return randomNumber;
}

function updateQuestion() {
    question.innerHTML = data[index].question;
    answers.forEach((el, i) => {
        el.classList.remove("active-answer")
        el.style.display = "flex";
        el.innerHTML = data[index].content[i];
        el.classList.remove("true-answer");
        el.classList.remove("false-answer");
        el.addEventListener("click", handleAnswerClick);
    });
}

function handleAnswerClick(e) {
    if(!click){
        e.target.classList.add("active-answer")
        click=true
    }
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
        answer.removeEventListener("click", (e)=>{
            handleAnswerClick(e)
        });
    });
}

function handleNextButtonClick() {
    click= false
    if (index < data.length - 1) {
        index++;
        updateQuestion();
        nextButton.disabled = true;
    } else {
        nextButton.removeEventListener("click", handleNextButtonClick);
    }
}

nextButton.addEventListener("click", handleNextButtonClick);

helper.addEventListener("click", ()=>{
    let activeIndex = generateRandomExcluding(data[index].correct)
 if(helperActive && nextButton.disabled && index < data.length - 1){
    helperActive = false
    helper.classList.add("not-active");
    answers.forEach((el, i) => {
        if(i === data[index].correct){
            el.innerHTML = data[index].content[data[index].correct];
        }else if(i === activeIndex){
            el.innerHTML = data[index].content[i];
        }else{
            el.style.display = "none";
        }
    });
 }
})



reset.addEventListener("click", ()=>{
    index = 0;
    click= false;
    helperActive= true
    helper.classList.remove("not-active");
    if (index < data.length - 1) {
        updateQuestion();
        nextButton.disabled = true;
    }
})

