// var numberOfProjects = 10
var currentObject = 0;
// var list = 0

$.get('https://codechefvitbugs.herokuapp.com/report/bug/all', function(data, status){
  
    for(i=0; i<data.length; i++) {
        document.getElementById("test").innerHTML+= '<li class="project-element"  onclick="select(this)" onmouseover="addAnimate(this)" onmouseout="removeAnimate(this)">'+data[i].project+'</li><br>'
    }
    console.log("Recieved projects list")
});

// Side project list animations

function addAnimate(x) {x.style.boxShadow = "inset "+x.offsetWidth+"px 0 0 0 #dce9e6"}

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
                console.log(data[i].alpha[j])
                document.getElementById("issue-list").innerHTML +=  '<div class="container tweet">'+
                                                                                    '<button class="btn remove-tweet" onclick="removeBug(this)">X</button><br>'+
                                                                                    '<h4>'+data[i].alpha[j].title+'</h4>'+
                                                                                    '<p>'+data[i].alpha[j].description+'</p>'+
                                                                                    '<h6>'+data[i].alpha[j]._id+'</h6>'+
                                                                                '</div>'
                }
            }
        }
    
    });

}

// Add a new issue

function submitBug() {
    var bug = document.getElementById("bug").value
    console.log(bug)
}

// Remove an issue

function removeBug(x) {
    console.log(x.parentNode.lastElementChild.innerHTML)
    var idToDelete = 'x.parentNode.lastElementChild.innerHTML'
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
    alert(r.value)



    r.value = null
    document.getElementById("left-side").style.display = "none"
    addProjectButton.style.display = "inline";
}
