import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store'; // Adjust the import path to your store
import { useEffect } from 'react';
import { fetchMessages, sendMessage } from '@/features/messages/messageSlice';
// Message Interface

// Selector Hook for Messages
export const selectMessages = (state: RootState) => state.messages?.messages || [];
// Hook to Use Fetch Messages
export const useFetchMessages = (channelId: string) => {
  const dispatch: AppDispatch = useDispatch();
  const { messages, loading, error } = useSelector((state: RootState) => state.messages);

  useEffect(() => {
    dispatch(fetchMessages(channelId));
  }, [channelId, dispatch]);

  return { messages, loading, error };
};

// Hook to Use Send Message
export const useSendMessage = (channelId: string, senderId: string, message: string) => {
  const dispatch: AppDispatch = useDispatch();
  console.log(senderId)
  dispatch(sendMessage({ channelId, senderId, message }));
};
