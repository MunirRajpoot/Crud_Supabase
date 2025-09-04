import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Todo({ session }) {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingTitle, setEditingTitle] = useState("");

    useEffect(() => {
        fetchTodos();
    }, []);

    async function fetchTodos() {
        const { data, error } = await supabase
            .from("todos")
            .select("*")
            .eq("user_id", session.user.id)
            .order("inserted_at", { ascending: false });

        if (error) console.error(error);
        else setTodos(data);
    }

    async function addTodo() {
        if (!title.trim()) return;
        const { error } = await supabase.from("todos").insert([
            { title, user_id: session.user.id },
        ]);
        if (error) console.error(error);
        setTitle("");
        fetchTodos();
    }

    async function deleteTodo(id) {
        const { error } = await supabase.from("todos").delete().eq("id", id);
        if (error) console.error(error);
        fetchTodos();
    }

    async function updateTodo(id) {
        if (!editingTitle.trim()) return;
        const { error } = await supabase
            .from("todos")
            .update({ title: editingTitle })
            .eq("id", id);
        if (error) console.error(error);
        setEditingId(null);
        setEditingTitle("");
        fetchTodos();
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">My Todos</h2>

            {/* Add new todo */}
            <div className="flex gap-2 mb-4">
                <input
                    className="border p-2 rounded flex-1"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="New todo"
                />
                <button
                    onClick={addTodo}
                    className="bg-blue-500 text-white px-3 rounded hover:bg-blue-600"
                >
                    Add
                </button>
            </div>

            {/* Todo list */}
            <ul className="space-y-2">
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        className="flex justify-between items-center p-2 bg-gray-100 rounded"
                    >
                        {editingId === todo.id ? (
                            <input
                                className="border p-1 rounded flex-1 mr-2"
                                value={editingTitle}
                                onChange={(e) => setEditingTitle(e.target.value)}
                                autoFocus
                            />
                        ) : (
                            <span>{todo.title}</span>
                        )}

                        <div className="flex gap-2">
                            {editingId === todo.id ? (
                                <>
                                    <button
                                        onClick={() => updateTodo(todo.id)}
                                        className="text-green-600 hover:underline"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditingId(null)}
                                        className="text-gray-600 hover:underline"
                                    >
                                        Cancel
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            setEditingId(todo.id);
                                            setEditingTitle(todo.title);
                                        }}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteTodo(todo.id)}
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
