let loadFriendListPerm = true;
let folderName = '../prj';

function loadListInBrowser(List){
    let friedListField = document.getElementById('friend-list');
    let fragmentFriendList = document.createDocumentFragment();
    for(let i = 0; i < List.friends.length; i++){
        let currentFriend = document.createElement('div');
        let currentFriendName = document.createElement('div');
        let currentFriendPhoto = document.createElement('img');

        currentFriendName.innerHTML = List.friends[i].name;

        currentFriend.className = 'user-info';
        currentFriend.style.position = 'relative';
        currentFriend.style.background = '#bcd4ff';
        currentFriend.style.cursor = 'pointer';
        currentFriend.id = 'current-friend' + i;

        currentFriendName.className = 'user-name';
        currentFriendPhoto.className = 'profile-image';
        currentFriendPhoto.style.cssText = 'height: 80%; width: 20%;';
        currentFriendPhoto.src = List.friends[i].photo;

        currentFriend.appendChild(currentFriendPhoto);
        currentFriend.appendChild(currentFriendName);
        fragmentFriendList.appendChild(currentFriend);
    }
    friedListField.appendChild(fragmentFriendList);
}

if(JSON.parse(localStorage.getItem("List")) !== null && JSON.parse(localStorage.getItem("List")) !== undefined){
    loadFriendListPerm = false;
    let List = JSON.parse(localStorage.getItem("List"));
    loadListInBrowser(List);
}

if(loadFriendListPerm === true){
    var serialFriendList = JSON.stringify(List);
    localStorage.setItem("List", serialFriendList);
    loadListInBrowser(List);
}