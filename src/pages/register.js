import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function Register() {
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [psw, setPsw] = useState("");
  const [psw2, setPsw2] = useState("");
  const router = useRouter();

  const register = () => {
    if (name.length < 3) {
      setError("Bad name");
      return;
    }
    if (psw.length < 3) {
      setError("Bad password");
      return;
    }
    if (psw !== psw2) {
      setError("Passwords mismatch");
      return;
    }

    fetch("https://only-fund.vercel.app/api/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, psw }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          setName("");
          setPsw("");
          setPsw2("");
          setError(null);
          router.push("/login");
        } else {
          setError("Server error");
        }
      })
      .catch((error) => {
        setError(error.response ? error.response.statusText : error.code);
      });
  };

  return (
    <div className="register bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center">
          {error ? (
            <span className="text-red-600 font-semibold text-lg">{error}</span>
          ) : (
            <span className="text-gray-900 font-semibold text-lg">
              Register
            </span>
          )}
        </div>
        <div className="register-container mt-4">
          <h5 className="text-center text-gray-700 font-medium">
            <span>Hello, guest!</span>
          </h5>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={psw}
              onChange={(e) => setPsw(e.target.value)}
              className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password2"
              className="block mb-2 font-medium text-gray-700"
            >
              Password Repeat
            </label>
            <input
              id="password2"
              type="password"
              value={psw2}
              onChange={(e) => setPsw2(e.target.value)}
              className="w-full border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onClick={register}
            >
              Register
            </button>
          </div>
          <div className="mt-4 text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              href="/login"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Login!
            </Link>
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
