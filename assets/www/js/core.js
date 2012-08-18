/*
 * Author - Shravan Arsa <shravan@kushraho.in>
 * Contains classes which perform -
 * 1. Database operations
 * 2. Oauth operations
 */
window.connection = function (){
	/* This function is used setup initial oauth connection.
	 * Returns the access token if everything goes fine else
	 * it will return null. 
	 */

	var redirect = "https://frndk.de";
	var oauth;
	var token; /* Stores the access token in this variable. */
	var userinfo; /* Stores a JSON of user information. */

	function setup(oauthobj){
		oauth = oauthobj;
		oauth.fetchRequestToken(req_succ, req_fail);
	}

	/*  Request Success */	
	function req_succ(url){
		/* Attach listeners now. */
		window.plugins.childBrowser.onLocationChange = function(loc){
			/* If the user denied access. */
			if(loc.indexOf(redirect+"/?denied") >=0 ){
				console.log("Oauth : User denied permision");
				return null;
			}
			if(loc.indexOf(redirect+"/?") >= 0){
				console.log("Oauth : Getting the verifier" + loc);
				oauth.setVerifier(loc.split('&')[1].split('=')[1]);
				oauth.fetchAccessToken(acc_succ, acc_fail);
			}
		}
		window.plugins.childBrowser.showWebPage(url, {showLocationBar: false});
	}

	/* Failure */
	function req_fail(){
		console.log('Oauth : Request token failed');

		return null;
	}

	function acc_succ(){
		console.log('Oauth: Got the access token');	
		token = oauth.getAccessToken();

		/* We make a sql non blocking sql transaction. */	
		window.plugins.childBrowser.close();
		setup_user();
	}
	
	function acc_fail(){
		console.log('Oauth: Access token failed');
	}

	/* Function to RESTful api things :) */
	function setup_user(){
		oauth.get(redirect+"/api/users/show.json", function (data){
				userinfo = data.text;
				console.log(userinfo);
			}, 
			function(data){
					console.log("Api: Could not get userinfo");
				});			
	}

	return {
		setup: setup	
	};
}();
