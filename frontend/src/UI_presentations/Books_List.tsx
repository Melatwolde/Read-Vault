"use client";
import React, { useEffect, useState } from "react";
import UploadBooks from "@/UI_presentations/UploadBooks";
import { Button } from "@/components/ui/button"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
interface Book {
  title: string;
  author: string;
  genre: string;
  available: boolean;
  borrowedCount: number;
  _id: string;
  loanTrends: any[];
  image: string;
}

export default function Books_List() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/books/fetch-books')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          console.error('Error: Expected an array but got', data);
        }
      })
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-[30px] font-bold text-neutral-800 my-3">Library</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl"
          >
            <img src={book.image} alt={book.title} className="w-[200px] h-[328px] object-cover mx-auto mb-4" />
            <h3 className="text-xl font-semibold">{book.title}</h3>
            <p className="text-gray-600">By {book.author}</p>
            <p className="text-sm text-gray-500">{book.genre}</p>
            <p className={`mt-2 text-sm font-semibold ${book.available ? "text-green-600" : "text-red-500"}`}>
              {book.available ? "Available ✅" : "Not Available ❌"}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              Borrowed: {book.borrowedCount} {book.borrowedCount === 1 ? "time" : "times"}
            </p>
          </div>
        ))}
      </div>
        <Accordion type="single" collapsible className="flex items-center justify-center mt-8">
            <AccordionItem value="item-1">
            <Button variant="outline" className="bg-slate-300 w-[300px] h-[50px] text-[32px] text-neutral-700 font-semibold"><AccordionTrigger>Upload new book</AccordionTrigger></Button>
                <AccordionContent className="-ml-3">
                    <UploadBooks />
                </AccordionContent>
            </AccordionItem>
        </Accordion>

    </div>
  );
}