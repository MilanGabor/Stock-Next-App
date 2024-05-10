import React from 'react';

interface QuoteCardProps {
  quoteData?: { 'Global Quote':  any};
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quoteData }) => {

  const quote = quoteData ? quoteData['Global Quote'] : false;
  
  return (
    <div className='mobile:py-5 tablet:py-0'>
      <h2 className='mobile:text-xl tablet:text-xl laptop:text-2xl desktop:text-3xl 
        font-bold mb-4 flex justify-center'>{quote['01. symbol']}</h2>
      {quote ? (
        <div className='grid grid-cols-2 mobile:gap-2 tablet:gap-4'>
            {Object.keys(quote).map(key => (
              <div key={key} className='flex justify-between mobile:px-2 tablet:px-5'>
                <span className='font-semibold mobile:text-xs tablet:text-s tablet:text-lg'>{key.replace(/^\d+\. /, '')}:</span>
                <span className='mobile:text-xs tablet:text-lg'>{quote[key]}</span>
              </div>
            ))}
        </div>
        ) : (
          <div className='px-5 py-10 mx-auto text-black text-2xl w-1/2'>
              <div>You have earned the daily limit, please come back tomorrow, 
                or subscribe to any of the Premium plans to remove limits</div>
          </div>
          
        )}
    </div>
  );
};

export default QuoteCard;
