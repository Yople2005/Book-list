import React from 'react';

const Filter = ({ setGenreFilter, setStatusFilter }) => {
  const handleGenreChange = (event) => {
    setGenreFilter(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  return (
    <div className="mb-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700 mb-1">Genre:</label>
          <select id="genre" onChange={handleGenreChange} className="p-2 border rounded w-full">
            <option value="">All Genres</option>
            <option value="Civil">Civil</option>
            <option value="Architecture">Architecture</option>
            <option value="Electrical Power">Electrical Power</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Electronics">Electronics</option>
            <option value="Information Technology">Information Technology</option>
            <option value="Mechatronics">Mechatronics</option>
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">Status:</label>
          <select id="status" onChange={handleStatusChange} className="p-2 border rounded w-full">
            <option value="">All Statuses</option>
            <option value="Available">Available</option>
            <option value="Borrowed">Borrowed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
