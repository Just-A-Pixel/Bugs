// "https://codechefvitbugs.herokuapp.com/users/getallusers"

// $.get("https://codechefvitbugs.herokuapp.com/users/getallusers". function(data) {
    
// })
// console.log(window.location.href)
console.log('Helo worl' + localStorage.getItem("token"))
//var string = "http://127.0.0.1:5500/CODECHEF%20bug%20site/bugs-all.html/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjBkZGQ4YjhmYzc5NTAwMTc1NGI4NjEiLCJuYW1lIjoiUkFKIEFOQU5EIDE5QkNFMDE2NSIsImVtYWlsIjoicmFqLmFuYW5kMjAxOUB2aXRzdHVkZW50LmFjLmluIiwiaWF0IjoxNTk5MzI3NjQ3LCJleHAiOjE1OTk0MTQwNDd9.4nFGcP2d3MULvKr5vdVJuMEhZOAOnsgHgOj7aEbXj5c&_id=5f0ddd8b8fc795001754b861"

// console.log(token)
// let token;

// var string = window.location.href
//     string = string.split("?")
//     string = string[1].split("&")
//     string = string[0].split("=")
//     token = string[1]
console.log("Hello world")

if(localStorage.getItem("token") == null) {

    var string = window.location.href
    string = string.split("?")
    string = string[1].split("&")
    string = string[0].split("=")
    token = string[1]

    localStorage.setItem("token", token);
} else {
    token = localStorage.getItem("token");
}



//var test_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjBkZGQ4YjhmYzc5NTAwMTc1NGI4NjEiLCJuYW1lIjoiUkFKIEFOQU5EIDE5QkNFMDE2NSIsImVtYWlsIjoicmFqLmFuYW5kMjAxOUB2aXRzdHVkZW50LmFjLmluIiwiaWF0IjoxNTk5MzE0NDY5LCJleHAiOjE1OTk0MDA4Njl9.pCuE6swzF68vgu0d-s2oeQ_TBf8ac8WFXxaOwsNZx2E'
test_token = token
$.ajax({
    url: 'https://codechefvitbugs.herokuapp.com/report/bug/all',
    type: 'GET',
    beforeSend: function (xhr) {
        xhr.setRequestHeader('auth-token', test_token);
    },
    success: function (data, status) { for(i=0; i<data.length; i++) {
                document.getElementById("test").innerHTML+= '<a href="#issue-list"><li class="project-element"  onclick="select(this)" onmouseover="addAnimate(this)" onmouseout="removeAnimate(this)">'+data[i].project+'</li></a><br>'
                document.getElementById("project").innerHTML += "<option>"+data[i].project+"</option>"
            }
            console.log("Recieved projects list and size = "+i)},
    error: function () { },
    });





var currentObject = 0;

// $.get('https://codechefvitbugs.herokuapp.com/report/bug/all', function(data, status){

  
//     for(i=0; i<data.length; i++) {
//         document.getElementById("test").innerHTML+= '<a href="#issue-list"><li class="project-element"  onclick="select(this)" onmouseover="addAnimate(this)" onmouseout="removeAnimate(this)">'+data[i].project+'</li></a><br>'
//         document.getElementById("project").innerHTML += "<option>"+data[i].project+"</option>"
//     }
//     console.log("Recieved projects list and size = "+i)
// });

// Side project list animations

function addAnimate(x) {x.style.boxShadow = "inset "+(x.offsetWidth)+"px 0 0 0 #dce9e6"}

function removeAnimate(x) {x.style.boxShadow = "none"}

function select(x) {
    if(currentObject!=0){
        currentObject.classList.remove("selected")
        currentObject.classList.add("project-element")
    }
    currentObject = x;
    x.classList.add("selected")
    x.classList.remove("project-element")

    document.getElementById("issue-list").innerHTML = ''

    $.ajax({
        url: 'https://codechefvitbugs.herokuapp.com/report/bug/all',
        type: 'GET',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('auth-token', test_token);
        },
        data: {},
        success: function (data, status) { for(i=0; i<data.length; i++) {
                if(data[i].project == x.innerHTML) {
                    console.log("success")
                    for(j=0; j<data[i].alpha.length; j++){
                    console.log(data[i].project)
                    
                    var commentString = ""
                    for(k=0; k<data[i].alpha[j].commentsByUsers.length; k++){
                                                        commentString +='<hr>' +
                                                                        '<p class="container comment-title">'+
                                                                        '<img src="assets/css/img/Ellipse 11.svg" class="bug2">'+
                                                                        '<span class = "comment-name">'+data[i].alpha[j].commentsByUsers[data[i].alpha[j].commentsByUsers.length-1-k].name+'</span><br>'+
                                                                        '<span class = "comment">'+data[i].alpha[j].commentsByUsers[data[i].alpha[j].commentsByUsers.length-1-k].discussions+'</span>'+
                                                                        '</p>'}
    
                    document.getElementById("issue-list").innerHTML += '<div class="container tweet">'+
                                                                            '<p class="title">'+
                                                                                '<img src="assets/css/img/bug.svg" class="bug">'+
                                                                                '<div class="btn remove-tweet" onclick="removeBug(this)">X</div>'+
                                                                                '<span class = "tweet-name">'+data[i].alpha[j].issuedby+'</span><br>'+
                                                                                '<span class = "tweet-project">Found a bug in: '+data[i].project+'</span>'+
                                                                            '</p>'+
                                                                            '<hr>'+
                                                                        '<h4 class="tweet-title">'+data[i].alpha[j].title+'</h4>'+
                                                                        '<p class="tweet-description">'+data[i].alpha[j].description+'</p>'+
                                                                        '<img src="assets/css/img/chat.svg" style="width: 20px;"> <span class="show-comment-button" onclick="showComment(this)">Comments</span>'+
                                                                            '<div class="comment-box " style="display: none;">'+
                                                                                '<div class=" container text-center input" ><input type="text" class = "add-comment" > <button class="btn btn-primary submit-comment" onclick="addComment(this)">Comment</button>'+
                                                                                '</div>'+
                                                                                 commentString +
                                                                            '</div>'+
                                                                            '<h6 class = "tweet-id" onselectstart="return false">'+data[i].alpha[j]._id+'</h6>'+
                                                                        '</div>'
                    console.log(data[i].alpha[j].commentsByUsers)
                    }
                }
            }},
        error: function () { },
        });
}

