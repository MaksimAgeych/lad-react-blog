import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/Spinner/Spinner';
import { fetchPosts, selectAll } from '../postsSlice';
import { selectAll as selectAllUsers } from '../../users/usersSlice';
import store from "../../store";
import { v4 as uuidv4 } from 'uuid';

import PostsListItem from "../PostsListItem/PostsListItem";

const PostsList = ({userId}) => {
    const posts = userId ? 
        selectAllUsers(store.getState()).filter(item => item.id === userId)[0].userPosts :
        selectAll(store.getState());
    const { postsLoadingStatus } = useSelector(state => state.posts)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPosts());
    }, []);

    if (postsLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (postsLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderPostsList = (arr) => {
        if (arr.length === 0) {
            return (
                <div>
                    <h5 className='title'>Постов пока нет</h5>
                </div>
            )
        }

        return arr.map(({...props}) => {
            return (
                <PostsListItem key={uuidv4()} {...props}/>
            )
        })
    }

    const elements = renderPostsList(posts);
    return (
        <section>
            {elements}
        </section>
    );
}

export default PostsList;