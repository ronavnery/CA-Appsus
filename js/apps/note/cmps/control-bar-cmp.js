

const controlBar= {
    template: `
       <section>
            <div class="new-item-control">
                <input type="text"/>
            </div>
        </section>
    `,
    data() {
        return {
           
        }
    },
    created() {
       
    },
    methods: {
        closeMsg() {
            this.msg = null;
        }
    }
}

export default controlBar;