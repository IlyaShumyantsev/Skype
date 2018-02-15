let currentFile;

window.onload = function(){
    if(loadFriendListPerm === false){
        try{
            List = JSON.parse(localStorage.getItem("Storage"));
            $('img.profile-image.user').attr("src", List.user[0].photo);
        }
        catch(e){
            this.console.log(e);
        }
    }
};

function loadProfilePhoto(event){
    let file = document.querySelector('input[type=file].hide-input-profile-photo').files[0];
    let reader = new FileReader();
    let target = event.target;
    reader.onloadend = function () {
        target.setAttribute("src", reader.result);
        List = JSON.parse(localStorage.getItem("Storage"));
        List.user[0].photo = target.getAttribute("src");
        let serialList = JSON.stringify(List);
         $('img.profile-image.user').attr("src", List.user[0].photo);
        localStorage.setItem("Storage", serialList);
    }
    if(file){
        reader.readAsDataURL(file);
    }
    else{
        $('img.profile-image.user').attr("src", "");
    }
}
