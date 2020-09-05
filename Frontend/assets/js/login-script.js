var getParams = function (url) {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};









function login() {
    dataEmail = document.getElementById("username").innerHTML
    dataPass = document.getElementById("pass").innerHTML
if(dataEmail == "" || dataPass == ""){
    console.log("works")
    // break;
}
    
    // $.get("http://codechefvitbugs.herokuapp.com/auth/google", 
    //     // {
    //     //     email: dataEmail,
    //     //     password: dataPass
    //     // },
    //     function(data,status){
    //         console.log(data)
    //         console.log(status)
    //         })
}
