import { useEffect, useState } from "react";
import TaskCard from "./components/TaskCard";

const App = () => {
    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");

    const [tasks, setTasks] = useState(null);

    const addTask = (e) => {
        e.preventDefault();

        const data = { title, details, isDone: false };

        if (!title || !details) {
            return;
        }

        fetch("http://localhost:7000/tasks", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to add task");
                }
                return res.json();
            })
            .then((newTask) => {
                setTasks((prev) => [...prev, newTask]);
                setTitle("");
                setDetails("");
            })
            .catch((err) => alert(err.message));
    };

    useEffect(() => {
        fetch("http://localhost:7000/tasks")
            .then((res) => res.json())
            .then((data) => setTasks(data));
    }, []);

    return (
        <div className="flex flex-col justify-center items-start max-w-180 h-screen mx-auto text-white gap-10">
            <h1 className="text-6xl font-mono tracking-tighter font-bold">
                Todo App V.1.0
            </h1>
            <form
                className="flex gap-5 items-center justify-between w-full"
                onSubmit={addTask}>
                <div className="flex flex-col gap-5 items-center justify-between w-full">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task Name..."
                        className="outline-0 py-3 px-5 rounded-sm bg-white/20 text-lg text-white font-mono tracking-tight w-full"
                    />
                    <textarea
                        maxLength={45}
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="More about task..."
                        className="outline-0 py-3 px-5 rounded-sm bg-white/20 text-lg text-white font-mono tracking-tight w-full"
                    />
                </div>
                <button
                    className="bg-[#EA7B7B] px-15 h-full rounded-sm cursor-pointer text-2xl font-bold uppercase"
                    type="submit">
                    Add
                </button>
            </form>
            <div className="flex flex-col gap-2 w-full justify-start">
                {tasks &&
                    tasks.map((item) => {
                        return (
                            <TaskCard
                                key={item.id}
                                title={item.title}
                                details={item.details}
                                isDone={item.isDone}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default App;
