import { useState, useEffect } from "react";

function DaySelector({ onDateChange }) {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [week, setWeek] = useState([]);

    useEffect(() => {
        setWeek(getWeekFromDate(selectedDate));
        onDateChange(formatLocalDate(selectedDate));
    }, [selectedDate]);

    function formatLocalDate(date) {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    }

    function getWeekFromDate(date) {
        const current = new Date(date);
        const day = current.getDay();
        const diff = (day === 0 ? -6 : 1 - day);
        const monday = new Date(current);
        monday.setDate(current.getDate() + diff);

        const week = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(monday);
            d.setDate(monday.getDate() + i);
            week.push(d);
        }
        return week;
    }

    const daysShort = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
        <div className="w-full py-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex gap-2 bg-white shadow-sm p-2 rounded-xl overflow-x-auto w-full md:w-auto justify-center">
                {week.map((day, i) => {
                    const isSelected = day.toDateString() === selectedDate.toDateString();
                    return (
                        <button
                            key={i}
                            onClick={() => setSelectedDate(day)}
                            className={`px-4 py-2 rounded-lg transition-all text-center min-w-[60px] ${
                                isSelected
                                    ? "bg-indigo-600 text-white shadow-md scale-105"
                                    : "hover:bg-gray-100 text-gray-600"
                            }`}
                        >
                            <span className="text-xs font-bold uppercase">{daysShort[i]}</span>
                            <br />
                            <span className="text-lg font-semibold">{day.getDate()}</span>
                        </button>
                    );
                })}
            </div>

            <input
                type="date"
                value={formatLocalDate(selectedDate)}
                className="border border-gray-300 p-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700"
                onChange={(e) => {
                    if (e.target.value) setSelectedDate(new Date(e.target.value));
                }}
            />
        </div>
    );
}

export default DaySelector;