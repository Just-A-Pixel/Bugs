

var currentObject = 0;

$.get('https://codechefvitbugs.herokuapp.com/report/bug/all', function(data, status){
  
    for(i=0; i<data.length; i++) {
        document.getElementById("test").innerHTML+= '<li class="project-element"  onclick="select(this)" onmouseover="addAnimate(this)" onmouseout="removeAnimate(this)">'+data[i].project+'</li><br>'
        document.getElementById("project").innerHTML += "<option>"+data[i].project+"</option>"
    }
    console.log("Recieved projects list and size = "+i)
});

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
    $.get('https://codechefvitbugs.herokuapp.com/report/bug/all', function(data, status){

        for(i=0; i<data.length; i++) {
            if(data[i].project == x.innerHTML) {
                console.log("success")
                for(j=0; j<data[i].alpha.length; j++){
                console.log(data[i].project)
                
                var commentString = ""
                for(k=0; k<data[i].alpha[j].commentsByUsers.length; k++){
                                                    commentString +=  
                                                                    '<p class="container comment-title">'+
                                                                    '<img src="assets/css/img/Ellipse 11.svg" class="bug2">'+
                                                                    '<span class = "comment-name">'+data[i].alpha[j].commentsByUsers[k].name+'</span><br>'+
                                                                    '<span class = "comment">'+data[i].alpha[j].commentsByUsers[k].discussions+'</span>'+
                                                                    '</p>'+'<hr>'}

                document.getElementById("issue-list").innerHTML += '<div class="container tweet">'+
                                                                        '<p class="title">'+
                                                                            '<img src="assets/css/img/bug.svg" class="bug">'+
                                                                            //'<div class="btn remove-tweet" onclick="removeBug(this)">X</div>'+
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
                                                                            '<hr>'+ commentString +
                                                                        '</div>'+
                                                                        '<h6 class = "tweet-id "onselectstart="return false">'+data[i].alpha[j]._id+'</h6>'+
                                                                    '</div>'
                console.log(data[i].alpha[j].commentsByUsers)
                }
            }
        }
    
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
    
    $.post("https://codechefvitbugs.herokuapp.com/report/reportbug", 
    {
        project: bugProject,
        title: bugTitle,
        description: bugDescription,
        issuedby: bugIssuedBy
    },
    function(data,status){
        console.log(data)
        console.log(status)
        })
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
    // alert(r.value)

    $.post("https://codechefvitbugs.herokuapp.com/report/addprojectcodechef", 
    {
        project: r.value,
    },
    function(data,status){
        console.log(data)
        console.log(status)
        })


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

    console.log(patch)

    $.ajax({
        type: 'PATCH',
        url: 'https://codechefvitbugs.herokuapp.com/report/addcommentsbyusers/'+issueId,
        data: {
            userComments: patch,
            issuedby: "DJ"
        },
        success: function(result) {
            console.log("added comment")
        }
     });
}

function showComment(x) {
    console.log(x.nextElementSibling)
    x.nextElementSibling.style.display = "block"
}

// Logout
function logout() {
    $.get('https://codechefvitbugs.herokuapp.com/users/logout', function(data, status){
        console.log("Logged out")
    });
}


