import { Trash, Circle, CircleCheckBig, SquarePen } from "lucide-react";
import { useState } from "react";

const TaskCard = ({ id, title, details, isDone }) => {
    const [isToggle, setIsToggle] = useState(isDone);
    const [data, setData] = useState({ title, details, isDone });
    const toggle = () => {
        const newStatus = !isToggle;
        setIsToggle(newStatus);
        setData({ ...data, isDone: newStatus });
        fetch(`http://localhost:7000/tasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isDone: newStatus }),
        });
    };

    const remove = () => {
        fetch(`http://localhost:7000/tasks/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
    };

    return (
        <div className="max-w-[850px] w-full flex gap-4 justify-between items-center p-7.5 text-white">
            <button className="cursor-pointer" onClick={toggle}>
                {isToggle ? (
                    <CircleCheckBig color="green" strokeWidth={3.5} />
                ) : (
                    <Circle strokeWidth={3.5} />
                )}
            </button>
            <div className="flex flex-col gap-1 items-start justify-start w-full">
                <h2
                    className={`text-2xl font-mono font-semibold tracking-tight capitalize leading-[120%] ${isToggle ? "line-through text-white/50" : ""}`}>
                    {title}
                </h2>
                <p
                    className={`text-sm font-mono font-light tracking-tight leading-[120%] ${isToggle ? "line-through text-white/50" : ""}`}>
                    {details}
                </p>
            </div>
            <div className="flex gap-4 items-center">
                <button className="bg-white/10 p-2.5 rounded-full flex items-center justify-center hover:bg-white/15 transition-all duration-300 cursor-pointer">
                    <SquarePen color="white" strokeWidth={1.5} />
                </button>
                <button
                    className="bg-white/10 p-2.5 rounded-full flex items-center justify-center hover:bg-white/15 transition-all duration-300 cursor-pointer"
                    onClick={remove}>
                    <Trash color="#EA7B7B" strokeWidth={1.5} />
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
