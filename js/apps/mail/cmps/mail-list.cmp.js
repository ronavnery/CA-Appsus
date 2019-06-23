import eventBus, { FILTER_BY, GO_TO, UPDATE_CONTROLBAR } from '../../../event-bus.js';
import listSearchbox from './list-searchbox.cmp.js'
import mailPreview from './mail-preview.cmp.js'

export default {
    template:`
    <section class="mail-list-container">
    <list-searchbox></list-searchbox>
    <div v-if="mails" class="previews flex column">
        <mail-preview v-for="(mail,idx) in mailsToShow" 
        :key="idx" :mail="mail" @mail-changed="updateMailStatus"
        @mail-clicked="updateControlBar">

        </mail-preview>  

    </div>
    </section>
    `,
    props: ['mails'],
    created() {
        eventBus.$on(FILTER_BY, (searchTerm) => this.txtFilter = searchTerm)
        eventBus.$on(GO_TO, (section) => this.sectionFilter = section)
        setTimeout(()=> eventBus.$emit(UPDATE_CONTROLBAR, {mail:this.mails[0], list: this.mailsToShow}),100)
    },
    data() {
        return {
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
    methods: {
        updateMailStatus(mail) {
            this.$emit('mail-changed', mail)
        },
        updateControlBar(mail) {
            console.log('list got notified', mail)
            eventBus.$emit(UPDATE_CONTROLBAR, {mail, list: this.mailsToShow})
        }
    },
    components: {
        listSearchbox,
        mailPreview
    }
}