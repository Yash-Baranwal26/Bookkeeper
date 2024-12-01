import axios from "axios";
import Header from "./Component/Header";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import jsPDF from "jspdf";

function App() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  const [delClicked, setDelClicked] = useState({});

  const deleteCard = async () => {
    try {
      const toDelete = Object.keys(delClicked).filter((index) => delClicked[index]);
      if (toDelete.length === 0) {
        alert("No movies selected for deletion.");
        return;
      }

      const confirmed = window.confirm(
        `Are you sure you want to delete ${toDelete.length} selected movie(s)?`
      );
      if (!confirmed) {
        return;
      }

      const promises = toDelete.map((index) => {
        return axios.delete(`http://localhost:1234/deleteBook/${product[index]._id}`);
      });

      await Promise.all(promises);
      alert("Selected movies deleted successfully.");

      const updatedBooks = await axios.get("http://localhost:1234/fetchBook");
      setProduct(updatedBooks.data);
      setDelClicked({});
    } catch (error) {
      console.error("Error deleting movies:", error);
      alert("Failed to delete selected movies.");
    }
  };

  const toggleDelBtn = (index) => {
    setDelClicked((prevClicked) => ({
      ...prevClicked,
      [index]: !prevClicked[index],
    }));
  };

  useEffect(() => {
    axios
      .get("http://localhost:1234/fetchBook")
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDownloadPDF = (book) => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Book Summary", 10, 10);

    doc.setFontSize(14);
    doc.text(`Title: ${book.title}`, 10, 30);
    doc.text(`Author: ${book.author}`, 10, 40);
    doc.text(`Genre: ${book.genre}`, 10, 50);
    doc.text(`Year: ${book.year}`, 10, 60);
    doc.text(
      `Release Date: ${
        book.releaseDate ? new Date(book.releaseDate).toISOString().split("T")[0] : "Unknown"
      }`,
      10,
      70
    );

    doc.text("Thank you for exploring the book!", 10, 90);

    // Save the file
    doc.save(`${book.title.replace(/ /g, "_")}_Summary.pdf`);
  };

  return (
    <div className="min-h-screen bg-black">
      <Header />
      <div className="flex flex-col items-end pr-8 pt-4">
        <Link to="/bookAdd">
          <IoIosAddCircle className="text-white text-3xl mb-5" />
        </Link>
        <FaTrashAlt className="text-white text-3xl cursor-pointer" onClick={deleteCard} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
        {product.map((bookSchema, index) => (
          <div
            className="bg-gray-800 text-white border border-red-500 rounded-lg shadow-lg flex flex-col"
            key={index}
          >
            <div className="flex justify-between p-2">
              <FaEdit
                className="text-gray-200 text-xl cursor-pointer"
                onClick={() =>
                  navigate("/bookAdd", { state: { book: bookSchema } }) // Use navigate to pass data
                }
              />

              <IoCheckmarkCircleSharp
                className={`text-2xl cursor-pointer ${
                  delClicked[index] ? "text-red-500" : "text-gray-200"
                }`}
                onClick={() => toggleDelBtn(index)}
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex flex-row justify-between">
                <h3 className="text-2xl font-bold">{bookSchema.title}</h3>
                <p className="mt-4 text-xs">
                  Author : <span className="font-bold">{bookSchema.author}</span>
                </p>
              </div>
              <div className="mt-auto">
                <hr className="my-4" />
                <div className="flex flex-row justify-between">
                  <p>
                    Type : {bookSchema.genre} <br />
                    Released on:{" "}
                    {bookSchema.releaseDate
                      ? new Date(bookSchema.releaseDate).toISOString().split("T")[0]
                      : "Unknown"}
                  </p>
                  <button
                    className="h-8 bg-red-400 rounded-lg px-2 text-sm flex items-center justify-center mt-4"
                    onClick={() => handleDownloadPDF(bookSchema)}
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
