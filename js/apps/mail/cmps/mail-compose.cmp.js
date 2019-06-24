import { mailService } from '../services/mail-service.cmp.js'

export default {
    template: `
    <section class="mail-compose-container flex column">
        <!-- Can be a seperate component, but its not due to lack of time -->
        <div class="compose-bar flex align-center">
            <div class="compose-send flex align-center" @click="handleSend">
                <i class="icon icon-send-email send-icon icon-32"></i>
                <span class="send-title">Send</span>
            </div>
            <div class="compose-discard flex align-center">
                <i class="icon icon-bin-2 discard-icon icon-32" @click="handleDiscard"></i>
                <span class="discard-title">Discard</span>
            </div>
        </div>

        <div class="compose-inputs">
            <div class="compose-input-from-container">
                <span class="compose-from-title thick">From:</span>
                <input type="text" class="compose-from-input"
                value="me@of-course.com" disabled>
            </div>
            <div class="compose-input-to-container">
                <span class="compose-to-title thick" >To:</span>
                <input type="text" class="compose-to-input" 
                value="me@of-course.com" disabled>
            </div>
            <div class="compose-input-subject-container">
                <span class="compose-subject-title thick">Subject:</span>
                <input ref="subjectInput" type="text" 
                class="compose-subject-input"
                v-model="composedMail.subject">
            </div>
            <div class="compose-body-input" contenteditable="true"
            @input="updateBodyTxt($event)"></div>
            
        </div>
    </section>
    `,
    mounted() {
        this.focusOnSubjectInput()
    },
    data() {
        return {
            composedMail: {
                from: 'me@of-course.com',
                to: 'me@of-course.com',
                subject: '',
                body: '',

            }
        }
    },
    methods: {
        updateBodyTxt(ev) {
            this.composedMail.body = ev.target.innerText
        },
        focusOnSubjectInput() {
            this.$refs.subjectInput.focus();
        },
        handleSend() {
            console.log(this.composedMail)
            const address = this.composedMail.from
            const subject = this.composedMail.subject
            const body = this.composedMail.body
            const newMail = mailService.createMail('Me Of-Course', address, subject, body)
            mailService.pushNewMail(newMail);
            this.$emit('mail-sent')
        },
        handleDiscard() {

        },
    }
}