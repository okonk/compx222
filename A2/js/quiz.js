
const questions = [
    { "image": "light-rail-crossing.png", "question": "What does this sign mean?", "choices": ["Oncoming light rail", "Light rail only", "Light rail crossing ahead", "Bus stop"], "answer": 2 },
    { "image": "carinwronglocation.png", "question": "Traffic has stopped ahead. Have any of these cars stopped in the wrong location?", "choices": ["None of these cars should have stopped here", "Car C is incorrectly positioned", "Car B is incorrectly positioned", "Car A is incorrectly positioned"], "answer": 1 },
    { "image": "orderofcars.png", "question": "In what order should these cars proceed?", "choices": ["Cars C, B, and then A", "Cars C, A, and then B", "Cars B, A, and then C", "Cars A, C, and then B"], "answer": 1 },
    { "image": "parkeddownhill.png", "question": "You have parked by the kerb facing downhill. Which way should you point your front wheels?", "choices": ["Towards the kerb", "It does not matter", "Straight", "Away from the kerb"], "answer": 0 },
    { "image": "clearway.png", "question": "What is a clearway?", "choices": ["An area where you must not park", "An area where you may not drive", "An area where only buses and taxis may park", "An area where you must not stop or park"], "answer": 3 },
    { "image": "50kmh.png", "question": "You are driving in a 60 km/h area and you see a 50 km/h sign ahead. When should you start slowing down?", "choices": ["At any point within 100 metres of the sign", "At the sign", "Before reaching the sign", "After the sign"], "answer": 2 },
    { "image": "30temp.png", "question": "When do road work speed limit signs apply?", "choices": ["Only during the day", "Road work speed limits are advisory only", "At all times", "Only when workers are present"], "answer": 2 },
    { "image": "overtake.png", "question": "Assuming that there are no oncoming vehicles ahead, is the overtake pictured legal?", "choices": ["Only if there is no traffic approaching from the side road", "No", "Yes", "Only if the overtaking car sounds its horn before passing"], "answer": 1 },
    { "image": "escape.png", "question": "An oncoming vehicle has entered your lane. Where should you plan your escape?", "choices": ["Prepare to escape off the road to the left", "Prepare to enter the oncoming lane to the right", "Nowhere, remain in your lane", "Any of the above"], "answer": 0 },
    { "image": "stop.png", "question": "What must you do at a Stop sign?", "choices": ["Slow down and prepare to stop for traffic", "Stop if other traffic is present", "Come to a complete stop and only proceed once the road is clear", "Proceed through - other traffic must stop for you"], "answer": 2 }
];

let currentQuestion = 0;
let answers = [];

function hideQuiz() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("endsummary").style.display = "none";
    document.getElementById("instructions").style.display = "";
}

function startQuiz() {
    document.getElementById("instructions").style.display = "none";
    document.getElementById("endsummary").style.display = "none";

    currentQuestion = 0;
    answers = [];

    showQuestion(currentQuestion);

    document.getElementById("quiz").style.display = "";
}

function showQuestion(index) {
    const question = questions[index];

    document.getElementById("answersform").style.display = "";
    document.getElementById("answerssummary").style.display = "none";

    const image = document.getElementById("image");
    image.src = "../img/" + question.image;
    image.alt = "quiz image";

    const questionText = document.getElementById("question");
    questionText.innerText = (index + 1) + ". " + question.question;

    const answerIds = ["a1", "a2", "a3", "a4"]
    for (let i = 0; i < answerIds.length; i++) {
        const label = document.getElementById(answerIds[i] + "label");
        label.innerText = question.choices[i];

        const a = document.getElementById(answerIds[i]);
        a.checked = false;
    }

    const submitbutton = document.getElementById("submitbutton");
    submitbutton.value = "Submit answer";

    const form = document.getElementById("quizform");
    form.onsubmit = (event) => { checkAnswer(event); return false; };
}

function showAnswer(index, answer) {
    const question = questions[index];

    const answerIds = ["a1", "a2", "a3", "a4"]
    for (let i = 0; i < answerIds.length; i++) {
        const summary = document.getElementById(answerIds[i] + "summary");

        if (summary.classList.contains("wrong")) summary.classList.remove("wrong");
        if (summary.classList.contains("correct")) summary.classList.remove("correct");

        if (i === answer && question.answer != answer) {
            summary.classList.add("wrong");
            summary.innerHTML = '<img src="../img/cross.png" alt="incorrect answer" /> ' + question.choices[i];
        }
        else if (i === question.answer) {
            summary.classList.add("correct");
            summary.innerHTML = '<img src="../img/check.png" alt="correct answer" /> ' + question.choices[i];
        }
        else {
            summary.innerText = question.choices[i];
        }
    }

    const submitbutton = document.getElementById("submitbutton");
    submitbutton.value = "Next question";

    const form = document.getElementById("quizform");
    form.onsubmit = (event) => { nextQuestion(event); return false; };

    document.getElementById("answersform").style.display = "none";
    document.getElementById("answerssummary").style.display = "";
}

function checkAnswer(event) {
    const answerString = event.target.answer.value;
    const answer = parseInt(answerString[1]) - 1;

    answers.push(answer);

    showAnswer(currentQuestion, answer);
}

function nextQuestion(event) {
    currentQuestion++;

    if (currentQuestion >= questions.length) {
        showEndSummary();
    }
    else {
        showQuestion(currentQuestion);
    }
}

function showEndSummary() {
    document.getElementById("quiz").style.display = "none";

    const wrongAnswerSummary = [];

    let correct = 0;
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];

        if (question.answer === answers[i]) {
            correct++;
        }
        else {
            const wrongAnswer = document.createElement("div");
            wrongAnswer.className = "endsummaryitem";

            const img = document.createElement("img");
            img.className = "quizimage";
            img.src = "../img/" + question.image;
            img.alt = "quiz image";
            wrongAnswer.appendChild(img);

            const questionDiv = document.createElement("div");
            questionDiv.className = "question";
            questionDiv.innerHTML = (i + 1) + ". " + question.question;
            wrongAnswer.appendChild(questionDiv);

            const wrong = document.createElement("div");
            wrong.className = "wrong";
            wrong.innerHTML = '<img src="../img/cross.png" alt="incorrect answer" /> ' + question.choices[answers[i]];
            wrongAnswer.appendChild(wrong);

            const correct = document.createElement("div");
            correct.className = "correct";
            correct.innerHTML = '<img src="../img/check.png" alt="correct answer" /> ' + question.choices[question.answer];
            wrongAnswer.appendChild(correct);

            wrongAnswerSummary.push(wrongAnswer);
        }
    }

    const endsummary = document.getElementById("endsummary");
    const score = document.createElement("div");
    score.className = "score";
    score.innerHTML = "You got " + correct + "/" + questions.length + " questions correct.";
    endsummary.appendChild(score);

    for (const wrongAnswer of wrongAnswerSummary)
        endsummary.appendChild(wrongAnswer);

    endsummary.style.display = "";
}

window.addEventListener("load", function () {
    hideQuiz();
});