// Add a new issue

function submitBug() {
    var bugProject = document.getElementById("project").value
    var bugTitle = document.getElementById("title").value
    var bugDescription = document.getElementById("description").value
    var bugIssuedBy = document.getElementById("issuedby").value
    if(bugProject =='Select Project' || bugTitle == '' || bugDescription == '' || bugIssuedBy == ''){
        alert("Please fill all the details")
    } else {
    console.log(bugProject)
    console.log(bugTitle)
    console.log(bugDescription)
    console.log(bugIssuedBy)
    document.getElementById("report-bug").style.display = "none";
    document.getElementById("1").parentNode.parentNode.style.height = "200px";
    
        // Media query bug fix

        function myFunction(x) {
            if (x.matches) { // If media query matches
                document.getElementById("1").parentNode.parentNode.style.height = "250px";
       
        }}
        
        var x = window.matchMedia("(max-width: 527px)")
        myFunction(x) 
        x.addListener(myFunction)

    console.log()
    
    // $.post("https://codechefvitbugs.herokuapp.com/report/reportbug", 
    // {
    //     project: bugProject,
    //     title: bugTitle,
    //     description: bugDescription,
    //     issuedby: bugIssuedBy
    // },
    // function(data,status){
    //     console.log(data)
    //     console.log(status)
    //     alert("Bug Submitted")
    //     })


        
    $.ajax({
        url: 'https://codechefvitbugs.herokuapp.com/report/reportbug',
        type: 'POST',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('auth-token', test_token);
        },
        data: {
            project: bugProject,
            title: bugTitle,
            description: bugDescription,
            issuedby: bugIssuedBy
        },
        success: function(result) {
            alert("Bug Submitted")
        }
    });


    }
}

// Remove an issue

function removeBug(x) {
    console.log(x.parentNode.parentNode.lastElementChild.innerHTML)
    var idToDelete = x.parentNode.parentNode.lastElementChild.innerHTML
    var r = confirm("Are you sure you want to remove?");
    if (r==true){
        x.parentNode.remove()

        $.ajax({
            url: 'https://codechefvitbugs.herokuapp.com/report/deletebug/'+idToDelete,
            type: 'DELETE',
            beforeSend: function (xhr) {
                xhr.setRequestHeader('auth-token', test_token);
            },
            success: function(result) {
                console.log("Deleted")
            }
        });
    }
}


// Add project

var addProjectButton = null
function reveal(x) {
    document.getElementById("left-side").style.display = "block";
    x.style.display = "none"
    addProjectButton = x
}

function submitProject() {
    r = document.getElementById("project-input")

    $.ajax({
        url: 'https://codechefvitbugs.herokuapp.com/report/addprojectcodechef',
        type: 'POST',
        beforeSend: function (xhr) {
            xhr.setRequestHeader('auth-token', test_token);
        },
        data: {
            project: r.value,
        },
        success: function(data,status) {
            alert("Project added")
        }
    });

    r.value = null
    document.getElementById("left-side").style.display = "none"
    addProjectButton.style.display = "inline";
}


function showForm(x) {
    document.getElementById("report-bug").style.display = "inline-block"
    x.parentNode.parentNode.style.height = "400px"
     // Media query bug fix

     function myFunction(y) {
        if (y.matches) { // If media query matches
            x.parentNode.parentNode.style.height = "450px"}
   
    }
    
    var y = window.matchMedia("(max-width: 527px)")
    myFunction(y) 
    y.addListener(myFunction)
    console.log(y.parentNode.parentNode)
}   


function hideReportBug(x){
    x.parentNode.style.visibility = "hidden"
}

function addComment(x) {

    issueId = x.parentNode.parentNode.parentNode.lastElementChild.innerHTML
    patch = x.parentNode.firstElementChild.value

    console.log(x.parentNode)
    var txt =  
                '<hr>' +
                '<p class="container comment-title">'+
                '<img src="assets/css/img/Ellipse 11.svg" class="bug2">'+
                '<span class = "comment-name">'+"DJ"+'</span><br>'+
                '<span class = "comment">'+patch+'</span>'+
                '</p>'
    if (patch != ""){
        $(x.parentNode).after(txt);
        alert("Added Comment")

        $.ajax({
            type: 'PATCH',
            url: 'https://codechefvitbugs.herokuapp.com/report/addcommentsbyusers/'+issueId,
            beforeSend: function (xhr) {
                xhr.setRequestHeader('auth-token', test_token);
            },
            data: {
                userComments: patch,
                issuedby: "DJ"
            },
            success: function(result) {
                console.log("added comment")
            }
         });
    }
}

function showComment(x) {
    console.log(x.nextElementSibling)
    x.nextElementSibling.style.display = "block"
}

// Logout
function logout() {
    $.get('https://codechefvitbugs.herokuapp.com/users/logout', function(data, status){
        console.log("Logged out")
        localStorage.removeItem("token");
        window.location.replace("http://127.0.0.1:5500/CODECHEF%20bug%20site/login.html");
    });
}
