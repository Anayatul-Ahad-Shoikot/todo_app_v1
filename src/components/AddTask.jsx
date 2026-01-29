import { useState } from "react";

const AddTask = ({ update, error, loading, tasks }) => {
    const [data, setData] = useState({ title: "", details: "", isDone: false });
    const addTask = (e) => {
        e.preventDefault();
        const load = async () => {
            try {
                loading(true);
                const res = await fetch("http://localhost:7000/tasks", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });
                if (!res.ok) {
                    throw new Error(
                        `Faild to upload Task. Status: ${res.status}`,
                    );
                }
                const newTask = await res.json();
                update([...(tasks || []), newTask]);
                setData({ ...data, title: "", details: "", isDone: false });
                loading(false);
            } catch (e) {
                loading(true);
                error(e.message);
                loading(false);
            }
        };
        load();
    };

    return (
        <div className="w-full max-w-[850px]">
            <form
                className="flex gap-4 items-stretch justify-between w-full p-6 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-xl border border-white/10 rounded-2xl hover:border-cyan-500/20 transition-all duration-500"
                onSubmit={(e) => addTask(e)}>
                <div className="flex flex-col gap-4 items-center justify-between w-full">
                    <div className="relative w-full group">
                        <input
                            type="text"
                            placeholder="Task name..."
                            value={data.title}
                            onChange={(e) =>
                                setData({ ...data, title: e.target.value })
                            }
                            className="w-full outline-none py-4 px-5 rounded-xl bg-white/5 border border-white/10 text-lg text-white placeholder-white/30 tracking-wide focus:border-cyan-500/50 focus:bg-cyan-500/5 focus:shadow-lg focus:shadow-cyan-500/10 transition-all duration-300"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 -z-10 blur-xl transition-opacity duration-500"></div>
                    </div>
                    <div className="relative w-full group">
                        <textarea
                            rows={2}
                            placeholder="Describe your task..."
                            value={data.details}
                            onChange={(e) =>
                                setData({ ...data, details: e.target.value })
                            }
                            className="w-full outline-none py-4 px-5 rounded-xl bg-white/5 border border-white/10 text-base text-white placeholder-white/30 tracking-wide resize-none focus:border-cyan-500/50 focus:bg-cyan-500/5 focus:shadow-lg focus:shadow-cyan-500/10 transition-all duration-300"
                        />
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 -z-10 blur-xl transition-opacity duration-500"></div>
                    </div>
                </div>

                <button
                    className="px-8 rounded-xl cursor-pointer text-lg font-bold uppercase tracking-wider bg-gradient-to-br from-cyan-500 to-cyan-600 text-white border border-cyan-400/30 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none transition-all duration-300"
                    type="submit"
                    disabled={!data.title || !data.details}>
                    Add
                </button>
            </form>
        </div>
    );
};

export default AddTask;
