import mailAppCmp from "../pages/mail-app.cmp.js";


export default {
    template:`
    <section class="mail-preview-container flex column">
    <span class="mail-preview-subject">{{parseMailSubject}}</span>
    <span class="mail-preview-body">{{parseMailBody}}</span>
    <!-- {{parseMail($event, 'subject')}} -->
    </section>
    `,
    props: ['mail'],
    computed: {
        parseMailSubject() {
            if (this.mail.subject.length > 20) return this.mail.subject.substring(0,20) + '...'
            return this.mail.subject
        },
        parseMailBody() {
            if (this.mail.body.length > 20) return this.mail.body.substring(0,20) + '...'
            return this.mail.subject
        },
        parseMailSender() {
            if (this.mail.sender.length > 20) return this.mail.sender.substring(0,20) + '...'
            return this.mail.sender
        },
        // parseMail(ev, part) {
        //     return part;
        //     var item = this.mail[part]
        //     console.log(item)
        //     if (item.length > 20) return item.substring(0,20) + '...'
        //     return item;
        // }
    }
}