import axios from '../api/axios';
import { useAuthContext } from '../context/AuthProvider';
 

const useRefreshToken = () => {
  const { setAuth } = useAuthContext();

  const refresh = async () => {
    const response  = await axios.get('/refresh', {
      withCredentials: true,
    }) as any;

    setAuth((prev:any) => {
      console.log(JSON.stringify(prev));
      console.log(response.accessToken);
      return { ...prev, accessToken: response.accessToken };
    });
    return response.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
