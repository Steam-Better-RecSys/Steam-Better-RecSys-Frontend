<template>
    <Header />
    <div class="d-flex flex-grow-1 align-items-center flex-column">
        <div class="d-flex flex-grow-1 flex-row align-items-center justify-content-center">
            <recommendation-card
                :name="recommendedGames[currentGameIndex].title"
                :description="recommendedGames[currentGameIndex].description"
                :image="recommendedGames[currentGameIndex].horizontalImageUrl"
                :nameSlug="recommendedGames[currentGameIndex].nameSlug"
                :gameId="recommendedGames[currentGameIndex].gameId"
                v-if="isLoaded"
            />
            <p v-if="!isLoaded">Loading...</p>
        </div>
        <div
            v-if="isLoaded"
            class="d-flex flex-row justify-content-around w-50 mb-5"
        >
            <button type="button" class="btn btn-primary">
                <font-awesome-icon icon="fas fa-ban" />
                Blacklist
            </button>
            <button
                type="button"
                class="btn btn-outline-primary"
                @click="this.dislikeRecommendedGame()"
            >
                <font-awesome-icon icon="fas fa-thumbs-down" />
                Dislike
            </button>
            <button
                type="button"
                class="btn btn-light"
                @click="this.getNextRecommendedGame()"
                v-if="currentGameIndex < 9"
            >
                <font-awesome-icon icon="fas fa-forward" />
                Ignore
            </button>
            <button
                type="button"
                class="btn btn-outline-primary"
                @click="this.likeRecommendedGame()"
            >
                <font-awesome-icon icon="fas fa-thumbs-up" />
                Like
            </button>
            <button type="button" class="btn btn-primary">
                <font-awesome-icon icon="fas fa-heart" />
                Wishlist
            </button>
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
        Footer
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
    },
    beforeMount() {
        this.getRecommendedGame(0, 0);
    },
};
</script>

<style scoped>
@import '../styles/main.css';
</style>
