export default {
	config: {
		auth: {
			clientId: 'd42fe7a9-435a-4555-b7a8-11e995a76776',
			authority: 'https://login.microsoftonline.com/common/',
			clientSecret: "Enter_the_Client_Secret_Here",
			postLogoutRedirectUri: 'http://localhost:8080/subscription'
		},
		cache: {
			cacheLocation: 'sessionStorage',
			storeAuthStateInCookie: true
		},
	},
	params: {
		prompt: 'select_account',
		scopes: [
			'user.read',
      'mail.send',
			'mailboxsettings.readwrite',
			'calendars.readwrite'
		]
	}	
}