import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import { Global } from '../contexts/Global'
import { useFile } from '../hooks/useFile'
import Nav from '@/Components/Nav'
import withAuth from '@/Components/withAuth'

const NewProject = () => {
  const { setProject } = useContext(Global)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [sumNeeded, setSumNeeded] = useState('')
  const [file, readFile, remImage] = useFile()
  const router = useRouter()

  const addTitleHandler = e => {
    setTitle(e.target.value)
  }

  const addTextHandler = e => {
    setText(e.target.value)
  }
  const donationHandler = e => {
    setSumNeeded(e.target.value)
  }

  const submitHandler = e => {
    e.preventDefault()
    setProject({ title, text, sumNeeded, file })
    setTitle('')
    setText('')
    setSumNeeded('')
    remImage()
    router.push('/')
  }

  return (
    <>
      <Nav />

      <div className='w-full max-w-md mx-auto mt-10 pt-16'>
        <div className='bg-white p-8 rounded-lg shadow-md'>
          <h2 className='text-xl text-center font-bold mb-6'>Lets begin your funding journey</h2>
          <form onSubmit={submitHandler} className='space-y-4'>
            <div>
              <label
                htmlFor='title'
                className='block text-sm font-medium text-gray-700'
              >
                Title:
              </label>
              <input
                type='text'
                id='title'
                value={title}
                onChange={addTitleHandler}
                placeholder='Enter title'
                title='Must contain at least 5 symbols'
                required
                className='w-full p-2 mt-1 border border-gray-300 rounded-lg'
              />
            </div>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Description:
              </label>
              <textarea
                type='text'
                id='name'
                value={text}
                onChange={addTextHandler}
                placeholder='Enter description'
                title='Must contain at least 100 symbols'
                required
                className='w-full h-32 p-2 mt-1 border border-gray-300 rounded-lg'
              />
            </div>
            <div>
              <label
                htmlFor='donate-sum'
                className='block text-sm font-medium text-gray-700'
              >
                Amount needed:
              </label>
              <input
                type='number'
                id='donate-sum'
                value={sumNeeded}
                placeholder='Enter amount needed'
                title='Must contain at least one letter.'
                onChange={donationHandler}
                required
                className='w-full p-2 mt-1 border border-gray-300 rounded-lg'
              />
            </div>
            <div>
              <label
                htmlFor='file'
                className='block text-sm font-medium text-gray-700'
              >
                Upload image:
              </label>
              <input
                type='file'
                id='file'
                onChange={readFile}
                required
                className='block mt-1'
              />
            </div>
            <button
              className='add w-full py-2 px-4 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-white'
              type='submit'
            >
              Start your OnlyFund
            </button>
          </form>
        </div>
      </div>
    </>

  )
}

export default withAuth(NewProject)
