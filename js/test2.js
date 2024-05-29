// Массив вопросов для теста 1 с вариантами ответов, правильными ответами и рекомендациями
const questions = [
    {
        question: "Что такое REST API?",
        answers: ["Распределенная система передачи данных.", "Архитектурный стиль для разработки веб-служб.", "Программный интерфейс для работы с базами данных.", "Фреймворк для создания пользовательских интерфейсов."],
        correct: 1,
        recommendation: "REST API представляет собой архитектурный стиль для создания веб-сервисов, который опирается на принципы REST (Representational State Transfer). Он использует HTTP-протокол для передачи данных между клиентом и сервером, обеспечивая масштабируемость, надежность и простоту взаимодействия между компонентами приложения."
    },
    {
        question: "Что такое ORM?",
        answers: ["Объектно-реляционное отображение.", "Модель объектов в React.js.", "Методология разработки программного обеспечения.", "Технология виртуализации серверов."],
        correct: 0,
        recommendation: "ORM (Object-Relational Mapping) это техника программирования, которая связывает объекты приложения с записями в базе данных, позволяя разработчикам работать с данными в виде объектов, что облегчает разработку и сопровождение приложений."
    },
    {
        question: "Что такое миграции баз данных?",
        answers: ["Процесс переноса данных из одной базы данных в другую.", "Автоматическое обновление структуры базы данных при изменении схемы.", "Создание резервных копий баз данных.", "Оптимизация запросов к базе данных."],
        correct: 1,
        recommendation: "Миграции баз данных это способ автоматического обновления структуры базы данных при изменениях в схеме, таких как добавление новых таблиц, изменение столбцов и т. д., чтобы обеспечить согласованность данных и кода приложения."
    },
    {
        question: "Что такое масштабирование приложений?",
        answers: ["Изменение размеров шрифтов и элементов управления.", "Увеличение производительности приложения для поддержки большего количества пользователей.", "Использование кэширования для улучшения скорости загрузки приложения.", "Работа с различными разрешениями экранов устройств."],
        correct: 1,
        recommendation: "Масштабирование приложений это процесс увеличения производительности и возможностей приложения для обработки большего количества запросов или пользователей без потери производительности."
    },
    {
        question: "Какой HTTP метод используется для запроса данных с сервера?",
        answers: ["GET", "POST", "PUT", "DELETE"],
        correct: 0,
        recommendation: "Метод GET используется для запроса данных с сервера, например, получения веб-страницы или данных из базы данных."
    },
    {
        question: "Какой язык программирования чаще всего используется для написания серверной части веб-приложений?",
        answers: ["HTML", "CSS", "JavaScript", "Python"],
        correct: 2,
        recommendation: "JavaScript чаще всего используется для написания серверной части веб-приложений с использованием платформы Node.js."
    },
    {
        question: "Что такое DNS?",
        answers: ["Протокол для передачи данных между сервером и клиентом.", "Структура данных для хранения информации о доменах.", "Метод шифрования данных в сети Интернет.", "Программное обеспечение для мониторинга сетевого трафика."],
        correct: 1,
        recommendation: "DNS (Domain Name System) это система, которая преобразует доменные имена в IP-адреса и наоборот, обеспечивая удобный доступ к сетевым ресурсам по имени."
    },
    {
        question: "Что такое серверное кэширование?",
        answers: ["Методология разработки серверных приложений.", "Техника оптимизации серверной производительности путем сохранения результатов запросов для последующего использования.", "Сервис для обработки и анализа журналов сервера.", "Программное обеспечение для защиты сервера от атак DDoS."],
        correct: 1,
        recommendation: "Серверное кэширование это техника оптимизации серверной производительности, при которой результаты запросов к серверу сохраняются на некоторое время для последующего использования. Это позволяет избежать повторного выполнения тяжеловесных операций или запросов к базе данных, ускоряя обработку запросов от клиентов и снижая нагрузку на сервер."
    },
    {
        question: "Какой протокол обычно используется для безопасной передачи данных между клиентом и сервером?",
        answers: ["FTP", "HTTP", "TCP", "HTTPS"],
        correct: 3,
        recommendation: "HTTPS (Hypertext Transfer Protocol Secure) это расширение протокола HTTP с использованием криптографических методов для защищенной передачи данных между клиентом и сервером. Он обеспечивает конфиденциальность, целостность и аутентификацию данных."
    },
    {
        question: "Что такое серверная аутентификация?",
        answers: ["Проверка подлинности клиентского устройства при подключении к серверу.", "Проверка подлинности сервера перед передачей данных клиенту.", "Метод аутентификации пользователей на веб-сервере.", "Защита сервера от несанкционированного доступа."],
        correct: 1,
        recommendation: "Серверная аутентификация это процесс проверки подлинности сервера перед тем, как клиент отправит ему данные. Это важная мера безопасности, которая помогает клиентам удостовериться, что они связываются с доверенным сервером, а не с поддельным или злоумышленным."
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