import Head from 'next/head';
import SearchQuote from '../components/SearchQuote';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4'>
      <Head>
        <title>Quote Search App</title>
        <meta name='description' content='Search for stock quotes' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className='flex flex-col items-center w-full flex-1 px-5 py-5 text-center'>
        <h1 className='text-4xl mobile:text-xl tablet:text-2xl laptop:text-3xl desktop:test-4xl font-bold mb-6 text-black'>Stock Quote Search</h1>
        <SearchQuote />
      </main>
    </div>
  );
};

export default Home;
