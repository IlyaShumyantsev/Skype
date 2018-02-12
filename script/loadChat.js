let currentId; 

window.onload = function(){
    List = JSON.parse(localStorage.getItem("List"));
}

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

function loadFile(img, back){
    try{
        let messageFile = document.getElementById('button-load-photo').files[0].name;
        let imgElement = document.createElement('img');
        img.style.cssText = 'height: 100px; width: 200px; float: right; bottom: 0%;';
        img.src = '../prj/friendPhoto/' + messageFile;
        back.appendChild(img);
        return 1;
    } 
    catch(e){
        console.log(e);
    }
}

document.querySelector('#friend-list').addEventListener('click', function(e){
    List = JSON.parse(localStorage.getItem("List"));
    let i = e.target.id.substring(e.target.id.length - 1, e.target.id.length);
    currentId = i;
    createChatWith(i);
    loadSaveData(i);
    deleteMiniPhoto();
    document.getElementById('text-field').scrollTop = document.getElementById('text-field').scrollHeight;
});

function loadSaveData(i){
    let currentFriendChat = document.createElement('div');
    currentFriendChat.id = 'text-field' + i;
    currentFriendChat.innerHTML = List.friends[i].chat;
    document.getElementById('text-field').appendChild(currentFriendChat);
}

function createChatWith(i){
    let chatField = document.getElementById('text-field');
    let newChatField = document.createElement('div');
    newChatField.id = 'info-field' + i;

    clearNode(chatField, 'div');

    let List = JSON.parse(localStorage.getItem("List"));

    let chatFriendInfo = document.createElement('div');
    let profileImage = document.createElement('img');
    let userName = document.createElement('div');

    profileImage.className = 'profile-image';
    profileImage.style.cssText = 'width: 11%; height: 90%';
    profileImage.src = List.friends[i].photo;
    userName.className = 'user-name';
    userName.innerHTML = List.friends[i].name;
    chatFriendInfo.className = 'message-field';
    chatFriendInfo.id = 'chat-friend-info' + i;
    chatFriendInfo.style.cssText = 'top: 10%; width: 70%; height: 18%; margin-left: 0%; background: #a3f064d0;';

    chatFriendInfo.appendChild(profileImage);
    chatFriendInfo.appendChild(userName);
    newChatField.appendChild(chatFriendInfo);
    chatField.appendChild(newChatField);
}

document.getElementById('button-load-photo').onchange = function(){
    let messageFile = document.getElementById('button-load-photo').files[0].name;
    let miniPhoto = document.createElement('img');
    miniPhoto.id = 'mini-photo';
    miniPhoto.style.cssText = 'position: absolute; background: url(../prj/friendPhoto/' + messageFile + ') 100% 100% no-repeat; border-radius: 20px; margin-bottom:8%; margin-left: 31%; height: 20%; width: 15%; float: left; bottom: 2%; display: inline-block; cursor:pointer;';
    miniPhoto.src = '../prj/friendPhoto/' + messageFile;
    document.getElementById('body').appendChild(miniPhoto);

    document.getElementById('mini-photo').onclick = function(){
        deleteMiniPhoto();
    }
}

document.getElementById('button-send').onclick = function(){
    let imgMessage = document.createElement('img');
    let backgroundMessage = document.createElement('div');
    let textMessage = document.getElementById('message').innerHTML;

    
    backgroundMessage.style.cssText = 'background: #fffff347; border-radius: 20px; margin-top:1%; margin-bottom:1%; height: 100%; width: 100%; float: right; bottom: 0%; display: inline-block;';
    backgroundMessage.innerHTML = textMessage;

    if(textMessage.indexOf(":" + currentEmojiId + ":") !== -1){
        backgroundMessage.innerHTML = backgroundMessage.innerHTML.replace(":" + currentEmojiId + ":", "");
        backgroundMessage.appendChild(document.getElementById(currentEmojiId).cloneNode(true));
    }

    if(loadFile(imgMessage, backgroundMessage) === 1 || (backgroundMessage.innerHTML.length > 0 && backgroundMessage.innerHTML !== '<br>')){   
        document.getElementById('text-field' + currentId).appendChild(backgroundMessage);
        deleteMiniPhoto(); 

        List = JSON.parse(localStorage.getItem("List"));
        List.friends[currentId].chat =  document.getElementById('text-field' + currentId).innerHTML;
        let serialList = JSON.stringify(List);
        localStorage.setItem("List", serialList);
        document.getElementById('message').innerHTML = "";

        document.getElementById('text-field').scrollTop = document.getElementById('text-field').scrollHeight;
    }
}