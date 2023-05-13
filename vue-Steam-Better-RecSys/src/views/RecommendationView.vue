<template>
    <Header />
    <div class="d-flex flex-grow-1 justify-content-center">
        <div
            class="d-flex flex-fill justify-content-center align-items-center"
            v-if="!isLoaded"
        >
            <span>Loading...</span>
        </div>
        <div class="col-10 col-sm-10 col-md-8 col-lg-6" v-if="isLoaded">
            <div class="d-flex justify-content-center row mt-4">
                <recommendation-card
                    :name="recommendedGames[currentGameIndex].title"
                    :description="
                        recommendedGames[currentGameIndex].description
                    "
                    :nameSlug="recommendedGames[currentGameIndex].nameSlug"
                    :gameId="recommendedGames[currentGameIndex].gameId"
                />
            </div>
            <div class="row d-flex justify-content-between mt-3 mb-2">
                <!--
                <div class="col-2 d-flex justify-content-center">
                    <button type="button" class="btn btn-primary flex-grow-1">
                        <font-awesome-icon icon="fas fa-ban" />
                        <span class="d-none d-sm-none d-md-block"
                            >Blacklist</span
                        >
                    </button>
                </div>
                -->
                <div class="col-2 d-flex justify-content-center">
                    <button
                        type="button"
                        class="btn btn-outline-primary flex-grow-1"
                        @click="this.dislikeRecommendedGame()"
                    >
                        <font-awesome-icon icon="fas fa-thumbs-down" />
                        <span class="d-none d-sm-none d-md-block">Dislike</span>
                    </button>
                </div>
                <div class="col-2 d-flex justify-content-center">
                    <button
                        type="button"
                        class="btn btn-light flex-grow-1"
                        @click="this.getNextRecommendedGame()"
                        @focus="this.setBlur($event)"
                        v-if="currentGameIndex < 9"
                    >
                        <font-awesome-icon icon="fas fa-face-meh" />
                        <span class="d-none d-sm-none d-md-block">Ignore</span>
                    </button>
                </div>
                <div class="col-2 d-flex justify-content-center">
                    <button
                        type="button"
                        class="btn btn-outline-primary flex-grow-1"
                        @click="this.likeRecommendedGame()"
                    >
                        <font-awesome-icon icon="fas fa-thumbs-up" />
                        <span class="d-none d-sm-none d-md-block">Like</span>
                    </button>
                </div>
                <!--
                <div class="col-2 d-flex justify-content-center">
                    <button type="button" class="btn btn-primary flex-grow-1">
                        <font-awesome-icon icon="fas fa-heart" />
                        <span class="d-none d-sm-none d-md-block"
                            >Wishlist</span
                        >
                    </button>
                </div>
                -->
            </div>
        </div>
    </div>
    <Footer />
</template>

<script>
import RecommendationCard from '@/components/RecommendationCard.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import { mapActions } from 'pinia/dist/pinia';
import useGamesStore from '@/stores/games';

export default {
    name: 'RecommendationView',
    components: {
        RecommendationCard,
        Header,
        Footer,
    },
    data() {
        return {
            recommendedGames: [
                {
                    title: 'test',
                    description: 'test',
                    horizontalImageUrl: 'test',
                },
            ],
            currentGameIndex: 0,
            isLoaded: false,
        };
    },
    methods: {
        ...mapActions(useGamesStore, ['getRecommendedGames']),
        async getRecommendedGame(gameId, gameStatus) {
            this.isLoaded = false;
            this.recommendedGames = await this.getRecommendedGames(
                gameId,
                gameStatus
            );
            this.currentGameIndex = 0;
            this.isLoaded = true;
        },
        async getNextRecommendedGame() {
            this.currentGameIndex += 1;
        },
        async likeRecommendedGame() {
            await this.getRecommendedGame(
                this.recommendedGames[this.currentGameIndex].gameId,
                1
            );
        },
        async dislikeRecommendedGame() {
            await this.getRecommendedGame(
                this.recommendedGames[this.currentGameIndex].gameId,
                -1
            );
        },
        async setBlur(event) {
            event.target.blur();
        },
    },
    beforeMount() {
        this.getRecommendedGame(0, 0);
    },
};
</script>

<style scoped>
@import '../styles/main.css';
</style>
