import listSearchbox from './list-searchbox.cmp.js'
import mailPreview from './mail-preview.cmp.js'

export default {
    template:`
    <section class="mail-list-container">
    <list-searchbox></list-searchbox>
    <div class="previews flex column">
        <mail-preview></mail-preview>
        <mail-preview></mail-preview>
        <mail-preview></mail-preview>
        <mail-preview></mail-preview>
        <mail-preview></mail-preview>
        <mail-preview></mail-preview>
        <mail-preview></mail-preview>
        <mail-preview></mail-preview>
        <mail-preview></mail-preview>
        <mail-preview></mail-preview>
        <mail-preview></mail-preview>
        <mail-preview></mail-preview>
        <mail-preview></mail-preview>
        <mail-preview></mail-preview>
        <mail-preview></mail-preview>
        <mail-preview></mail-preview>
        <mail-preview></mail-preview>
    </div>
    </section>
    `,
    components: {
        listSearchbox,
        mailPreview
    }
}