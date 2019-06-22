import { mailService } from '../services/mail-service.cmp.js'
import eventBus, { SHOW_DETAILS } from '../../../event-bus.js';

export default {
    template: `
    <section v-if="mail" class="details-content-container flex column">
    <span>{{getMailData('sender')}}</span>
    <span>{{getMailData('subject')}}</span>
    <span>{{getMailData('body')}}</span>
    <span>isRead: {{getMailData('isRead')}}</span>
    <span>isSent: {{getMailData('isSent')}}</span>
    <span>isStarred: {{getMailData('isStarred')}}</span>
    <span>isTrashed: {{getMailData('isTrashed')}}</span>

    </section>
    `,
    data() {
        return {
            mail: null
        }
    },
    created() {
        eventBus.$on(SHOW_DETAILS, (mail) => {
            this.mail = mail
        })
    },
    methods: {
        getMailData(key, length = 50) {
            return mailService.parseMail(this.mail, key, length);
        }
    },
}