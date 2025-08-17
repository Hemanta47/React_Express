export default function About() {
    return (
        <div className="min-h-screen w-full flex flex-col items-center px-6 py-12 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white">
            <div className="max-w-4xl text-center space-y-12">
                {/* Title */}
                <h1 className="text-5xl font-bold text-blue-400">About Connecto</h1>
                <p className="text-lg leading-relaxed text-gray-300">
                    Connecto is more than just a platform — it’s a community.
                    Built for people who want to <span className="font-semibold text-blue-300">collaborate, share, and grow</span>,
                    we bring individuals together to create opportunities, exchange ideas, and form real connections.
                </p>

                {/* Mission & Vision */}
                <div className="grid md:grid-cols-2 gap-8 mt-10">
                    <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition">
                        <h2 className="text-2xl font-semibold text-blue-400 mb-3">🌍 Our Mission</h2>
                        <p className="text-gray-300">
                            To create a trusted and open environment where people can discover opportunities,
                            collaborate effortlessly, and build meaningful relationships without barriers.
                        </p>
                    </div>
                    <div className="p-6 bg-gray-800 rounded-2xl shadow-lg hover:shadow-blue-500/30 transition">
                        <h2 className="text-2xl font-semibold text-blue-400 mb-3">🚀 Our Vision</h2>
                        <p className="text-gray-300">
                            To become the leading global hub for connectivity — where innovation,
                            diversity, and human interaction come together seamlessly.
                        </p>
                    </div>
                </div>

                {/* Core Values */}
                <div className="space-y-6 mt-12">
                    <h2 className="text-3xl font-bold text-blue-400">💡 Our Core Values</h2>
                    <ul className="grid md:grid-cols-3 gap-6 text-left">
                        <li className="p-5 bg-gray-800 rounded-xl shadow-md hover:shadow-blue-400/20 transition">
                            <h3 className="font-semibold text-xl text-white mb-2">Transparency</h3>
                            <p className="text-gray-400">We believe in open communication and building trust with every user.</p>
                        </li>
                        <li className="p-5 bg-gray-800 rounded-xl shadow-md hover:shadow-blue-400/20 transition">
                            <h3 className="font-semibold text-xl text-white mb-2">Community</h3>
                            <p className="text-gray-400">At our core, we thrive by creating a strong, supportive network of people.</p>
                        </li>
                        <li className="p-5 bg-gray-800 rounded-xl shadow-md hover:shadow-blue-400/20 transition">
                            <h3 className="font-semibold text-xl text-white mb-2">Innovation</h3>
                            <p className="text-gray-400">We constantly evolve and adapt to provide new ways for people to connect.</p>
                        </li>
                    </ul>
                </div>

                {/* Why Connecto */}
                <div className="mt-12 p-8 bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-bold text-white mb-4">✨ Why Choose Connecto?</h2>
                    <p className="text-lg text-white/90 leading-relaxed">
                        Unlike traditional platforms, Connecto is designed with <span className="font-semibold">simplicity and collaboration</span> in mind.
                        Whether you are an individual, a small team, or a large organization,
                        our tools and community help you grow together.
                    </p>
                </div>

                {/* Future Goals */}
                <div className="space-y-6 mt-12">
                    <h2 className="text-3xl font-bold text-blue-400">🌟 Our Future Goals</h2>
                    <p className="text-gray-300">
                        Connecto is just getting started. In the near future, we aim to introduce:
                    </p>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 text-left max-w-2xl mx-auto">
                        <li>Seamless video and chat features to enhance collaboration</li>
                        <li>Global networking events to connect like-minded individuals</li>
                        <li>AI-powered tools to recommend opportunities and communities</li>
                        <li>Mobile-first experience for on-the-go connectivity</li>
                    </ul>
                </div>

                {/* Closing */}
                <p className="mt-16 text-gray-400 italic text-lg">
                    “At Connecto, we don’t just connect people — <span className="text-blue-300">we connect possibilities.</span>”
                </p>
            </div>
        </div>
    );
}
