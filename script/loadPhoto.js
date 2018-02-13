let currentFile;

window.onload = function(){
    if(loadFriendListPerm === false){
        try{
            List = JSON.parse(localStorage.getItem("Storage"));
            let profileImage = this.document.getElementById('user-icon');
            profileImage.src = List.user[0].photo;
        }
        catch(e){
            this.console.log(e);
        }
    }
};

function loadProfilePhoto(){
    let file = document.querySelector('input[type=file]#button-load-profile-photo').files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
        document.getElementById('user-icon').src = reader.result;
        List = JSON.parse(localStorage.getItem("Storage"));
        List.user[0].photo =  document.getElementById('user-icon').src;
        let serialList = JSON.stringify(List);
        localStorage.setItem("Storage", serialList);
    }
    if(file){
        reader.readAsDataURL(file);
    }
    else{
        document.getElementById('user-icon').src = "";
    }
}
