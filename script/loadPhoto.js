var currentFile;

window.onload = function(){
    List = JSON.parse(localStorage.getItem("List"));
    loadPhoto('user-icon', List.user[0].photo);
}

function loadPhoto(id, file){
    document.getElementById(id).style.cssText = 'background: url(../prj/friendPhoto/' + file + ') 100% 100% no-repeat;';
    document.getElementById(id).src = '../prj/friendPhoto/' + file;
}

document.getElementById('button-load-profile-photo').onclick = function(){
    if(document.getElementById('button-load-profile-photo').files[0].name !== undefined){
        currentFile = document.getElementById('button-load-profile-photo').files[0].name;
    }
}

document.getElementById('apply-photo').onclick = function(){
    currentFile = document.getElementById('button-load-profile-photo').files[0].name;
    List.user[0].photo = currentFile;
    var serialList = JSON.stringify(List);
    localStorage.setItem("List", serialList);
    loadPhoto('user-icon', currentFile);
}