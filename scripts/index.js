/* global bookmarkList, api, store */
'use strict';

function main(){
    bookmarkList.watchForm();
    api.getBookmarks()
        .then((items) => {
            items.forEach((item) => store.addBookmark(item));
            bookmarkList.render();
        })
        .catch(err => alert(err.message));
}

$(main);