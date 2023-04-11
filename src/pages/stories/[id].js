import { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Nav from '@/Components/Nav';
import { Global } from '@/contexts/Global';

const StoryPage = ({ story }) => {
  const [enteredData, setEnteredData] = useState({
    id: null,
    amount: '',
    name: '',
  });

  const [donorName, setDonorName] = useState('');
  const [donation, setDonation] = useState('');

  const { stories, setTransfers } = useContext(Global);

  const { id } = story;
  const storyId = stories ? stories.filter(s => s.id === id)[0] : null;

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

  const imgURL = 'http://localhost:3000/img/';
  const progress = stories
    ? (storyId.sumDonated / storyId.sumNeeded) * 100
    : null;

  return (
    <>
      <Nav />
      <div className='bg-gray-100 py-10 pt-24'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6'>
          <Link href='/' passHref>
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>
              Back to Home
            </button>
          </Link>
        </div>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-white rounded-lg shadow-md p-6'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              <div>
                <Image
                  src={story.image ? imgURL + story.image : '/unknown.png'}
                  alt={story.title}
                  width={640}
                  height={360}
                  className='rounded-md object-cover w-full h-64'
                />
                {storyId.sumNeeded - storyId.sumDonated > 0 ? (
                  <form onSubmit={submitHandler} className='space-y-4 mt-6'>
                    <div>
                      <label
                        htmlFor={story.id}
                        className='block text-gray-700 font-medium mb-2'>
                        Enter your name:
                      </label>
                      <input
                        type='text'
                        name=''
                        id={story.id}
                        value={
                          +story.id === +enteredData.id ? enteredData.name : ''
                        }
                        onChange={nameHandler}
                        className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor={story.id}
                        className='block text-gray-700 font-medium mb-2'>
                        Choose amount to donate:
                      </label>
                      <input
                        type='number'
                        min='0'
                        name=''
                        id={story.id}
                        value={
                          +story.id === +enteredData.id
                            ? enteredData.amount
                            : ''
                        }
                        onChange={amountHandler}
                        className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      />
                    </div>
                    <div className='text-right'>
                      <button
                        type='submit'
                        id={story.id}
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
                        Donate!
                      </button>
                    </div>
                  </form>
                ) : (
                  <p className='text-lg text-green-700 font-bold bg-green-200 text-center p-3 mt-6 rounded-lg'>
                    This story is completed
                  </p>
                )}
              </div>
              <div>
                <h1 className='text-3xl font-semibold mb-4'>{story.title}</h1>
                <div className='max-h-80 overflow-y-auto mb-4'>
                  <p className='text-gray-700'>{story.text}</p>
                </div>
                <div className='mb-4'>
                  <div className='h-4 bg-gray-200 rounded-full'>
                    <div
                      className='h-full bg-green-500 rounded-full'
                      style={{
                        width: `${progress < 100 ? progress : '100'}%`,
                      }}></div>
                  </div>
                  <p className='text-gray-500 mt-2'>
                    ${storyId.sumDonated} Donated of ${storyId.sumNeeded} goal
                  </p>
                </div>
                {storyId.donorList && storyId.donorList.length > 0 && (
                  <div>
                    <h3 className='text-lg font-semibold mb-2'>Donors:</h3>
                    <div className='max-h-32 overflow-y-auto'>
                      <ul>
                        {JSON.parse(storyId.donorList).map((donor, index) => (
                          <li key={index} className='text-gray-700'>
                            {donor.name} - ${donor.sum}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  // Fetch the story data based on the ID. Replace the URL with your API endpoint.
  const res = await fetch(`http://localhost:3000/api/stories/${id}`);
  const story = await res.json();

  // Ensure the donorList is parsed as an array
  story.donorList = JSON.parse(story.donorList);

  return {
    props: {
      story,
    },
  };
}

export default StoryPage;
