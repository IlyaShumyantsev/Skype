let modalWindowIsOpen = false;
let currentEmojiId = [];

function loadSprite(path, emojiField){
    let fragment = document.createDocumentFragment();
    for(let j = 0, verticalStep = 0, id = 0; j < 3; j++){
        for(let i = 0, horizontalStep = 0; i < 9; i++){
            let cutSprite = document.createElement('div');
            cutSprite.className = 'cut-sprite';
            cutSprite.style.cssText = 'background:  url(' + path + ') 100% 100% no-repeat; background-position: left ' + horizontalStep 
            + 'px top ' + verticalStep +'px;';
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
    line.className = 'line';
    buttonClose.className = 'button-close';
    
    buttonClose.src = './img/close.png';
    buttonClose.onclick = function(){
        deleteModalWindow();
        modalWindowIsOpen = false;
    };

    emojiField.className = 'emoji-field';
    
    loadSprite('./img/emoji-sprite.png' ,emojiField)
    line.appendChild(buttonClose);
    modalWindow.appendChild(line);
    modalWindow.appendChild(emojiField);
    $('.body').append(modalWindow);
}

function deleteModalWindow(){
    try{
        $('div.modal-window').remove();
    } catch(e){
        console.log(e);
    }
}

function insertEmoji(backgroundMessage, textMessage){
    let fragment = document.createDocumentFragment('div');
    let textFragment = document.createDocumentFragment('div');
    textFragment.innerHTML = textMessage;
    for(let j = 0; j < currentEmojiId.length; j++){
        if(textMessage.indexOf(":emoji" + currentEmojiId[j] + ":") !== -1){
            backgroundMessage.append($('div.emoji-field').children('div.cut-sprite:eq(' + currentEmojiId[j] + ')').clone(true));
            fragment.innerHTML = backgroundMessage.html();
            textFragment.innerHTML = textFragment.innerHTML.toString().replace(":emoji" + currentEmojiId[j] + ":", fragment.innerHTML);
            backgroundMessage.html(textFragment);
        }
    }
    backgroundMessage.html(textFragment.innerHTML);
}

function showEmojiList(){
    if(modalWindowIsOpen === false){
        modalWindow();
        modalWindowIsOpen = true;
        if(modalWindowIsOpen === true){
            $('div.emoji-field').bind('click', function(event){
                let i = $(event.target).index();
                currentEmojiId.push(i);
                let oldHtml = $('div.text-area').html();
                $('div.text-area').html(oldHtml + ':emoji' + i + ":"); 
            });
        }
    }
}