/* global api, $, store, cuid */
'use strict';

$.fn.extend({
  getFormInput: function() {
    const formData = new FormData(this[0]);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return o;
  }
});

const bookmarkList = (function() {

  function render(){
    // Take away if statement?
    let items;
    const filteredItems = filterBookmarkList();
    if (filteredItems){
      items = filteredItems;
    }
    else{
      items = [...store.items];
    }
    // Iterate over each items element and check to see if extended is true
    // If it is true, generateExtendedHTML for that element 
    // If false, generateBookmarkHTML for that element
    // All while keeping the original order of the array
    let newBookmarkString = '';
    // if(store.filtering){
    //   // Do something
    //   const filteredItems = filterBookmarkList(store.minimumRating);
    //   console.log(filteredItems);
    // }
    
    if(store.adding) {
      newBookmarkString += generateAddBookmarkFormHTML();
    }

    // if(store.minimumRating > 1) {
    //   for (let i = 0; i < store.filteredItems.length; i++){
    //     newBookmarkString += generateBookmarkHTML(store.filteredItems[i]);
    //   }
      // console.log(newBookmarkString);
    // }
    
    // else {
    for (let i = 0; i < items.length; i++){
      if (items[i].extended){
        newBookmarkString += generateExtendedBookmarkHTML(items[i]);
      }
      else {
        newBookmarkString += generateBookmarkHTML(items[i]);
      }
    }
  // }
    // const bookmarkItemString = generateBookmarksHTMLString(items);
    $('.js-bookmark-list').html(newBookmarkString);
  }

  function handleNewBookmarkClose() {
    $('.js-bookmark-list').on('click', '.js-close-add-bookmark-button', function(e){
      e.preventDefault();
      console.log('Close button working');
      store.adding = false;
      render();
    });
  }

  function handleAddBookMarkButton(){
    $('.js-add-bookmark').on('click', function(e){
      e.preventDefault();
      console.log('handleAddBookMarkButton ran');
      store.adding = true;
      render();
    });
  }

  function handleRemoveBookmarkButton(){
    $('.js-bookmark-list').on('click', '.js-remove-bookmark', function(e){
      e.preventDefault();
      console.log('handleRemoveBookmarkButton works');
      let id = findIdFromElement(e.target);
      console.log(findIdFromElement(e.target));
      api.deleteBookmark(id)
        .then(()=> {
          store.deleteBookmark(id);
          console.log(store);
          render();
        })
        .catch(err => {
          // alert(err.message);
          handleErrorMessage(err.message);
          store.error = true;
        });
        
    });
  }

  function handleCloseErrorMessage(){
    $('.error-container').on('click', '#cancel-error', function(e){
      console.log('Error close working');
      $('.error-container').empty();
    });
  }

  function handleErrorMessage(error){
    $('.error-container').html(`
    <section class="error-content">
      <button id="cancel-error">Close</button>
      <p>${error}</p>
    </section>
  `);
  }

  function generateAddBookmarkFormHTML(){
    return `
  <form>
    <label for="item-title">
      <input type="text" name="title" id="item-title" placeholder="Title">
    </label>
    <label for="item-url">
      <input type="text" name="url" id="item-url" placeholder="URL">
    </label>
    <label for="item-rating">
      <input type="text" name="rating" id="item-rating" placeholder="Rating">
    </label>
    <label for="item-description">
      <input type="text" name="desc" id="item-description" placeholder="Description">
    </label>
    <br>
     <button type="submit" class="js-add-bookmark-button">Submit</button>
     <button type="button" class="js-close-add-bookmark-button">Close</button>
  </form>
  `;
  }

  function handleNewBookmarkSubmit(){
    $('.js-bookmark-list').on('submit', function(e){
      e.preventDefault();
      const userInput = $(e.target).getFormInput();
      addIdAndExtendedFeature(userInput); 
      const userJSONInput = JSON.stringify(userInput);
      console.log(userInput);
      api.createBookmark(userJSONInput)
        .then((data) => {
          console.log(data);
          store.addBookmark(data);
          render();
        })
        .catch(err => {
          // alert(err.message);
          handleErrorMessage(err.message);
          store.error = true;
        });
    });
  }

  function addIdAndExtendedFeature(item){
    item.id = cuid();
    item.extended = false;
  }

  function handleExtendViewClick(){
    $('ul').on('dblclick', '.js-bookmark-view', function(e){
      e.preventDefault();
      const id = findIdFromElement(e.currentTarget);
      const userItem = store.findById(id);
      store.findAndUpdate(id, {extended: !userItem.extended});
      console.log(userItem);
      render();
    });
  }

  function findIdFromElement(item){
    return $(item)
      .closest('.js-bookmark-view')
      .data('id');
  }

  function generateBookmarkHTML(item){
    return `
    <li data-id="${item.id}" class="js-bookmark-view">
      <p class="js-item-title">${item.title}</p>
      <p class="js-item-rating">${item.rating}</p>
        <button type="submit" class="js-remove-bookmark">Remove</button>
    </li>
  `;
  }

  function generateExtendedBookmarkHTML(item){
    return `
    <li data-id="${item.id}" class="js-bookmark-view">
      <p class="js-item-title">${item.title}</p>
      <p class="js-item-rating">${item.rating}</p>
      <a href="${item.url}">Visit site</a>
      <p>${item.desc}</p>
        <button type="submit" class="js-remove-bookmark">Remove</button>
    </li>
  `;
  }

  // function generateBookmarksHTMLString(bookmarks){
  //   const items = bookmarks.map(item => generateBookmarkHTML(item));
  //   return items.join('');
  // }

  function handleMinimumRatingDropdown(){
    $('.js-minimum-rating').change(function(e){
      e.preventDefault(); 
      console.log('handleMinimumRatingDropdown ran');
      let minimumRating = $(e.currentTarget).val();
      store.filtering = true;
      // filterBookmarkList(minimumRating);
      store.minimumRating = minimumRating;
      // const filteredItems = filterBookmarkList(minimumRating);
      render();
    });
  }

  function filterBookmarkList(){
    let filteredItems = store.items.filter(item => item.rating >= store.minimumRating);
    return filteredItems;
  }

  function watchForm() {
    handleAddBookMarkButton();
    handleMinimumRatingDropdown();
    handleNewBookmarkSubmit();
    handleExtendViewClick();
    handleNewBookmarkClose();
    handleRemoveBookmarkButton();
    handleCloseErrorMessage();
  }
  return {
    watchForm,
    render
  };

}());