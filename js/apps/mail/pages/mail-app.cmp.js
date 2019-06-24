import { mailService } from '../services/mail-service.cmp.js'
import { utilService, MAILS_DB } from '../../../services/utils.service.js'
import sideBar from '../cmps/side-bar.cmp.js'
import mailList from '../cmps/mail-list.cmp.js'
import mailDetails from '../cmps/mail-details.cmp.js'
import mailCompose from '../cmps/mail-compose.cmp.js'

export default {
    template: `
    <section class="mail-app-container flex">
        <side-bar :mails="mails" :mailsCount="mailsCount" 
        @compose="isComposing=!isComposing" @section-clicked="isComposing=false"></side-bar>
        <mail-list :mails="mails" @mail-changed="handleMailChange"></mail-list>
        <mail-details :mails="mails" :mailsCount="mailsCount" v-if="!isComposing" @reply-clicked="composeReply"></mail-details>
        <mail-compose v-if="isComposing" @mail-sent="handleMailSent" 
        @reply-clicked="composeReply" :mailToReply="mailToReply"></mail-compose>
    </section>
    `,
    data() {
        return {
            mails: null,
            mailsCount: null,
            isComposing: false,
            mailToReply: 'kuku'
        }
    },
    created() {
        this.mails = mailService.queryMails()
        this.calcMailsCount;

        // .then(mails => {
        //     this.mails = mails
        //     console.log('loaded mails', this.mails)
        //     // eventBus.$emit(MAILS_COUNT, mails)
        // })
    },
    computed: {
        calcMailsCount() {
            this.mailsCount = this.mails.reduce((acc, mail) => {
                if (!mail.isTrashed && !mail.isSent) acc['inbox']++;
                if (!mail.isRead) acc['unread']++;
                if (mail.isStarred) acc['starred']++;
                if (mail.isSent) acc['sent']++;
                if (mail.isTrashed) acc['trash']++;
                return acc;
            }, {inbox: 0, unread: 0, starred: 0,sent: 0,trash: 0,})
        }

    },
    methods: {
        handleMailChange(mail) {
            this.calcMailsCount
            this.saveToStorage()
        },
        handleMailSent() {
            this.loadFromStorage()
            this.isComposing = false;
        },
        saveToStorage() {
            utilService.saveToStorage(MAILS_DB, this.mails)
        },
        loadFromStorage() {
            const mails = utilService.loadFromStorage(MAILS_DB)
            this.mails = mails
        },
        composeReply(mail) {
            this.isComposing=true;
            this.mailToReply = mail
            console.log('here is ', this.mailToReply)
        }
    },
    components: {
        sideBar,
        mailList,
        mailDetails,
        mailCompose
    }
}