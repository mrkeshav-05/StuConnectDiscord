import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProfile, selectUserProfile } from "@/features/profile/ProfileSlice";
import { AppDispatch } from '@/app/store';
import UserButton from '@/components/auth/user-button';
import CreateServerModal from '@/components/modals/CreateServeModal';
import JoinServerModal from '@/components/modals/JoinServerModal';
import { ModeToggle } from '@/components/theme/mode-toggle';

const SetupPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector(selectUserProfile);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile?.servers && profile.servers.length > 0) {
      navigate(`/servers/${profile.servers[0]}`);
    }
  }, [profile, navigate]);

  return (
    <div>
      <UserButton />
      <ModeToggle/>
      {profile?.servers?.length === 0 && (
        <div>
          <CreateServerModal/>
          <JoinServerModal/>
        </div>
      )}
    </div>
  );
};

export default SetupPage;
