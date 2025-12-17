function TaskList({ tasks, onToggle, onDelete }) {
    if (!tasks || tasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center mt-10 text-gray-400">
                <p className="italic text-lg">No homework for today. Take it easy!</p>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-4 mt-4 items-center pb-10">
            {tasks.map((task, index) => (
                <div
                    key={index}
                    className={`w-full md:w-3/4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border-l-4 relative ${
                        task.state === "Done" ? "border-green-500 opacity-70" : "border-indigo-500"
                    }`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-xl font-bold ${task.state === "Done" ? "line-through text-gray-500" : "text-gray-800"}`}>
                            {task.title}
                        </h3>
                        <div className="flex gap-2 items-center">
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

                            <button 
                                onClick={() => onDelete(task.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition"
                                title="Delete Task"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {task.time && (
                        <div className="flex items-center text-gray-500 text-sm mb-2 font-mono">
                            <span className="mr-1">⏰</span>
                            {task.time.substring(0, 5)}
                        </div>
                    )}

                    {task.description && (
                        <p className="text-gray-600 mt-1 leading-relaxed border-t pt-2 border-gray-100">
                            {task.description}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default TaskList;