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
        <div className="w-full flex flex-col xl:flex-row items-center justify-between gap-4">
            <div className="grid grid-cols-7 gap-1 w-full xl:w-auto xl:flex xl:gap-2 bg-white shadow-sm p-1.5 rounded-xl justify-center">
                {week.map((day, i) => {
                    const isSelected = day.toDateString() === selectedDate.toDateString();
                    return (
                        <button
                            key={i}
                            onClick={() => setSelectedDate(day)}
                            className={`flex flex-col items-center justify-center p-1 rounded-lg transition-all w-full xl:w-auto xl:px-4 xl:py-2 ${
                                isSelected
                                    ? "bg-indigo-600 text-white shadow-md scale-105"
                                    : "hover:bg-gray-100 text-gray-600"
                            }`}
                        >
                            <span className="text-[10px] sm:text-xs font-bold uppercase block opacity-80">
                                {daysShort[i]}
                            </span>
                            
                            <span className="text-sm sm:text-base xl:text-xl font-bold block leading-tight">
                                {day.getDate()}
                            </span>
                        </button>
                    );
                })}
            </div>

            <input
                type="date"
                value={formatLocalDate(selectedDate)}
                className="w-full xl:w-auto border border-gray-300 p-2.5 rounded-xl bg-white shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none text-gray-700 font-medium text-sm"
                onChange={(e) => {
                    if (e.target.value) setSelectedDate(new Date(e.target.value));
                }}
            />
        </div>
    );
}

export default DaySelector;