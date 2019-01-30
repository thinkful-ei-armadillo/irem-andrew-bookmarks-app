'use strict';
const store = (function(){
    
  const addBookmark = function(item){
    this.items.push(item);
  };
    
  const deleteBookmark = function(id){
    this.items = this.items.filter(item => item.id !== id);
    // this.filteredItems = this.items.filter(item => item.id !== id);
  };

  const findAndUpdate = function(id, newData) {
    const item = this.findById(id);
    Object.assign(item, newData);
    return item;
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };
    
  return {
    items: [],
    adding: false,
    minimumRating: 1,
    filtering: false,
    addBookmark,
    deleteBookmark,
    findAndUpdate,
    findById,
    error: false
  };

}());