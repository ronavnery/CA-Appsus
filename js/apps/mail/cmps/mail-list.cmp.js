import { mailService } from '../services/mail-service.cmp.js'
import eventBus, { FILTER_BY, GO_TO } from '../../../event-bus.js';
import listSearchbox from './list-searchbox.cmp.js'
import mailPreview from './mail-preview.cmp.js'

export default {
    template:`
    <section class="mail-list-container">
    <list-searchbox></list-searchbox>
    <div class="previews flex column">
        <mail-preview v-for="(mail,idx) in mailsToShow" :key="idx" :mail="mail"></mail-preview>        
    </div>
    </section>
    `,
    created() {
        mailService.queryMails()
            .then(mails => this.mails = mails)
        eventBus.$on(FILTER_BY, (searchTerm) => this.filterByTxt = searchTerm)
        eventBus.$on(GO_TO, (section) => this.filterBySection = section)
    },
    data() {
        return {
            mails: null,
            filterByTxt: '',
            filterBySection: ''
        }
    },
    computed: {
        mailsToShow() {
            if (this.filterBySection) {
                if (this.filterBySection === 'Inbox') return this.mails;
                let key;
                if (this.filterBySection === 'Starred') key = 'isStarred'
                else if (this.filterBySection === 'Sent') key = 'isSent'
                else key = 'isTrashed'
                return this.mails.filter(mail => mail[key])
            }
            if (!this.filterByTxt) return this.mails;
            return this.mails.filter(mail => {
                return (mail.sender.includes(this.filterByTxt) ||
                mail.subject.includes(this.filterByTxt) ||
                mail.body.includes(this.filterByTxt))
            })
        }
    },
    components: {
        listSearchbox,
        mailPreview
    }
}