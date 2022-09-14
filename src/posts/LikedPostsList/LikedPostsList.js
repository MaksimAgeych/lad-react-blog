import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUsers } from '../../users/usersSlice';

import { v4 as uuidv4 } from 'uuid';

import PostsListItem from '../PostsListItem/PostsListItem';
import Spinner from '../../components/Spinner/Spinner';
import { fetchPosts } from '../postsSlice';

const LikedPostsList = () => {
    const {likedPosts} = useSelector(state => state.users.currentUser);
    const {usersLoadingStatus} = useSelector(state => state.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    useEffect(() => {
        dispatch(fetchPosts());
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
                <PostsListItem key={uuidv4()} {...props}/>
            )
        })
    }

    const elements = renderUsersList(likedPosts);
    return (
        <div className='users-list'>
            <h2 className='title'>Избранные посты</h2>
            {elements}
        </div>
    );
}

export default LikedPostsList;