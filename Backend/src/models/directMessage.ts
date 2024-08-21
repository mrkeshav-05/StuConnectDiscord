// import mongoose, { Document, Schema, Model } from 'mongoose';

// export interface IDirectMessage extends Document {
//     content: string;
//     fileUrl: string;
//     memberId: string;
//     deleted: boolean;
// }

// const directMessageSchema: Schema<IDirectMessage> = new Schema<IDirectMessage>({
//     content: { 
//         type: String, 
//         required: true 
//     },
//     fileUrl: { 
//         type: String, 
//     },
//     memberId: { 
//         type: String, 
//         ref: 'Member', 
//         required: true 
//     },
//     deleted: {
//         type: Boolean,
//         default: false
//     }
// }, { 
//     timestamps: true, 
// });

// directMessageSchema.index({ memberId: 1 });
// directMessageSchema.index({ channelId: 1 });

// const DirectMessage: Model<IDirectMessage> = mongoose.model<IDirectMessage>('DirectMessage', directMessageSchema);

// export default DirectMessage;


import mongoose, { Document, Schema, Model } from 'mongoose';

// Define the TypeScript interface for the Direct Message document
export interface IMessage extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the message schema
const messageSchema: Schema<IMessage> = new Schema<IMessage>({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  }
}, { timestamps: true });

// Create the model
const Message: Model<IMessage> = mongoose.model<IMessage>('Message', messageSchema);

export default Message;
