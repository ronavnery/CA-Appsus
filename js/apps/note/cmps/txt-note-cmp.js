import commonControls from './common-ctrls-cmp.js';
import colorCtrl from '../cmps/color-ctrl-cmp.js';

export default {
  template: `
    <section class="note" :class="[info.color]">
    <i class="icon icon-sm icon-quill-write-1"></i>
       <h3>{{info.content.title}}</h3>
       <p> {{info.content.txt}}</p> 
       <color-ctrl ></color-ctrl> 
       <common-controls @open-colors="openColors()" :colors='colors'></common-controls>
    
    </section>
    `,
  props: ['info','colors'],
  data() {
    return {
     
    }
  },
  mounted() {
  
   
  },
  methods: {
    deleteNote(ev) {
      // this.$emit('deleteNote')
    },
    openColors(){
      console.log('open colors');
      
    }
  },
  components:{ commonControls,colorCtrl}
}


