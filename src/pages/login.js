import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";

function Login() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [psw, setPsw] = useState("");
  const router = useRouter();

  const { setLogged, setAuthName, setAuthRole } = useContext(AuthContext);

  // Login function for nextjs server
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const login = () => {
    fetch(apiUrl + "api/login", {
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
          setError(null);
          setLogged(true);
          setAuthName(data.name);
          setAuthRole(data.role);
          router.push("/");
        } else {
          setError(true);
          router.push("/login");
        }
      });
  };

  return (
    <div className="login bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
        <div className="text-center">
          {error ? (
            <span className="text-red-600 font-semibold text-lg">
              Login error
            </span>
          ) : (
            <span className="text-gray-900 font-semibold text-lg">Login</span>
          )}
        </div>
        <div className="login-container mt-4">
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
          <div className="flex justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onClick={login}
            >
              Login
            </button>
          </div>
          <div className="mt-4 text-center">
            <span className="text-gray-600">Don&apos;t have an account? </span>
            <Link
              href="/register"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Register!
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

export default Login;
