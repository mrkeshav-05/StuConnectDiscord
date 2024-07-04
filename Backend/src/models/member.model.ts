import mongoose, { Document, Schema, Model, model } from 'mongoose';

export enum MemberRole {
    ADMIN = 'ADMIN',
    MODERATOR = 'MODERATOR',
    GUEST = 'GUEST'
}

export interface IMember extends Document {
    role: MemberRole;
    profileId: string;
    serverId: string;
}

const memberSchema: Schema = new Schema({
    role: { 
        type: String, 
        enum: MemberRole, 
        default: MemberRole.GUEST 
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

memberSchema.index({ profileId: 1 });
memberSchema.index({ serverId: 1 });

const Member: Model<IMember> = mongoose.model<IMember>('Member', memberSchema);

export default Member;
