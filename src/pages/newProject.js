import { useContext, useState } from 'react';
import { Global } from '../contexts/Global';
import { useFile } from '../hooks/useFile';
import Nav from '@/Components/Nav';

const NewProject = () => {
    const { setProject } = useContext(Global);
    const [text, setText] = useState('');
    const [sumNeeded, setSumNeeded] = useState('');
    const [file, readFile, remImage] = useFile();

    const addTextHandler = e => {
        setText(e.target.value);
    };
    const donationHandler = e => {
        setSumNeeded(e.target.value);
    };

    const submitHandler = e => {
        e.preventDefault();
        setProject({ text, sumNeeded, file });
        setText('');
        setSumNeeded('');
        remImage();
    };

    return (
        <>
            <Nav />

            <div className='bg-gray-100 p-8 rounded-lg'>
                <h2 className='text-2xl font-bold mb-6'>Add New Projects</h2>
                <form onSubmit={ submitHandler } className='space-y-4'>
                    <div>
                        <label htmlFor='name' className='block text-sm font-medium'>
                            Enter project description:
                        </label>
                        <textarea
                            type='text'
                            id='name'
                            value={ text }
                            onChange={ addTextHandler }
                            placeholder='Project description'
                            title='Must contain at least 100 symbols'
                            required
                            className='w-full h-32 p-2 mt-1 border border-gray-300 rounded-lg'
                        />
                    </div>
                    <div>
                        <label htmlFor='donate-sum' className='block text-sm font-medium'>
                            Amount to donate:
                        </label>
                        <input
                            type='number'
                            id='donate-sum'
                            value={ sumNeeded }
                            placeholder='Enter sum needed'
                            title='Must contain at least one letter.'
                            onChange={ donationHandler }
                            required
                            className='w-full p-2 mt-1 border border-gray-300 rounded-lg'
                        />
                    </div>
                    <div>
                        <label htmlFor='file' className='block text-sm font-medium'>
                            File:
                        </label>
                        <input
                            type='file'
                            id='file'
                            onChange={ readFile }
                            required
                            className='block mt-1'
                        />
                    </div>
                    <button
                        className='add w-full py-2 px-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-white'
                        type='submit'>
                        Post story
                    </button>
                </form>
            </div>
        </>
    );
};

export default NewProject;