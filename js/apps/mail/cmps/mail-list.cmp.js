import { mailService } from '../services/mail-service.cmp.js'
import listSearchbox from './list-searchbox.cmp.js'
import mailPreview from './mail-preview.cmp.js'

export default {
    template:`
    <section class="mail-list-container">
    <list-searchbox></list-searchbox>
    <div class="previews flex column">
        <mail-preview v-for="(mail,idx) in mails" :key="idx" :mail="mail"></mail-preview>        
    </div>
    </section>
    `,
    created() {
        mailService.queryMails()
            .then(mails => this.mails = mails)
    },
    data() {
        return {
            mails: null,
        }
    },
    components: {
        listSearchbox,
        mailPreview
    }
}