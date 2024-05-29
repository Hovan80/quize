// Массив вопросов для теста 1 с вариантами ответов, правильными ответами и рекомендациями
const questions = [
    {
        question: "Какой из следующих элементов HTML используется для создания заголовка страницы?",
        answers: ["<body>", "<header>", "<title>", "<h1>"],
        correct: 3,
        recommendation: "В HTML тег <h1> используется для создания заголовка страницы. Он представляет собой наиболее высокий уровень заголовка и обычно отображается как самый крупный и выделенный текст на странице."
    },
    {
        question: "Какая из следующих единиц измерения используется для определения размера шрифта в CSS?",
        answers: ["px", "cm", "mm", "Все вышеперечисленное"],
        correct: 3,
        recommendation: "Размер шрифта в CSS можно определять в различных единицах измерения, таких как пиксели (px), сантиметры (cm), и миллиметры (mm)."
    },
    {
        question: "Какой из следующих методов JavaScript используется для добавления элемента в DOM?",
        answers: ["appendChild()", "createElement()", "getElementById()", "querySelector()"],
        correct: 0,
        recommendation: "Метод appendChild() в JavaScript используется для добавления нового элемента в конец родительского элемента в структуре DOM."
    },
    {
        question: "Что такое \"событие\" в контексте веб-разработки?",
        answers: ["Действие, которое происходит на веб-странице, например, щелчок мышью.", "Файл, содержащий код JavaScript.", "Фреймворк для разработки веб-приложений.", "Ввести ответ с клавиатуры"],    //ВВОД С КЛАВЫ
        correct: 0,
        recommendation: "В контексте веб-разработки событие - это действие, которое происходит на веб-странице, такое как щелчок мышью, наведение курсора, нажатие клавиши и т. д."
    },
    {
        question: "Какой из следующих методов JavaScript используется для получения значения элемента с помощью его id?",
        answers: ["getElementById()", "querySelector()", "createElement()", "appendChild()"],
        correct: 0,
        recommendation: "Метод getElementById() в JavaScript используется для получения ссылки на элемент по его уникальному идентификатору (id)."
    },
    {
        question: "Что такое \"фреймворк\"?",
        answers: ["Набор инструментов и библиотек для разработки веб-приложений.", "Язык программирования для создания веб-страниц.", "Модель представления документа.", "Ввести ответ с клавиатуры"],     //ВВОД С КЛАВЫ
        correct: 0,
        recommendation: "Фреймворк - это набор инструментов, библиотек и стандартов программирования, который облегчает разработку и упрощает создание веб-приложений."
    },
    {
        question: "Какой из следующих фреймворков является самым популярным для разработки веб-приложений на JavaScript?",
        answers: ["React", "Angular", "Vue.js", "Ввести ответ с клавиатуры"],                                                                            //ВВОД С КЛАВЫ
        correct: 0,
        recommendation: "React - один из самых популярных фреймворков для разработки веб-приложений на JavaScript."
    },
    {
        question: "Что такое \"компонент\" в React?",
        answers: ["Самостоятельная часть пользовательского интерфейса с собственным состоянием и поведением.", "Модель представления документа.", "Фреймворк для разработки веб-приложений.", "Ввести ответ с клавиатуры"],
        correct: 0,
        recommendation: "В React компонент представляет собой самостоятельную часть пользовательского интерфейса, которая имеет собственное состояние и поведение."
    },
    {
        question: "Что такое \"реактивное программирование\"?",
        answers: ["Стиль программирования, основанный на потоках данных и распространении изменений.", "Метод оптимизации рендеринга веб-приложений.", "Язык программирования для разработки веб-приложений.", "Ввести ответ с клавиатуры"],
        correct: 0,
        recommendation: "Реактивное программирование - это стиль программирования, основанный на потоках данных и автоматическом распространении изменений."
    },
    {
        question: "Что такое \"мобильная адаптивность\"?",
        answers: ["Способность веб-сайта адаптироваться к различным размерам экрана устройств.", "Метод оптимизации рендеринга веб-приложений.", "Язык программирования для разработки веб-приложений.", "Ввести ответ с клавиатуры"],
        correct: 0,
        recommendation: "Мобильная адаптивность - это способность веб-сайта или приложения адаптироваться к различным размерам экрана устройств для обеспечения удобства использования на мобильных устройствах."
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

    const radioInputs = [];
    q.answers.forEach((answer, answerIndex) => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = `question${index}`;
        input.value = answerIndex;
        input.onclick = () => {
            if (answer === 'Ввести ответ с клавиатуры') {
                answerInput.style.display = 'block';
                selectedAnswer = answerInput.value;
            } else {
                answerInput.style.display = 'none';
                selectedAnswer = answerIndex;
            }
        };
        label.appendChild(input);
        label.appendChild(document.createTextNode(answer));

        const checkmark = document.createElement('span');
        checkmark.classList.add('checkmark');
        label.appendChild(checkmark);

        questionDiv.appendChild(label);
        radioInputs.push(input);
    });

    const answerInput = document.createElement('input');
    answerInput.type = 'text';
    answerInput.placeholder = 'Введите ваш ответ';
    answerInput.style.display = 'none'; // По умолчанию скрываем текстовое поле
    questionDiv.appendChild(answerInput);

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

    // Проверяем, если выбран ответ с клавиатуры
    if (currentQuestion.answers[selectedAnswer] === 'Ввести ответ с клавиатуры') {
        const userAnswer = document.getElementById('user-answer').value.trim().toLowerCase();
        const correctAnswer = currentQuestion.recommendation.toLowerCase();
        const similarityThreshold = 0.7; // Порог сходства для приблизительного ответа

        // Вычисляем коэффициент сходства между введенным ответом и правильным ответом
        const similarity = stringSimilarity.compareTwoStrings(userAnswer, correctAnswer);

        if (similarity >= similarityThreshold) {
            correctCount++;
        } else {
            unanswered.push({ question: currentQuestion.question, recommendation: currentQuestion.recommendation });
        }
    } else {
        // Проверяем, если ответ выбран правильно
        if (selectedAnswer == currentQuestion.correct) {
            correctCount++;
        } else {
            unanswered.push({ question: currentQuestion.question, recommendation: currentQuestion.recommendation });
        }
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