export default {
  template: `
    <div class="color-ctrl flex flex-wrap">

        <div class="color-circle color-spot " :class="'note-color-'+[i]" v-for="(i) in 8">
       
       </div

    `,
  props: ['colors'],
  data() {
    return {}
  },
  created :function()  {
    console.log('colors at controlsss', this.colors)
    noOfColors: {
        return new Array(this.colors)
  }},
  computed: {
    colorIndex: function() {
      return  Array[i]
    }
  },
  methods: {
    closeMsg() {
      this.msg = null
    }
  }
}

{
  /* <div class="color-circle   flex" v-for="(i) in 8">
            <span class=[i] >{{i}}</span> */
}
