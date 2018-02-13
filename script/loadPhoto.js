let currentFile;

window.onload = function(){
    List = JSON.parse(localStorage.getItem("List"));
    loadPhoto('user-icon', List.user[0].photo);
};

function loadPhoto(id, file){
    document.getElementById(id).src = folderName + '/friendPhoto/' + file;
}

document.getElementById('button-load-profile-photo').onclick = function(){
    if(document.getElementById('button-load-profile-photo').files[0].name !== undefined){
        currentFile = document.getElementById('button-load-profile-photo').files[0].name;
    }
}

document.getElementById('apply-photo').onclick = function(){
    currentFile = document.getElementById('button-load-profile-photo').files[0].name;
    List.user[0].photo = currentFile;
    let serialList = JSON.stringify(List);
    localStorage.setItem("List", serialList);
    loadPhoto('user-icon', currentFile);
}