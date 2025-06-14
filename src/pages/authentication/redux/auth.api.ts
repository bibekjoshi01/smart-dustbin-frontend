import { rootAPI } from '../../../libs/apiSlice';
import { LoginResponse, LoginFormDataType, ProfileResponse } from './types';

export const authAPI = 'auth';

export const authAPISlice = rootAPI.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginFormDataType>({
      query: (values) => ({
        url: `${authAPI}/login`,
        method: 'POST',
        data: values,
      }),
    }),
    getProfile: builder.query<ProfileResponse, void>({
      query: () => ({
        url: `${authAPI}/profile`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProfileQuery,
  useLazyGetProfileQuery,
} = authAPISlice;
