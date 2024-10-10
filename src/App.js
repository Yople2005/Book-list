import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faBars, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [majorFilter, setMajorFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
         const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1rrkZkt2GHRdSGi-zrqRgiseThigJ5aF41uLTq2UdliM/values/Sheet1?key=AIzaSyDY9bw7SI7wUnWn3iGu2E4dvthqD7BUb3U');
        const data = await response.json();
        const rows = data.values.slice(1);
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
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  const handleSeeMore = (book) => setSelectedBook(book);
  const handleClosePopup = () => setSelectedBook(null);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="App min-h-screen bg-gray-100 pt-1 p-4">
      {/* Navigation & Header */}
      <header className="bg-zinc-700 text-white p-3 rounded-lg shadow-lg flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-3xl mr-4">
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div className="flex items-center">
            <a href="https://innovative-library.netlify.app"><img src="logo.png" alt="Library Logo" className="w-10 h-10 ml-2" /></a>
            <a href="https://innovative-library.netlify.app"><h1 className="text-2xl font-bold">Innovative Library</h1></a>
          </div>
        </div>
        <button onClick={() => setSearchOpen(!searchOpen)} className="text-white text-3xl">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </header>

      {/* Side Navigation Menu */}
      {menuOpen && (
        <nav className="fixed inset-y-0 left-0 w-40 bg-green-500 bg-opacity-90 text-white p-6 z-50 shadow-lg">
          <button onClick={() => setMenuOpen(false)} className="text-white mb-6 text-3xl hover:text-gray-200">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <ul className="space-y-4">
            <li><a href="#home" className="hover:text-gray-200">Home</a></li>
            <li><a href="#feature" className="hover:text-gray-200">Features</a></li>
            <li><a href="#about-us" className="hover:text-gray-200">About Us</a></li>
            <li><a href="#faq" className="hover:text-gray-200">FAQ</a></li>
            <li><a href="#contact-us" className="hover:text-gray-200">Contact Us</a></li>
           
          </ul>
        </nav>
      )}

      {/* Search Bar & Filters */}
      {searchOpen && (
        <div className="sticky top-16 left-3 right-3 bg-green-200 p-4 rounded-b-lg shadow-lg z-40">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by Title or Author"
            className="w-full p-3 border border-blue-300 rounded-lg bg-blue-50 text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div className="flex flex-col md:flex-row w-full gap-4 mt-4">
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
                {/* Add other majors */}
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
      )}

      {/* Main Content */}
      <main className="mt-4">
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
                  className="mt-4 p-2 bg-green-400 text-white rounded-lg hover:bg-blue-600"
                >
                  See More
                </button>
              </div>
            ))
          ) : (
            <p>No books found</p>
          )}
        </div>
      </main>

      {/* Book Popup */}
      {selectedBook && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
            <button 
              onClick={handleClosePopup} 
              className="absolute bottom-2 right-2 bg-red-500 text-white rounded-lg p-2 text-gray-700 hover:text-gray-900"
            >
              Close
            </button>
            <h2 className="text-2xl font-semibold mb-4">{selectedBook.title}</h2>
            <p className="mb-2"><strong>Author:</strong> {selectedBook.author}</p>
            <p className="mb-2"><strong>Major:</strong> {selectedBook.major}</p>
            <p className="mb-2"><strong>Status:</strong> {selectedBook.status}</p>
            <p className="mb-4"><strong>Location:</strong> {selectedBook.location}</p>
            <p className="mb-4"><strong>Summary:</strong> {selectedBook.summary}</p>
            <div className="flex space-x-4">
              <a 
                href={selectedBook.readLink} 
                className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Read Link
              </a>
              <a 
                href={selectedBook.downloadLink} 
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Download Link
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button onClick={scrollToTop} className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-lg shadow-md hover:bg-blue-600">
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
      )}
    </div>
  );
}

export default App;
