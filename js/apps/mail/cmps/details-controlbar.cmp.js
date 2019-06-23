import eventBus, { MAILS_COUNT, UPDATE_CONTROLBAR } from '../../../event-bus.js';

export default {
    template:`
    <section class="controlbar-container flex">
    <i class="icon icon-email-action-reply control-reply"></i>
    <i class="icon icon-email-action-reply-all control-replyall"></i>
    <i class="icon icon-email-action-send control-back icon-rotate-180"></i>
    <span class="controlbar-nav-nums">{{currMailPlaceInList}} 
        <span class="controlbar-of">of</span> {{currListMailsCount}} </span>
    <i class="icon icon-email-action-send control-forward"></i>
    <i class="icon icon-rating-star icon-48" @click="toggleStar"></i>
    <i class="icon icon-bin-2 icon-48" @click="toggleTrash"></i>

    </section>
    `,
    data() {
        return {
            currMail: null,
            currList: null,
            currMailPlaceInList: 0,
            currListMailsCount: 0
        }
    },
    created() {
        eventBus.$on(UPDATE_CONTROLBAR, (mailAndList) => {
            this.currMail = mailAndList.mail
            this.currList = mailAndList.list
            this.updateNavNums()
        })
    },
    methods: {
        updateNavNums() {
            this.currListMailsCount = this.currList.length
            this.currMailPlaceInList = this.currList.findIndex(mail => this.currMail === mail) + 1
        },
        toggleStar() {
            this.currMail.isStarred = !this.currMail.isStarred
        },
        toggleTrash() {
            this.currMail.isTrashed = !this.currMail.isTrashed
            this.moveToNextMailOnList()
        },
        moveToNextMailOnList() {
            console.log(this.currList)
        }
    }
}