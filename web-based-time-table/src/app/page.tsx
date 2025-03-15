'use client';
import { useState } from "react";


interface TimetableEntry {
  lecturer: string;
  subject: string;
  hall: string;
  selectedDays: string[];
  selectedTimes: string[];
}

const HALLS = [
  "Hall A", "Hall B", "Hall C",
  "Hall D", "Lecture Theatre 1", "Lecture Theatre 2"
];

const DAYS = [
  "Monday", "Tuesday", "Wednesday",
  "Thursday", "Friday"
];

const TIMES = [
  "08:00 - 09:00", "09:00 - 10:00",
  "10:00 - 11:00", "11:00 - 12:00",
  "13:00 - 14:00", "14:00 - 15:00",
  "15:00 - 16:00"
];

export default function Home() {
  const [entries, setEntries] = useState<TimetableEntry[]>([]);
  const [form, setForm] = useState<TimetableEntry>({
    lecturer: "",
    subject: "",
    hall: "",
    selectedDays: [],
    selectedTimes: []
  });

  const handleDayChange = (day: string) => {
    setForm(prev => ({
      ...prev,
      selectedDays: prev.selectedDays.includes(day)
        ? prev.selectedDays.filter(d => d !== day)
        : [...prev.selectedDays, day]
    }));
  };

  const handleTimeChange = (time: string) => {
    setForm(prev => ({
      ...prev,
      selectedTimes: prev.selectedTimes.includes(time)
        ? prev.selectedTimes.filter(t => t !== time)
        : [...prev.selectedTimes, time]
    }));
  };

  const addEntry = () => {
    if (!form.lecturer || !form.subject || !form.hall || !form.selectedDays.length || !form.selectedTimes.length) {
      alert("Please fill in all fields and select at least one day and time");
      return;
    }
    setEntries([...entries, form]);
    setForm({ lecturer: "", subject: "", hall: "", selectedDays: [], selectedTimes: [] });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Ambrose Alli University Web-based Timetable
        </h1>
        
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">Lecturer</label>
              <input
                type="text"
                className="p-2 border rounded"
                value={form.lecturer}
                onChange={(e) => setForm({ ...form, lecturer: e.target.value })}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                className="p-2 border rounded"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 text-sm font-medium text-gray-700">Hall</label>
              <select
                className="p-2 border rounded"
                value={form.hall}
                onChange={(e) => setForm({ ...form, hall: e.target.value })}
              >
                <option value="">Select Hall</option>
                {HALLS.map(hall => (
                  <option key={hall} value={hall}>{hall}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Select Days</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {DAYS.map(day => (
                <label key={day} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.selectedDays.includes(day)}
                    onChange={() => handleDayChange(day)}
                    className="rounded text-blue-600"
                  />
                  <span>{day}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Select Times</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {TIMES.map(time => (
                <label key={time} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.selectedTimes.includes(time)}
                    onChange={() => handleTimeChange(time)}
                    className="rounded text-blue-600"
                  />
                  <span>{time}</span>
                </label>
              ))}
            </div>
          </div>

          <button 
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            onClick={addEntry}
          >
            Add Entry
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Lecturer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hall</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Times</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{entry.lecturer}</td>
                  <td className="px-6 py-4">{entry.subject}</td>
                  <td className="px-6 py-4">{entry.hall}</td>
                  <td className="px-6 py-4">{entry.selectedDays.join(", ")}</td>
                  <td className="px-6 py-4">{entry.selectedTimes.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 text-center">
          <button
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200"
            onClick={() => window.print()}
          >
            Print Timetable
          </button>
        </div>
      </div>
    </div>
  );
}