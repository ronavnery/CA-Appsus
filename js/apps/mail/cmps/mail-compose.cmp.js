

export default {
    template: `
    <section class="mail-compose-container flex column">
    <div class="compose-bar"></div>
    <div class="compose-inputs">
        <div class="compose-input-from-container">
        <span class="compose-from-title thick">From:</span>
        <input type="text" class="compose-from-input">
        </div>
        <div class="compose-input-to-container">
        <span class="compose-to-title thick">To:</span>
        <input type="text" class="compose-to-input">
        </div>
        <div class="compose-input-subject-container">
        <span class="compose-subject-title thick">Subject:</span>
        <input type="text" class="compose-subject-input">
        </div>
    </div>
    </section>
    `,
    data() {
        return {
            
       }
    }
}