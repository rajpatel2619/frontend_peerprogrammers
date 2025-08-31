import { HiOutlineSearch } from 'react-icons/hi';

const data = [
  'Dashboard',
  'Courses',
  'Profile',
  'Settings',
  'Messages',
  'Assignments',
  'Grades',
  'Notifications',
];

export default function SearchBar({ query, onSearch }) {
  const filtered = data.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-xs">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <HiOutlineSearch className="text-gray-400 dark:text-gray-300" size={18} />
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-10 pr-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring focus:ring-blue-300"
      />
      {query && (
        <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 border border-t-0 border-gray-300 dark:border-gray-700 rounded-b-md shadow-md z-10">
          {filtered.map((item, index) => (
            <li
              key={index}
              className="px-3 py-2 hover:bg-blue-100 dark:hover:bg-blue-800 cursor-pointer text-sm text-gray-700 dark:text-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
