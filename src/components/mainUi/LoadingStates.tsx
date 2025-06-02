"use client";
import React, { useState } from "react";
import { IconSquareRoundedX } from "@tabler/icons-react";

 function LoadingStates() {
    const [loading, setLoading] = useState(false);
    return (
        <div className="w-full h-[60vh] flex items-center justify-center">
            {/* Core Loader Modal */}
           

            {loading && (
                <button
                    type="button"
                    className="fixed top-4 right-4 text-black dark:text-white z-[120]"
                    onClick={() => setLoading(false)}
                >
                    <IconSquareRoundedX className="h-10 w-10" /> Open
                </button>
            )}
        </div>
    );
}
export default LoadingStates;