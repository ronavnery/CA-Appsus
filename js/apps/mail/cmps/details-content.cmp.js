import { mailService } from '../services/mail-service.cmp.js'
import eventBus, { SHOW_DETAILS } from '../../../event-bus.js';

export default {
    template: `
    <section v-if="mail" class="details-content-container flex column">
    <div class="content-sender flex align-center">
        <div class="content-sender-avatar">{{getMailData('sender').substring(0,1)}}</div>
        <div class="content-sender-details flex column">
            <span class="content-sender-name">{{getMailData('sender')}}</span>
            <span class="content-sender-email">{{getMailData('address')}}</span>
        </div>
        <div class="content-time align-end">
        <i class="icon icon-time-clock-circle icon-sm content-clock-icon"></i>
        <span >{{getMailData('sentAt')}}</span>
        </div>
    </div>
    <span class="content-subject">{{getMailData('subject')}}</span>
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
        const mailId = +this.$route.params.mailId;
        mailService.getMailById(mailId)
        .then(mail => {
            this.mail = mail
            console.log(this.mail)
        })
    },
    methods: {
        getMailData(key, length = 50) {
            return mailService.parseMail(this.mail, key, length);
        }
    },
}