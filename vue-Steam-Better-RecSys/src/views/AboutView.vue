<template>
    <Header/>
    <div class="d-flex justify-content-center my-2 mx-4">
        <div class="col-12 col-sm-12 col-md-10 col-lg-8">
            <h1>About SteamWizzard</h1>
            <h2>Idea</h2>
            <p>
                Many players want but can't find new games for themselves that are similar to what they've been playing.
                Steam and popular sites recommend only well-known games. We have tried to solve this. You select games,
                and our algorithm prompts you for a similar game. Then you work with the recommendation with Hot n Cold
                mechanics: like, dislike, or ignore. According to your action the algorithm gives you a new game. Repeat
                until you get bored...
                We also believe that our site can help developers find references.
            </p>
            <h3>Data</h3>
            <p>
                We only use data on games that were released before about May 2023. The data is not automatically
                updated yet, we will let you know when there are any changes in this matter.
            </p>
            <h3>Algorithm</h3>
            <p>
                The algorithm is primarily based on game tags so that popular and unpopular games have the same chance
                of being recommended.
            </p>
            <h2>Beta</h2>
            <p>
                The project is in beta stage, so:
            </p>
            <ol>
                <li>If authorization will be added, at some point there is a possibility of losing your account;</li>
                <li>Recommendation algorithms may change (for the better);</li>
                <li>Gradually there will be new functionality.</li>
            </ol>
            <h2>Team</h2>
            <p>Lev Kobelev (tw: <a href="https://twitter.com/evllko" target="_blank"
                                   rel="noopener noreferrer">@evllko</a>) — author & main wizard.</p>
            <p>Special Thanks to Anton Konev (gh: <a href="https://github.com/VenomouSTaCo" target="_blank"
                                                     rel="noopener noreferrer">@VenomouSTaCo</a>) & Vladimir Ivanov (gh:
                <a href="https://github.com/IVladimirA" target="_blank" rel="noopener noreferrer">@IVladimirA</a>) for
                helping with the project at the beginning.</p>
            <h2>Licenses</h2>
            <h3>Fonts</h3>
            <p>Thanks <a href="https://putracetol.com/" target="_blank" rel="noopener noreferrer">PutraCetol Studio</a>
                for Beautiful Magic font (we use free version because our site is not a commercial one).</p>
            <h3>Icons</h3>
            <p>
                We use some great icons:
            </p>
            <ol>
                <li><a href="https://fontawesome.com/icons" target="_blank" rel="noopener noreferrer">"Font Awesome"</a>
                    by <a href="https://github.com/FortAwesome" target="_blank" rel="noopener noreferrer">Font Awesome
                        Team</a> is licensed under CC BY 4.0
                </li>
                <li><a href="https://twemoji.twitter.com/" target="_blank" rel="noopener noreferrer">"Twemoji"</a> by <a
                    href="https://github.com/twitter" target="_blank" rel="noopener noreferrer">Twitter</a> is licensed
                    under CC BY 4.0
                </li>
            </ol>
        </div>
    </div>
    <Footer/>
</template>

<script>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
    components: {
        Header,
        Footer,
    },
};
</script>

<style scoped>
@import '../styles/main.css';
</style>
