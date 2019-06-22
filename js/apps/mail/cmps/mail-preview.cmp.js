import { mailService } from '../services/mail-service.cmp.js'
import eventBus, {SHOW_DETAILS} from '../../../event-bus.js';


export default {
    template:`
    <section class="mail-preview-container flex" @click="showMailDetails">
        <div class="preview-icons">
            <span class="icon-unread" v-if="!mail.isRead" @click="toggleIsRead">●</span>
            <span v-else @click="toggleIsRead">○</span>
            <i class="icon icon-rating-star-1 icon-24" v-if="!mail.isStarred" @click="toggleStar"></i>
            <i class="icon icon-rating-star-1 icon-24 icon-starred" v-else @click="toggleStar"></i>
        </div>
        <div class="preview-txt flex column">
            <span class="preview-sender"> {{getMailData('sender')}}</span> 
            <span class="preview-subject thick"> {{getMailData('subject')}}</span> 
            <span class="preview-body"> {{getMailData('body')}}</span> 
        </div>
        <span class="preview-time align-end"> {{getMailData('sentAt')}}</span> 
    </section>
    `,
    props: ['mail'],
    methods: {
        showMailDetails() {
            eventBus.$emit(SHOW_DETAILS, this.mail);
        },
        getMailData(key, length = 50) {
            return mailService.parseMail(this.mail, key, length);
        },
        toggleIsRead() {
            this.mail.isRead = !this.mail.isRead
        },
        toggleStar() {
            this.mail.isStarred = !this.mail.isStarred
        },
    }
}