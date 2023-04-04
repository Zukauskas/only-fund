import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

function Register() {
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    const [psw, setPsw] = useState('');
    const [psw2, setPsw2] = useState('');
    const router = useRouter();

    const register = () => {
        if (name.length < 3) {
            setError('Bad name');
            return;
        }
        if (psw.length < 3) {
            setError('Bad password');
            return;
        }
        if (psw !== psw2) {
            setError('Passwords mismatch');
            return;
        }

        fetch('http://localhost:3001/api/register', {
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
                    setPsw2('');
                    setError(null);
                    router.push('/login');
                } else {
                    setError('Server error');
                }
            })
            .catch(error => {
                setError(error.response ? error.response.statusText : error.code);
            });
    };

    return (
        <div className='login bg-white rounded-lg shadow-md p-6'>
            <div>
                <div className='card-header'>
                    { error ? (
                        <span className='text-red-500 font-medium'>{ error }</span>
                    ) : (
                        <span className='font-medium'>Register</span>
                    ) }
                </div>
                <div className='login-container mt-4'>
                    <h5 className='card-title text-lg font-medium mb-4'>
                        <span>Hello, guest!</span>
                    </h5>
                    <div className='mb-4'>
                        <label
                            htmlFor='name'
                            className='block text-gray-700 font-medium mb-2'>
                            Name
                        </label>
                        <input
                            id='name'
                            type='text'
                            value={ name }
                            onChange={ e => setName(e.target.value) }
                            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='password'
                            className='block text-gray-700 font-medium mb-2'>
                            Password
                        </label>
                        <input
                            id='password'
                            type='password'
                            value={ psw }
                            onChange={ e => setPsw(e.target.value) }
                            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor='password2'
                            className='block text-gray-700 font-medium mb-2'>
                            Password Repeat
                        </label>
                        <input
                            id='password2'
                            type='password'
                            value={ psw2 }
                            onChange={ e => setPsw2(e.target.value) }
                            className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        />
                    </div>
                    <div id='add'>
                        <button
                            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                            onClick={ register }>
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
