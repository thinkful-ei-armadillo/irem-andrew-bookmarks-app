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
    const userInput = $(e.target).getFormInput();
    userInput.id = cuid();
    userInput.extended = false; 
    const userJSONInput = JSON.stringify(userInput);
    // api.createBookmark(userJSONInput);
    store.addBookmark(userInput);
    render();
  });
}

function handleExtendViewClick(){
  $('ul').on('dblclick', '.js-bookmark-view', function(e){
    e.preventDefault();
    const id = findIdFromElement(e.currentTarget);
    const userItem = store.findById(id);
    store.findAndUpdate(id, {extended: !userItem.extended});
    console.log(userItem);
    render();
    // generateExtendedBookmarkHTML();
  });
}

function findIdFromElement(item){
  return $(item)
    .closest('.js-bookmark-view')
    .data('id');
}

function render(){
  
  let items = [...store.items];
  // Iterate over each items element and check to see if extended is true
  // If it is true, generateExtendedHTML for that element 
  // If false, generateBookmarkHTML for that element
  // All while keeping the original order of the array
  const newItems = [];
  for(let i = 0; i < items.length; i++){
    if (items[i].extended){
      generateExtendedBookmarkHTML(items[i]);
    }
    else {
     newItems.push(items[i]);
    }
  }
  console.log(newItems);
  const bookmarkItemString = generateBookmarksHTMLString(newItems);
    $('.js-bookmark-list').html(bookmarkItemString);


  // console.log(bookmarkItemString);
 
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
  return `
    <li data-id="${item.id}" class="js-bookmark-view">
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
  handleExtendViewClick();
}
$(watchForm);