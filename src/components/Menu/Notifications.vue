<template>
	<div>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
			    <div  class="CounterContainer">
						<!-- CONTADOR DE NOTIFICACIONES 	-->
						<div v-if="numNotifications > 0" class="CounterContainer__Counter">
							<span class="CounterContainer__Counter--Number">{{numNotifications}}</span>
						</div>

						<v-btn v-bind="attrs"	v-on="on" icon>
							<v-icon>mdi-bell-outline</v-icon>   
						</v-btn>
					</div>
      </template>

      <!--LISTA DE NOTIFICACIONES-->
      <v-list
        v-if="numNotifications > 0"
        class="NotificationsList"
        >
        
        <v-list-item
          v-for="(item, index) in notificationsToValidate"
          :key="index"
          @click="$router.push({name:'Dashboard'})"
        >
          <div class="NotificationsList__Notification" >
            <div class="NotificationsList__Content">
              <div class="NotificationsList__Item">
                <strong>id:</strong> {{ item.id }}
                <strong>reference:</strong> {{ item.reference }}
                <strong>status:</strong> {{ item.status }}
              </div>
            </div>
        	</div>
        </v-list-item>

      </v-list>
    </v-menu>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'


export default{
	data() {
		return {
      notifications: []
		}
	},
  methods: {
    ...mapActions([
      'getNotificationsByUser',
      'setNoteAsReaded',
    ]),

    //Redirige a la ruta de la notificacion
    async redirect(idNote, url) {
      await this.setNoteAsReaded({
        idNote,
        idUsuario: this.user.id
      })

      this.$router.push(url)
    }
  },
  computed: {
    ...mapGetters(['user','socketNotificationList']),
    // Numero de notificaciones
    numNotifications() {
      return  this.notificationsToValidate.length  
    },
    notificationsToValidate(){
      return this.socketNotificationList.filter(
        item => item.status.toLowerCase() === 'validating'
      )
    }
  }
}
</script>
<style scoped lang="less">
/* 
---------------------------------------------------------
Estilos del contador de notificaciones
---------------------------------------------------------
*/
.CounterContainer{
	width: 37px;
	height: 37px;
	border-radius: 40px;
	background: #D2DEED;
	position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

	&__Counter{
		width: 15px;
		height: 15px;
		border-radius:15px;
		background:#E26B5B;
		position:absolute;
		top: -3px;
		right: -3px;
		display: flex;
		justify-content: center;
		align-items: center;
		&--Number{
			font-size: 10px;
			color: white;
		}
	}
  
	i{
		font-size: 24px ; 
		color: #003D6D !important;
	}
}


/* 
---------------------------------------------------------
Estilos de las notificaciones 
---------------------------------------------------------
*/
.NotificationsList{
	width: 350px !important;
  max-height: 300px;
  background: white;

  &__Notification{
    width: 100%;
    min-height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding:15px;
    cursor: pointer;
    background-color: #edf2f8 ;
  }
  &__Content{
    width: 100%;
    height: 100%;
    text-align: justify;
    justify-content: center;
    align-items: center;
  }
  &__Item{
    font-size: .8rem;
    text-align: center;
  }

  //Notificaciones que aún no han sido leidas
  .unread{background: #edf2f8;}
}



/*
---------------------------------------------------------------------
Modificacion de estilos de vuetify
---------------------------------------------------------------------
*/

//Barra de scroll en el cuadro de notificaciones
.v-menu__content::-webkit-scrollbar {
	background:white;
	width: 5px;
}
.v-menu__content::-webkit-scrollbar-thumb {
  background: #C7C7C7;
  border-radius: 150px;
}

//Lista de notificaciones
.v-list-item, .v-list{width: 100%; padding:0px; background: white;}
</style>