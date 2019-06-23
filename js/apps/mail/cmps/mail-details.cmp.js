import detailsControlbar from './details-controlbar.cmp.js'
import detailsContent from './details-content.cmp.js'

export default {
    template: `
    <section class="mail-details-container flex column">
        {{mailsCount}}
    <details-controlbar :mails="mails"></details-controlbar>
    <details-content :mails="mails"></details-content>
    </section>
    `,
    props: ['mails', 'mailsCount'],
    components: {
        detailsControlbar,
        detailsContent
    }
}