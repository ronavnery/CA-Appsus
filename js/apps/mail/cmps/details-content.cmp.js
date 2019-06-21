import { mailService } from '../services/mail-service.cmp.js'
import eventBus, { SHOW_DETAILS } from '../../../event-bus.js';

export default {
    template: `
    <section class="details-content-container flex column">
    <span>{{getMailData('sender')}}</span>
    <span>{{getMailData('subject')}}</span>
    <span>{{getMailData('body')}}</span>

    </section>
    `,
    data() {
        return {
            mail: {}
        }
    },
    created() {
        eventBus.$on(SHOW_DETAILS, (mail) => {
            this.mail = mail
        })
    },
    methods: {
        getMailData(key, length = 50) {
            // bug here, calls for parse before this.mail is ready(happens only once)
            return mailService.parseMail(this.mail, key, length);
        }
    },
}