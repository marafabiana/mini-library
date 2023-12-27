"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function fetchAndDisplayBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books');
            if (!response.ok) {
                throw new Error('Unable to retrieve data from books.');
            }
            const books = yield response.json();
            console.log('Books details:', books);
            const libraryContainer = document.getElementById('library-container');
            books.forEach((book, index) => {
                const bookContainer = document.createElement('div');
                bookContainer.id = 'book';
                bookContainer.classList.add('book');
                bookContainer.style.backgroundColor = book.color || '#FFFFFF';
                const bookElement = document.createElement('div');
                bookElement.innerHTML = `<h2>${book.title}</h2><h3>${book.author}</h3>`;
                bookContainer.addEventListener('click', () => showBookDetails(book));
                bookContainer.appendChild(bookElement);
                libraryContainer === null || libraryContainer === void 0 ? void 0 : libraryContainer.appendChild(bookContainer);
            });
        }
        catch (error) {
            console.error(error.message);
        }
    });
}
function showBookDetails(book) {
    const overlay = document.getElementById('overlay');
    if (!overlay)
        return;
    const overlayContent = document.querySelector('.overlay-content');
    if (overlayContent) {
        overlayContent.style.backgroundColor = book.color || '#FFFFFF';
    }
    const elements = {
        bookTitle: document.querySelector('#book-title'),
        bookAuthor: document.querySelector('#book-author'),
        bookPlot: document.querySelector('#book-plot'),
        bookAudience: document.querySelector('#book-audience'),
        bookPages: document.querySelector('#book-pages'),
        bookPublished: document.querySelector('#book-published'),
        bookPublisher: document.querySelector('#book-publisher'),
    };
    if (elements.bookTitle &&
        elements.bookAuthor &&
        elements.bookPlot &&
        elements.bookAudience &&
        elements.bookPages &&
        elements.bookPublished &&
        elements.bookPublisher) {
        elements.bookTitle.textContent = book.title;
        elements.bookAuthor.textContent = `By ${book.author}`;
        elements.bookPlot.textContent = `${book.plot || 'Information not available'}`;
        elements.bookAudience.innerHTML = `<strong>Audience:</strong> ${book.audience || 'Information not available'}`;
        elements.bookPages.innerHTML = `<strong>Pages:</strong> ${book.pages || 'Information not available'}`;
        elements.bookPublished.innerHTML = `<strong>First published:</strong> ${book.year || 'Information not available'}`;
        elements.bookPublisher.innerHTML = `<strong>Publisher:</strong> ${book.publisher || 'Information not available'}`;
        overlay.classList.add('visible');
    }
}
function closeOverlay() {
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.classList.remove('visible');
        overlay.style.backgroundColor = '#333';
    }
}
document.addEventListener('DOMContentLoaded', fetchAndDisplayBooks);
