import eventBus, { FILTER_BY } from '../../../event-bus.js';

export default {
    template: `
    <section class="searchbox-container">
        <input type="text" v-model="searchTerm" @keyup="searchInMails" placeholder="Search..."/>
        <i class="icon icon-star icon-magnifier"></i>
    </section>
    `,
    data() {
        return {
            searchTerm: null
        }
    },
    methods: {
        searchInMails() {
            eventBus.$emit(FILTER_BY, this.searchTerm.toLowerCase())
        }
    }
}