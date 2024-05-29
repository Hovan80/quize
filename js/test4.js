// Массив вопросов для теста 1 с вариантами ответов, правильными ответами и рекомендациями
const questions = [
    {
        question: "Какой язык программирования чаще всего используется для написания серверной части веб-приложений?",
        answers: ["JavaScript", "Python", "HTML", "Java"],
        correct: 1,
        recommendation: "Python широко используется для написания серверной части веб-приложений из-за своей простоты, выразительности и богатого экосистемы библиотек."
    },
    {
        question: "Какой метод HTTP используется для создания новых данных на сервере?",
        answers: ["GET", "POST", "PUT", "DELETE"],
        correct: 1,
        recommendation: "Метод POST используется для создания новых данных на сервере. Этот метод отправляет данные на сервер для обработки в контексте создания новых ресурсов."
    },
    {
        question: "Что такое NoSQL база данных?",
        answers: ["Процесс переноса данных из одной базы данных в другую.", "Автоматическое обновление структуры базы данных при изменении схемы.", "Создание резервных копий баз данных.", "Оптимизация запросов к базе данных."],
        correct: 1,
        recommendation: "Миграции баз данных - это процесс автоматического обновления структуры базы данных при изменении схемы. Они позволяют управлять изменениями в базе данных и обеспечивают согласованность данных во времени."
    },
    {
        question: "Что такое аутентификация на сервере?",
        answers: ["Проверка подлинности клиента при подключении к серверу.", "Проверка подлинности сервера перед передачей данных клиенту.", "Метод аутентификации пользователей на веб-сервере.", "Защита сервера от несанкционированного доступа."],
        correct: 2,
        recommendation: "Аутентификация на сервере - это процесс проверки подлинности пользователей на веб-сервере, который обычно включает в себя проверку учетных данных пользователя (логин и пароль)."
    },
    {
        question: "Что такое RESTful API?",
        answers: ["Протокол передачи данных между сервером и клиентом.", "Методология разработки программного обеспечения, использующая REST архитектурный стиль.", "Фреймворк для создания веб-сервисов.", "Язык программирования для создания анимаций на веб-страницах."],
        correct: 1,
        recommendation: "RESTful API - это методология разработки программного обеспечения, которая использует REST архитектурный стиль для построения веб-сервисов. Она основана на принципах REST, таких как использование универсальных интерфейсов и без состояния."
    },
    {
        question: "Что такое JWT?",
        answers: ["Формат данных для передачи информации между клиентом и сервером.", "Протокол для безопасной передачи данных через сеть.", "Метод аутентификации пользователей на веб-сервере.", "Стандарт для создания и передачи токенов аутентификации."],
        correct: 3,
        recommendation: "JWT (JSON Web Token) - это стандарт для создания и передачи токенов аутентификации в формате JSON. Они используются для безопасной передачи информации между клиентом и сервером, обычно для аутентификации и авторизации."
    },
    {
        question: "Какой принцип описывает концепцию \"необходимости соответствия\" в контексте RESTful API?",
        answers: ["GET", "POST", "PUT", "Концепция \"необходимости соответствия\""],                                          
        correct: 3,
        recommendation: "\"необходимости соответствия\" описывает, как API должно предоставлять \"представления\" данных."
    },
    {
        question: "Какая конструкция языка Python используется для обработки исключений?",
        answers: ["try...catch", "catch...finally", "try...except", "Все выше перечисленные"],              //ВВОД С КЛАВЫ
        correct: 2,
        recommendation: "Конструкция try...except в языке Python используется для обработки исключений. Она позволяет программе выполнить блок кода и перехватить любые исключения, которые могут возникнуть во время его выполнения, чтобы предотвратить прекращение работы программы."
    },
    {
        question: "Что такое \"бессерверные вычисления\" (serverless computing)?",
        answers: ["Метод разработки веб-приложений, где серверная часть полностью отсутствует.", "Технология, позволяющая запускать код без необходимости управлять серверами.", "Метод оптимизации производительности веб-приложений путем удаления ненужных серверных компонентов.", "Фреймворк для создания веб-приложений без использования серверной части."],
        correct: 1,
        recommendation: "\"Бессерверные вычисления\" (serverless computing) - это технология, которая позволяет запускать код без необходимости управлять серверами напрямую. Вместо этого, облачный провайдер управляет инфраструктурой, автоматически масштабируя приложение в зависимости от его нагрузки."
    },
    {
        question: "Что такое \"микросервисы\"?",
        answers: ["Небольшие, независимые приложения, работающие как отдельные сервисы.", "Метод разработки веб-приложений, где серверная часть разделена на множество маленьких сервисов.", "Технология для создания небольших, независимых веб-приложений.", "Фреймворк для создания микросервисов."],
        correct: 0,
        recommendation: "\"Микросервисы\" - это архитектурный подход, при котором приложение разбивается на небольшие, независимые сервисы, каждый из которых выполняет определенную функцию. Эти сервисы могут взаимодействовать друг с другом через API и работать как отдельные компоненты."
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