import { io as socket } from 'socket.io-client';
import underwriters from './underwriters';


export default {

	/**
	 * inicializa la conexión del socket-cliente con el servidor
	 * @param {Objet} métodos de la vuex 
	 * @param {socket} io cliente de socket.io
	 */
	startSocket({ commit, dispatch, state }, io = socket) {
		
		commit('initSocket', io);
		io.on('connect', () => {
			// si el usuario ya esta autorizado se agrega un registro ala lista de sockets
			if(state.auth.user.id !== ''){
				io.emit('new_user', {
					idUser: state.auth.user.id,
					idSocket: io.id,
				});
			}
		});

		io.on('reload_notification', async ( idUser ) => {
			try {
				 const ID = Number(idUser) || state.auth.user.id;
				 await underwriters.getNotificationsFourEye({ commit, state }, ID);
			} catch (error) {
				console.log(error);
			}
			
        });
    },

	/**
	 * al hacer login con outlook crea un un nuevo registro a la lista de sockets
	 */
	socketConnectNewUser({state}){
	    const {socketClient} = state.socket
		socketClient.emit('new_user',{
			idUser: state.auth.user.id,
			idSocket: socketClient.id,
		})
		socketClient.emit('send_notification',{
			idUser: state.auth.user.id ,
		})
	},


	/**
	 * emite el evento para borrar de la lista de socket del servidor la session actual sin
	 * desconectar el socket
	 * @param {object} context informacion de la vuex
	 */
	socketCloseSession({state}){
		const {socketClient} = state.socket
		socketClient.emit('close_session', socketClient.id )
	},

	/**
	 * este método hace que el socket emita el evento para recargar las notificaciones del 
	 * usuario, si no se le pasa el parámetro de userId recargar la notificaciones del usuario logueado
	 * @param {object} vuex metodos de vuex 
	 * @param {number} userId  
	 */
	socketReloadNotifications({state}, userId){
		const {socketClient} = state.socket
		socketClient.emit('send_notification',{
			idUser: userId ? userId : state.auth.user.id ,
		})
	},
}