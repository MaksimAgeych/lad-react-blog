import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { postDeleted, postChanged } from '../postsSlice';
import { editUser, editCurrentUser} from '../../users/usersSlice';
import EditPostForm from '../../components/EditForms/EditPostForm';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditIcon from '@mui/icons-material/Edit';
import './postsListItem.scss';

const PostsListItem = (props) => {
    const {title, author, content, userId, id, countLike, likedUsersIds, comments} = props;
    const {currentUser} = useSelector(store => store.users);
    const [showModal, setShowModal] = useState(false);
    const isNotLiked = currentUser.likedPosts.filter(item => item.id === id).length === 0;
    const heartFill = isNotLiked ? 'black' : 'crimson';
    const dispatch = useDispatch();
    const {request} = useHttp();

    const deletePost = () => {
        request(`http://localhost:3001/posts/${id}`, "DELETE")
            .then(dispatch(postDeleted(id)))
            .catch(err => console.log(err));
        
        const newUser = {
            ...currentUser,
            userPosts: currentUser.userPosts.filter(item => item.id !== id)
        }

        request(`http://localhost:3001/users/${userId}`, "PUT", newUser)
            .then(() => {
                const p = {
                    id: currentUser.id,
                    userPosts: currentUser.userPosts.filter(item => item.id !== id)
                }
                dispatch(editUser(p));
                dispatch(editCurrentUser(newUser));})
            .catch(err => console.log(err));
    }

    const handleEditPost = (text) => {
        const newPost = {
            id,
            author,
            userId,
            title,
            content,
            countLike,
            likedUsersIds,
            comments
        }

        request(`http://localhost:3001/posts/${id}`, "PUT", newPost)
            .then(dispatch(postChanged(newPost)))
            .catch(err => console.log(err));
        
        const newUser = {
            ...currentUser,
            userPosts: [...currentUser.userPosts.filter(item => item.id !== id), newPost]
        }

        request(`http://localhost:3001/users/${userId}`, "PUT", newUser)
            .then(() => {
                const p = {
                    id: currentUser.id,
                    userPosts: [...currentUser.userPosts.filter(item => item.id !== id), newPost]
                }
                dispatch(editUser(p));
                dispatch(editCurrentUser(newUser));})
            .catch(err => console.log(err));
    }

    const likePost = () => {
        const newLikedPosts = isNotLiked ?
            [...currentUser.likedPosts, {...props}] :
            currentUser.likedPosts.filter(item => item.id !== id); 
        
        const newUser = {
            ...currentUser,
            likedPosts: newLikedPosts
        }

        request(`http://localhost:3001/users/${userId}`, "PUT", newUser)
            .then(() => {
                const p = {
                    id: currentUser.id,
                    likedPosts: newLikedPosts
                }
                dispatch(editUser(p));
                dispatch(editCurrentUser(newUser));})
            .catch(err => console.log(err));

        const newPost = {
            id,
            author,
            userId,
            title,
            content,
            countLike,
            likedUsersIds,
            comments: []
        }

        request(`http://localhost:3001/posts/${id}`, "PUT", newPost)
            .then(dispatch(postChanged(newPost)))
            .catch(err => console.log(err));
    }

    return (
        <div className="wrapper">
            {showModal ? 
            <EditPostForm 
                setShowModal={setShowModal} 
                handleEditPost={handleEditPost}
                {...props}/> : null}
            <div className="post-item">
                <p className='post-item__title'>{title}</p>  
                <p className='post-item__author'>by {author}</p> 
                <p className='post-item__content'>{content}</p>
                <div className='post-item__list'>
                    <button className='post-item__list-btn' onClick={likePost}><FavoriteIcon style={{fill: heartFill}}/></button>
                {userId === currentUser.id ? 
                    <button className='post-item__list-btn' onClick={() => setShowModal(true)}><EditIcon/></button>
                 : null}
                {userId === currentUser.id ? 
                    <button className='post-item__list-btn' onClick={deletePost}><DeleteForeverIcon/></button>
                : null}
                </div>
            </div>
        </div>
    )
}

export default PostsListItem;