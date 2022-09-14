import Form from '../Form/Form';
import { useEffect } from 'react';
import { selectAll, fetchUsers, setCurrentUser } from '../../users/usersSlice';
import store from '../../store';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './login.scss';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const fromPage = location.state?.from?.pathname || '/';

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);
    

    const handleLogin = (email, password) => {
        const users = selectAll(store.getState());

        users.forEach((item, i) => {
            if(item.email === email && item.password === password) {
                dispatch(setCurrentUser(item));
                navigate(fromPage);
            } else if (i === users.length - 1 && item.email !== email && item.password !== password) {
                alert('Ошибка. Вы ввели некорректное значение');
            }
        })

        
    }

    return (
        <div className='container'>
            <div className='wrapper col-md-6 login'>
                <Form title="login" handleClick={handleLogin}/>
                <div className='link'>
                    Или <Link to="/register">зарегистрируйтесь</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;