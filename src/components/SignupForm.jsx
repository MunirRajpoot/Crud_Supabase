import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function SignupForm({ setSession }) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: name } },
        });

        if (error) {
            alert(error.message);
        } else {
            setSession(data.session); // set session if available
            // alert("Check your email to confirm your account!");
        }
        setLoading(false);
    };

    return (
        <form
            onSubmit={handleSignUp}
            className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-xl w-96 mx-auto"
        >
            <h2 className="text-xl font-bold text-center">Sign Up</h2>

            <input
                className="border p-2 rounded"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

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
                className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
                disabled={loading}
            >
                {loading ? "Signing up..." : "Sign Up"}
            </button>
        </form>
    );
}
