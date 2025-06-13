import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

// project imports
import { useAppDispatch } from '@/libs/hooks';
import { useLoginMutation } from '../redux/auth.api';
import { loginSuccess } from '../redux/auth.slice';
import { LoginFormDataType } from '../redux/types';

export const useLogin = () => {
  const [login, { isLoading: loadingLogin }] = useLoginMutation();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const handleSubmit = async (values: LoginFormDataType) => {
    try {
      const response = await login({ values }).unwrap();
      dispatch(loginSuccess({ ...response }));
      enqueueSnackbar('Login Success', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        }
      });
      navigate('/');
    } catch (err: unknown) {
      console.log('Login error:', err);
    }
  };

  return {
    handleSubmit,
    loadingLogin,
  };
};
