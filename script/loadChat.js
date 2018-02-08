var sendPermission = false, currentId, messageFile;

window.onload = function(){
    List = JSON.parse(localStorage.getItem("List"));
}

document.querySelector('#friend-list').addEventListener('click', function(e){
    List = JSON.parse(localStorage.getItem("List"));
    var id = e.target.id;
    let i = id.substring(id.length - 1, id.length);
    currentId = i;
    createChatWith(i);
    loadSaveData(i);
    sendPermission = true;
    try{
        document.getElementById('mini-photo').parentNode.removeChild(document.getElementById('mini-photo'));
        document.getElementById('button-load-photo').value = null;
    } catch(e){}
});

function loadSaveData(i){
    let currentFriendChat = document.createElement('div');
    currentFriendChat.id = 'chat-field' + i;
    currentFriendChat.innerHTML = List.friends[i].chat;
    document.getElementById('chat-field').appendChild(currentFriendChat);
}

function createChatWith(i){
    var chatField = document.getElementById('chat-field');
    var newChatField = document.createElement('div');
    newChatField.id = 'chat-field' + i;

    if(chatField.querySelector('div')){
        while(chatField.firstChild){
            chatField.removeChild(chatField.firstChild);
        }
    }

    let List = JSON.parse(localStorage.getItem("List"));

    var chatFriendInfo = document.createElement('div');
    let profileImage = document.createElement('img');
    let userName = document.createElement('div');

    profileImage.className = 'profile-image';
    profileImage.style.cssText = 'background: url(' + List.friends[i].photo + ') 100% 100% no-repeat; width: 11%; height: 90%';
    profileImage.src = List.friends[i].photo;
    userName.className = 'user-name';
    userName.innerHTML = List.friends[i].name;
    chatFriendInfo.className = 'message-field';
    chatFriendInfo.id = 'chat-friend-info' + i;
    chatFriendInfo.style.cssText = 'top: 10%; background: #ff039e; width: 70%; height: 18%; margin-left: 0%; background: #a3f064d0;';

    chatFriendInfo.appendChild(profileImage);
    chatFriendInfo.appendChild(userName);
    newChatField.appendChild(chatFriendInfo);
    chatField.appendChild(newChatField);
}


/************ */
document.getElementById('button-load-photo').onchange = function(){
    messageFile = document.getElementById('button-load-photo').files[0].name;
    let miniPhoto = document.createElement('img');
    miniPhoto.id = 'mini-photo';
    miniPhoto.style.cssText = 'position: absolute; background: url(../prj/friendPhoto/' + messageFile + ') 100% 100% no-repeat; border-radius: 20px; margin-bottom:8%; margin-left: 31%; height: 20%; width: 15%; float: left; bottom: 2%; display: inline-block; cursor:pointer;';
    miniPhoto.src = '../prj/friendPhoto/' + messageFile;
    document.getElementById('body').appendChild(miniPhoto);
    document.getElementById('mini-photo').onclick = function(){
        document.getElementById('mini-photo').parentNode.removeChild(document.getElementById('mini-photo'));
        document.getElementById('button-load-photo').value = null;
    }
    //alert("131212312");
}

document.getElementById('button-send').onclick = function(){
    if(sendPermission === true){
        try{
            document.getElementById('mini-photo').parentNode.removeChild(document.getElementById('mini-photo'));
        } catch(e){}
        let message = document.createElement('img');
        let backgroundMessage = document.createElement('div');
        let textMessage = document.getElementById('message').innerHTML;
        
            backgroundMessage.style.cssText = 'background: #fffff347; border-radius: 20px; margin-top:1%; margin-bottom:1%; height: 100%; width: 100%; float: right; bottom: 0%; display: inline-block;';
            
            backgroundMessage.innerHTML = textMessage;
            try{
                let messageFile = document.getElementById('button-load-photo').files[0].name;
                let imgElement = document.createElement('img');
                message.style.cssText = 'background: url(../prj/friendPhoto/' + messageFile + ') 100% 100% no-repeat; height: 100px; width: 200px; float: right; bottom: 0%;';
                message.src = '../prj/friendPhoto/' + messageFile;
                backgroundMessage.appendChild(messageFile);
            } catch(e){}
            
            backgroundMessage.appendChild(message);
            document.getElementById('chat-field' + currentId).appendChild(backgroundMessage);
            document.getElementById('button-load-photo').value = null;
            /*List.friends[0].chat = messageFile;
            var serialList = JSON.stringify("List", serialList);
            localStorage.setItem("List", serialList);*/   

            List = JSON.parse(localStorage.getItem("List"));

            List.friends[currentId].chat +=  document.getElementById('chat-field' + currentId).innerHTML;
            var serialList = JSON.stringify(List);
            localStorage.setItem("List", serialList);
    }
}