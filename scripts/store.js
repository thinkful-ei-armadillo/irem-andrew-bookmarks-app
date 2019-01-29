'use strict';
const store = (function(){
    
    const addBookmark = function(item){
        this.items.push(item);
    };
    
    const deleteBookmark = function(item){

    };
    
    return {
        items: [],
        addBookmark
    };

}());