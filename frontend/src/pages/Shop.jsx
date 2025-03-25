import React, { useContext, useState, useEffect, useRef } from 'react'
import {RiSearch2Line} from 'react-icons/ri'
import {LuSettings2} from 'react-icons/lu'
import { categories } from '../assets/data'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import Item from '../components/Item'
import { searchBooks, getSearchSuggestions } from '../utils/searchUtils'

const Shop = () => {
  // Get required context values
  const { books } = useContext(ShopContext)  // Add token and backendUrl
  
  // State lưu các categories được chọn (array)
  const [category, setCategory] = useState([])
  
  // State lưu loại sắp xếp (relevant/low/high)
  const [sortType, setSortType] = useState('relevant')
  
  // State lưu từ khóa tìm kiếm
  const [search, setSearch] = useState('')
  
  // State lưu danh sách sách sau khi đã lọc
  const [filteredBooks, setFilteredBooks] = useState([])
  
  // State lưu trang hiện tại
  const [currentPage, setCurrentPage] = useState(1)
  
  // Số sách hiển thị mỗi trang
  const itemsPerPage = 10

  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef(null);

  // Hàm toggle (thêm/xóa) một giá trị trong state
  const toggleFilter= (value,setState)=>{
    setState ((prev)=> prev.includes(value) ? prev.filter((item)=> item !== value) : [...prev,value])
  }

  // Hàm lọc sách theo điều kiện
  const applyFilter = () => {
    let filtered = [...books];
    
    if (search.trim()) {
      filtered = searchBooks(filtered, search);
    }

    if (category.length) {
      filtered = filtered.filter((book) => category.includes(book.category));
    }

    return filtered;
  };

  // Hàm sắp xếp sách
  const applySorting = (booksList) => {
    switch (sortType) {
      case "low":
        return booksList.sort((a, b) => a.price - b.price)
      case "high": 
        return booksList.sort((a, b) => b.price - a.price)
      default:
        return booksList // Default that is 'relevant'
    }
  }

  // Effect để xử lý khi các state thay đổi
  useEffect(()=>{
    let filtered = applyFilter()
    let sorted = applySorting(filtered)
    setFilteredBooks(sorted)
    setCurrentPage(1) // Reset to the first page when filters change
  }, [category, sortType, books, search])

  // Thêm useEffect để xử lý search suggestions
  useEffect(() => {
    if (search.length >= 2) {
      const suggestions = getSearchSuggestions(books, search);
      setSearchSuggestions(suggestions);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [search, books]);

  // Xử lý phím
  const handleKeyDown = (e) => {
    if (!searchSuggestions.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault(); // Ngăn cursor di chuyển trong input
        setSelectedIndex(prev => 
          prev < searchSuggestions.length - 1 ? prev + 1 : 0
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : searchSuggestions.length - 1
        );
        break;

      case 'Enter':
        if (selectedIndex >= 0) {
          e.preventDefault();
          handleSelectSuggestion(searchSuggestions[selectedIndex]);
        }
        break;

      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  // Xử lý chọn suggestion
  const handleSelectSuggestion = (suggestion) => {
    setSearch(suggestion);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    searchInputRef.current?.blur();
  };

  // Reset selectedIndex khi suggestions thay đổi
  useEffect(() => {
    setSelectedIndex(-1);
  }, [searchSuggestions]);

  // Hàm lấy sách cho trang hiện tại
  const getPaginatedBooks = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredBooks.slice(startIndex, endIndex)
  }

  // Tính toán số trang
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage)


  return (
    <section className='max-padd-container bg-white'>
      <div className='pt-28'>
        {/* Search box with suggestions */}
        <div className='w-full max-w-2xl flex items-center justify-center relative'>
          <div className='inline-flex items-center justify-center bg-primary overflow-hidden rounded-full w-full p-4 px-5'>
            <div className='text-lg cursor-pointer'><RiSearch2Line/></div>
            <input 
              ref={searchInputRef}
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              type="text"
              placeholder='Search for book...'
              className='border-none outline-none w-full text-sm pl-4 bg-primary'
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => {
                // Delay để cho phép click event trên suggestions xảy ra
                setTimeout(() => setShowSuggestions(false), 200);
              }}
              onKeyDown={handleKeyDown}
            />
            <div><LuSettings2/></div>
          </div>
          
          {/* Search Suggestions Dropdown */}
          {showSuggestions && searchSuggestions.length > 0 && (
            <div className='absolute top-full left-0 w-full bg-white mt-1 rounded-lg shadow-lg z-50 py-2'>
              {searchSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 cursor-pointer flex items-center ${
                    index === selectedIndex 
                      ? 'bg-primary text-secondaryOne' 
                      : 'hover:bg-primary'
                  }`}
                  onClick={() => handleSelectSuggestion(suggestion)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <RiSearch2Line className={`mr-2 ${
                    index === selectedIndex ? 'text-secondaryOne' : 'text-gray-500'
                  }`} />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Hiển thị kết quả tìm kiếm chính xác */}
        {search && (
          <div className='mt-4 text-gray-600'>
            {filteredBooks.length > 0 ? (
              <p className='text-sm'>
                Showing results for "<span className='font-semibold'>{search}</span>"
                ({filteredBooks.length} {filteredBooks.length === 1 ? 'result' : 'results'})
              </p>
            ) : (
              <p className='text-sm'>
                No results found for "<span className='font-semibold'>{search}</span>"
              </p>
            )}
          </div>
        )}

        {/* Categories filter */}
        <div className='mt-12 mb-16'>
          <h4 className='h4 mb-4 hidden sm:flex'>Categories:</h4>
          <div className='flexCenter sm:flexStart flex-wrap gap-x-12 gap-y-4'>
            {categories.map((cat) => (
              <label key={cat.name}>
                <input value={cat.name} onChange={(e)=> toggleFilter(e.target.value,setCategory)} type="checkbox" className='hidden peer'/>
                <div className='flexCenter flex-col gap-2 peer-checked:text-secondaryOne cursor-pointer'>
                  <div className='bg-primary h-20 w-20 flexCenter rounded-full'>
                    <img src={cat.image} alt={cat.name} className='object-cover w-10 h-10'/>
                  </div>
                  <span>{cat.name}</span>
                </div>
              </label>
            ))}
          </div>
        </div>
        {/* Book container */}
        <div className='mt-12'>
          {/* title and sort */}
          <div className='flexBetween !items-start gap-7 flex-wrap pb-16 max-sm:flexCenter text-center'>
              <Title title1={'Our'} title2={'Books Lists'} titleStyle={'pb-0 text-start'} paraStyle={'!block'} />
              <div className='flexCenter gap-x-2'>
                <span className='hidden sm:flex medium-16'>Sort by:</span>
                <select onChange={(e) => setSortType(e.target.value)}  className='text-sm p-2.5 outline-none bg-primary rounded text-gray-30'>
                  <option value="relevant">Relevant</option>
                  <option value="low">Low</option>
                  <option value="high">High</option>
                </select>
              </div>
          </div>
          {/* Books */}
          <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8'>
            {getPaginatedBooks().length > 0 ? (
              getPaginatedBooks().map((book) => (
                <Item book={book} key={book._id}/>
              ))
            ) : (
              <p>No Books found for selected filters</p>
            )}
          </div>
        </div>
        {/* Pagination */}
        <div className='flexCenter mt-14 mb-10 gap-4'>
          {/* Previous button */}
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className='px-4 py-2 bg-primary rounded-lg disabled:opacity-50'
          >
            Previous
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 rounded-full ${
                currentPage === index + 1 
                ? 'bg-secondaryOne text-white' 
                : 'bg-primary'
              }`}
            >
              {index + 1}
            </button>
          ))}

          {/* Next button */}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className='px-4 py-2 bg-primary rounded-lg disabled:opacity-50'
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}

export default Shop

