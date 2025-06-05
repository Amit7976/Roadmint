"use client";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { MarkCompleteNoteDialogProps } from "@/utils/types";


//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


const MarkCompleteNoteDialog = ({
    subject,
    topicIndex,
    onComplete,
    canMark,
    isMarked,
}: MarkCompleteNoteDialogProps) => {
    const [note, setNote] = useState("");

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleSave = () => {
        onComplete(subject, topicIndex, note);
        setNote("");
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    disabled={!canMark || isMarked}
                    className={`text-xs md:text-sm font-medium px-4 py-1.5 rounded-sm lg:rounded-lg transition-colors duration-150 ${isMarked
                        ? "bg-transparent cursor-not-allowed"
                        : canMark
                            ? "bg-green-800 border-2 border-green-500 hover:bg-green-700 text-green-200 cursor-pointer lg:px-10 lg:h-12 font-bold lg:font-medium transform active:scale-95 transition-transform duration-150 ease-in-out"
                            : "bg-gray-600 text-gray-300 cursor-not-allowed"
                        }`}
                >
                    {isMarked ? "Completed 🎉" : "Mark Complete"}
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-neutral-900 border-4 border-neutral-950">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-white text-xl mb-2">
                        Add a note (optional)
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-gray-400 text-base">
                        You can add a quick note, URL, or thought before marking this topic as complete.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <Input
                    placeholder="Add a note (Optional)"
                    className="my-3 text-white font-medium h-12 mb-5 border-2 border-neutral-700"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />

                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer px-8 h-11">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 cursor-pointer px-8 h-11"
                    >
                       Mark Complete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default MarkCompleteNoteDialog;
