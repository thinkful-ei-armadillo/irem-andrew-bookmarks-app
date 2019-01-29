'use strict';

const api = (function(){
    const BASE_URL = 'https://thinkful-list-api.herokuapp.com/andrew/bookmarks';

    const createBookmark = function(obj){
        return fetch(BASE_URL, {
            method: 'POST',
            body: JSON.stringify(obj)
        });
    };

    return {
        createBookmark

    };

}());
