import Form from '../Form/Form';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, fetchUsers, setCurrentUser } from '../../users/usersSlice';
import { useHttp } from '../../hooks/http.hook';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const SignUp = () => {
    const {request} = useHttp();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);
    
    const handleRegister = (email, password, name) => {

        const newUser = {
            id: uuidv4(),
            name,
            email,
            password,
            about: "Нет описания",
            avatarUrl: 'https://winnote.ru/wp-content/uploads/2016/01/1454222417_del_recent_avatar1.png',
            userPosts: [],
            likedPosts: [],
        }

        if (email == "" || password == "" || name == "") {
            alert('Ошибка. Вы ввели некорректное значение');
        } else {
            request(`http://localhost:3001/users`, 'POST', newUser)
            .then(() => {
                dispatch(addUser(newUser))
                dispatch(setCurrentUser(newUser))})
            .catch(err => console.log(err));
            navigate("/");
        }
        
    }

    return (
        <div className='container'>
            <div className='wrapper col-md-6 login'>
                <Form title="register" handleClick={handleRegister}/>
                <div className='link'>
                    Или <Link to="/login">авторизируйтесь</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp;