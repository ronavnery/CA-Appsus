import eventBus, { GO_TO } from '../../../event-bus.js';

export default {
    template: `
    <section class="side-bar-container flex column">
        <button class="new-mail-btn">New Mail</button>
        <ul>
            <li @click="goTo('Inbox')">Inbox</li>
            <li @click="goTo('Starred')">Starred</li>
            <li @click="goTo('Sent')">Sent</li>
            <li @click="goTo('Trashed')">Trash</li>
        </ul>
    </section>
    `,
    methods: {
        goTo(section) {
            eventBus.$emit(GO_TO, section)
        }
    }
}