
export default {
    template: `
    <section class="app-header flex space-between">
        <div class="header-logo-container">
            <div class="header-logo"></div>
        </div>
        <div class="flex">

        <img class="main-notification-icon" src="img/logo/notification-logo.svg"/>
        <i class="icon icon-navigation-menu-1 main-nav-icon" @click="isModalOpen = !isModalOpen"></i>
        </div>
        <div class="main-nav-modal flex column align-center" v-if="isModalOpen"
        >

<div>
        <router-link to="/mail">
        <img class="modal-icon" src="img/logo/mail-logo.svg" @click="isModalOpen = !isModalOpen"/>
        </router-link>

        <router-link to="/note">
        <img class="modal-icon" src="img/logo/notes-logo.svg" @click="isModalOpen = !isModalOpen"/>
        </router-link>

</div>
<div>
        <router-link to="/">
        <img class="modal-icon" src="img/logo/home-logo.svg" @click="isModalOpen = !isModalOpen"/>
        </router-link>
        <router-link to="/about">
            <img class="modal-icon" src="img/logo/about-logo.svg" @click="isModalOpen = !isModalOpen"/>
        </router-link>
</div>
        </div>

    </section>
    `,
    data() {
        return {
            isModalOpen: false
        }
    }
}