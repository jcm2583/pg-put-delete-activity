$(document).ready(function(){
  console.log('jQuery sourced.');
  refreshBooks();
  addClickHandlers();
});

function addClickHandlers() {
  $('#submitBtn').on('click', handleSubmit);

  // TODO - Add code for edit & delete buttons

  //Need to add a click lister for my delete button
  $('#bookShelf').on('click', '.deleteButton', deleteBookHandler);

  //Need to add a click listener for my isRead button
  $('#bookShelf').on('click', '.truthyButton', booleanBookHandler);
}

function handleSubmit() {
  console.log('Submit button clicked.');
  let book = {};
  book.author = $('#author').val();
  book.title = $('#title').val();
  addBook(book);
}

// adds a book to the database
function addBook(bookToAdd) {
  $.ajax({
    type: 'POST',
    url: '/books',
    data: bookToAdd,
    }).then(function(response) {
      console.log('Response from server.', response);
      refreshBooks();
    }).catch(function(error) {
      console.log('Error in POST', error)
      alert('Unable to add book at this time. Please try again later.');
    });
}

// refreshBooks will get all books from the server and render to page
function refreshBooks() {
  $.ajax({
    type: 'GET',
    url: '/books'
  }).then(function(response) {
    console.log(response);
    renderBooks(response);
  }).catch(function(error){
    console.log('error in GET', error);
  });
}


// Displays an array of books to the DOM
function renderBooks(books) {
  $('#bookShelf').empty();

  for(let i = 0; i < books.length; i += 1) {
    let book = books[i];
    // For each book, append a new row to our table
    $('#bookShelf').append(`
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td><button class="deleteButton" data-id="${book.id}">DELETE</button></td>
        <td><button class="truthyButton" data-id="${book.id}">I have read it!</button></td>
      </tr>
    `);
  }
}

function deleteBookHandler () {
  // console.log('Delete clicker working');
  deleteBook($(this).data("id"));
}

function deleteBook (bookId) {
  $.ajax ({
    method: 'DELETE',
    url: `/books/${bookId}`
  }).then( response => {
    console.log('Book was successfully deleted!');
    refreshBooks();
  }).catch (err => {
    console.log('There was a problem deleting that book.', err);
  });
};

function booleanBookHandler () {
  bookStatus($(this).data("id"));
};

function bookStatus () {
  console.log('clicker worked');
};