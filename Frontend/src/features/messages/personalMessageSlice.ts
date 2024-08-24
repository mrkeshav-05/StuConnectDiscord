import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import api from '@/app/api';
import { resetStore } from '@/app/resetActions';

interface Message {
  _id: string;
  senderId: string;
  content: string;
  // senderUsername: string;
  receiverId: string;
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
  receiverId: string;
  senderId: string;
  message: string;
}

// const currentUser = useSelector(selectCurrentUser);
// const senderId = currentUser?._id;
// Async Thunk to Fetch Messages
interface FetchMessagesPayload {
  senderId: string;
  receiverId: string;
}

export const fetchMessages = createAsyncThunk<Message[], FetchMessagesPayload, { rejectValue: string }>(
  'messages/fetchMessages',
  async ({ senderId, receiverId }, { rejectWithValue }) => {
    try {
      // console.log(senderId, receiverId)
      const response = await api.get(`/messages/direct-message/${receiverId}/${senderId}`);
      console.log(response.data)
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
  async ({senderId, receiverId, message }, { rejectWithValue }) => {
    console.log("Sending message:", { receiverId, senderId, message }); // Add this log
    try {
      const response = await api.post('/messages/direct-message', {
        receiverId,
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
