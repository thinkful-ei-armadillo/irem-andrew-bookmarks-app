'use strict';

function handleAddBookMarkButton(){
  $('.js-add-bookmark').on('click', function(e){
    e.preventDefault();
    console.log('handleAddBookMarkButton ran');
    // api.addBookmark();
    // store.addBookMark = true;
    // render();
  });
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
}
$(watchForm);