import eventBus, { AT_HOME } from '../event-bus.js';

export default {
    template: `
    <section class="home-container flex align-center justify-center">
    <div class="home-content flex column align-center justify-center">
        <div class="home-fruitonly-container">
            <img class="logo-fruitonly" src="img/logo/appricot-logo-v1.png"/>

        </div>
        <div class="home-links-container flex">
        <router-link to="/mail">
            <img class="home-mail-icon" src="img/logo/envelope-logo.svg" @click="isModalOpen = !isModalOpen"/>
            </router-link>
            <router-link to="/note">
            <img class="home-notes-icon" src="img/logo/notes-logo.svg" @click="isModalOpen = !isModalOpen"/>
            </router-link>
        </div>
    </div>
    </section>
    `,
    created() {
        eventBus.$emit(AT_HOME, true)
    },
    destroyed()  {
        eventBus.$emit(AT_HOME, false)
    }
}