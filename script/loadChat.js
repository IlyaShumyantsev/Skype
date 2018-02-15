let currentId; 

function deleteMiniPhoto(){
    try{
        $('img.mini-photo').remove();
        $('input.hide-input-load-file').val(null);
    } 
    catch(e){
        console.log(e);
    }
}

function clearNode(parentNode){
    parentNode.html('');
}

function selectFriend(event){
    let i = $(event.target).index();
    currentId = i;
    createChatWith(i);
    loadSaveData(i);
    deleteMiniPhoto();
    $('div.text-field').scrollTop($('div.text-field').height());
}

function loadSaveData(i){
    List = JSON.parse(localStorage.getItem("Storage"));
    let currentFriendChat = document.createElement('div');
    currentFriendChat.innerHTML = List.friends[i].chat;
    $('div.text-field').append(currentFriendChat);
    $('div.text-field').scrollTop($('div.text-field').height());
}

function createChatWith(i){
    let newChatField = document.createElement('div');
    let chatFriendInfo = document.createElement('div');
    let profileImage = document.createElement('img');
    let userName = document.createElement('div');

    clearNode($('div.text-field'));

    profileImage.className = 'profile-image info-photo';
    userName.className = 'user-name';
    chatFriendInfo.className = 'chat-friend-info';

    List = JSON.parse(localStorage.getItem("Storage"));
    profileImage.src = List.friends[i].photo;

    userName.innerHTML = List.friends[i].name;

    chatFriendInfo.appendChild(profileImage);
    chatFriendInfo.appendChild(userName);
    newChatField.appendChild(chatFriendInfo);
    $('div.text-field').append(newChatField);
}

function loadMiniPhoto(){
    let file = document.querySelector('input[type=file].hide-input-load-file').files[0];
    let preview = document.createElement('img');
    preview.className = 'mini-photo';

    preview.onclick = function(){
        deleteMiniPhoto();
    }

    let reader = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
        $('.body').append(preview);
    }
    if(file){
        reader.readAsDataURL(file);
    }
    else{
        preview.src = "";
    }
}

function sendMessage(){
    let imgMessage = document.createElement('img');
    //let backgroundMessage = document.createElement('div');
    let backgroundMessage = $("<div></div>")
    
    backgroundMessage.addClass('background-message');
    backgroundMessage.innerHTML = $('div.text-area').html();

    insertEmoji(backgroundMessage, $('div.text-area').html());

    let file = document.querySelector('input[type=file].hide-input-load-file').files[0];

    if(file && (backgroundMessage.html().length > 0 && backgroundMessage.html() !== '<br>') || file){
        imgMessage.className = 'img-message';
        let reader  = new FileReader();
        reader.onloadend = function () {
            imgMessage.src = reader.result;
            backgroundMessage.append(imgMessage);
            $('div.text-field').append(backgroundMessage);
            List = JSON.parse(localStorage.getItem("Storage"));
            List.friends[currentId].chat =  $('div.text-field').html();
            let serialList = JSON.stringify(List);
            localStorage.setItem("Storage", serialList);
            $('div.text-area').html("");
            currentEmojiId.length = 0;
            deleteMiniPhoto();
            $('div.text-field').scrollTop($('div.text-field').height());
        }
        reader.readAsDataURL(file);
    }
    else if(backgroundMessage.html().length > 0 && backgroundMessage.html() !== '<br>'){
        //backgroundMessage.html(backgroundMessage.html().toString().replace('<br>', '&nbsp;'));
        $('div.text-field').append(backgroundMessage); 
        List = JSON.parse(localStorage.getItem("Storage"));
        List.friends[currentId].chat = $('div.text-field').html();
        let serialList = JSON.stringify(List);
        localStorage.setItem("Storage", serialList);
        $('div.text-area').html("");
        currentEmojiId.length = 0;
        $('div.text-field').scrollTop($('div.text-field').height());
    }
}