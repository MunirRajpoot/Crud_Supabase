import Navbar from "../components/Navbar";
import Todo from "../components/Todo";

export default function Dashboard({ session }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Todo CRUD Section */}
            <div className="container mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">My Todos</h1>
                <Todo session={session} />
            </div>
        </div>
    )
}
