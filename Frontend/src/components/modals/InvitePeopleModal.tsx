import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";


interface ServerModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddServerModal = ({ isOpen, onClose }: ServerModalProps) => {

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white dark:bg-black text-black dark:text-white p-0 overflow-hidden">
                    <DialogHeader className=''>
                        <DialogTitle className="text-2xl mt-6 text-center font-bold">
                            Invite Friends
                        </DialogTitle>

                    </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default AddServerModal;
