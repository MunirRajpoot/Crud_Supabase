import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function LoginForm({ setSession }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) alert(error.message);
        else setSession(data.session);

        setLoading(false);
    };

    return (
        <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-xl w-96 mx-auto mt-20"
        >
            <h2 className="text-xl font-bold text-center">Login</h2>

            <input
                className="border p-2 rounded"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                className="border p-2 rounded"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                type="submit"
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"}
            </button>
        </form>
    );
}
