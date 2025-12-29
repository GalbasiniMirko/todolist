import { useNavigate } from "react-router-dom";

function TaskList({ tasks, onToggle, onDelete }) {
    const navigate = useNavigate();

    if (!tasks || tasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center mt-10 text-gray-400">
                <p className="italic text-lg">No homework for today. Take it easy!</p>
            </div>
        );
    }

    const sortedTasks = [...tasks].sort((a, b) => {
        if (!a.time) return 1;
        if (!b.time) return -1;
        return a.time.localeCompare(b.time);
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 pb-20">
            {sortedTasks.map((task, index) => (
                <div
                    key={index}
                    className={`p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border-l-4 relative h-full flex flex-col justify-between ${
                        task.state === "Done" ? "border-green-500 opacity-70" : "border-indigo-500"
                    }`}
                >
                    <div>
                        <div className="flex items-start justify-between mb-2 gap-3">
                            <h3 className={`text-xl font-bold leading-tight max-h-24 overflow-y-auto custom-scrollbar break-all pr-1 ${task.state === "Done" ? "line-through text-gray-500" : "text-gray-800"}`}>
                                {task.title}
                            </h3>
                            
                            <div className="flex gap-1 shrink-0">
                                <button 
                                    onClick={() => navigate(`/edit/${task.id}`, { state: { task } })}
                                    className="text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-full transition"
                                    title="Edit Task"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                </button>

                                <button 
                                    onClick={() => onDelete(task.id)}
                                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-full transition"
                                    title="Delete Task"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {task.description && (
                            <div className="mb-3 w-full">
                                <p className="text-gray-600 text-sm leading-relaxed max-h-16 overflow-y-auto overflow-x-hidden break-all whitespace-pre-wrap pr-2 custom-scrollbar">
                                    {task.description}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                        
                        <div className="flex items-center text-gray-400 text-xs font-semibold uppercase tracking-wider">
                            {task.time && (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                    {task.time.substring(0, 5)}
                                </>
                            )}
                        </div>

                        <button
                            onClick={() => onToggle(task.id, task.state)}
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase transition-colors cursor-pointer border ${
                                task.state === "Done"
                                    ? "bg-green-100 text-green-700 border-green-200 hover:bg-green-200"
                                    : "bg-indigo-100 text-indigo-700 border-indigo-200 hover:bg-indigo-200"
                            }`}
                        >
                            {task.state === "Done" ? "Done" : "To do"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TaskList;