<template>
  <v-dialog
    class="DialogContent"
    v-model="showDialog"
    persistent
    max-width="350"
    >
    <v-card>

      <v-card-text class="font-weight-medium text-center text-h5 pt-2">
        Hi Diana
      </v-card-text>

      <v-card-text class="text-center">
      	To continue your subscription please enter your password

      	<v-text-field
					v-model="password"
					:type="showPassword ? 'text' : 'password'"
					@click:append="showPassword = !showPassword"
					label="Password" 
					:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
			    placeholder="You SLU Password"
		    ></v-text-field>
      </v-card-text>

      

      <v-card-actions class="d-flex justify-center">
        <v-btn
        	outlined
          rounded
          text
          @click="verifyPasswrod()"
        	>
          	Continuar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import router from '../../router/index.js'

  export default {
    data () {
      return {
        showPassword: false,
        password:null,
      }
    },
    props:{
    	showDialog:Boolean,
      nextUrl: String 
    },
    methods:{
    	//VERIFICA LA CONTRASEÑA
    	verifyPasswrod(){
    		this.hideModal();
        router.push({ 
          path: this.nextUrl
        });
    	},
    	//OCULTA LA VENTANA MODAL
    	hideModal(){
    		this.$emit('hideModal');
    	}
    }
  }
</script>
<style scoped lang="less">
.DialogContent{
	z-index: 100000;

	//CONTENEDOR DEL INPUT DE CONTRASEÑA
	.passwordContent{
		width: 90%;
		background: red;
	}
}
</style>