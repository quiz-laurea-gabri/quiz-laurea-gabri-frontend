import { reactive } from 'vue';
import { shuffle, newQuestion } from './helpers';
import gabriPanchina from './assets/gabri_panchina.jpeg';
import gabriOnda from './assets/gabri_onda.mp4';
import gabriPompino from './assets/pompino.mp3';

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
            results: [
                newQuestion("Completa l'audio.", ["m'ha fatto un pompino", "me la sono scopata", "m'ha detto di no", "le ho fatto leggere Berserk"], { audio: gabriPompino }),
                newQuestion("Quanti shottini avevi bevuto quella sera?", ["12", "6", "ventordici", "yes"], { image: gabriPanchina }),
                newQuestion("Sorry, _____________?", ["Piazza Dam", "a blowjob for my friend", "aereo piccolo", "fratm"]),
                newQuestion("Quanto costava il blowjob per Edo ad Amsterdam?", ["50€", "boh", "si", "daje"]),
                newQuestion("Quanti specchietti hai rotto a Rimini quella volta con Pippo?", ["3", "molti", "4", "2"]),
                newQuestion("", ["Aneddoto", "Anetodo", "Anettodo", "Anedotto"]),
                newQuestion("Qual è il limite massimo di velocità in autostrada?", ["80 km/h", "50 km/h", "60 km/h", "70 km/h"]),
                //
                newQuestion("Cos'è uno shuttle da Bologna a Rimini?", ["Un autobus", "Un aereo piccolo", "Una navicella spaziale", "Un carrello della spesa"]),
                newQuestion("Qual è la media mensile delle tue chiamate Whatsapp a Dani?", ["20-30", "0-10", "10-20", "30+"]),
                newQuestion("A che ora?", ["Nove meno un quarto", "Otto e tre quarti", "Nove e un quarto", "Nove"]),
                newQuestion("Quale di questi NON è un metodo di rimorchio funzionante?", ["Chiederle di uscire", "Birretta?", "Mostrare foto di gatti", "Dire che lavori per Netflix"]),
                newQuestion("Chi ti ha pagato le patatine al George?", ["Lori", "Pippo", "Dani", "Edo"]),
                newQuestion("Do you speak english?", ["Una porzione o due?", "Yes", "Of course", "Ma chi sei"]),
                newQuestion("Fino a che ora ti sei sparato hentai la sera prima di Staccoli?", ["4:00", "3:00", "2:00", "5:00"]),
                newQuestion("Cosa c'era nella piastra che hai rovesciato al cinese?", ["Noodles", "Riso", "Spaghetti", "Ravioli"]),
                newQuestion("Come si chiama la libreria?", ["Billy", "George", "Aaron", "Thomas"]),
                newQuestion("Quale combinazione ti ha fatto sboccare ad Amsterdam?", ["Silver Haze e AK 47", "Cultilite e Davinci", "Delta9 e Purple Haze", "Enecta e Florlis"]),
                newQuestion("Perchè eravamo sul porto quella sera?", ["Per vedere le onde", "A pesca", "Per fare un tuffo", "Per pisciare"], { video: gabriOnda }),
                newQuestion("Dove fu scattata la foto commemorativa dell'episodio del raviolo?", ["Tokyo", "Fuji 3", "Sushi King", "Sushimi"]),
                newQuestion("Quali di questi ritmi non è presente nelle opere d'arte?", ["Shuffle", "Lento", "Pausato", "Accelerato"]),
                newQuestion("In quale volume è presente la scena del cavallo?", ["17", "18", "15", "16"]),
                newQuestion("Chi è rimasto più scioccato dal fatto che tu avessi finalmente trovato una tipa?", ["Sbiru", "Dani", "Simo", "Pietro"]),
                newQuestion("Qual è quello giusto?", ["Beerotto", "Birotto", "Birrotto", "Berrotto"]),
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