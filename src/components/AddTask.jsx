import { useState } from "react";

const AddTask = () => {
    const [ data, setData ] = useState({ title: "", details: "", isDone: false });
    const addTask = (e) => {
        e.preventDefault();
        const load = async () => {
            try {
                const res = await fetch('http://localhost:7000/tasks', {
                    method: "POST",
                    headers: { "contentType" : "application/json" },
                    body: JSON.stringify(data)
                })
                if(!res.ok) {
                    throw new Error(`Faild to upload Task. Status: ${res.status}`)
                }
                setData({...data, title: "", details: "", isDone: false})
            } catch (e) {
                console.log(e);
            }
        }
        load();
    }

    return (
        <div>
            <form
                className="flex gap-5 items-center justify-between w-full"
                onSubmit={(e) => addTask(e)}>
                <div className="flex flex-col gap-5 items-center justify-between w-full">
                    <input
                        type="text"
                        placeholder="Task Name..."
                        value={data.title}
                        onChange={(e) => setData({...data, title: e.target.value })}
                        className="outline-0 py-3 px-5 rounded-sm bg-white/20 text-lg text-white font-mono tracking-tight w-full"
                    />
                    <textarea
                        maxLength={45}
                        placeholder="More about task..."
                        value={data.details}
                        onChange={e => setData({...data, details: e.target.value})}
                        className="outline-0 py-3 px-5 rounded-sm bg-white/20 text-lg text-white font-mono tracking-tight w-full"
                    />
                </div>
                <button
                    className="bg-[#EA7B7B] px-15 h-full rounded-sm cursor-pointer text-2xl font-bold uppercase"
                    type="submit" disabled={ !data.title || !data.details }>
                    Add
                </button>
            </form>
        </div>
    );
};

export default AddTask;
