import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './BookList.css';

const BookList = () => {
    const [backendData, setBackendData] = useState([{}]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [readLaterList, setReadLaterList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/home")
            .then((response) => response.json())
            .then((data) => setBackendData(data))
            .catch((err) => console.log(err));
    }, []);

    const fetchBooksByGenre = (genre) => {
        fetch(`http://localhost:5000/home/genre/${genre}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Genre ${genre} not found`);
                }
                return response.json();
            })
            .then((data) => setBackendData(data))
            .catch((err) => {
                toast.error(`Genre ${genre} is empty. Redirecting to All Books...`);
                fetch("http://localhost:5000/home")
                    .then((response) => response.json())
                    .then((data) => {
                        setBackendData(data);
                        setSelectedGenre('');
                    })
                    .catch((err) => console.log(err));
            });
    };

    const handleGenreClick = (genre) => {
        fetchBooksByGenre(genre);
        setSelectedGenre(genre);
    };

    const addToReadLater = (isbn) => {
        const book = backendData.find((b) => b.isbn === isbn);
        if (book && !readLaterList.some((item) => item.isbn === isbn)) {
            setReadLaterList([...readLaterList, book]);
            toast.success(`${book.judul} added to read later list`);
        }
    };

    return (
        <div>
            <ToastContainer />
            <h1 className='allBooks'>BOOK CHOICES</h1>
            <p className='allBooks'>This Lorem Ipsum was written manually Ohio sigma fanum tax 1550s</p>
            
            <div className="button-container">
                <button className={`genreButton ${selectedGenre === '' ? 'active' : ''}`} 
                    onClick={() => 
                        fetch("http://localhost:5000/home")
                            .then(response => response.json())
                            .then(data => { 
                                setBackendData(data); 
                                setSelectedGenre(''); 
                            })}>
                    All Books
                </button>
                <button
                    className={`genreButton ${selectedGenre === 'fiction' ? 'active' : ''}`}
                    onClick={() => handleGenreClick('fiction')}
                >
                    Fiction
                </button>
                <button
                    className={`genreButton ${selectedGenre === 'romance' ? 'active' : ''}`}
                    onClick={() => handleGenreClick('romance')}
                >
                    Romance
                </button>
                <button
                    className={`genreButton ${selectedGenre === 'novel' ? 'active' : ''}`}
                    onClick={() => handleGenreClick('novel')}
                >
                    Novel
                </button>
                <button
                    className={`genreButton ${selectedGenre === 'science' ? 'active' : ''}`}
                    onClick={() => handleGenreClick('science')}
                >
                    Science
                </button>
                <button
                    className={`genreButton ${selectedGenre === 'science fiction' ? 'active' : ''}`}
                    onClick={() => handleGenreClick('science fiction')}
                >
                    Science-fiction
                </button>
                <button
                    className={`genreButton ${selectedGenre === 'motivation' ? 'active' : ''}`}
                    onClick={() => handleGenreClick('motivation')}
                >
                    Motivation
                </button>
            </div>

            <div className='book-list'>
                {backendData.length > 0 ? (
                    backendData.map((book, index) => (
                        <div key={index} className='book-item'>
                            <Link to={`/book/${book.isbn}`} className='book-link'>
                                <img src={book.cover} alt={book.judul} className='book-cover' />
                                <div className='book-info'>
                                    <h2 className='book-title'>{book.judul}</h2>
                                    <p className='book-description'>{book.deskripsi}</p>
                                </div>
                            </Link>
                            <button 
                                className='book-read-later' 
                                disabled={readLaterList.some(item => item.isbn === book.isbn)} 
                                onClick={() => addToReadLater(book.isbn)}
                            >
                                🕮
                            </button>
                        </div>
                    ))
                ) : (
                    <p>Loading books...</p>
                )}
            </div>
        </div>
    );
};

export default BookList;