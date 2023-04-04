import { useContext } from 'react';
import { Global } from '../contexts/Global';
import Image from 'next/image';
import Nav from '@/Components/Nav';
import withAuth from '@/Components/withAuth';


const Dashboard = () => {
    const imgURL = 'http://localhost:3001/img/';

    const { stories, setDeleteStory, setConfirm } = useContext(Global);

    const deleteHandler = id => {
        setDeleteStory(stories.filter(s => s.id === id)[0]);
    };
    const confirmHandler = id => {
        setConfirm(stories.filter(s => s.id === id)[0]);
    };

    return (
        <>
            <Nav />
            <div className='container mx-auto'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                    { stories &&
                        [...stories]
                            .sort(
                                (a, b) =>
                                    -(a.sumNeeded - a.sumDonated) + (b.sumNeeded - b.sumDonated),
                            )
                            .map(s => (
                                <div key={ s.id } className='p-4 border-2 border-black rounded-lg'>
                                    <Image
                                        className='w-48 h-48 mx-auto mb-4 object-cover'
                                        width={ 200 }
                                        height={ 200 }
                                        src={ `${s.image ? imgURL + s.image : 'unknown.png'}` }
                                        alt=''
                                    />
                                    <p className='mb-2'>{ s.text }</p>
                                    <p className='font-bold mb-4'>Sum needed: { s.sumNeeded }</p>
                                    <div className='flex justify-between'>
                                        { !s.isConfirmed && (
                                            <button
                                                onClick={ () => confirmHandler(s.id) }
                                                className='py-1 px-3 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-white'>
                                                Confirm
                                            </button>
                                        ) }
                                        <button
                                            onClick={ () => deleteHandler(s.id) }
                                            className='py-1 px-3 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-white'>
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )) }
                </div>
            </div>
        </>
    );
};

export default withAuth(Dashboard);