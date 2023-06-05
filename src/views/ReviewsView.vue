<template>
    <Header />
    <div class="d-flex flex-grow-1 justify-content-center" :class="{ 'align-items-start' : this.reviews['pros'].length > 0 || this.reviews['cons'].length > 0, 'align-items-center': this.reviews['pros'].length === 0 && this.reviews['cons'].length === 0 }">
        <div class="col-10 col-sm-10 col-md-10 col-xl-8 col-xxl-6">
            <div class="row">
                <div class="input-group p-0 col-12 mt-4">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="Insert the link to the game for which you would like to process reviews..."
                        aria-label="GameSearch"
                        v-model="gameString"
                        @change="getReviews()"
                    />
                </div>
                <div class="row mt-4" v-if="this.reviews['pros'].length > 0 || this.reviews['cons'].length > 0">
                    <div class="col-6">
                        <p class="text-center mb-1 fs-5 pros-icon"><b>PROS</b></p>
                        <div
                            class="review d-flex justify-content-center border rounded-2 py-2 px-1 mb-1"
                            v-for="review in this.reviews['pros']"
                            @mouseover="shotTip(review)"
                            @mouseleave="hideTip"
                        >
                            <span><font-awesome-icon :icon=textToImage[review] class="pros-icon my-auto me-1"/>{{ review }}</span>
                        </div>
                    </div>
                    <div class="col-6">
                        <p class="text-center mb-1 fs-5 cons-icon"><b>CONS</b></p>
                        <div
                            class="review d-flex justify-content-center border rounded-2 py-2 px-1 mb-1"
                            v-for="review in this.reviews['cons']"
                            @mouseover="shotTip(review)"
                            @mouseleave="hideTip"
                        >
                            <span><font-awesome-icon :icon=textToImage[review] class="cons-icon my-auto me-1"/>{{ review }}</span>
                        </div>
                    </div>
                    <div class="col-6 mt-3">
                        <div class="d-flex flex-wrap justify-content-between">
                            <div
                                class="word rounded-pill px-3 py-1 my-1"
                                v-for="word in this.reviews['pos_top_words']"
                            >
                                <span class="small">{{ word }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-6 mt-3">
                        <div class="d-flex flex-wrap justify-content-between">
                            <div
                                class="word rounded-pill px-3 py-1 my-1"
                                v-for="word in this.reviews['neg_top_words']"
                            >
                                <span class="small">{{ word }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="mt-3 col-12 fw-light fst-italic">
                        <div v-if="!tip">
                            <p class="text-center m-0 p-0">Disclaimer.</p>
                            <ol>
                                <li>Not all reviews are taken into account;</li>
                                <li>It's OK when a "class" is both a plus and a minus;</li>
                                <li>You can find out more about "class" if you hover over a "class".</li>
                            </ol>
                        </div>
                        <div v-if="tip">
                            <p>{{ tip }}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex justify-content-center my-5" v-if="loading">
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    </div>
    <Footer />
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import {mapActions, mapState} from 'pinia/dist/pinia';
import useReviewsStore from '@/stores/reviews';

export default {
    name: 'ReviewsView',
    data() {
        return {
            gameString: null,
            brokenString: false,
            textToImage: {
                'gameplay': 'fas fa-gamepad',
                'balance': 'fas fa-dice',
                'puzzles': 'fas fa-puzzle-piece',
                'optimization': 'fas fa-computer',
                'bugs': 'fas fa-bug',
                'art': 'fas fa-palette',
                'price': 'fas fa-sack-dollar',
                'playtime': 'fas fa-hourglass-half',
                'level design': 'fas fa-cube',
                'soundtrack': 'fas fa-headphones',
                'physics': 'fas fa-magnet',
                'narrative': 'fas fa-book',
                'fun': 'fas fa-wand-magic-sparkles',
                'controls': 'fas fa-keyboard',
                'accessibility': 'fas fa-eye',
                'relaxing': 'fas fa-couch',
                'humor': 'fas fa-face-grin-tears',
                'atmosphere': 'fas fa-film'
            },
            textHint: {
                'gameplay': 'fas fa-gamepad',
                'balance': 'fas fa-dice',
                'puzzles': 'fas fa-puzzle-piece',
                'optimization': 'Will the game run on a potato? Is everything OK with FPS? Will my computer explode?',
                'bugs': 'fas fa-bug',
                'art': 'fas fa-palette',
                'price': 'Does the price match the quality of the game?',
                'playtime': 'fas fa-hourglass-half',
                'level design': 'The architecture of the levels and maps. Is the navigation clear, is the goal clear, is everything visible and passable?',
                'soundtrack': 'Music and sounds in the game. Does it fit? Is it cool? Is it even there?',
                'physics': 'fas fa-magnet',
                'narrative': 'The game has a good story, interesting dialogues and characters, and other narrative elements. If class is at a disadvantage, there\'s probably a problem with some of this.',
                'fun': 'fas fa-wand-magic-sparkles',
                'controls': 'Is everything okay with the controls, e.g., is the movement smooth? Is there controller support?',
                'accessibility': 'Accessibility settings. Can colors be adjusted? Are subtitles customizable? Is text readable? And other subtleties of accessibility.',
                'relaxing': 'Can I play the game from the couch or do I have to strain myself?',
                'humor': 'fas fa-face-grin-tears',
                'atmosphere': 'fas fa-film'
            },
            loading: false,
            tip: null,
        }
    },
    components: {
        Header,
        Footer,
    },
    methods: {
        ...mapActions(useReviewsStore, ['getSummarizedReviews', 'clearSummarizedReviews']),
        async getReviews() {
            if (this.gameString.startsWith('https://store.steampowered.com/app/')) {
                const gameId = this.gameString
                    .split('/')
                    .filter((item) => item)
                    .slice(-2)[0]
                if (gameId) {
                    this.loading = true;
                    await this.getSummarizedReviews(gameId);
                    this.loading = false;
                }
                else {
                    this.showError();
                }
            }
            else {
                this.showError();
            }
        },
        showError() {
            this.brokenString = true;
            this.clearSummarizedReviews();
        },
        shotTip(tip) {
            this.tip = this.textHint[tip]
        },
        hideTip() {
            this.tip = null
        }
    },
    computed: {
        ...mapState(useReviewsStore, [
            'reviews',
        ]),
    },
    mounted() {
        this.clearSummarizedReviews();
    }
};
</script>

<style scoped>
@import '../styles/main.css';

input {
    background-color: var(--bg-color);
    border-width: 2px;
    border-color: var(--main-theme-color);
    color: var(--main-theme-color);
}

input:focus {
    background-color: var(--bg-color);
    color: var(--main-theme-color);
    border-color: var(--dark-theme-color);
    box-shadow: none;
}

.pros-icon {
    color: var(--light-theme-color);
}

.cons-icon {
    color: var(--dark-theme-color);
}

.word {
    background-color: var(--additional-bg-color);
    color: var(--main-text-color)
}

.review:hover {
    border-color: var(--dark-theme-color) !important;
}

span {
    color: var(--main-text-color)
}

</style>
