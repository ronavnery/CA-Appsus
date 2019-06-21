import { mailService } from '../services/mail-service.cmp.js'
import eventBus, {SHOW_DETAILS} from '../../../event-bus.js';
import mailAppCmp from "../pages/mail-app.cmp.js";


export default {
    template:`
    <section class="mail-preview-container flex column" @click="showMailDetails">
        <span class="preview-sender thick"> {{getMailData('sender')}}</span> 
        <span class="preview-subject thick"> {{getMailData('subject')}}</span> 
        <span class="preview-body"> {{getMailData('body')}}</span> 
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
        }
    }
}