import detailsControlbar from './details-controlbar.cmp.js'
import detailsContent from './details-content.cmp.js'

export default {
    template: `
    <section class="mail-details-container flex column">
    <details-controlbar></details-controlbar>
    <details-content></details-content>
    </section>
    `,
    components: {
        detailsControlbar,
        detailsContent
    }
}