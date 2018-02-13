let modalWindowIsOpen = false;
let currentEmojiId = [];

function loadSprite(path, emojiField){
    let fragment = document.createDocumentFragment();
    for(let j = 0, verticalStep = 0, id = 0; j < 3; j++){
        for(let i = 0, horizontalStep = 0; i < 9; i++){
            let cutSprite = document.createElement('div');

            cutSprite.style.cssText = 'cursor: pointer; display: inline-block; background:  url(' + 
            path + ') 100% 100% no-repeat; height:' 
            + 40 + 'px; width:' + 40 + 'px; background-position: left ' + horizontalStep 
            + 'px top ' + verticalStep +'px;';

            cutSprite.id = 'emoji' + id;
            id++;
            horizontalStep -= 37.7;
            fragment.appendChild(cutSprite);
        }
        verticalStep -= 37.7;
    }
    emojiField.appendChild(fragment);
}

function modalWindow(){
    let modalWindow = document.createElement('div');
    let line = document.createElement('div');
    let buttonClose = document.createElement('img');
    let emojiField = document.createElement('div');

    modalWindow.className = 'modal-window';
    modalWindow.id = 'emoji-window';
    
    line.className = 'line';
    
    buttonClose.src = '../prj/img/close.png';
    buttonClose.id = 'close-button';
    buttonClose.className = 'button-close';

    emojiField.className = 'emoji-field';
    emojiField.id = 'emoji-field';
    
    loadSprite('../prj/img/emoji-sprite.png' ,emojiField)
    line.appendChild(buttonClose);
    modalWindow.appendChild(line);
    modalWindow.appendChild(emojiField);
    document.getElementById('body').appendChild(modalWindow);
}

function deleteModalWindow(){
    try{
        document.getElementById('emoji-window').parentNode.removeChild(document.getElementById('emoji-window'));
    } catch(e){
        console.log(e);
    }
}

function insertEmoji(backgroundMessage, textMessage){
    for(let j = 0; j < currentEmojiId.length; j ++){
        if(textMessage.indexOf(":" + currentEmojiId[j] + ":") !== -1){
            backgroundMessage.innerHTML = backgroundMessage.innerHTML.replace(":" + currentEmojiId[j] + ":", "");
            backgroundMessage.appendChild(document.getElementById(currentEmojiId[j]).cloneNode(true));
        }
    }
}

document.getElementById('button-emoji').onclick = function(){
    if(modalWindowIsOpen === false){
        modalWindow();
        modalWindowIsOpen = true;
        if(modalWindowIsOpen === true){
            document.getElementById('close-button').onclick = function(){
                deleteModalWindow();
                modalWindowIsOpen = false;
            }
            document.querySelector('#emoji-field').addEventListener('click', function(e){
                let i = e.target.id;
                currentEmojiId.push(i);
                document.getElementById('message').innerHTML += ':' + i + ":";
            });
        }
    }
}