<template>
	<div class="Retrocession d-flex justify-center align-self-start flex-wrap">
		<h4 class="Retrocession__Title">
      Retrocession  
    </h4>

    <!--Inputs-->
    <div class="Retrocession__InputsCont d-flex justify-start align-self-start flex-wrap">
			<div class="InputCont">
        <v-text-field label="Mandarin" />
      </div>
			<div class="InputCont">
        <v-text-field label="Line" />
      </div>
      <div class="InputCont">
        <v-text-field label="Exposure" />
      </div>
      <div class="InputCont">
        <v-text-field label="Total Premium" />
      </div>
      <div class="InputCont">
        <v-text-field label="Premium Line" />
      </div>
      <div class="InputCont">
        <v-text-field label="Difference Total Premium" />
      </div>
      <div class="InputCont">
        <v-text-field label="Difference Premium Line" />
      </div>
      <div class="InputCont">
        <v-text-field label="Total Deductions %" />
      </div>
      <div class="InputCont">
        <v-text-field label="Net Premium" />
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
		<div v-if="showDicReinsurer" class="Retrocession__Dic d-flex align-self-start flex-wrap">
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
	        	:items="dicReinsurerPremiumOptions" 
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

    <!--Deductions-->
    <h4 class="Retrocession__Title">
      Deductions  
    </h4>
    <div class="Retrocession__InputsCont d-flex justify-start align-self-start flex-wrap">
			<div class="InputCont">
        <v-text-field label="LTA" />
      </div>
      <div class="InputCont">
        <v-text-field label="Brokerage" />
      </div>
      <div class="InputCont">
        <v-text-field label="Tax" />
      </div>
      <div class="InputCont">
        <v-text-field label="Eng Fee" />
      </div>
      <div class="InputCont">
        <v-text-field label="Fronting" />
      </div>
      <div class="InputCont">
        <v-text-field label="Others" />
      </div>
    </div>

	</div>
</template>
<script>
export default{
	name:'FacultativeRetrocession',
	data(){
		return{
			IncludeDic:'No',
			DicOptions:[
        'Yes',
        'No'
      ],
      showDicReinsurer:false,
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
			],
			dicReinsurerPremiumOptions:[
				'Example Option 1',
				'Example Option 2'
			],
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
		
	},
}
</script>
<style lang="less" scoped>
.Retrocession{
	width: 100%; 
	height: auto;
	
  //Titulo del componente
  .Retrocession__Title{
    width: 100%;
    height: 50px;
    font-size: 20px;
    font-weight: 600;
  }


  //Contnedor de inputs
  .Retrocession__InputsCont{
  	width: 100%;
  	height: auto;
  	gap:2.66%;

  	.InputCont{
	  	width: 23%;
	    height: 50px;
	    margin-top: 5px;
	  }
  }

  //DIC
  .Retrocession__Dic{
  	width: 70%;
  	height: auto;
  	margin-top: 25px;

  	.Reinsurer__Dic__Line{
  		width: 100%;
  		height: 50px;
  		margin-bottom: 15px;

  		.InputCont{
	  		width: 30%;
	      height: 100%;
	  	}
  	}
  }

  //Botón añadir
  .Reinsurer__Dic__Button{
  	width: 100%;
  	height: auto;
  	.v-btn{
  		text-transform: none;
	    color: #003D6D;
	    font-weight: 500;
	    letter-spacing: normal;
  	}
  }
	
}
</style>