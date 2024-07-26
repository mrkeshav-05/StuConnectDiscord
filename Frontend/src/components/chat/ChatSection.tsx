import { selectCurrentUser, User } from '@/features/user/UserSlice';
import { useSelector } from 'react-redux';

const ChatSection = () => {
  const currentUser: User = useSelector(selectCurrentUser);
  return (
    <div className='h-screen w-full'>
      
    </div>
  )
}

export default ChatSection
