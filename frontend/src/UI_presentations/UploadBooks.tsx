'use client';
import React, { useState } from "react";

const UploadBooks = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    genre: "",
    available: true,
    borrowedCount: 0,
    coverImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setBook((prev) => ({ ...prev, coverImage: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("genre", book.genre);
    formData.append("available", book.available.toString());
    formData.append("borrowedCount", book.borrowedCount.toString());
    if (book.coverImage) {
      formData.append("coverImage", book.coverImage);
    }

    try {
      const response = await fetch('http://localhost:3000/books', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Book added successfully!');
        setBook({
          title: "",
          author: "",
          genre: "",
          available: true,
          borrowedCount: 0,
          coverImage: null,
        });
      } else {
        alert('Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg space-y-4">
      <h2 className="text-xl font-semibold text-gray-700">Add New Book</h2>
      <p className="text-sm text-gray-500">
        Fill in the details below to add a new book to the system.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={book.title}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Author</label>
            <input
              type="text"
              name="author"
              value={book.author}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Genre</label>
            <input
              type="text"
              name="genre"
              value={book.genre}
              onChange={handleChange}
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-700"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Cover Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-lg bg-gray-100 text-gray-700"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-slate-300 w-[300px] h-[50px] text-[16px] text-neutral-700 font-semibold rounded-md transition"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default UploadBooks;