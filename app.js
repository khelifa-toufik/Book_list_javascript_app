// Book class : Represent a Book
class Book {

    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI class: Handle UI Tasks 
class UI {
    static displayBooks = () => {

        const books = Store.getBooks();
        books.forEach((book) => {
            UI.addBookToList(book);
        });
    }
    static deleteBook = () => {
        document.querySelector('#book-list').addEventListener('click', (e) => {

            if (e.target.classList.contains('btn-danger')) {
                e.target.parentElement.parentElement.remove();
                Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
            }

        })
    };
    static alertMessage = (message, className) => {

        const container = document.querySelector('.container'),
            form = document.querySelector('#book-form'),
            div = document.createElement('div');

        div.className = `${className} alert`;
        const text = document.createTextNode(message);
        div.appendChild(text);
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 2000);

    };


    static addBookToList = (book) => {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm">x</a></td>
        `;
        list.appendChild(row);
    }
}

//Store class: Handles storages
class Store {

    static getBooks = () => {
        let books;
        if (localStorage.getItem('book') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('book'));
        }
        return books;
    }

    static addBook = (book) => {

        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('book', JSON.stringify(books));
    }

    static removeBook = (isbn) => {

        const books = Store.getBooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }

        });
        localStorage.setItem('book', JSON.stringify(books));
    }
}

//Event: Display Bookks
document.addEventListener('load', UI.displayBooks());

//Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value,
        author = document.querySelector('#author').value,
        isbn = document.querySelector('#isbn').value;
    if (title === '' || author === '' || isbn === '') {

        UI.alertMessage('please fill the form', 'btn-danger');

    } else {
        const book = new Book(title, author, isbn);
        UI.addBookToList(book);
        Store.addBook(book);



        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

        UI.alertMessage('Book added', 'btn-success');
    }



});

// Event: Remove a Book
UI.deleteBook();