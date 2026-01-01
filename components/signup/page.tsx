import { useState } from "react";
import { useRouter } from "next/router";

const SignupPage = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // Fixing the event type to React.FormEvent<HTMLFormElement>
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const response = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullname,
        username,
        email,
        password,
      }),
    });

    const data = await response.json();

    setLoading(false);

    if (response.ok) {
      // Redirect to a different page after successful signup
      router.push("/dashboard"); // Change to your desired route
    } else {
      setError(data.error || "An error occurred, please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-800 to-indigo-800 bg-cover bg-fixed">
      <div className="p-8 bg-opacity-30 backdrop-blur-lg rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-3xl font-semibold text-white mb-6 text-center">Signup</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white">Full Name</label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full p-3 mt-1 bg-transparent border-2 border-white rounded-lg text-white placeholder-white focus:outline-none focus:border-indigo-500"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-white">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 mt-1 bg-transparent border-2 border-white rounded-lg text-white placeholder-white focus:outline-none focus:border-indigo-500"
              placeholder="Choose a username"
              required
            />
          </div>

          <div>
            <label className="block text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-1 bg-transparent border-2 border-white rounded-lg text-white placeholder-white focus:outline-none focus:border-indigo-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-white">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-1 bg-transparent border-2 border-white rounded-lg text-white placeholder-white focus:outline-none focus:border-indigo-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full p-3 bg-indigo-600 text-white rounded-lg mt-4 hover:bg-indigo-500 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
