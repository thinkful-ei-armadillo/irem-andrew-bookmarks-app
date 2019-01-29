/* global api, $, store, cuid */
'use strict';

// $.fn.extend({
//   serializeJson: function() {
//     const formData = new FormData(this[0]);
//     const o = {};
//     formData.forEach((val, name) => o[name] = val);
//     return JSON.stringify(o);
//   }
// });

$.fn.extend({
  getFormInput: function() {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return o;
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
    e.preventDefault();
    console.log($(e.target).val());
    // console.log('handleNewBookmarkSubmit ran');
    const userInput = $(e.target).getFormInput();
    userInput.id = cuid();
    console.log(userInput);
    const userJSONInput = JSON.stringify(userInput);
    console.log(userJSONInput);
    api.createBookmark(userJSONInput);
    store.addBookmark(userInput);
    render();
  });
}

function render(){
  let items = [...store.items];
  const bookmarkItemString = generateBookmarksHTMLString(items);
  console.log(bookmarkItemString);
  $('.js-bookmark-list').html(bookmarkItemString);
}

function generateBookmarkHTML(item){
  return `
    <li>
      <p>${item.title}</p>
      <p>${item.rating}</p>
        <button type="submit" class="js-remove-bookmark">Remove</button>
    </li>
  `;
}

function generateExtendedBookmarkHTML(item){
  return `
    <li>
      <p>${item.title}</p>
      <p>${item.rating}</p>
      <p>${item.url}</p>
      <p>${item.description}</p>
        <button type="submit" class="js-remove-bookmark">Remove</button>
    </li>
  `;
}

function generateBookmarksHTMLString(bookmarks){
  const items = bookmarks.map(item => generateBookmarkHTML(item));
  return items.join('');
}

function handleMinimumRatingDropdown(){
  $('.js-minimum-rating').change(function(e){
    e.preventDefault(); 
    console.log('handleMinimumRatingDropdown ran');
  });
}

// function render(){
//   if(store.addBookMark === true){
//     displayAddBookMarkHtml();
//   }
// }

function watchForm() {
  handleAddBookMarkButton();
  handleMinimumRatingDropdown();
  handleNewBookmarkSubmit();
}
$(watchForm);