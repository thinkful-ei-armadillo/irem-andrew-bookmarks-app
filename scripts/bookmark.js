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
    // console.log($(e.target).val());
    // console.log('handleNewBookmarkSubmit ran');
    const userInput = $(e.target).getFormInput();
    userInput.id = cuid();
    userInput.extended = false; 
    // console.log(userInput);
    const userJSONInput = JSON.stringify(userInput);
    // console.log(userJSONInput);
    api.createBookmark(userJSONInput);
    store.addBookmark(userInput);
    render();
  });
}

function handleExtendViewClick(){
  $('ul').on('dblclick', '.js-bookmark-view', function(e){
    e.preventDefault();
    // console.log(e.currentTarget);
    const id = findIdFromElement(e.currentTarget);
    console.log(id);
    const item = store.items.filter(item=> item.id == id);
    console.log(item);
    generateExtendedBookmarkHTML(item);
  });
}

function findIdFromElement(item){
  return $(item).data('id');
}

function render(){
  let items = [...store.items];
  const bookmarkItemString = generateBookmarksHTMLString(items);
  // console.log(bookmarkItemString);
  $('.js-bookmark-list').html(bookmarkItemString);
}

function generateBookmarkHTML(item){
  return `
    <li data-id="${item.id}" class="js-bookmark-view">
      <p>${item.title}</p>
      <p>${item.rating}</p>
        <button type="submit" class="js-remove-bookmark">Remove</button>
    </li>
  `;
}

function generateExtendedBookmarkHTML(item){
  return $('.js-bookmark-view').html(
    `<li data-id="${item.id}" class="js-bookmark-view">
      <p>${item[0].title}</p>
      <p>${item[0].rating}</p>
      <p>${item[0].url}</p>
      <p>${item[0].description}</p>
        <button type="submit" class="js-remove-bookmark">Remove</button>
    </li>`);
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
  handleExtendViewClick();
}
$(watchForm);