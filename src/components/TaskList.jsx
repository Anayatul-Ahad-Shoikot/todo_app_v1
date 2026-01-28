import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { Mosaic } from "react-loading-indicators";
import AddTask from "./AddTask";

const TaskList = () => {
    const [tasks, setTasks] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        const loadAllTask = async () => {
            try {
                setIsLoading(true);
                await delay(1000);
                const res = await fetch("http://localhost:7000/tasks");
                if (!res.ok) {
                    throw new Error(
                        `Faild to fetch data. Error: ${res.status}`,
                    );
                }
                const data = await res.json();
                setTasks(data);
                setIsLoading(false);
            } catch (e) {
                setIsLoading(true);
                setTimeout(() => {
                    console.log("just waiting");
                }, 1000);
                setError(e.message);
                setIsLoading(false);
            }
        };
        loadAllTask();
    }, []);

    const deleteAllTasks = async () => {
        try {
            setIsLoading(true);
            const res = await fetch("http://localhost:7000/tasks");
            if (!res.ok) {
                throw new Error(`Faild to fetch data. Error: ${res.status}`);
            }
            const data = await res.json();
            await data.map((i) => {
                fetch(`http://localhost:7000/tasks/${i.id}`, {
                    method: "DELETE",
                });
            });
            setTasks(null);
            setIsLoading(false);
        } catch (e) {
            setIsLoading(true);
            setError(`Failed to delete all tasks. Status: ${e.error}`);
            setIsLoading(false);
        }
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter((item) => item.id !== id));
    };

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 flex flex-col justify-start items-center max-w-4xl min-h-screen mx-auto px-6 py-16 text-white gap-12">

                <div className="text-center space-y-4">
                    <h1 className="text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg">
                        Todo App
                    </h1>
                    <p className="text-white/40 text-sm tracking-widest uppercase">
                        Version 1.0 — Stay Productive
                    </p>
                </div>

                <AddTask
                    update={setTasks}
                    error={setError}
                    loading={setIsLoading}
                    tasks={tasks}
                />


                {isLoading && (
                    <div className="w-full flex flex-col items-center justify-center gap-4 py-12">
                        <Mosaic
                            color="#22d3ee"
                            size="large"
                            text=""
                            textColor="#22d3ee"
                        />
                        <p className="text-cyan-400/70 text-sm tracking-wide animate-pulse">
                            Loading tasks...
                        </p>
                    </div>
                )}


                <div className="flex flex-col gap-4 w-full">

                    {tasks && tasks.length > 0 && (
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                                <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium tracking-wide">
                                    {tasks.length}{" "}
                                    {tasks.length === 1 ? "Task" : "Tasks"}
                                </span>
                                <span className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium tracking-wide">
                                    {tasks.filter((t) => t.isDone).length} Done
                                </span>
                            </div>
                        </div>
                    )}

                    {tasks && tasks.length > 0
                        ? tasks.map((item) => {
                            return (
                                <TaskCard
                                    key={item.id}
                                    title={item.title}
                                    details={item.details}
                                    isDone={item.isDone}
                                    id={item.id}
                                    removeItem={deleteTask}
                                    error={setError}
                                    loading={setIsLoading}
                                />
                            );
                        })
                        : !isLoading && (
                            <div className="flex flex-col items-center justify-center py-16 gap-4 border border-dashed border-white/10 rounded-2xl bg-white/5">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center">
                                    <span className="text-3xl">✨</span>
                                </div>
                                <p className="text-white/30 text-lg tracking-wide">
                                    No tasks yet
                                </p>
                                <p className="text-white/20 text-sm">
                                    Add your first task above!
                                </p>
                            </div>
                        )}

                    {tasks && tasks.length > 0 && (
                        <button
                            onClick={deleteAllTasks}
                            className="mt-4 self-center px-6 py-3 rounded-xl cursor-pointer text-sm font-medium uppercase tracking-widest bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20 active:scale-95 transition-all duration-300">
                            Clear All Tasks
                        </button>
                    )}

                    {error && (
                        <div className="flex items-center gap-4 p-5 border border-red-500/50 bg-red-500/10 rounded-xl backdrop-blur-sm">
                            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-red-400 text-lg">!</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-red-400 text-sm font-medium tracking-wide">
                                    Something went wrong
                                </p>
                                <p className="text-red-400/70 text-xs tracking-wide">
                                    {error}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskList;
