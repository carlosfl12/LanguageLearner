import React from "react";
type Props = { xp: number; goal: number};

export default function XPProgressBar({ xp, goal }: Props) {
    const percentage = Math.min((xp / goal) * 100, 100);

    return (
        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
            className="bg-green-500 h-full transition-all"
            style={{ width: `${percentage}%`}}>

            </div>
        </div>
    )
}