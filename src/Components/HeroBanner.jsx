import React from 'react';
import Link from 'next/link';

const HeroBanner = () => {
  return (
    <div
      className='bg-cover bg-center flex justify-center items-center pt-16 min-h-screen'
      style={{ backgroundImage: "url('https://source.unsplash.com/random')" }}>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-center'>
          <div className='text-center text-green-900 bg-white/75 px-12 py-12 rounded-lg'>
            <h1 className='text-4xl md:text-6xl font-bold'>
              Make a difference today
            </h1>
            <p className='mt-4 text-lg md:text-2xl'>
              Start a fundraising project to support your favorite cause.
            </p>
            <div className=' flex justify-center gap-4'>
              <Link
                href='/newProject'
                className='mt-12 px-6 py-2 text-lg font-semibold bg-green-500 hover:bg-green-600 rounded-lg block'>
                Start an OnlyFund
              </Link>
              <Link
                href='#stories'
                className='mt-12 px-6 py-2 text-lg font-semibold bg-blue-500 hover:bg-blue-600 rounded-lg block'>
                Go to Stories
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
