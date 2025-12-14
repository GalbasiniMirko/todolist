function TaskList({ tasks }) {
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
                    className={`w-full md:w-3/4 p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border-l-4 ${
                        task.state === "Done" ? "border-green-500 opacity-70" : "border-indigo-500"
                    }`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <h3 className={`text-xl font-bold ${task.state === "Done" ? "line-through text-gray-500" : "text-gray-800"}`}>
                            {task.title}
                        </h3>
                        <span
                            className={`px-2 py-1 rounded text-xs font-bold uppercase ${
                                task.state === "Done"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-indigo-100 text-indigo-700"
                            }`}
                        >
                            {task.state}
                        </span>
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