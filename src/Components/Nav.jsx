import { useContext } from 'react';
import { Global } from '../contexts/Global';
import Link from 'next/link';

function Nav() {
  const { authName, logOut, authRole } = useContext(Global);

  return (
    <nav className='flex items-center justify-between flex-wrap bg-blue-500 p-6'>
      <div className='flex items-center flex-shrink-0 text-white mr-6'>
        <h1 className='font-semibold text-xl tracking-tight'>Only Fund</h1>
      </div>
      <div className='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
        <div className='text-sm lg:flex-grow'>
          <Link
            href='/'
            className='block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4'>
            Home
          </Link>
          {authRole && (
            <Link
              href='/newProject'
              className='block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4'>
              New Project
            </Link>
          )}
          {authRole === 2 ? (
            <Link
              href='/dashboard'
              className='block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-300 mr-4'>
              Admin Dashboard
            </Link>
          ) : null}
        </div>
        <div>
          {authName ? (
            <>
              <span className='inline-block py-2 px-4 text-white font-semibold mr-2'>
                {authName}
              </span>
              <span
                onClick={logOut}
                className='inline-block py-2 px-4 text-white font-semibold hover:text-gray-300 cursor-pointer'>
                Logout
              </span>
            </>
          ) : (
            <>
              <Link
                href='/login'
                className='inline-block py-2 px-4 text-white font-semibold hover:text-gray-300 mr-2'>
                Login
              </Link>
              <Link
                href='/register'
                className='inline-block py-2 px-4 text-white font-semibold hover:text-gray-300'>
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
