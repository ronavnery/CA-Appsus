import sideBar from '../cmps/side-bar.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'
import mailDetails from '../cmps/mail-details.cmp.js'

export default {
    template: `
    <section class="mail-app-container flex">
        <side-bar></side-bar>
        <mail-list></mail-list>
        <mail-details></mail-details>
    </section>
    `
    ,components: {
        sideBar,
        mailList,
        mailDetails
    }
}