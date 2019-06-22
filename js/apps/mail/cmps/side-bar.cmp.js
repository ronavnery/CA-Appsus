import eventBus, { GO_TO, MAILS_COUNT } from '../../../event-bus.js';

export default {
    template: `
    <section class="side-bar-container flex column">
        <button class="new-mail-btn">New Mail</button>
        <ul v-if="mailsCount">
            <li class="flex space-between" @click="goTo('Inbox')">Inbox 
            <span class="inbox-count">{{mailsCount.inbox}}</span></li>
            <li class="flex space-between" @click="goTo('Starred')">Starred 
            <span class="inbox-count">{{mailsCount.starred}}</span></li>
            <li class="flex space-between" @click="goTo('Sent')">Sent 
            <span class="inbox-count">{{mailsCount.sent}}</span></li>
            <li class="flex space-between" @click="goTo('Trashed')">Trash 
            <span class="inbox-count">{{mailsCount.trash}}</span></li>
        </ul>
    </section>
    `,
    created() {
        eventBus.$on(MAILS_COUNT, (mails) => this.calcMailsCount(mails))
    },
    data() {
        return {
            mailsCount: null
        }
    },
    methods: {
        goTo(section) {
            eventBus.$emit(GO_TO, section)
        },
        calcMailsCount(mails) {
            this.mailsCount = mails.reduce((acc, mail) => {
                if (!mail.isTrashed && !mail.isSent) acc['inbox']++;
                if (mail.isStarred) acc['starred']++;
                if (mail.isSent) acc['sent']++;
                if (mail.isTrashed) acc['trash']++;
                return acc;
            }, { inbox:0,starred:0,sent:0,trash:0 })
        }
    }
}