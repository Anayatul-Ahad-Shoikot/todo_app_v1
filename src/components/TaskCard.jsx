import { Trash, Circle, CircleCheckBig, SquarePen } from "lucide-react";

const TaskCard = ({ title, details, isDone }) => {

    return (
        <div className="max-w-[850px] w-full flex gap-4 justify-between items-center p-7.5 text-white">
            <div className="cursor-pointer">
                {isDone ? (
                    <CircleCheckBig color="green" strokeWidth={3.5} />
                ) : (
                    <Circle strokeWidth={3.5} />
                )}
            </div>
            <div className="flex flex-col gap-1 items-start justify-start w-full">
                <h2
                    className={`text-2xl font-mono font-semibold tracking-tight capitalize leading-[120%] ${isDone ? "line-through text-white/30" : ""}`}>
                    {title}
                </h2>
                <p
                    className={`text-sm font-mono font-light tracking-tight leading-[120%] ${isDone ? "line-through text-white/30" : ""}`}>
                    {details}
                </p>
            </div>
            <div className="flex gap-4 items-center">
                <div className="bg-white/10 p-2.5 rounded-full flex items-center justify-center hover:bg-white/15 transition-all duration-300 cursor-pointer">
                    <SquarePen color="white" strokeWidth={1.5} />
                </div>
                <div className="bg-white/10 p-2.5 rounded-full flex items-center justify-center hover:bg-white/15 transition-all duration-300 cursor-pointer">
                    <Trash color="#EA7B7B" strokeWidth={1.5} />
                </div>
            </div>
        </div>
    );
};

export default TaskCard;
