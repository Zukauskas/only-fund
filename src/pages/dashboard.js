import { useContext } from 'react'
import { Global } from '../contexts/Global'
import Image from 'next/image'
import Link from 'next/link'
import Nav from '@/Components/Nav'
import withAuth from '@/Components/withAuth'

const Dashboard = () => {
  const imgURL = 'https://storage.googleapis.com/onlyfund-bucket/'

  const { stories, setDeleteStory, setConfirm } = useContext(Global)

  const deleteHandler = (id) => {
    setDeleteStory(stories.filter((s) => s.id === id)[0])
  }
  const confirmHandler = (id) => {
    setConfirm(stories.filter((s) => s.id === id)[0])
  }

  return (
    <>
      <Nav />
      <div className='container mx-auto mt-10 pt-16'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {stories &&
            [...stories]
              .sort(
                (a, b) =>
                  -(a.sumNeeded - a.sumDonated) + (b.sumNeeded - b.sumDonated)
              )
              .map((s) => (
                <div
                  key={s.id}
                  className='p-4 bg-white border-2 border-gray-200 shadow-md rounded-md'
                >
                  <Image
                    className='w-full h-48 mb-4 object-cover rounded-t-lg'
                    width={200}
                    height={200}
                    src={`${s.image ? imgURL + s.image : '/#'}`}
                    alt=''
                  />
                  <h2 className='mb-2 text-lg text-gray-900'>{s.title}</h2>
                  <p className='mb-4 text-sm text-gray-600'>{s.text}</p>
                  <div className='px-6 py-5 sm:p-6'>
                    <div className='flex items-center mb-4 relative'>
                      <div className='flex-1 mr-4'>
                        <div className='flex justify-between items-center mb-2'>
                          <p className='text-gray-500'>
                            ${s.sumDonated} raised
                          </p>
                          <p className='text-gray-500'>
                            {Math.floor((s.sumDonated / s.sumNeeded) * 100)}% of
                            ${s.sumNeeded}
                          </p>
                        </div>
                        <div className='h-2 bg-gray-200 rounded-full '>
                          <div
                            className='h-full bg-green-500 rounded-full'
                            style={{
                              width: `${
                                (s.sumDonated / s.sumNeeded) * 100 < 100
                                  ? (s.sumDonated / s.sumNeeded) * 100
                                  : 100
                              }%`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className='mt-4'>
                      <p className='text-gray-700 font-medium'>
                        Donors: {JSON.parse(s.donorList).length}
                      </p>
                    </div>
                  </div>
                  <div className='flex justify-between'>
                    {!s.isConfirmed
                      ? (
                        <button
                          onClick={() => confirmHandler(s.id)}
                          className='py-1 px-3 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-white'
                        >
                          Confirm
                        </button>
                        )
                      : (
                        <Link
                          href={`/stories/${s.id}`}
                          className='py-1 px-3 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white'
                        >
                          Go to story
                        </Link>
                        )}
                    <button
                      onClick={() => deleteHandler(s.id)}
                      className='py-1 px-3 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-white'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  )
}

export default withAuth(Dashboard)
