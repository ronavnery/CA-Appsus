import eventBus, { AT_HOME } from '../event-bus.js';

export default {
    template: `
    <section class="app-header flex space-between">
        <div class="header-logo-container" v-if="!onHomePage">
                <router-link to="/home">
                    <div class="header-logo"></div>
                </router-link>
        </div>
        <div class="flex space-between">
        <router-link to="/home">
            <img class="modal-icon" src="img/logo/home-logo.svg" />
            </router-link>
            <router-link to="/about">
                <img class="modal-icon" src="img/logo/about-logo.svg" />
            </router-link>
                <img class="main-notification-icon" src="img/logo/notification-logo.svg"/>
            <i class="icon icon-navigation-menu-1 main-nav-icon" @click="isModalOpen = !isModalOpen"></i>
        </div>
        <div class="main-nav-modal flex column align-center" v-if="isModalOpen">

            <div>
                <router-link to="/mail">
                <img class="modal-icon" src="img/logo/envelope-logo.svg" @click="isModalOpen = !isModalOpen"/>
                </router-link>

                <router-link to="/note">
                <img class="modal-icon" src="img/logo/notes-logo.svg" @click="isModalOpen = !isModalOpen"/>
                </router-link>

            </div>
        <!-- <div> -->
        <!-- <router-link to="/">
        <img class="modal-icon" src="img/logo/home-logo.svg" @click="isModalOpen = !isModalOpen"/>
        </router-link>
        <router-link to="/about">
            <img class="modal-icon" src="img/logo/about-logo.svg" @click="isModalOpen = !isModalOpen"/>
        </router-link> -->
<!-- </div> -->
        </div>

    </section>
    `,
    created() {
        eventBus.$on(AT_HOME, state => {
            if (state) this.onHomePage = true
            else this.onHomePage = false;
        })
    },
    data() {
        return {
            isModalOpen: false,
            onHomePage: false
        }
    },
    methods: {
        hideSideLogo() {
            this.onHomePage = true;
        }
    }
}