// src/index.ts
interface Book {
  id: number;
  title: string;
  author: string;
  plot?: string;
  audience?: string;
  pages?: number;
  year?: number;
  publisher?: string;
  color?: string; 
}

async function fetchAndDisplayBooks() {
  try {
    const response = await fetch('https://my-json-server.typicode.com/zocom-christoffer-wallenberg/books-api/books');

    if (!response.ok) {
      throw new Error('Unable to retrieve data from books.');
    }

    const books: Book[] = await response.json();

    console.log('Books details:', books);

    const libraryContainer = document.getElementById('library-container');

    //Defining the colors for each book
books.forEach((book, index) => {
  const bookContainer = document.createElement('div');
  bookContainer.id = 'book'; // Sets the div ID to 'book'
  bookContainer.classList.add('book');
  bookContainer.style.backgroundColor = book.color || '#FFFFFF'; // Set the color directly in the 'book' div

  const bookElement = document.createElement('div');
  bookElement.innerHTML = `<h2>${book.title}</h2><h3>${book.author}</h3>`;

  bookContainer.addEventListener('click', () => showBookDetails(book));

  bookContainer.appendChild(bookElement);
  libraryContainer?.appendChild(bookContainer);
});
  } catch (error) {
    console.error((error as Error).message);
  }
}

function showBookDetails(book: Book) {
  const overlay = document.getElementById('overlay');
  if (!overlay) return;

  const overlayContent = document.querySelector('.overlay-content') as HTMLElement;

  if (overlayContent) {
    overlayContent.style.backgroundColor = book.color || '#FFFFFF'; // Default color if 'color' is not defined
  }

  const elements = {
    bookTitle: document.querySelector('#book-title') as HTMLElement,
    bookAuthor: document.querySelector('#book-author') as HTMLElement,
    bookPlot: document.querySelector('#book-plot') as HTMLElement,
    bookAudience: document.querySelector('#book-audience') as HTMLElement,
    bookPages: document.querySelector('#book-pages') as HTMLElement,
    bookPublished: document.querySelector('#book-published') as HTMLElement,
    bookPublisher: document.querySelector('#book-publisher') as HTMLElement,
  };

  if (
    elements.bookTitle &&
    elements.bookAuthor &&
    elements.bookPlot &&
    elements.bookAudience &&
    elements.bookPages &&
    elements.bookPublished &&
    elements.bookPublisher
  ) {
    elements.bookTitle.textContent = book.title;
    elements.bookAuthor.textContent = `By ${book.author}`;
    elements.bookPlot.textContent = `${book.plot || 'Information not available'}`;
    elements.bookAudience.innerHTML = `<strong>Audience:</strong> ${book.audience || 'Information not available'}`;
    elements.bookPages.innerHTML = `<strong>Pages:</strong> ${book.pages || 'Information not available'}`;
    elements.bookPublished.innerHTML = `<strong>First published:</strong> ${book.year || 'Information not available'}`;
    elements.bookPublisher.innerHTML  = `<strong>Publisher:</strong> ${book.publisher || 'Information not available'}`;

    overlay.classList.add('visible');
  }
}

function closeOverlay() {
  const overlay = document.getElementById('overlay');

  if (overlay) {
    overlay.classList.remove('visible');
    // Resets the default overlay color on close
    overlay.style.backgroundColor = '#333';
  }
}
document.addEventListener('DOMContentLoaded', fetchAndDisplayBooks);
