'use strict';
const store = (function(){
    
  const addBookmark = function(item){
    this.items.push(item);
  };
    
  const deleteBookmark = function(id){
    this.items.filter(item => item.id !== id);
  };
    
  return {
    items: [],
    addBookmark,
    deleteBookmark
  };

}());