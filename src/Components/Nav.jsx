import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AuthContext } from '@/contexts/AuthContext';

function Nav() {
  const { authName, logOut, authRole } = useContext(AuthContext);
  const router = useRouter();

  return (
    <nav className='bg-white shadow fixed top-0 z-50 w-full'>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between py-4'>
          <div className='text-green-600 font-semibold text-xl tracking-tight'>
            <h1>OnlyFund</h1>
          </div>
          <div className='hidden md:flex items-center space-x-4'>
            <Link
              href='/'
              className={`${
                router.pathname === '/'
                  ? 'text-green-600 font-bold'
                  : 'text-gray-700 hover:text-green-600 transition-colors'
              }`}>
              Home
            </Link>
            {authRole && (
              <Link
                href='/newProject'
                className={`${
                  router.pathname === '/newProject'
                    ? 'text-green-600 font-bold'
                    : 'text-gray-700 hover:text-green-600 transition-colors'
                }`}>
                Start an OnlyFund
              </Link>
            )}
            {authRole === 2 ? (
              <Link
                href='/dashboard'
                className={`${
                  router.pathname === '/dashboard'
                    ? 'text-green-600 font-bold'
                    : 'text-gray-700 hover:text-green-600 transition-colors'
                }`}>
                Dashboard
              </Link>
            ) : null}
            <div className='border border-gray-300 rounded p-2 bg-white shadow-md'>
              {authName ? (
                <>
                  <span className='text-gray-700 mr-4'>{authName}</span>
                  <span
                    onClick={logOut}
                    className='text-green-600 hover:text-green-700 cursor-pointer transition-colors'>
                    Logout
                  </span>
                </>
              ) : (
                <>
                  <Link
                    href='/login'
                    className='text-green-600 hover:text-green-700 transition-colors'>
                    Login
                  </Link>
                  <span className='mx-2'>|</span>
                  <Link
                    href='/register'
                    className='text-green-600 hover:text-green-700 transition-colors'>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
