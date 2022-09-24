export const shuffle = (array) => {
    let currentIndex = array.length,
        randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
        ];
    }
    return array;
};

export const newQuestion = (question, answers, media = {}) => {
    let result = {
        question: question,
        correct_answer: answers[0], // must be before, because the shuffle is in-place
        shuffled_answers: shuffle(answers)
    }
    if ("image" in media) {
        result.image = media["image"];
    }
    if ("audio" in media) {
        result.audio = media["audio"];
    }
    if ("video" in media) {
        result.video = media["video"];
    }
    return result;
};