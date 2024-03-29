

export default {
  template: `
    <div class="color-ctrl flex flex-wrap">
    
        <div v-for="(i) in 8" class="color-spot" :class="'note-color-'+[i]"
        @click.stop="colorClicked(i)" >
        </div>
</div>

    `,
  props: ['colors'],
  data() {
    return {}
  },
  created: function() {
    // console.log('colors at controlsss', this.colors)
    noOfColors: {
      return new Array(this.colors)
    }
  },
  computed: {},
  methods: {
    closeMsg() {
      this.msg = null
    },
    colorClicked(color) {
      // eventBus.$emit(CHANGE_COLOR, color)
      console.log('sending color change', color)
      this.$emit('change-color', color)

      // this.$emit('close-color')
    }
  }
}

{
}
