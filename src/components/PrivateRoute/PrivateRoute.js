import { useLocation, Navigate } from 'react-router';
import { useSelector } from 'react-redux';

export const PrivateRoute = ({children}) => {
  const location = useLocation();
  const {isLoggedIn} = useSelector(state => state.users);

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{from: location}}/>
  }

  return children;  
}