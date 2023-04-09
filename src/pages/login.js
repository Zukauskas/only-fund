import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useRouter } from 'next/router';

function Login() {
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [psw, setPsw] = useState('');
    const router = useRouter();

    const { setLogged, setAuthName, setAuthRole } = useContext(AuthContext);

    // Login function for nextjs server

    const login = () => {
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, psw }),
        })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'ok') {
                    setName('');
                    setPsw('');
                    setError(null);
                    setLogged(true);
                    setAuthName(data.name);
                    setAuthRole(data.role);
                    router.push('/');
                } else {
                    setError(true);
                    router.push('/login');
                }
            });
    };

    return (
        <div className='login bg-gray-100 flex justify-center items-center h-screen'>
            <div className='bg-white rounded-lg shadow-lg p-8'>
                <div className='card-header'>
                    { error ? (
                        <span className='text-red-600'>Login error</span>
                    ) : (
                        <span>Login</span>
                    ) }
                </div>
                <div className='login-container mt-4'>
                    <h5 className='card-title mb-4'>
                        <span>Hello, guest!</span>
                    </h5>
                    <div className='mb-4'>
                        <label htmlFor='name' className='block mb-2 font-bold'>
                            Name
                        </label>
                        <input
                            id='name'
                            type='text'
                            value={ name }
                            onChange={ e => setName(e.target.value) }
                            className='w-full border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='password' className='block mb-2 font-bold'>
                            Password
                        </label>
                        <input
                            id='password'
                            type='password'
                            value={ psw }
                            onChange={ e => setPsw(e.target.value) }
                            className='w-full border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div className='flex justify-end'>
                        <button
                            className='add bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            onClick={ login }>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;