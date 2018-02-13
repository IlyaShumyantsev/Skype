let currentId; 

window.onload = function(){
    List = JSON.parse(localStorage.getItem("List"));
};

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
    let chatFriendInfo = document.createElement('div');
    let profileImage = document.createElement('img');
    let userName = document.createElement('div');

    newChatField.id = 'info-field' + i;

    clearNode(chatField, 'div');

    let List = JSON.parse(localStorage.getItem("List"));

    profileImage.className = 'profile-image';
    profileImage.style.cssText = 'width: 11%; height: 90%';
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

document.getElementById('button-load-photo').onchange = function(){
    let messageFile = document.getElementById('button-load-photo').files[0].name;
    let miniPhoto = document.createElement('img');
    miniPhoto.id = 'mini-photo';
    miniPhoto.className = 'mini-photo';
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

    
    backgroundMessage.className = 'background-message';
    backgroundMessage.innerHTML = textMessage;

    insertEmoji(backgroundMessage, textMessage);

    if(loadFile(imgMessage, backgroundMessage) === 1 || (backgroundMessage.innerHTML.length > 0 && backgroundMessage.innerHTML !== '<br>')){   
        document.getElementById('text-field' + currentId).appendChild(backgroundMessage);
        deleteMiniPhoto(); 

        List = JSON.parse(localStorage.getItem("List"));
        List.friends[currentId].chat =  document.getElementById('text-field' + currentId).innerHTML;
        let serialList = JSON.stringify(List);
        localStorage.setItem("List", serialList);
        document.getElementById('message').innerHTML = "";

        currentEmojiId.length = 0;
        document.getElementById('text-field').scrollTop = document.getElementById('text-field').scrollHeight;
    }
}