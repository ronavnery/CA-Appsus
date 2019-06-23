import eventBus, { GO_TO, MAILS_COUNT } from '../../../event-bus.js';

export default {
    template: `
    <section class="side-bar-container flex column" v-if="mails">
        <button class="new-mail-btn">New Mail</button>
        <ul>
            <li class="flex space-between" @click="goTo('Inbox')">Inbox 
            <span class="inbox-count">{{mails.inbox}}</span></li>
            <li class="flex space-between" @click="goTo('Starred')">Starred 
            <span class="starred-count">{{mails.starred}}</span></li>
            <li class="flex space-between" @click="goTo('Sent')">Sent 
            <span class="sent-count">{{mails.sent}}</span></li>
            <li class="flex space-between" @click="goTo('Trashed')">Trash 
            <span class="trash-count">{{mails.trash}}</span></li>
            {{mailsCount}}
        </ul>
    </section>
    `,
    props: ['mails', 'mailsCount']
    ,
    created() {
        console.log('got mails!', this.mails)
    },
    data() {
        return {
            // mailsCount: null
        }
    },
    methods: {
        goTo(section) {
            eventBus.$emit(GO_TO, section)
        },
    }
}