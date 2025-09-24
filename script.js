const myLibrary = [];

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
        this.bookID = crypto.randomUUID();
    }

    // Method to toggle read status of the book
    toggleReadStatus() {
        this.isRead = !this.isRead;
    }

    // Get book information
    getInfo() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead ? 'read' : 'not read yet'}`;
    }

    getBookID() {
        return `${this.title} ID: ${this.bookID}`;
    }
}

// ##Functions

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooks() {
    for (let i = 0; i < myLibrary.length; i++) {
        // TODO
        console.log('To Fill');
    }
}


// ##Create Books Section

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
const theGreatGatsby = new Book(
    'The Great Gatsby', 'F. Scott Fitzgerald',
    345, false
);
const tenderIsTheFlesh = new Book(
    'Tender is the Flesh', 'Katelyn Villegas',
    219, true
);

// ##Console Output

addBookToLibrary(theHobbit);
addBookToLibrary(theGreatGatsby);

console.log(myLibrary.map(book => book.getInfo()));

theGreatGatsby.toggleReadStatus();
console.log(theGreatGatsby.getInfo());
console.log(tenderIsTheFlesh.getBookID());



