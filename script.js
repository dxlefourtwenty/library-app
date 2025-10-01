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

function displayBooks(arr) {
    const tableBody = document.getElementById("book-entries");
    tableBody.innerHTML = "";

    for (let book of arr) {
        const row = document.createElement("tr");

        for (let key in book) {
            if (typeof book[key] === "function") continue;

            const cell = document.createElement("td");

            if (key == "isRead") {
                cell.textContent = book.isRead ? 'yes' : 'no';
            } else {
                cell.textContent = book[key];
            }

            row.appendChild(cell);
        }

        const funcCell = document.createElement("td");
        const removeButton = document.createElement("button");
        const readCheckBox = document.createElement("input");
        const wrapper = document.createElement("div");
        readCheckBox.type = "checkbox";
        readCheckBox.id = "have-read-box";
        if (book.isRead == true) {
            readCheckBox.checked = true;
        }

        funcCell.id = "function-cell";
        removeButton.id = "remove-button";
        wrapper.id = "wrapper";
        removeButton.textContent = "x";

        removeButton.addEventListener("click", () => {
            myLibrary.splice(book, 1);
            displayBooks(myLibrary);
        });

        readCheckBox.addEventListener("change", function() {
            if (this.checked) {
                book.isRead = true;
            } else {
                book.isRead = false;
            }

            displayBooks(myLibrary);
        });

        wrapper.appendChild(removeButton);
        wrapper.appendChild(readCheckBox);
        funcCell.appendChild(wrapper);
        // row.appendChild(removeButton);
        // row.appendChild(readCheckBox);
        row.appendChild(funcCell);

        tableBody.appendChild(row);
    }

    console.log("Finished Displaying Books");
    normalizeTable();
}

function createBook(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    addBookToLibrary(book);
}

function normalizeTable() {
    const table = document.getElementById("library-table");
    const tbody = table.querySelector("tbody");
    const rows = tbody.querySelectorAll("tr");

    const minRows = 5;
    const cols = rows[0] ? rows[0].children.length : 5; // Assume 5 cols if row is empty

    // If too few rows, add empty rows to normalize

    if (rows.length < minRows) {
        for (let i = rows.length; i < minRows; i++) {
            const tr = document.createElement("tr");
            for (let j = 0; j < cols; j++) {
                const td = document.createElement("td");
                td.innerHTML = "";
                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
    }
}

// ##Add books button
const bookModal = document.getElementById("book-modal");
const openModal = document.getElementById("open-modal");
const closeModal = document.getElementById("close-modal");
const bookForm = document.getElementById("book-form");
const tableBody = document.getElementById("book-entries");

openModal.addEventListener("click", () => {
    bookModal.style.display = "flex";
});

closeModal.addEventListener("click", () => {
    bookModal.style.display = "none";
});

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const haveRead = document.getElementById("have-read").checked;

    createBook(title, author, pages, haveRead);
    displayBooks(myLibrary);

    bookForm.reset();
    bookModal.style.display = "none";
});

// ##Create Books Section

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
createBook('The Great Gatsby', 'F. Scott Fitzgerald', 330, true);
const tenderIsTheFlesh = new Book(
    'Tender is the Flesh', 'Agustina Baztericca',
    219, true
);

// ##Console Output

addBookToLibrary(theHobbit);
theHobbit.toggleReadStatus();
console.log(myLibrary.map(book => book.getInfo()));
console.log(tenderIsTheFlesh.getBookID());

createBook('Game Of Thrones', 'George R.R. Martin', 575, false);
createBook('Harry Potter', 'J.K. Rowling', 700, true);
addBookToLibrary(tenderIsTheFlesh);
displayBooks(myLibrary);



