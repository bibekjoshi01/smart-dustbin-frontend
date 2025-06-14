import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/libs/hooks';
import { LoginFormDataType } from '../redux/types';
import { loginSuccess, setAuthSate } from '../redux/auth.slice';
import { useLoginMutation, useLazyGetProfileQuery } from '../redux/auth.api';

export const useLogin = () => {
  const [login, { isLoading: loadingLogin }] = useLoginMutation();
  const [getProfile] = useLazyGetProfileQuery();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: LoginFormDataType) => {
    console.log(values, 'Login values');

    try {
      const { message, access_token } = await login(values).unwrap();
      dispatch(
        loginSuccess({
          accessToken: access_token,
          message,
        })
      );
      if (access_token) {
        const profile = await getProfile().unwrap();
        if (profile.id) {
          dispatch(
            setAuthSate({
              id: profile.id,
              email: profile.email,
              isActive: profile.is_active,
              createdAt: profile.created_at,
            })
          );
        }
      }
      navigate('/');
    } catch (err: unknown) {
      console.error('Login error:', err);
    }
  };
  return {
    handleSubmit,
    loadingLogin,
  };
};
