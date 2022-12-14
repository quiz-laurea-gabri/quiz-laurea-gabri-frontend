<template>
    <Loader v-if="store.loading"></Loader>
    <div v-else
        class="grid grid-rows-6 grid-cols-1 text-gray-600 mx-auto w-11/12 md:w-8/12 lg:w-7/12 overflow-y-hidden custom-height">
        <div class="row-span-2">
            <div class="min-h-full items-center justify-between py-4 rounded-lg flex flex-col">
                <div class="flex my-4">
                    <div v-for="(item, index) in store.data.results"
                        class="w-3 h-3 rounded text-white mx-1 text-center text-xs flex items-center justify-center"
                        :class="{
                          'bg-green-300': item.guessedRight,
                          'bg-red-300': item.guessedRight == false,
                          'bg-gray-200': !item.guessedRight,
                        }"></div>
                </div>
                <div v-if="store.data.results[store.currentQuestion].image">
                    <div
                        class="border-4 border-gray-400 p-3 rounded-lg shadow-xl flex items-center justify-center md:p-5 mb-3 w-full">
                        <img :src="store.data.results[store.currentQuestion].image" />
                    </div>
                </div>
                <div v-if="store.data.results[store.currentQuestion].video">
                    <div
                        class="border-4 border-gray-400 p-3 rounded-lg shadow-xl flex items-center justify-center md:p-5 mb-3 w-full">
                        <video-player :src=store.data.results[store.currentQuestion].video controls :loop="true"
                            :volume="0.6" />
                    </div>
                </div>
                <div v-if="store.data.results[store.currentQuestion].audio">
                    <div>
                        <audio-player ref="audioPlayer" :audio-list="[store.data.results[store.currentQuestion].audio]"
                            :show-next-button="false" :show-prev-button="false" :is-loop="false"
                            theme-color="#ff2929" />
                    </div>
                </div>
                <div
                    class="border-4 border-gray-400 p-3 w-full rounded-lg shadow-xl flex items-center justify-center md:p-5 mb-3">
                    <h1 class="text-center font-medium md:text-lg"
                        v-html="store.data.results[store.currentQuestion].question"></h1>
                </div>
            </div>
        </div>
        <div>
            <!-- class="row-span-3"> -->
            <div class="min-h-full flex flex-col justify-center">
                <div class="grid grid-cols-1 gap-4 md:gap-4 md:grid-cols-2">
                    <Answer v-for="answer in store.data.results[store.currentQuestion]
                    .shuffled_answers" :key="answer" :text="answer" :is-valid-answer="
                      answer == store.data.results[store.currentQuestion].correct_answer
                    " :is-invalid-answer="
                      answer != store.data.results[store.currentQuestion].correct_answer
                    " :show-answer="store.showAnswer" @check-answer="store.checkAnswer"></Answer>
                </div>
            </div>
        </div>
        <div>
            <div class="min-h-full min-w-full flex items-center justify-center">
                <Transition name="grow-fade">
                    <button @click="store.getNextQuestion"
                        class="px-12 py-4 bg-gray-600 text-white text-lg rounded-lg hover:bg-gray-700 transition w-full md:w-1/3"
                        v-show="store.showAnswer">
                        Next
                    </button>
                </Transition>
            </div>
        </div>
    </div>
</template>
  
<script>
import Answer from './Answer.vue';
import Loader from './Loader.vue';
import { store } from '../store';
import { VideoPlayer } from '@videojs-player/vue';
import 'video.js/dist/video-js.css';
import AudioPlayer from '@liripeng/vue-audio-player';

export default {
    components: {
        Answer,
        Loader,
        VideoPlayer,
        AudioPlayer
    },
    data() {
        return {
            store,
        };
    },
    created() {
        this.store.getData();
    },
};
</script>
  
<style scoped>
.grow-fade-enter-active {
    transition: all 0.2s ease-out;
}

.grow-fade-leave-active {
    transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.grow-fade-enter-from,
.grow-fade-leave-to {
    opacity: 0;
    transform: scale(0.8) translateY(60px);
}

.custom-height {
    min-height: 100vh;
}

@media only screen and (max-width: 800px) {
    .custom-height {
        /* 92vh to make up for the toolbar in the mobile browser */
        min-height: 92vh;
    }
}
</style>