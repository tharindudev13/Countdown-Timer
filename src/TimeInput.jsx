import React, { useState, useEffect } from 'react';

const TimerInput = () => {
    const [targetDate, setTargetDate] = useState('');
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (!targetDate) return;

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const target = new Date(targetDate).getTime();

            const diff = target - now;
            if(diff > 0){
                const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeLeft({ days, hours, minutes, seconds });
            }else{
                clearInterval(interval);
                setIsFinished(true);
            }

        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700">
                <h1 className="text-3xl font-bold text-center mb-8 bg-linear-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                    Event Countdown
                </h1>

                {/* Input Section */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-slate-400 mb-2">
                        Pick your target date and time:
                    </label>
                    <input
                        type="datetime-local"
                        className="w-full p-3 rounded-lg bg-slate-700 border border-slate-600 focus:ring-2 focus:ring-blue-500 outline-none transition-all text-white"
                        onChange={(e) => {
                            setTargetDate(e.target.value);
                            setIsFinished(false);
                        }}
                    />
                </div>

                {/* Timer Display */}
                {isFinished ? (
                    <div className="text-center animate-bounce">
                        <h2 className="text-4xl font-extrabold text-emerald-400">Time is up! 🎊</h2>
                    </div>
                ) : (
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <TimeUnit label="Days" value={timeLeft.days} />
                        <TimeUnit label="Hours" value={timeLeft.hours} />
                        <TimeUnit label="Mins" value={timeLeft.minutes} />
                        <TimeUnit label="Secs" value={timeLeft.seconds} />
                    </div>
                )}
            </div>
        </div>
    );
};

// Sub-component for individual time slots
const TimeUnit = ({ label, value }) => (
    <div className="flex flex-col bg-slate-700/50 p-3 rounded-xl border border-slate-600">
    <span className="text-3xl font-mono font-bold text-blue-400">
      {String(value).padStart(2, '0')}
    </span>
        <span className="text-xs uppercase tracking-widest text-slate-400 mt-1">{label}</span>
    </div>
);

export default TimerInput;