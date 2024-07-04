import mongoose, { Document, Schema, Model, model } from 'mongoose';

export enum ChannelType {
    TEXT = 'TEXT',
    AUDIO = 'AUDIO',
    VIDEO = 'VIDEO'
}

export interface IChannel extends Document {
    name: string;
    type: ChannelType;
    profileId: string;
    serverId: string;
}

const channelSchema: Schema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    type: { 
        type: String, 
        enum: ChannelType, 
        default: ChannelType.TEXT 
    },
    profileId: { 
        type: String, 
        ref: 'Profile', 
        required: true 
    },
    serverId: { 
        type: String, 
        ref: 'Server', 
        required: true 
    },
}, { 
    timestamps: true, 
});

channelSchema.index({ profileId: 1 });
channelSchema.index({ serverId: 1 });

const Channel: Model<IChannel> = mongoose.model<IChannel>('Channel', channelSchema);

export default Channel;
