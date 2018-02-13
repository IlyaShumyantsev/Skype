let currentId; 

function deleteMiniPhoto(){
    try{
        document.getElementById('mini-photo').parentNode.removeChild(document.getElementById('mini-photo'));
        document.getElementById('button-load-photo').value = null;
    } 
    catch(e){
        console.log(e);
    }
}

function clearNode(parentNode, tag){
    if(parentNode.querySelector(tag)){
        while(parentNode.firstChild){
            parentNode.removeChild(parentNode.firstChild);
        }
    }
}

document.querySelector('#friend-list').addEventListener('click', function(e){
    let i = e.target.id.substring(e.target.id.length - 1, e.target.id.length);
    currentId = i;
    createChatWith(i);
    loadSaveData(i);
    deleteMiniPhoto();
    document.getElementById('text-field').scrollTop = document.getElementById('text-field').scrollHeight;
});

function loadSaveData(i){
    List = JSON.parse(localStorage.getItem("Storage"));
    let currentFriendChat = document.createElement('div');
    currentFriendChat.id = 'text-field' + i;
    currentFriendChat.innerHTML = List.friends[i].chat;
    document.getElementById('text-field').appendChild(currentFriendChat);
}

function createChatWith(i){
    let chatField = document.getElementById('text-field');
    let newChatField = document.createElement('div');
    let chatFriendInfo = document.createElement('div');
    let profileImage = document.createElement('img');
    let userName = document.createElement('div');

    newChatField.id = 'info-field' + i;

    clearNode(chatField, 'div');

    profileImage.className = 'profile-image';
    profileImage.style.cssText = 'width: 11%; height: 90%';

    List = JSON.parse(localStorage.getItem("Storage"));
    profileImage.src = List.friends[i].photo;

    userName.className = 'user-name';
    userName.innerHTML = List.friends[i].name;

    chatFriendInfo.className = 'chat-friend-info';
    chatFriendInfo.id = 'chat-friend-info' + i;

    chatFriendInfo.appendChild(profileImage);
    chatFriendInfo.appendChild(userName);
    newChatField.appendChild(chatFriendInfo);
    chatField.appendChild(newChatField);
}

function loadMiniPhoto(){
    let file = document.querySelector('input[type=file]#button-load-photo').files[0];
    let preview = document.createElement('img');
    preview.id = 'mini-photo';
    preview.className = 'mini-photo';
    let reader = new FileReader();
    reader.onloadend = function () {
        preview.src = reader.result;
        document.getElementById('body').appendChild(preview);
    }
    if(file){
        reader.readAsDataURL(file);

        document.getElementById('mini-photo').onclick = function(){
            deleteMiniPhoto();
        }
    }
    else{
        preview.src = "";
    }
}

function loadFile(img, back){
    try{
        let file = document.querySelector('input[type=file]#button-load-photo').files[0];
        img.style.cssText = 'height: 100px; width: 200px; float: right; bottom: 0%;';
        let reader  = new FileReader();
        reader.onloadend = function () {
            img.src = reader.result;
            back.appendChild(img);
        }
        reader.readAsDataURL(file);
        return 1;
    } 
    catch(e){
        console.log(e);
    }
}

document.getElementById('button-send').onclick = function(){
    let imgMessage = document.createElement('img');
    let backgroundMessage = document.createElement('div');
    let textMessage = document.getElementById('message').innerHTML;
    
    backgroundMessage.className = 'background-message';
    backgroundMessage.innerHTML = textMessage;

    insertEmoji(backgroundMessage, textMessage);

    if(loadFile(imgMessage, backgroundMessage) === 1 || (backgroundMessage.innerHTML.length > 0 && backgroundMessage.innerHTML !== '<br>')){   
        document.getElementById('text-field' + currentId).appendChild(backgroundMessage);
        deleteMiniPhoto(); 

        List = JSON.parse(localStorage.getItem("Storage"));
        List.friends[currentId].chat = document.getElementById('text-field' + currentId).innerHTML;
        let serialList = JSON.stringify(List);
        localStorage.setItem("Storage", serialList);

        document.getElementById('message').innerHTML = "";
        currentEmojiId.length = 0;

        document.getElementById('text-field').scrollTop = document.getElementById('text-field').scrollHeight;
    }
}