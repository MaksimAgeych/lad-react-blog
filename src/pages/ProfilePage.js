import UserInfo from '../users/UserInfo/UserInfo';
import PostsList from '../posts/PostsList/PostsList';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
    const {id} = useParams();
    return (
        <div>
            <UserInfo userId={id}/>
            <h2 className='title'>Мои посты</h2>
            <PostsList userId={id}/>
        </div>
    )
}

export default ProfilePage;