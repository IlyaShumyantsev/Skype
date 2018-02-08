function modalWindow(){
    let modalWindow = document.createElement('div');
    let buttonClose = document.createElement('div');

    modalWindow.style.cssText = 'position: absolute; background: #e7e7e7; border-radius: 20px; margin-bottom:8%; margin-left: 75%; height: 20%; width: 20%; float: right; bottom: 2%; display: inline-block;';

    document.getElementById('body').appendChild(modalWindow);
}

document.getElementById('button-emoji').onclick = function(){
    if(sendPermission === true){
        modalWindow();
    }
}