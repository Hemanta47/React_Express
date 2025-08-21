import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { useState } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function AdminDashboard() {
    const [timeframe, setTimeframe] = useState<"daily" | "weekly">("daily");

    // Fake user trend data
    const userData = {
        daily: [
            { day: "Mon", users: 120, questions: 45 },
            { day: "Tue", users: 150, questions: 55 },
            { day: "Wed", users: 90, questions: 40 },
            { day: "Thu", users: 180, questions: 70 },
            { day: "Fri", users: 200, questions: 80 },
            { day: "Sat", users: 220, questions: 95 },
            { day: "Sun", users: 170, questions: 65 },
        ],
        weekly: [
            { week: "Week 1", users: 1050, questions: 350 },
            { week: "Week 2", users: 1250, questions: 420 },
            { week: "Week 3", users: 980, questions: 310 },
            { week: "Week 4", users: 1450, questions: 500 },
        ],
    };

    const questions = [
        { topic: "React", solved: 120 },
        { topic: "Python", solved: 90 },
        { topic: "JavaScript", solved: 150 },
        { topic: "CSS", solved: 85 },
        { topic: "Java", solved: 60 },
    ];

    const users = [
        { name: "John Doe", email: "john@example.com", join: "2024-01-12" },
        { name: "Jane Smith", email: "jane@example.com", join: "2024-02-05" },
        { name: "Alice Brown", email: "alice@example.com", join: "2024-03-20" },
        { name: "Bob Johnson", email: "bob@example.com", join: "2024-04-10" },
        { name: "Charlie Green", email: "charlie@example.com", join: "2024-05-08" },
    ];

    const labels =
        timeframe === "daily"
            ? userData.daily.map((d) => d.day)
            : userData.weekly.map((w) => w.week);

    const data = {
        labels,
        datasets: [
            {
                label: "Users",
                data:
                    timeframe === "daily"
                        ? userData.daily.map((d) => d.users)
                        : userData.weekly.map((w) => w.users),
                borderColor: "rgba(14,113,158,0.8)",
                backgroundColor: "rgba(14,113,158,0.2)",
                fill: true,
                tension: 0.3,
            },
            {
                label: "Questions",
                data:
                    timeframe === "daily"
                        ? userData.daily.map((d) => d.questions)
                        : userData.weekly.map((w) => w.questions),
                borderColor: "rgba(34,197,94,0.8)",
                backgroundColor: "rgba(34,197,94,0.2)",
                fill: true,
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: "top" as const },
            title: { display: true, text: `User & Question Trends (${timeframe})` },
        },
        scales: { y: { beginAtZero: true } },
    };


    return (
        <div className="h-full w-full grid grid-rows-[auto_1fr] gap-4">
            {/* Top: Cards + Chart */}
            <div className="grid grid-cols-12 gap-4">
                {/* tb1 - Question Solve Count */}
                <div className="col-span-3 bg-white p-5 border border-gray-300">
                    <h2 className="text-lg font-semibold text-gray-700 mb-3">
                        Question Solve Count
                    </h2>
                    <table className="w-full text-sm border-collapse">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="px-4 py-3 text-left">S.N</th>
                                <th className="px-4 py-3 text-left">Topic</th>
                                <th className="px-4 py-3 text-left">Solved</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((q, i) => (
                                <tr
                                    key={i}
                                    className="odd:bg-gray-50 hover:bg-gray-100 transition"
                                >
                                    <td className="px-4 py-3">{i + 1}</td>
                                    <td className="px-4 py-3">{q.topic}</td>
                                    <td className="px-4 py-3">{q.solved}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Right Column: Chart */}
                <div className="col-span-9 bg-white p-5 border border-gray-300 flex flex-col h-[32rem]">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold text-gray-700">
                            User & Question Trends
                        </h2>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setTimeframe("daily")}
                                className={`px-4 py-1 rounded-full text-sm font-medium transition ${timeframe === "daily"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                Daily
                            </button>
                            <button
                                onClick={() => setTimeframe("weekly")}
                                className={`px-4 py-1 rounded-full text-sm font-medium transition ${timeframe === "weekly"
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    }`}
                            >
                                Weekly
                            </button>
                        </div>
                    </div>
                    <div className="flex-1">
                        <Line data={data} options={options} />
                    </div>
                </div>
            </div>

            {/* Bottom: Tables */}
            <div className="grid grid-cols-12 gap-6">
                {/* Left Column: Cards */}
                <div className="col-span-3 space-y-6">
                    <div className="bg-white p-5 border border-gray-300">
                        <h3 className="text-gray-500 text-sm">Users</h3>
                        <p className="text-3xl font-bold text-gray-800">10,000</p>
                        <p className="text-green-500 text-sm mt-1">+15% this month</p>
                    </div>
                    <div className="bg-white p-5 border border-gray-300">
                        <h3 className="text-gray-500 text-sm">Questions</h3>
                        <p className="text-3xl font-bold text-gray-800">100</p>
                        <p className="text-green-500 text-sm mt-1">+5% this week</p>
                    </div>
                </div>

                {/* tb2 - Recent Users */}
                <div className="col-span-9 bg-white p-5 border border-gray-300 overflow-y-auto">
                    <h2 className="text-lg font-semibold text-gray-700 mb-3">
                        Recent Users
                    </h2>
                    <table className="w-full text-sm border-collapse">
                        <thead className="bg-gray-100 text-gray-600 sticky top-0">
                            <tr>
                                <th className="px-4 py-3 text-left">S.N</th>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">Join Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u, i) => (
                                <tr
                                    key={i}
                                    className="odd:bg-gray-50 hover:bg-gray-100 transition"
                                >
                                    <td className="px-4 py-3">{i + 1}</td>
                                    <td className="px-4 py-3">{u.name}</td>
                                    <td className="px-4 py-3">{u.email}</td>
                                    <td className="px-4 py-3">{u.join}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}
