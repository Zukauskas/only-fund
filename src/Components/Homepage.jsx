import { useContext, useEffect, useState } from 'react';
import { Global } from '../contexts/Global';
import Image from 'next/image';

const Homepage = () => {
  const [enteredData, setEnteredData] = useState({
    id: null,
    amount: '',
    name: '',
  });

  const [donorName, setDonorName] = useState('');
  const [donation, setDonation] = useState('');

  const { stories, setTransfers } = useContext(Global);

  const submitHandler = e => {
    e.preventDefault();
    const buttonId = [...e.target].at(-1).id;
    setTransfers({ id: buttonId, name: donorName, sum: donation });
    setDonorName('');
    setDonation('');
    setEnteredData({
      id: null,
      amount: '',
      name: '',
    });
  };

  const amountHandler = e => {
    setDonation(e.target.value);
    setEnteredData(p => ({
      ...p,
      id: e.target.id,
      amount: Math.abs(e.target.value),
    }));
  };
  const nameHandler = e => {
    setDonorName(e.target.value);
    setEnteredData(p => ({ ...p, id: e.target.id, name: e.target.value }));
  };

  const imgURL = 'http://localhost:3001/img/';
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
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
              className='bg-white shadow overflow-hidden sm:rounded-lg'>
              <Image
                src={`${s.image ? imgURL + s.image : imgURL + 'unknown.png'}`}
                alt=''
                height={300}
                width={300}
                className='w-full h-64 object-cover'
              />

              <div className='px-4 py-5 sm:p-6'>
                <p className='text-gray-900 font-medium mb-2'>{s.text}</p>
                <div className='flex items-center mb-4 relative'>
                  <div className='flex-1 mr-4'>
                    <p className='text-right text-gray-700 mb-1'>
                      ${s.sumNeeded}
                    </p>
                    <div className='h-8 bg-gray-200 rounded-full '>
                      <div
                        className='h-full bg-green-500 rounded-full'
                        style={{
                          width: `${(s.sumDonated / s.sumNeeded) * 100}%`,
                        }}></div>
                    </div>
                    <p className='text-left text-gray-500 absolute left-0 top-1/2 translate-y-1/3 leading-none'>
                      ${s.sumDonated} Donated
                    </p>
                  </div>
                </div>
                {s.sumNeeded - s.sumDonated > 0 ? (
                  <form onSubmit={submitHandler}>
                    <div className='mb-4'>
                      <label
                        htmlFor={s.id}
                        className='block text-gray-700 font-medium mb-2'>
                        Enter your name:
                      </label>
                      <input
                        type='text'
                        name=''
                        id={s.id}
                        value={
                          +s.id === +enteredData.id ? enteredData.name : ''
                        }
                        onChange={nameHandler}
                        className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      />
                    </div>
                    <div className='mb-4'>
                      <label
                        htmlFor={s.id}
                        className='block text-gray-700 font-medium mb-2'>
                        Choose amount to donate:
                      </label>
                      <input
                        type='number'
                        min='0'
                        name=''
                        id={s.id}
                        value={
                          +s.id === +enteredData.id ? enteredData.amount : ''
                        }
                        onChange={amountHandler}
                        className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                      />
                    </div>
                    <div className='text-right'>
                      <button
                        type='submit'
                        id={s.id}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
                        Donate!
                      </button>
                    </div>
                  </form>
                ) : (
                  <p className='text-gray-700'>This story is completed</p>
                )}
                <div>
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
  );
};

export default Homepage;
