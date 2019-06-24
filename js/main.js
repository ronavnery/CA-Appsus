'use strict';


import mainRouter from './routes.js'
const appRoutes = new VueRouter({ routes: mainRouter })
import appHeader from './sharedCmps/app-header.cmp.js'

var appsus = new Vue({
    el: "#appsus",
    template: `
        <main class="flex column">
            <app-header></app-header>
            <router-view></router-view>
        </main>
    `,
    components: {
        appHeader
    },
    router: appRoutes
})