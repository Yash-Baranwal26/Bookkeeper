import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';

function BookAdd() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    releaseDate: '',
  });
  const [errors, setErrors] = useState({});
  const isEditMode = Boolean(location.state?.book); // Check if book data is passed

  useEffect(() => {
    if (isEditMode) {
      const book = location.state.book;
      setUser({
        ...book,
        releaseDate: book.releaseDate ? new Date(book.releaseDate).toISOString().split('T')[0] : '',
      });
    }
  }, [isEditMode]);

  const dataSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};

    if (!user.title.trim()) validationErrors.title = 'Title is required.';
    if (!user.author.trim()) validationErrors.author = 'Author is required.';
    if (!user.genre) validationErrors.genre = 'Please select a genre.';
    if (!user.year || user.year <= 0)
      validationErrors.year = 'Enter a valid year.';
    if (!user.releaseDate) validationErrors.releaseDate = 'Release date is required.';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {

      const formattedTitle = user.title
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    const formattedAuthor = user.author.toUpperCase();

    const formattedUser = {
      ...user,
      title: formattedTitle,
      author: formattedAuthor,
    };

      if (isEditMode) {
        // Update book
        axios
          .put(`http://localhost:1234/updateBook/${user._id}`, formattedUser)
          .then((res) => {
            alert(res.data.msg);
            navigate("/"); // Navigate back to the main page
          })
          .catch((err) => {
            alert(err.response?.data?.error || 'Something went wrong.');
          });
      } else {
        // Add new book
        axios
          .post('http://localhost:1234/addBook', formattedUser)
          .then((res) => {
            alert(res.data.msg);
            navigate("/");
          })
          .catch((err) => {
            alert(err.response?.data?.error || 'Something went wrong.');
          });
      }
    }
  };

  const inputHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-screen mt-[-10vh]">
        <div className="border border-black p-4 rounded-md w-full max-w-md mx-2 bg-gray-200">
          <h4 className="mb-3 text-2xl md:text-3xl">
            {isEditMode ? "Edit Book" : "Add Book"}
          </h4>
          <form className="flex flex-col items-center" onSubmit={dataSubmit}>
            <div className="mb-4 w-full">
              <input
                className="form-input w-full rounded-md border border-black px-3 py-1"
                type="text"
                placeholder="Enter Book Title"
                name="title"
                value={user.title}
                onChange={inputHandler}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>
            <div className="mb-4 w-full">
              <input
                className="form-input w-full rounded-md border border-black px-3 py-1"
                type="text"
                placeholder="Book author"
                name="author"
                value={user.author}
                onChange={inputHandler}
              />
              {errors.author && (
                <p className="text-red-500 text-sm">{errors.author}</p>
              )}
            </div>

            <div className="mb-4 w-full">
              <select
                className="form-select w-full rounded-md border border-black px-3 py-1 bg-white"
                name="genre"
                value={user.genre}
                onChange={inputHandler}
              >
                <option value="" disabled>
                  Select Genre
                </option>
                <option value="Fictional">Fictional</option>
                <option value="Romance">Romance</option>
                <option value="Horror">Horror</option>
                <option value="Motivation">Motivation</option>
              </select>
              {errors.genre && (
                <p className="text-red-500 text-sm">{errors.genre}</p>
              )}
            </div>

            <div className="mb-4 w-full">
              <input
                className="form-input w-full rounded-md border border-black px-3 py-1"
                type="number"
                placeholder="Release Year"
                name="year"
                value={user.year}
                onChange={inputHandler}
              />
              {errors.year && (
                <p className="text-red-500 text-sm">{errors.year}</p>
              )}
            </div>
            <div className="mb-4 w-full">
              <input
                className="form-input w-full rounded-md border border-black px-3 py-1"
                type="date"
                placeholder="Release Date"
                name="releaseDate"
                value={user.releaseDate}
                onChange={inputHandler}
              />
              {errors.releaseDate && (
                <p className="text-red-500 text-sm">{errors.releaseDate}</p>
              )}
            </div>

            <div className="flex justify-center items-center mb-4">
              <button
                type="submit"
                className="bg-red-300 border border-black py-2 px-4 text-lg rounded-2xl"
              >
                {isEditMode ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BookAdd;
