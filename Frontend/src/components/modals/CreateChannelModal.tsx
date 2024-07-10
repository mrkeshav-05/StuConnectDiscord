import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { createChannelSchema } from "@/schema";
import { useSelector } from 'react-redux';
import { selectUserProfile } from '@/features/profile/ProfileSlice';
import { displayError } from '@/lib/utils';
import { createChannel } from "@/app/apiCalls";
import { useParams } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";

const CreateChannelModal = () => {
    const profile = useSelector(selectUserProfile);
    const params = useParams();

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        resolver: zodResolver(createChannelSchema),
        defaultValues: {
            channelName: "",
            channelType: "TEXT"
        },
    });

    const onSubmit = async (values: z.infer<typeof createChannelSchema>) => {
        if (profile?._id) {
            try {
                if (params.id) {
                    const response = await createChannel(values.channelName, values.channelType, profile._id, params.id);
                    console.log(response);
                }
            } catch (error) {
                displayError("Error creating channel");
                console.error("Error creating channel:", error);
            }
        } else {
            console.error("Profile ID is missing");
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="flex m-0 items-center">
                    Create Channel
                    <PlusCircle className='h-4 w-4 ml-[92px]' />
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white dark:bg-black text-black dark:text-white p-0 overflow-hidden">
                <DialogTitle className="text-2xl mt-6 text-center font-bold">
                    Create Channel
                </DialogTitle>
                <DialogDescription className="text-center text-zinc-500 dark:text-white px-4">
                    Create TEXT, AUDIO, and VIDEO channels for the server.
                </DialogDescription>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-8 px-6 py-3">
                        <div>
                            <label className="text-xs uppercase font-bold text-zinc-500 dark:text-white">
                                Channel Name
                            </label>
                            <Input
                                className="bg-zinc-300/50 dark:bg-zinc-700 border-0 focus-visible:ring-0 text-white focus-visible:ring-offset-0"
                                placeholder="Enter channel name"
                                {...register('channelName')}
                            />
                            {errors.channelName && <span>{errors.channelName.message}</span>}
                        </div>
                        <div>
                            <label className="text-xs uppercase font-bold text-zinc-500 dark:text-white">
                                Channel Type
                            </label>
                            <Select
                                value={watch("channelType")}
                                onValueChange={(value) => setValue("channelType", value)}
                            >
                                <SelectTrigger className="bg-zinc-300/50 dark:bg-zinc-700 border-0 focus-visible:ring-0 text-white focus-visible:ring-offset-0">
                                    <SelectValue placeholder="Select a channel type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="TEXT">Text</SelectItem>
                                    <SelectItem value="AUDIO">Audio</SelectItem>
                                    <SelectItem value="VIDEO">Video</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.channelType && <span>{errors.channelType.message}</span>}
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

export default CreateChannelModal;
