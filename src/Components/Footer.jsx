import Link from 'next/link';

const Footer = () => {
  return (
    <footer className='bg-gray-800 text-white py-6'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-wrap items-center justify-between'>
          <div className='text-center w-full md:w-auto mb-4 md:mb-0'>
            Made with{' '}
            <Link
              href='https://nextjs.org'
              className='text-blue-400 hover:text-blue-500'
              target='_blank'
              rel='noopener noreferrer'>
              Next.js
            </Link>
          </div>
          <div className='text-center w-full md:w-auto'>
            <Link
              href='https://github.com/Zukauskas'
              className='text-blue-400 hover:text-blue-500'
              target='_blank'
              rel='noopener noreferrer'>
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
