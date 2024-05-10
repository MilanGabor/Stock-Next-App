import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { searchStockSymbols } from '../utils/api';

const SearchQuote = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.length > 0) {
        try {
          const result = await searchStockSymbols(searchTerm);
          result.bestMatches 
            ? setSuggestions(result.bestMatches)
            : setSuggestions([result.Information]);
        } catch (error) {
          console.error(error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  const handleSearch = (symbol: string) => {
    router.push(`/quote?symbol=${encodeURIComponent(symbol)}`);
  };

  return (
    <div className='flex flex-col items-center justify-center mt-6 w-full'>
      <input
        type='text'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Enter stock symbol or name'
        className='px-4 py-2 border border-gray-300 text-black rounded-t-md focus:outline-none focus:ring-2 focus:ring-blue-600 desktop:w-1/2 laptop:w-2/3 tablet:w-3/4 mobile:w-full'
      />
      {Object.keys(suggestions).length > 0 && (
        
        <div className='desktop:w-1/2 laptop:w-2/3 tablet:w-3/4 mobile:w-full border border-t-0 border-gray-300 text-black rounded-b-md max-h-60 overflow-y-auto bg-white'>
          {suggestions.map((suggestion, index) => (
            suggestion['1. symbol'] ? (
              <div
                key={index}
                onClick={() => handleSearch(suggestion['1. symbol'])}
                className='px-4 py-2 cursor-pointer hover:bg-gray-200'
              >
                <strong>{suggestion['1. symbol']}</strong> - {suggestion['2. name']}
              </div>
            ) : (
              <div
                key={index}
                className='px-4 py-2 cursor-pointer hover:bg-gray-200'
              >
                {suggestion}
              </div>
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchQuote;
