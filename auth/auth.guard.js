import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';


export const AuthGuard = ({ children }) => {

    const currentUser = useSelector(state => state.user);

    const authorize = () => {
      if (!currentUser) {
          return (<Navigate to={{pathname: '/login'}}/>);
      }

      return (children);
    };

    return (authorize());
};
