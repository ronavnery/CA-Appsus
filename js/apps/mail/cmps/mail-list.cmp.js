import { mailService } from '../services/mail-service.cmp.js'
import eventBus, { FILTER_BY, GO_TO, MAILS_COUNT } from '../../../event-bus.js';
import listSearchbox from './list-searchbox.cmp.js'
import mailPreview from './mail-preview.cmp.js'

export default {
    template:`
    <section class="mail-list-container">
    <list-searchbox></list-searchbox>
    <div v-if="mails" class="previews flex column">
        <mail-preview v-for="(mail,idx) in mailsToShow" :key="idx" :mail="mail"> </mail-preview>        
    </div>
    </section>
    `,
    created() {
        mailService.queryMails()
            .then(mails => {
                this.mails = mails
                // Does this emit needs to be here? or on service or on side bar component?
                eventBus.$emit(MAILS_COUNT, mails)
            })
        eventBus.$on(FILTER_BY, (searchTerm) => this.txtFilter = searchTerm)
        eventBus.$on(GO_TO, (section) => this.sectionFilter = section)
    },
    data() {
        return {
            mails: null,
            txtFilter: '',
            sectionFilter: 'Inbox'
        }
    },
    computed: {
        mailsToShow() {
            //Repetitive code, check how to fix
            if (this.sectionFilter) {
                if (this.sectionFilter === 'Inbox') return this.mails.filter(mail => {
                    if (!this.txtFilter) return (!mail.isTrashed && !mail.isSent)
                    else return (!mail.isTrashed && !mail.isSent) && (mail.sender.toLowerCase().includes(this.txtFilter) ||
                    mail.subject.toLowerCase().includes(this.txtFilter) ||
                    mail.body.toLowerCase().includes(this.txtFilter))
                });
                let key;
                if (this.sectionFilter === 'Starred') key = 'isStarred'
                else if (this.sectionFilter === 'Sent') key = 'isSent'
                else key = 'isTrashed'
                return this.mails.filter(mail => {
                    if (!this.txtFilter) return mail[key]
                    else return mail[key] && (mail.sender.toLowerCase().includes(this.txtFilter) ||
                    mail.subject.toLowerCase().includes(this.txtFilter) ||
                    mail.body.toLowerCase().includes(this.txtFilter))
                })
            }
        }
    },
    components: {
        listSearchbox,
        mailPreview
    }
}