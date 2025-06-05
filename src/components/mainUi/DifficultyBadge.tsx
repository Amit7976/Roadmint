"use client";
import { DifficultyBadgeProps, DifficultyLevel } from "@/utils/types";
import React from "react";

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


const difficultyLabels: Record<DifficultyLevel, string> = {
    1: "Super Easy",
    2: "Easy",
    3: "Normal",
    4: "Hard",
    5: "Super Hard",
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const difficultyStyles: Record<DifficultyLevel, string> = {
    1: "text-green-500",
    2: "text-gray-500",
    3: "text-amber-500",
    4: "text-orange-500",
    5: "text-red-500",
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////

const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ level }) => {
    if (!difficultyLabels[level]) return null;

    return (
        <span
            className={`px-2 py-0.5 rounded text-xs font-semibold select-none ${difficultyStyles[level]}`}
        >
            {difficultyLabels[level]} Topic
        </span>
    );
};

export default DifficultyBadge;
