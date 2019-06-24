import eventBus, { MAILS_COUNT, UPDATE_CONTROLBAR } from '../../../event-bus.js';

export default {
    template:`
    <section class="controlbar-container flex">
    <i class="icon icon-email-action-reply control-reply icon-32"></i>
    <i class="icon icon-email-action-reply-all control-replyall icon-32"></i>
    <i class="icon icon-arrow-left-1 icon-32 control-back"></i>
    <span class="controlbar-nav-nums">{{currMailPlaceInList}} 
        <span class="controlbar-of">of</span> {{currListMailsCount}} </span>
    <i class="icon icon-arrow-right-1 icon-32 control-forward"></i>
    <i class="icon icon-rating-star icon-32" @click="toggleStar"></i>
    <i class="icon icon-bin-2 icon-32" @click="toggleTrash"></i>

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