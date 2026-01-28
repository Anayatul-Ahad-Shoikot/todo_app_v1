import { Trash, Circle, CircleCheckBig, SquarePen } from "lucide-react";
import { useState } from "react";

const TaskCard = ({
    id,
    title,
    details,
    isDone,
    removeItem,
    error,
    loading,
}) => {
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

    const remove = async () => {
        try {
            loading(true);
            const res = await fetch(`http://localhost:7000/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error(`Opps task not deleted. Status:${res.status}`);
            }
            removeItem(id);
            loading(false);
        } catch (e) {
            loading(true);
            error(e.message);
            loading(false);
        }
    };

    return (
        <div className="max-w-[850px] w-full flex gap-5 justify-between items-center p-5 text-white bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-500 group">
            <button
                className="cursor-pointer p-2 rounded-xl bg-white/5 hover:bg-cyan-500/20 transition-all duration-300"
                onClick={toggle}>
                {isToggle ? (
                    <CircleCheckBig
                        className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                        strokeWidth={2.5}
                        size={28}
                    />
                ) : (
                    <Circle
                        className="text-white/40 hover:text-cyan-400 transition-colors duration-300"
                        strokeWidth={2}
                        size={28}
                    />
                )}
            </button>

            <div className="flex flex-col gap-1.5 items-start justify-start w-full">
                <h2
                    className={`text-xl font-semibold tracking-wide leading-tight transition-all duration-300 ${
                        isToggle
                            ? "line-through text-white/30"
                            : "text-white group-hover:text-cyan-50"
                    }`}>
                    {title}
                </h2>
                <p
                    className={`text-sm tracking-wide leading-relaxed transition-all duration-300 ${
                        isToggle
                            ? "line-through text-white/20"
                            : "text-white/50 group-hover:text-white/70"
                    }`}>
                    {details}
                </p>
            </div>

            <div className="flex gap-3 items-center">
                <button className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300 cursor-pointer group/edit">
                    <SquarePen
                        className="text-white/60 group-hover/edit:text-purple-400 transition-colors duration-300"
                        strokeWidth={1.5}
                        size={20}
                    />
                </button>
                <button
                    className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-red-500/20 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/20 transition-all duration-300 cursor-pointer group/delete"
                    onClick={remove}>
                    <Trash
                        className="text-white/60 group-hover/delete:text-red-400 transition-colors duration-300"
                        strokeWidth={1.5}
                        size={20}
                    />
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
