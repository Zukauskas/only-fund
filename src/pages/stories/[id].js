import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


const StoryPage = ({ story }) => {
    const imgURL = 'http://localhost:3000/img/';
    const progress = (story.sumDonated / story.sumNeeded) * 100;

    return (
        <div className="bg-gray-100 py-10">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
                <Link href="/" passHref>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Back to Home
                    </button>
                </Link>
            </div>
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div>
                            <Image
                                src={ story.image ? imgURL + story.image : '/unknown.png' }
                                alt={ story.title }
                                width={ 640 }
                                height={ 360 }
                                className="rounded-md object-cover w-full h-64"
                            />
                        </div>
                        <div>
                            <h1 className="text-3xl font-semibold mb-4">{ story.title }</h1>
                            <p className="text-gray-700 mb-4">{ story.text }</p>
                            <div className="mb-4">
                                <div className="h-4 bg-gray-200 rounded-full">
                                    <div
                                        className="h-full bg-green-500 rounded-full"
                                        style={ { width: `${progress}%` } }
                                    ></div>
                                </div>
                                <p className="text-gray-500 mt-2">
                                    ${ story.sumDonated } Donated of ${ story.sumNeeded } goal
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">Donors:</h3>
                                <ul>
                                    { story.donorList && story.donorList.map((donor, index) => (
                                        <li key={ index } className="text-gray-700">
                                            { donor.name } - ${ donor.sum }
                                        </li>
                                    )) }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
