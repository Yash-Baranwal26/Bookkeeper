Installation and Setup

1. Install dependencies using - npm install (In both Frontend and Backend)
2. To start Backend run "nodemon index.js" or "npm index.js"
3. to start Frontend run "npm run dev"

Overview
This project is a Book Management System built using React for the frontend and a REST API backend (Node.js with MongoDB). The system allows users to add, update, delete, view, and download book details. 
The app includes features for both adding new books and editing existing ones, ensuring proper data validation and formatting.

Features
1. Book Display
-A grid-based UI lists all books with the following details:
-Title (formatted with the first letter of each word capitalized).
-Author (saved in uppercase).
-Genre.
-Release Year.
-Release Date.
-Download PDF Button: Allows users to download a book summary in PDF format.
2. Add Book
-A form for adding new books with the following fields:
-Title (Capitalized).
-Author (Uppercase).
-Genre (Dropdown with options like Fictional, Romance, Horror, Motivation).
-Release Year.
-Release Date.
-Validation ensures:
-All fields are filled.
-The year is valid and positive.
-Data is saved in the backend with formatting for the title and author.
3. Edit Book
-Users can edit any book by clicking the edit icon.
-Pre-populated form with the selected book's data.
-Updates are sent to the backend, and the book list is refreshed upon success.
4. Delete Book
-Multi-select delete functionality:
-Users can select multiple books for deletion using a checkbox-like system.
-A confirmation prompt ensures no accidental deletions.
-Deletes are processed in bulk with updates reflected immediately.
5. Download PDF
-A button generates and downloads a properly formatted PDF summary for a specific book.
-The PDF includes:
-Title.
-Author.
-Genre.
-Release Year and Date.
6. Responsive Design
=The app is fully responsive, ensuring usability across all screen sizes.
=Modern design using Tailwind CSS for styling.
