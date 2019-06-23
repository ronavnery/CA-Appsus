import eventBus, { GO_TO, MAILS_COUNT } from '../../../event-bus.js';

export default {
    template: `
    <section class="side-bar-container flex column" v-if="mails">
        <button class="new-mail-btn" @click="composeMail">New Mail</button>
        <ul>
            <li class="flex space-between" @click="handleClick('Inbox')">Inbox 
            <span class="inbox-count">{{mailsCount.inbox}}
            <span class="thick blue">({{mailsCount.unread}})</span></span></li>
            <li class="flex space-between" @click="goTo('Starred')">Starred 
            <span class="starred-count">{{mailsCount.starred}}</span></li>
            <li class="flex space-between" @click="goTo('Sent')">Sent 
            <span class="sent-count">{{mailsCount.sent}}</span></li>
            <li class="flex space-between" @click="goTo('Trashed')">Trash 
            <span class="trash-count">{{mailsCount.trash}}</span></li>
        </ul>
    </section>
    `,
    props: ['mails', 'mailsCount']
    ,
    methods: {
        handleClick(section) {
            this.goTo(section)
            this.$emit('section-clicked')
        },
        goTo(section) {
            eventBus.$emit(GO_TO, section)
        },
        composeMail() {
            this.$emit('compose')
        }
    }
}