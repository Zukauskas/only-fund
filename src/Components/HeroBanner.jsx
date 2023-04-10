import React from 'react';
import Link from 'next/link';

const HeroBanner = () => {
  return (
    <div
      className='bg-cover bg-center h-96 relative'
      style={{ backgroundImage: "url('https://source.unsplash.com/random')" }}>
      <div className='container mx-auto px-4 h-full'>
        <div className='flex items-center justify-center h-full'>
          <div className='text-center text-white bg-blue-700/75 px-8 py-8 rounded-lg'>
            <h1 className='text-4xl md:text-6xl font-bold'>
              Make a difference today
            </h1>
            <p className='mt-4 text-lg md:text-2xl'>
              Start a fundraising project to support your favorite cause.
            </p>
            <Link
              href='/newProject'
              className='mt-12 px-6 py-2 text-lg font-semibold bg-green-500 hover:bg-green-600 rounded-lg block'>
              Start a Project
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
