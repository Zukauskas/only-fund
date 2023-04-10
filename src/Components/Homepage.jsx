import { useContext } from 'react';
import { Global } from '../contexts/Global';
import Image from 'next/image';
import Link from 'next/link';

const Homepage = () => {
  const { stories } = useContext(Global);

  const imgURL = 'http://localhost:3000/img/';
  return (
    <>
      <h2
        id='stories'
        className='text-3xl font-bold text-green-700 text-center my-6'>
        Fund some Stories!
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4'>
        {stories &&
          [...stories]
            .filter(s => s.isConfirmed)
            .sort(
              (a, b) =>
                -(a.sumNeeded - a.sumDonated) + (b.sumNeeded - b.sumDonated),
            )
            .map(s => (
              <div
                key={s.id}
                className='bg-white shadow-lg overflow-hidden sm:rounded-lg'>
                <div className='w-full h-64 relative'>
                  <Image
                    src={`${
                      s.image ? imgURL + s.image : imgURL + 'unknown.png'
                    }`}
                    alt=''
                    height={300}
                    width={300}
                    className='w-full h-full object-cover'
                  />
                  <div className='absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-gray-900 via-transparent to-transparent'>
                    <p className='text-white font-semibold text-lg'>
                      {s.title}
                    </p>
                  </div>
                  <Link
                    href={`/stories/${s.id}`}
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline absolute top-0 right-0'>
                    Read More
                  </Link>
                </div>

                <div className='px-6 py-5 sm:p-6'>
                  <div className='flex items-center mb-4 relative'>
                    <div className='flex-1 mr-4'>
                      <div className='flex justify-between items-center mb-2'>
                        <p className='text-gray-500'>${s.sumDonated} raised</p>
                        <p className='text-gray-500'>
                          {Math.floor((s.sumDonated / s.sumNeeded) * 100)}% of $
                          {s.sumNeeded}
                        </p>
                      </div>
                      <div className='h-2 bg-gray-200 rounded-full '>
                        <div
                          className='h-full bg-green-500 rounded-full'
                          style={{
                            width: `${(s.sumDonated / s.sumNeeded) * 100}%`,
                          }}></div>
                      </div>
                    </div>
                  </div>

                  <div className='mt-4'>
                    <p className='text-gray-700 font-medium'>Donors:</p>
                    {JSON.parse(s.donorList).map((d, i) => (
                      <p key={i} className='text-gray-700'>
                        {d.name} {d.sum}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
      </div>
    </>
  );
};

export default Homepage;
