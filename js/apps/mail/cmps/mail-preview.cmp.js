import { mailService } from '../services/mail-service.cmp.js'
import eventBus, {SHOW_DETAILS} from '../../../event-bus.js';


export default {
    template:`
    <section class="mail-preview-container flex" @click="showMailDetails">
        <div class="preview-icons">
            <i class="icon icon-circle-1 icon-12 icon-unread" v-if="!mail.isRead" @click="toggleIsRead"></i>
            <i class="icon icon-sign-badge-circle icon-12" v-if="mail.isRead" @click="toggleIsRead"></i>
            <!-- <span class="icon-unread" v-if="!mail.isRead" @click="toggleIsRead">●</span> -->
            <i class="icon icon-rating-star icon-16" v-if="!mail.isStarred" @click="toggleStar"></i>
            <i class="icon icon-rating-star-3 icon-starred icon-16" v-else @click="toggleStar"></i>
        </div>
        <div class="preview-txt flex column">
            <span class="preview-sender"> {{getMailData('sender')}}</span> 
            <span class="preview-subject thick"> {{getMailData('subject')}}</span> 
            <span class="preview-body"> {{getMailData('body')}}</span> 
        </div>
        <div class="preview-time">
            <span class="preview-time align-end">{{getMailData('sentAt')}}</span> 
        </div>
        <div class="preview-trash">
            <i class="icon icon-bin-2" v-if="!mail.isTrashed" @click="toggleTrash"></i>
            <i class="icon icon-mailbox-in" v-else @click="toggleTrash"></i>
        </div>
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
        toggleTrash() {
            this.mail.isTrashed = !this.mail.isTrashed
        },
        mouseOver() {
            this.isDisplayingTrash = !this.isDisplayingTrash
        }
    }
}