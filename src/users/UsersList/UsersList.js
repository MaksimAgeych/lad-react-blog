import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers, selectAll } from '../usersSlice';
import store from "../../store";
import { v4 as uuidv4 } from 'uuid';

import UsersListItem from '../UsersListItem/UsersListItem';
import Spinner from '../../components/Spinner/Spinner';
import './usersList.scss';

const UsersList = () => {
    const users = selectAll(store.getState());
    const {usersLoadingStatus} = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    if (usersLoadingStatus === "loading") {
        return <Spinner/>;;
    } else if (usersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderUsersList = (arr) => {
        if (arr.length === 0) {
            return (
                <div>
                    <h5>Постов пока нет</h5>
                </div>
            )
        }

        return arr.map(({...props}) => {
            return (
                <UsersListItem key={uuidv4()} {...props}/>
            )
        })
    }

    const elements = renderUsersList(users);
    return (
        <section className='wrapper'>
            <div className='users-list'>
                <h2>Пользователи</h2>
                {elements}
            </div>
        </section>
    );
}

export default UsersList;