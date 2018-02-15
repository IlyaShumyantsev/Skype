let loadFriendListPerm = true;

function loadListInBrowser(List){
    let fragmentFriendList = document.createDocumentFragment();
    for(let i = 0; i < List.friends.length; i++){
        let currentFriend = document.createElement('div');
        let currentFriendName = document.createElement('div');
        let currentFriendPhoto = document.createElement('img');

        currentFriendName.innerHTML = List.friends[i].name;

        currentFriend.className = 'user-info ' + 'friend';
        currentFriendName.className = 'user-name ' + 'friendName';
        currentFriendPhoto.className = 'profile-image ' + 'friendPhoto';

        currentFriendPhoto.src = List.friends[i].photo;

        currentFriend.appendChild(currentFriendPhoto);
        currentFriend.appendChild(currentFriendName);
        fragmentFriendList.appendChild(currentFriend);
    }
    $('.friend-list').append(fragmentFriendList);
}

if(JSON.parse(localStorage.getItem("Storage")) !== null && JSON.parse(localStorage.getItem("Storage")) !== undefined){
    loadFriendListPerm = false;
    let List = JSON.parse(localStorage.getItem("Storage"));
    loadListInBrowser(List);
}

if(loadFriendListPerm === true){
    let serialFriendList = JSON.stringify(List);
    localStorage.setItem("Storage", serialFriendList);
    loadListInBrowser(List);
}