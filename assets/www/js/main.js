/* This Oauth object is used to for connection to Friendika pods. */

var oauth = OAuth({
	consumerKey: "GylD4SmzPnL0ods9jby6",
	consumerSecret: "b20O2zxvQBPAPRmT4Dy3",
	requestTokenUrl: "https://frndk.de/api/oauth/request_token",
	authorizationUrl: "https://frndk.de/api/oauth/authorize",
	accessTokenUrl: "https://frndk.de/api/oauth/access_token"
});	

document.addEventListener("deviceready",deviceReady,false);
function deviceReady(){
	console.log('Friendika: Setting up database now');
	db.setup();
	console.log('Friendika: Setting Oauth up');
	connection.setup(oauth);		
}
