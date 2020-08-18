<template>
  <div> 
         <div>
            
             
              <vee-line-bar-background >

              </vee-line-bar-background>
              <vee-line-bar-irregularty v-model="dataList"> </vee-line-bar-irregularty>
         </div>

         <div>
             <input type="button" @click="doReset()" value="重构" class="btn btn-reset" />
         </div>
        
     </div>
</template>
<script>
import Vue from "vue";
import { veeLineBarBackground } from "vee-image";
Vue.use(veeLineBarBackground);
import {veeLineBarIrregularty} from "vee-image";
Vue.use(veeLineBarIrregularty);

export default {
    data(){
       return {
           
       
            dataList:[820, 932, 901, 934, 1290, 1330, 1320],
       

       };
    },
    methods:{
        doReset(){
            
            this.dataList=[
      +(Math.random()*3000).toFixed(0),
      +(Math.random()*3000).toFixed(0),
      +(Math.random()*3000).toFixed(0),
      +(Math.random()*3000).toFixed(0),
      +(Math.random()*3000).toFixed(0),
      +(Math.random()*3000).toFixed(0),
      +(Math.random()*3000).toFixed(0)
    ];
        }
    }
  
}
</script>