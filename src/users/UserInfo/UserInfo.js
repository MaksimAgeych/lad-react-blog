import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import EditUserForm from '../../components/EditForms/EditUserForm';
import { editUser, editCurrentUser, selectAll} from '../usersSlice';
import store from '../../store';
import EditIcon from '@mui/icons-material/Edit';
import './userInfo.scss';

const UserInfo = ({userId}) => {
    const user = selectAll(store.getState()).filter(item => item.id === userId)[0];
    const {currentUser} = useSelector(state => state.users);
    const { name, email, about, avatarUrl, id } = user;
    const dispatch = useDispatch();
    const {request} = useHttp();
    const [showModal, setShowModal] = useState(false);

    const handleEditUser = (avatarUrl, name, about) => {
        const newUser = {
            ...user,
            avatarUrl,
            name,
            about
        }

        request(`http://localhost:3001/users/${user.id}`, "PUT", newUser)
            .then(() => {
                dispatch(editUser(newUser));
                dispatch(editCurrentUser(newUser));})
            .catch(err => console.log(err));
    }

    return (
        <div className="wrapper">
            {showModal ? 
            <EditUserForm 
                setShowModal={setShowModal} 
                handleEditUser={handleEditUser}
                avatarUrl={avatarUrl}
                name={name}
                about={about}
                /> : null}
            <div className="container">
                <div className="row profile">
                    <div className="col-md-6">
                        <img src={avatarUrl} alt="" />
                    </div>
                    <div className="col-md-6 profile-content">
                        <div>{name}</div>
                        <div>{email}</div>
                        <div>{about}</div>
                        {
                            currentUser.id === id ? 
                            <button className='post-item__list-btn' onClick={() => setShowModal(true)}><EditIcon/></button> :
                            null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default UserInfo;