import sideBar from '../cmps/side-bar.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'

export default {
    template: `
    <section class="mail-app-container flex">
        <side-bar></side-bar>
        <mail-list></mail-list>
    </section>
    `
    ,components: {
        sideBar,
        mailList
    }
}