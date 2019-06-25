import eventBus, { MAILS_COUNT, UPDATE_CONTROLBAR } from '../../../event-bus.js';

export default {
    template:`
    <section class="controlbar-container flex space-between align-center">
    <div class="control-reply flex align-center" @click="handleReplyClick">
    <i class="icon icon-email-action-reply" ></i>
    <span class="control-reply-title">Reply</span>
    </div>
    <!-- Reply all hidden -->
    <i class="icon icon-email-action-reply-all control-replyall" class="hidden"></i>
    <i class="icon icon-arrow-left-1  control-back"></i>
    <span class="controlbar-nav-nums">{{currMailPlaceInList}} 
        <span class="controlbar-of">of</span> {{currListMailsCount}} </span>
    <i class="icon icon-arrow-right-1 control-forward"></i>
    <i class="icon icon-rating-star"  @click="toggleStar"></i>
    <i class="icon icon-bin-2" @click="toggleTrash"></i>

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
        },
        handleReplyClick() {
            this.$emit('reply-clicked', this.currMail)
        }
    }
}