import commonControls from './common-ctrls-cmp.js';
import colorCtrl from '../cmps/color-ctrl-cmp.js';

export default {
  template: `
    <section class="note" :class="'note-color-'+[info.color]">
    <i class="icon icon-sm icon-quill-write-1"></i>
       <h3>{{info.content.title}}</h3>
       <p> {{info.content.txt}}</p> 
       <transition name="scale-fade">
         <color-ctrl v-if="showColorCtrl" @close-color="closeColors()"></color-ctrl> 
        </transition>
       <common-controls @open-colors="openColors()" :colors='colors'></common-controls>
    
    </section>
    `,
  props: ['info','colors'],
  data() {
    return {
      showColorCtrl: false
    }
  },
  mounted() {
  
   
  },
  methods: {
    deleteNote(ev) {
      // this.$emit('deleteNote')
    },
    openColors(){
      console.log('open colors on note')
      this.showColorCtrl= true
    },
    closeColors(){
      console.log('close colors on note')
      this.showColorCtrl= false
    }
  },
  components:{ commonControls,colorCtrl}
}


