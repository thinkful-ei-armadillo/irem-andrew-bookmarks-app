/* global api, $, store */
'use strict';

$.fn.extend({
  serializeJson: function() {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return JSON.stringify(o);
  }
});

function handleAddBookMarkButton(){
  $('.js-add-bookmark').on('click', function(e){
    e.preventDefault();
    console.log('handleAddBookMarkButton ran');
    // api.createBookmark();
    // store.addBookMark = true;
    // render();
  });
}

function handleNewBookmarkSubmit(){
  $('form').on('submit', function(e){
    e.preventDefault(val)
    const title = $(.b)
    console.log($(e.target).val());
    // console.log('handleNewBookmarkSubmit ran');
    const userInput = $(e.target).serializeJson();
    // console.log(userInput);
    api.createBookmark(userInput);
    store.addBookMark();
    // render();
  });
}

function render(){

}

function handleMinimumRatingDropdown(){
  $('.js-minimum-rating').change(function(e){
    e.preventDefault(); 
    console.log('handleMinimumRatingDropdown ran');
  });
}

function render(){
  if(store.addBookMark === true){
    displayAddBookMarkHtml();
  }
}

function watchForm() {
  handleAddBookMarkButton();
  handleMinimumRatingDropdown();
  handleNewBookmarkSubmit();
}
$(watchForm);