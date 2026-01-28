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

    return (
        <div className="flex flex-col justify-center items-center max-w-180 h-screen mx-auto text-white gap-10">
            <h1 className="text-6xl font-mono tracking-tighter font-bold">
                Todo App V.1.0
            </h1>
            <AddTask />
            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <Mosaic
                        color="#ffffff"
                        size="large"
                        text="Loading..."
                        textColor="#ffffff"
                    />
                </div>
            )}
            <div className="flex flex-col gap-2 w-full justify-start">
                {tasks &&
                    tasks.map((item) => {
                        return (
                            <TaskCard
                                key={item.id}
                                title={item.title}
                                details={item.details}
                                isDone={item.isDone}
                                id={item.id}
                            />
                        );
                    })}
                {error && (
                    <div className="flex flex-col gap-5 items-center justify-center p-7.5 border-2 border-red-500 bg-red-500/20">
                        <p className="text-sm font-medium font-mono tracking-tighter">{error}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskList;
