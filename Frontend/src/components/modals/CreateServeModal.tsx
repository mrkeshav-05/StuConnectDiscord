import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { createServerSchema } from "@/schema";
import UploadFile from "@/components/UploadFile";
import { useSelector } from 'react-redux';
import { selectFile } from '@/features/Upload/UploadSlice';
import { createServer } from '@/app/apiCalls'
import { selectUserProfile } from '@/features/profile/ProfileSlice';

const CreateServerModal = () => {
    const [isMounted, setIsMounted] = useState(false);
    const file = useSelector(selectFile);
    const profile = useSelector(selectUserProfile)

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(createServerSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmitForm = async (values: z.infer<typeof createServerSchema>) => {
        console.log("Form Submitted!");
        console.log("File: ", file);
        console.log("Form Data: ", values);
        if (file && profile?._id) {
            try {
                await createServer(values.name, file, profile._id);
                console.log("Server created successfully");
            } catch (error) {
                console.error("Error creating server:", error);
            }
        } else {
            console.error("File or profile ID is missing");
        }
    };

    if (!isMounted) {
        return null;
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Create Server</Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-black text-black dark:text-white p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-8">
                    <DialogTitle className="text-2xl text-center font-bold">
                        Customize your server
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-center text-zinc-500 dark:text-white px-4">
                    Give your server a personality with a name and image. You can always change it later.
                </DialogDescription>
                <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-8">
                    <div className="space-y-8 px-6 py-3">
                        <div className="flex items-center justify-center text-center">
                            <UploadFile
                                buttonType="dnd"
                            />
                        </div>
                        <div>
                            <label className="text-xs uppercase font-bold text-zinc-500 dark:text-white">
                                Server name
                            </label>
                            <Input
                                className="bg-zinc-300/50 dark:bg-zinc-700 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                                placeholder="Enter server name"
                                {...register('name')}
                            />
                            {errors.name && <span>{errors.name.message}</span>}
                        </div>
                    </div>
                    <DialogFooter className="bg-gray-100 dark:bg-black px-6 py-4">
                        <Button type="submit" variant="primary">
                            Create
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateServerModal;
