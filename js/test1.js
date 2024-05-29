// Массив вопросов для теста 1 с вариантами ответов, правильными ответами и рекомендациями
const questions = [
    {
        question: "Какой элемент HTML используется для создания ссылок?",
        answers: ["<link>", "<a>", "<href>", "<url>"],
        correct: 1,
        recommendation: "Элемент <a> в HTML используется для создания гиперссылок, которые позволяют пользователям переходить на другие веб-страницы или ресурсы."
    },
    {
        question: "Какая CSS единица измерения используется для ширины элемента относительно ширины экрана устройства?",
        answers: ["px", "em", "%", "vw"],
        correct: 3,
        recommendation: "Единица измерения vw (viewport width) используется для определения ширины элемента относительно ширины видимой области экрана устройства."
    },
    {
        question: "Что такое AJAX в контексте веб-разработки?",
        answers:["Язык программирования для создания анимаций на веб-страницах.","Методология разработки интерактивных пользовательских интерфейсов.","Технология для асинхронной передачи данных между браузером и сервером.","Фреймворк для создания адаптивных веб-приложений."],
        correct: 2,
        recommendation:"AJAX (Asynchronous JavaScript and XML) это технология, которая позволяет веб-страницам асинхронно обмениваться данными с сервером без необходимости перезагрузки всей страницы."
    },
    {
        question: "Что такое DOM?",
        answers:["Язык разметки документов для веб-страниц.","Архитектурный стиль для создания веб-сервисов.","Модель объектов документа, представляющая структуру веб-страницы в виде дерева.","Фреймворк для создания динамических пользовательских интерфейсов."],
        correct: 2,
        recommendation:"DOM (Document Object Model) это структура, которая представляет собой дерево объектов, представляющих элементы веб-страницы, и обеспечивает программный доступ к этим элементам для изменения и обновления содержимого страницы."
    },
    {
        question: "Какая функция JavaScript используется для добавления обработчика события к элементу?",
        answers:["addEventListener()","attachEvent()","onClick()","eventHandler()"],
        correct: 0,
        recommendation:"Функция addEventListener() в JavaScript используется для добавления обработчика события к элементу веб-страницы, чтобы реагировать на действия пользователя, такие как щелчок мыши или отправка формы."
    },
    {
        question: "Какой тег HTML используется для создания ненумерованного списка?",
        answers:["<ul>","<ol>","<li>","<nl>"],
        correct: 0,
        recommendation:"Тег <ul> в HTML используется для создания ненумерованного списка, в котором каждый элемент списка обычно представляется маркером или символом."
    },
    {
        question: "Какая функция JavaScript используется для отправки данных на сервер без перезагрузки страницы?",
        answers:["fetch()","submit()","request()","ajax()"],
        correct: 0,
        recommendation:"Функция fetch() в JavaScript используется для отправки запросов на сервер и получения данных с сервера без необходимости перезагрузки всей страницы."
    },
    {
        question: "Какой CSS свойство используется для изменения шрифта текста на веб-странице?",
        answers: ["font-family", "text-style", "font-size", "text-font"],
        correct: 0,
        recommendation: "CSS свойство font-family используется для определения шрифта текста на веб-странице, позволяя выбрать один или несколько шрифтов для отображения текста."

    },
    {
        question: "Какая функция JavaScript используется для получения элемента по его идентификатору?",
        answers: ["getElementById()", "querySelector()", "getElementsByClass()", "getElementByName()"],
        correct: 0,
        recommendation: "Функция getElementById() в JavaScript используется для получения ссылки на элемент HTML по его уникальному идентификатору (ID)."
    },
    {
        question: "Какие теги HTML используются для создания таблицы?",
        answers: ["<table></table>", "<tr></tr>", "<td></td>", "Все вышеперечисленные"],
        correct: 3,
        recommendation: "Для создания таблицы в HTML используются теги <table> для создания самой таблицы, <tr> для создания строк таблицы, <td> для создания ячеек внутри строк, а также <th> для создания заголовков ячеек (колонок). Таким образом, все перечисленные теги необходимы для полноценного создания и оформления таблицы."
    },
    

];

let currentQuestionIndex = 0;
let correctCount = 0;
const unanswered = [];
let selectedAnswer = null;

// Функция для отображения текущего вопроса
function displayQuestion(index) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = '';

    const q = questions[index];
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionTitle = document.createElement('h3');
    questionTitle.innerText = q.question;
    questionDiv.appendChild(questionTitle);

    q.answers.forEach((answer, answerIndex) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `question${index}`;
        input.value = answerIndex;
        input.onclick = () => selectedAnswer = answerIndex;
        label.appendChild(input);
        label.appendChild(document.createTextNode(answer));

        const checkmark = document.createElement('span');
        checkmark.classList.add('checkmark');
        label.appendChild(checkmark);

        questionDiv.appendChild(label);
    });

    quizContainer.appendChild(questionDiv);

    updateProgressBar(index);

    const nextBtn = document.getElementById('next-btn');
    const submitBtn = document.getElementById('submit-btn');
    if (index === questions.length - 1) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'block';
        submitBtn.style.display = 'none';
    }
}

// Функция для обновления полоски прогресса
function updateProgressBar(index) {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((index + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Функция для обработки следующего вопроса
function nextQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === null) {
        alert("Please select an answer before proceeding.");
        return;
    }

    if (selectedAnswer === currentQuestion.correct) {
        correctCount++;
    } else {
        unanswered.push({ question: currentQuestion.question, recommendation: currentQuestion.recommendation });
    }

    selectedAnswer = null;
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion(currentQuestionIndex);
    }
}

// Функция для отправки и проверки теста
function submitQuiz() {
    if (selectedAnswer !== null) {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedAnswer === currentQuestion.correct) {
            correctCount++;
        } else {
            unanswered.push({ question: currentQuestion.question, recommendation: currentQuestion.recommendation });
        }
    }

    const percentage = (correctCount / questions.length) * 100;
    document.getElementById('results').innerText = `You answered ${correctCount} out of ${questions.length} questions correctly. (${percentage}%)`;

    const recommendationsContainer = document.getElementById('recommendations');
    recommendationsContainer.innerHTML = '<h2>Recommendations</h2>';
    unanswered.forEach(item => {
        const recDiv = document.createElement('div');
        recDiv.classList.add('recommendation');

        const questionText = document.createElement('p');
        questionText.innerText = `Question: ${item.question}`;
        recDiv.appendChild(questionText);

        const recommendationText = document.createElement('p');
        recommendationText.innerText = `Recommendation: ${item.recommendation}`;
        recDiv.appendChild(recommendationText);

        recommendationsContainer.appendChild(recDiv);
    });

    document.getElementById('quiz-container').innerHTML = '';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'none';
    document.getElementById('home-btn').style.display = 'block';
}

// Функция для возврата на главную страницу
function goHome() {
    window.location.href = "index.html";
}

// Вызов функции для отображения первого вопроса при загрузке страницы
window.onload = () => displayQuestion(currentQuestionIndex);