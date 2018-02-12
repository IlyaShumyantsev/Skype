let modalWindowIsOpen = false;
let currentEmojiId;

function loadSprite(path, emojiField){
    for(let j = 0, verticalStep = 0, id = 0; j < 3; j++){
        for(let i = 0, horizontalStep = 0; i < 9; i++){
            let cutSprite = document.createElement('div');
            cutSprite.style.cssText = 'cursor: pointer; display: inline-block; background:  url(' + path + ') 100% 100% no-repeat; height:' + 40 + 'px; width:' + 40 + 'px; background-position: left ' + horizontalStep + 'px top ' + verticalStep +'px;';
            cutSprite.id = 'emoji' + id;
            id++;
            horizontalStep -= 37.7;
            emojiField.appendChild(cutSprite);
        }
        verticalStep -= 37.7;
    }
}

function modalWindow(){
    let modalWindow = document.createElement('div');
    let line = document.createElement('div');
    let buttonClose = document.createElement('img');
    let emojiField = document.createElement('div');

    modalWindow.style.cssText = 'position: absolute; background: #e7e7e7; border-radius: 20px; margin-bottom:8%; margin-left: 75%; height: 20%; width: 20%; float: right; bottom: 2%;';
    modalWindow.id = 'emoji-window';
    line.style.cssText = 'top: 0; width: 100%; height: 25%; background: #dadada; border-top-left-radius: 20px; border-top-right-radius: 20px;';
    buttonClose.src = '../prj/img/close.png';
    buttonClose.id = 'close-button';
    buttonClose.style.cssText = 'float: right; margin-top: 2%; margin-right: 2%; height: 80%; cursor: pointer; z-index: 1;';
    emojiField.style.cssText = 'bottom 0; height: 75%; width:100%; background: #dafffc; border-bottom-left-radius: 20px; border-bottom-right-radius: 20px; overflow: auto;';
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
                currentEmojiId = i;
                document.getElementById('message').innerHTML += ':' + i + ":";
            });
        }
    }
}