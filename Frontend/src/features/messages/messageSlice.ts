// import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import api from '@/app/api';
// import { RootState } from '@/app/store';
// import { displayError, extractErrorMessage } from '@/lib/utils';

// interface Message {
//   _id: string;
//   senderId: string;
//   content: string;
//   channelId: string;
//   createdAt: string;
// }

// // Initial State
// interface MessagesState {
//   messages: Message[];
//   loading: boolean;
//   error: string | null;
// }

// const initialState: MessagesState = {
//   messages: [],
//   loading: false,
//   error: null,
// };

// export interface SendMessagePayload {
//   channelId: string;
//   senderId: string;
//   message: string;
// }

// export const fetchMessages = createAsyncThunk<Message[], string, AsyncThunkConfig>(
//   'messages/fetchMessages',
//   async (groupId) => {
//     const response = await fetch(`/api/v1/messages/group-message/${groupId}`);
//     return (await response.json()) as Message[];
//   }
// );
// // Async Thunk to Send Message
// export const sendMessage = createAsyncThunk(
//   'messages/sendMessage',
//   async ({ channelId, senderId, message }: SendMessagePayload, { rejectWithValue }) => {
//     console.log(channelId)
//     console.log()
//     console.log(message)
//     try {
//       const response = await api.post('/api/v1/messages/group-message', {
//         groupId : channelId,
//         message,
//         senderId
//       });

//       return response.data as Message;
//     } catch (error) {
//       console.error('Error sending message:', error);
//       return rejectWithValue('Failed to send message');
//     }
//   }
// );

// // Messages Slice
// const messagesSlice = createSlice({
//   name: 'messages',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchMessages.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
//         state.loading = false;
//         state.messages = action.payload;
//       })
//       .addCase(fetchMessages.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       })
//       .addCase(sendMessage.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(sendMessage.fulfilled, (state, action: PayloadAction<Message>) => {
//         state.loading = false;
//         state.messages.push(action.payload);
//       })
//       .addCase(sendMessage.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const selectMessages = (state: RootState) => state.messages.messages

// export default messagesSlice.reducer;



import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import api from '@/app/api';
import { resetStore } from '@/app/resetActions';

interface Message {
  _id: string;
  senderId: string;
  content: string;
  channelId: string;
  createdAt: string;
}

// Initial State
interface MessagesState {
  messages: Message[];
  loading: boolean;
  error: string | null;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
  error: null,
};

export interface SendMessagePayload {
  channelId: string;
  senderId: string;
  message: string;
}

// Async Thunk to Fetch Messages
export const fetchMessages = createAsyncThunk<Message[], string, { rejectValue: string }>(
  'messages/fetchMessages',
  async (groupId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/messages/group-message/${groupId}`);
      return response.data as Message[];
    } catch (error: any) {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || "Error occurred while fetching messages";
        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue('Error occurred while fetching messages');
      }
    }
  }
);

// Async Thunk to Send Message
export const sendMessage = createAsyncThunk<Message, SendMessagePayload, { rejectValue: string }>(
  'messages/sendMessage',
  async ({ channelId, senderId, message }, { rejectWithValue }) => {
    console.log("Sending message:", { channelId, senderId, message }); // Add this log
    try {
      const response = await api.post('/messages/group-message', {
        groupId: channelId,
        senderId,
        message
      });
      console.log("Message sent successfully:", response.data); // Add this log
      return response.data as Message;
    } catch (error: any) {
      console.error("Error occurred:", error); // Log the error
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message || "Error occurred while sending message";
        return rejectWithValue(errorMessage);
      } else {
        return rejectWithValue('Error occurred while sending message');
      }
    }
  }
);


// Messages Slice
const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
        state.messages = action.payload;
        state.loading = false;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action: PayloadAction<Message>) => {
        state.messages.push(action.payload);
        state.loading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(resetStore, () => initialState);
  },
});

export default messagesSlice.reducer;

// Selector Hook for Messages
export const selectMessages = (state: RootState) => state.messages.messages;
