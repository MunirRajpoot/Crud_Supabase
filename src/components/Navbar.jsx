import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.reload();    //Refresh session
    }

    return (
        <nav className="bg-gray-800 text-white px-6 py-3 flex justify-between items-center">
            <h1 className="font-bold text-lg">Supabase CRUD</h1>
            <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
                Logout
            </button>
        </nav>
    )
}