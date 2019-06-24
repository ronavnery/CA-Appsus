import detailsControlbar from './details-controlbar.cmp.js'
import detailsContent from './details-content.cmp.js'

export default {
    template: `
    <section class="mail-details-container flex column">
    <details-controlbar @reply-clicked="handleReplyClick"></details-controlbar>
    <details-content></details-content>
    </section>
    `,
    props: ['mails', 'mailsCount'],
    components: {
        detailsControlbar,
        detailsContent
    },
    methods: {
        handleReplyClick(mail) {
            this.$emit('reply-clicked', mail)
        }
    }
}