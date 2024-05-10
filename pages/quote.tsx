import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { fetchStockData } from '../utils/api';
import QuoteCard from '../components/QuoteCard';

const QuotePage = () => {
  const router = useRouter();
  const { symbol } = router.query;
  const [ quoteData, setQuoteData ] = useState<any>(null);
  const [ error, setError ] = useState<string | null>(null);
  const [ loading, setLoading ] = useState(false);

  useEffect(() => {
    if (symbol) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const result = await fetchStockData(symbol as string);
          setQuoteData(result);
          console.log(result);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [symbol]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
      <Head>
        <title>Stock Quote for {symbol}</title>
        <meta name='description' content={`Stock quote details for ${symbol}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='flex flex-col items-center w-full flex-1 px-5  mobile:py-0 tablet:py-5 text-center'>
        <h1 className='font-bold mb-6 text-black mobile:text-xl
          laptop:text-2xl desktop:text-3xl'>Stock Quote for '{symbol}'</h1>
        <button className='mobile:text-xl laptop:text-2xl desktop:text-3xl 
          text-black absolute mobile:left-5 tablet:left-10 laptop/desktop:left-20' 
          onClick={() => router.push('/')}>Home</button>
        {loading && <p className='mt-4 text-blue-600'>Loading...</p>}
        {error && <p className='mt-4 text-red-600'>Error: {error}</p>}
        {quoteData && (
          quoteData['Global Quote']
            ? (
              <div className='mt-4 text-left bg-white mobile:p-0 tablet:p-4 rounded-md shadow-md w-full max-w-2xl text-black'>
                <QuoteCard quoteData={quoteData} />
              </div>
            ) : (
              <QuoteCard />
            )
        )}
      </main>
    </div>
  );
};

export default QuotePage;
