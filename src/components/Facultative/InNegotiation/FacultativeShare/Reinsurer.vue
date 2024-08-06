<template>
	<div class="Reinsurer d-flex justify-center align-self-start flex-wrap">
		
		<!--Numero de insurer-->
		<h5 class="Reinsurer__Number d-flex justify-start align-center">
			Reinsurer {{numberReinsurer}}
		</h5>

		<!--Inputs-->
		<div class="Reinsurer__InputsCont d-flex justify-start align-self-start flex-wrap">
			
			<div class="InputCont">
        <v-text-field label="PICC" />
      </div>
      <div class="InputCont">
        <v-text-field label="Line" />
      </div>
      <div class="InputCont">
        <v-text-field label="Exposure" />
      </div>
      <div class="InputCont">
        <v-text-field label="Premium Line" />
      </div>


      <div class="InputCont">
        <v-text-field label="Total Premium to Reinsurer" />
      </div>
      <div class="InputCont">
        <v-text-field label="Reinsurer Premium" />
      </div>
      <div class="InputCont">
        <v-select
        	v-model="IncludeDic"
        	label="Include DIC reinsurer" 
        	:items="DicOptions"
        	@change="ChangeDic(IncludeDic)"
        />
      </div>
		</div>

		<!--Sección de DIC Reinsurer-->
		<div v-if="showDicReinsurer" class="Reinsurer__Dic d-flex align-self-start flex-wrap">
			
			<div 
			v-for="reinsurer in reinsurersDicData"
			:key="reinsurer.id"
			class="Reinsurer__Dic__Line d-flex justify-space-between align-self-start flex-wrap">
				
				<div class="InputCont">
	        <v-text-field 
		        :value="reinsurer.everglade" 
		        label="Everglade DIC"
		        @change="updateEverglade('Everglade',reinsurer.id, $event)"
	        />
	      </div>
	      <div class="InputCont">
	        <v-text-field 
		        :value="reinsurer.support" 
		        label="Support" 
		        @change="updateEverglade('Support',reinsurer.id, $event)"
	        />
	      </div>
	      <div class="InputCont">
	        <v-select 
	        	v-model="reinsurer.premium" 
	        	:items="dicReinsurerOptions" 
	        	label="Premium" 
	        	@change="updateEverglade('Premium',reinsurer.id, $event)"
	        />
	      </div>

    	</div>

    	<div class="Reinsurer__Dic__Button d-flex justify-start">
    		<v-btn @click="AppendOption()" text rounded>
		      <v-icon class="mr-2">
		        mdi-plus-circle
		      </v-icon>
		      Add New 
		    </v-btn>
    	</div>
		</div>
	</div>
</template>
<script>
export default{
	name:'Reinsurers',

	props:{
		numberReinsurer:{
			type: String,
			required:true,
		}
	},

	data(){
		return{
			IncludeDic:'No',
			DicOptions:[
        'Yes',
        'No'
      ],

			showDicReinsurer:false,
			dicReinsurerOptions:[
				'Example Option 1',
				'Example Option 2'
			],
			/*
				El array reinsurersDicData  guarda toda la información
				que se ingresa al incluir Dic Reinsurer
			*/
			reinsurersDicData:[
				{ 
					id:0,
					everglade:'',
					support:'',
					premium:''
				},
				{ 
					id:1,
					everglade:'',
					support:'',
					premium:''
				}
			]

		}
	},

	methods:{
		//Muestra / oculta la sección  Dic Insusrer
		ChangeDic(optionSelected){
			optionSelected === 'Yes' ? this.showDicReinsurer = true : this.showDicReinsurer = false;
		},

		//Añade una nueva opción al array  reinsurersDicData
		AppendOption(){
			const newItem =  this.reinsurersDicData.length;
			const newElement = { 
				id:newItem,
				everglade:'',
				support:'',
				premium:''
			}
			this.reinsurersDicData = [...this.reinsurersDicData, newElement]
		},

		//Actualiza los valores del array global
		updateEverglade(type,key,newValue){

			switch(type) {
			  case 'Everglade':
			    this.reinsurersDicData[key].everglade = newValue;
			    break;

			  case 'Support':
			    this.reinsurersDicData[key].support = newValue;
			    break;

			   case 'Premium':
			    this.reinsurersDicData[key].premium = newValue;
			    break;
			}
		}
	}

	
}
</script>
<style lang="less" scoped>
@import '~@/assets/style/Facultative.less';
</style>