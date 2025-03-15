
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
interface TimetableEntry {
  lecturer: string;
  subject: string;
  hall: string;
  selectedDays: string[];
  selectedTimes: string[];
}

const PrintableLayout = ({ entries }: { entries: TimetableEntry[] }) => (
  <div className="print-only p-8">
    <div className="flex items-center justify-between mb-8">
      <img src="/your-logo.png" alt="Institution Logo" className="h-16" />
      <div className="text-right">
        <h1 className="text-2xl font-bold">Class Schedule</h1>
        <p className="text-sm text-gray-600">Generated on: {new Date().toLocaleDateString()}</p>
      </div>
    </div>

    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-3">Lecturer</th>
          <th className="border p-3">Subject</th>
          <th className="border p-3">Hall</th>
          <th className="border p-3">Days</th>
          <th className="border p-3">Times</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry, index) => (
          <tr key={index}>
            <td className="border p-3">{entry.lecturer}</td>
            <td className="border p-3">{entry.subject}</td>
            <td className="border p-3">{entry.hall}</td>
            <td className="border p-3">{entry.selectedDays.join(", ")}</td>
            <td className="border p-3">{entry.selectedTimes.join(", ")}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <div className="mt-8 text-sm text-gray-600 text-center">
      <p>Official Academic Timetable - For authorized use only</p>
    </div>
  </div>
);