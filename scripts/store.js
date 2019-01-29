'use strict';
const store = (function(){
    
    const addBookmark = function(itemName){
        this.items.push(
        {
            id: cuid(), 
            name: itemName, 
            url: '', 
            description: '', 
            extended: false
        });
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