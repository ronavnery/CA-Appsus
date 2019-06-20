'use strict';


import mainRouter from './routes.js'
const appRoutes = new VueRouter({ routes: mainRouter })
import appHeader from './cmps/app-header.cmp.js'

var appsus = new Vue({
    el: "#appsus",
    created() {
        console.log('app created')
    },
    template: `
        <main>
            <!-- <app-header></app-header> -->
            <app-header></app-header>
            <router-view></router-view>
        </main>
    `,
    components: {
        appHeader
    },
    router: appRoutes
})