'use client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader, AlertDialogTitle,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { DeleteRoadmapButtonProps } from "@/utils/types";
import { useState } from 'react';
import { FaRegTrashCan } from "react-icons/fa6";

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////


function DeleteRoadmapButton({
    displayName,
    roadmaps,
    activeTab,
    setRoadmaps,
    setActiveTab,
    itemKey,
}: DeleteRoadmapButtonProps) {

    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [selectedKeyToDelete, setSelectedKeyToDelete] = useState<string | null>(null);
    const [verifyInput, setVerifyInput] = useState("");

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    const handleDelete = () => {
        if (!selectedKeyToDelete) return;
        if (verifyInput !== selectedKeyToDelete.replace("roadmap_", "")) return;

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        localStorage.removeItem(selectedKeyToDelete);
        const updated = roadmaps.filter(r => r.key !== selectedKeyToDelete);
        setRoadmaps(updated);

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        if (activeTab === selectedKeyToDelete) {
            setActiveTab(updated[0]?.key || null);
        }

        //////////////////////////////////////////////////////////////////////////////////////////////////////////

        setSelectedKeyToDelete(null);
        setVerifyInput("");
        setShowDeleteDialog(false);
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    return (
        <>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <div
                        className="flex gap-1 items-center bg-neutral-800 duration-300 hover:bg-red-500 px-6 py-2 rounded-sm cursor-pointer select-none"
                        onClick={() => {
                            setSelectedKeyToDelete(itemKey);
                            setVerifyInput("");
                            setShowDeleteDialog(true);
                        }}
                    >
                        <FaRegTrashCan className="text-white text-xl" />
                        <span className="text-white font-medium">Delete</span>
                    </div>
                </AlertDialogTrigger>
                {showDeleteDialog && selectedKeyToDelete === itemKey && (
                    <AlertDialogContent className="bg-neutral-900 border-4 border-neutral-950">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-white text-xl mb-2">Delete Roadmap?</AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-400 text-base">
                                To confirm deletion of <b>{displayName}</b>, please type: <br />
                                <i className="text-pink-400 font-medium">{displayName}</i>
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <Input
                            placeholder={`Type "${displayName}" here...`}
                            className="my-3 text-white font-medium h-12 mb-5 border-2 border-neutral-700"
                            value={verifyInput}
                            onChange={(e) => setVerifyInput(e.target.value)}
                        />

                        <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)} className="cursor-pointer px-8 h-10">
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                disabled={verifyInput !== displayName}
                                onClick={handleDelete}
                                className="bg-red-500 hover:bg-red-600 cursor-pointer px-8 h-10"
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                )}
            </AlertDialog>
        </>
    );
}

export default DeleteRoadmapButton