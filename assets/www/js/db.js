/* This takes care of all the database related stuff. */

window.db = function (){
	var db = null;
	var dbstatus = false;

	function setup(){
		console.log("db: Making the db");
		/* DB size is 1 MB */
		db = window.openDatabase('friendika', '1.0', 'friendika', 1048576);
		db.transaction(populateDB, function(){
				console.log("db: App has a db connection");
				dbstatus = true;
			}, function (){
				console.log("db: App is working without a database connction");
				dbstatus = false;
				});
	}	

	function populateDB(tx){
		/* This table always has only one entry in it. */
		tx.executeSql('CREATE TABLE IF NOT EXIST frndk_user_config(uid INT NOT NULL, tokenkey VARCHAR(32) NOT NULL, tokensecret VARCHAR(32) NOT NULL);');
	}

	return {
		setup: setup
	};
}();
