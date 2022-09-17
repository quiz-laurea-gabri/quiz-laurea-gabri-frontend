import { reactive } from 'vue';
import { shuffle } from './helpers';

export const store = reactive({
    score: 0,
    questionCount: 0,
    quizEnded: false,
    data: null,
    options: null,
    loading: true,
    currentQuestion: 0,
    step: 0,
    showAnswer: false,
    incrementScore() {
        this.score++;
    },
    restartQuiz() {
        this.score = 0;
        this.step = 0;
        this.questionCount = 0;
        this.quizEnded = false;
        this.data = null;
        this.loading = true;
    },
    setQuestionCount(count) {
        this.questionCount = count;
    },
    getData() {
        this.currentQuestion = 0;
        this.showAnswer = false;
        this.loading = false;
        this.questionCount = 1;
        this.data = {
            results: [{
                shuffled_answers: shuffle(["Piazza Dam", "a blowjob for my friend", "aereo piccolo", "fratm"]),
                question: "Sorry, _____________?"
            },
            {
                shuffled_answers: shuffle(["50€", "boh", "si", "daje"]),
                question: "Quanto costava il blowjob per Edo ad Amsterdam?"
            },
            {
                shuffled_answers: shuffle(["3", "molti", "4", "2"]),
                question: "Quanti specchietti hai rotto a Rimini quella volta con Pippo?"
            },
            {
                shuffled_answers: shuffle(["Aneddoto", "Anetodo", "Anettodo", "Anedotto"]),
                question: ""
            },
            {
                shuffled_answers: shuffle(["50 km/h", "60 km/h", "70 km/h", "80 km/h"]),
                question: "Qual è il limite massimo di velocità in autostrada?"
            },
            ]
        };
        // this.loading = true;
        // fetch(
        //     `https://opentdb.com/api.php?category=${this.options.category}&amount=10`
        // )
        //     .then((res) => res.json())
        //     .then((res) => {
        //         res.results.map((item) => {
        //             item.shuffled_answers = shuffle([
        //                 item.correct_answer,
        //                 ...item.incorrect_answers,
        //             ]);
        //             delete item.incorrect_answers;
        //         });
        //         this.data = res;
        //         this.currentQuestion = 0;
        //         this.showAnswer = false;
        //         this.questionCount = res.results.length;
        //         this.loading = false;
        //     });
    },
    checkAnswer(answer) {
        if (this.data.results[this.currentQuestion].correct_answer == answer) {
            this.incrementScore();
            this.showAnswer = true;
            this.data.results[this.currentQuestion].guessedRight = true;
            return;
        }
        this.data.results[this.currentQuestion].guessedRight = false;
        this.showAnswer = true;
    },
    getNextQuestion() {
        if (this.currentQuestion >= this.data.results.length - 1) {
            this.quizEnded = true;
            this.step = 2;
        }
        this.currentQuestion += 1;
        this.showAnswer = false;
    },
    startQuiz(payload) {
        this.options = payload;
        this.step = 1;
    },
});