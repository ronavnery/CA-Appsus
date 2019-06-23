import eventBus, { MAILS_COUNT } from '../../../event-bus.js';

export default {
    template:`
    <section class="controlbar-container flex" v-if="mails">
    <i class="icon icon-email-action-reply control-reply"></i>
    <i class="icon icon-email-action-reply-all control-replyall"></i>
    <i class="icon icon-email-action-send control-back icon-rotate-180"></i>
    <i class="icon icon-email-action-send control-forward"></i>
    </section>
    `,
    props: ['mails'],
    created() {
        eventBus.$on(MAILS_COUNT, (mails) => this.mails = mails)
    }
}