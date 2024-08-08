import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faExternalLinkAlt, faDownload } from '@fortawesome/free-solid-svg-icons';
import {
  FacebookShareButton, ViberShareButton, TelegramShareButton,
  FacebookIcon, ViberIcon, TelegramIcon
} from 'react-share';

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [majorFilter, setMajorFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1rrkZkt2GHRdSGi-zrqRgiseThigJ5aF41uLTq2UdliM/values/Sheet1?key=AIzaSyDY9bw7SI7wUnWn3iGu2E4dvthqD7BUb3U');
        const data = await response.json();
        const rows = data.values.slice(1); // Skip header row
        const books = rows.map(row => ({
          id: row[0],
          title: row[1],
          author: row[2],
          major: row[3],
          status: row[4],
          summary: row[5],
          readLink: row[6],
          downloadLink: row[7],
          location: row[8]
        }));
        setBooks(books);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = books.filter(book => {
      const matchesQuery = book.title.toLowerCase().includes(query.toLowerCase()) ||
                            book.author.toLowerCase().includes(query.toLowerCase());
      const matchesMajor = majorFilter ? book.major === majorFilter : true;
      const matchesStatus = statusFilter ? book.status === statusFilter : true;
      return matchesQuery && matchesMajor && matchesStatus;
    });
    setFilteredBooks(filtered);
  }, [query, majorFilter, statusFilter, books]);

  const handleSeeMore = (book) => {
    setSelectedBook(book);
  };

  const handleClosePopup = () => {
    setSelectedBook(null);
  };

  return (
    <div className="App min-h-screen bg-gray-100 p-6">
      <header className="bg-blue-500 text-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold mb-4">Book Search</h1>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by Title or Author"
            className="p-3 border border-blue-300 rounded-lg bg-blue-50 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1 md:flex-none md:w-2/3 lg:w-3/4"
          />
          <div className="flex flex-col md:flex-row w-full md:w-auto gap-4 md:gap-4 mt-4 md:mt-0">
            <div className="relative flex-1">
              <select 
                value={majorFilter} 
                onChange={e => setMajorFilter(e.target.value)} 
                className="w-full p-3 border border-green-300 rounded-lg bg-green-50 text-green-900 focus:outline-none focus:ring-2 focus:ring-green-400 appearance-none"
              >
                <option value="">All Majors</option>
                <option value="Civil">Civil</option>
                <option value="Architecture">Architecture</option>
                <option value="Electrical Power">Electrical Power</option>
                <option value="Mechanical">Mechanical</option>
                <option value="Electronics">Electronics</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Mechatronics">Mechatronics</option>
              </select>
              <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 text-green-900" style={{ top: '50%', transform: 'translateY(-50%)' }} />
            </div>
            <div className="relative flex-1">
              <select 
                value={statusFilter} 
                onChange={e => setStatusFilter(e.target.value)} 
                className="w-full p-3 border border-yellow-300 rounded-lg bg-yellow-50 text-yellow-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 appearance-none"
              >
                <option value="">All Statuses</option>
                <option value="Available">Available</option>
                <option value="Borrowed">Borrowed</option>
              </select>
              <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 text-yellow-900" style={{ top: '50%', transform: 'translateY(-50%)' }} />
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book, index) => (
              <div key={book.id} className="bg-white p-4 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">{index + 1}. {book.title}</h2>
                <p className="text-gray-700">ID: {book.id}</p>
                <p className="text-gray-700">Author: {book.author}</p>
                <p className="text-gray-700">Major: {book.major}</p>
                <p className={`text-gray-700 font-semibold ${book.status === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                  Status: {book.status}
                </p>
                <button 
                  onClick={() => handleSeeMore(book)} 
                  className="mt-4 p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  See More
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-700">No books found.</p>
          )}
        </div>
      </main>
      {selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 relative">
            <h2 className="text-2xl font-bold mb-4">{selectedBook.title}</h2>
            <div className="space-y-2 mb-4">
              <p className="text-gray-700"><strong>ID:</strong> {selectedBook.id}</p>
              <p className="text-gray-700"><strong>Author:</strong> {selectedBook.author}</p>
              <p className="text-gray-700"><strong>Major:</strong> {selectedBook.major}</p>
              <p className={`text-gray-700 font-semibold ${selectedBook.status === 'Available' ? 'text-green-600' : 'text-red-600'}`}>
                <strong>Status:</strong> {selectedBook.status}
              </p>
              <p className="text-gray-700"><strong>Summary:</strong> {selectedBook.summary}</p>
              <p className="text-gray-700"><strong>Location:</strong> {selectedBook.location}</p>
            </div>
            <div className="space-y-2 mt-4">
              <a 
                href={selectedBook.readLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-blue-500 hover:text-blue-600"
              >
                <FontAwesomeIcon icon={faExternalLinkAlt} className="w-5 h-5 mr-2" />
                <span className="ml-2">Read Link</span>
              </a>
              <a 
                href={selectedBook.downloadLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center text-blue-500 hover:text-blue-600"
              >
                <FontAwesomeIcon icon={faDownload} className="w-5 h-5 mr-2" />
                <span className="ml-2">Download PDF</span>
              </a>
              <div className="flex gap-4 mt-4">
                <FacebookShareButton
                  url={selectedBook.readLink}
                  title={`Check out this book: ${selectedBook.title}`}
                  className="flex items-center"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>
                <ViberShareButton
                  url={selectedBook.readLink}
                  title={`Check out this book: ${selectedBook.title}`}
                  className="flex items-center"
                >
                  <ViberIcon size={32} round />
                </ViberShareButton>
                <TelegramShareButton
                  url={selectedBook.readLink}
                  title={`Check out this book: ${selectedBook.title}`}
                  className="flex items-center"
                >
                  <TelegramIcon size={32} round />
                </TelegramShareButton>
              </div>
            </div>
            <button 
              onClick={handleClosePopup} 
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
