'use strict';

const api = (function(){
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/andrew/bookmarks';

  const listApiFetch = function(...args){
    let error = false;
    return fetch(...args)
      .then(res => {
        if (!res.ok) {
          error = true;
        }
        return res.json();
      })
      .then(data => {
        if(error) throw new Error(data.message);
        return data;
      });
  };

  const getBookmarks = function(){
    return listApiFetch(BASE_URL);
  };
  
  const createBookmark = function(obj){
    return listApiFetch(BASE_URL, {
      method: 'POST',
      headers:  {
        'Content-Type': 'application/json'
      },
      body: obj
    });
  };

  const deleteBookmark = function(id){
    return listApiFetch(BASE_URL+'/'+id, {
      method: 'DELETE',
    });
  };

  return {
    createBookmark,
    getBookmarks,
    deleteBookmark
  };

}());
