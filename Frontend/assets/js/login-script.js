// 

function login() {
    dataEmail = document.getElementById("username").innerHTML
    dataPass = document.getElementById("pass").innerHTML
if(dataEmail == "" || dataPass == ""){
    console.log("works")
    // break;
}
    
$.post("https://codechefvitbugs.herokuapp.com/users/login", 
    {
        email: dataEmail,
        password: dataPass
    },
    function(data,status){
        console.log(data)
        console.log(status)
        })
}