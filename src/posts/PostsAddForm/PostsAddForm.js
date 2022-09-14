import { useDispatch } from 'react-redux';
import { postCreated } from '../postsSlice';
import { editUser, editCurrentUser } from '../../users/usersSlice';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHttp } from '../../hooks/http.hook';
import { v4 as uuidv4 } from 'uuid';

import './postsAddForm.scss';

const PostsAddForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const {currentUser} = useSelector(state => state.users);
    const {request} = useHttp();
    const dispatch = useDispatch();

    const createPost = (e) => {
        e.preventDefault();

        const newPost = {
            id: uuidv4(),
            userId: currentUser.id,
            author: currentUser.name,
            title,
            content,
            likedUsersIds: [],
            countLike: 0,
            comments: []
        }

        request(`http://localhost:3001/posts`, 'POST', newPost)
            .then(() => {
                dispatch(postCreated(newPost));
            })
            .catch(err => console.log(err));
         
        const newUser = {
            ...currentUser,
            userPosts: [...currentUser.userPosts, newPost]
        }
        
        request(`http://localhost:3001/users/${currentUser.id}`, 'PUT', newUser)
            .then(() => {
                const p = {
                    id: currentUser.id,
                    userPosts: [...currentUser.userPosts, newPost]
                }
                dispatch(editUser(p));
                dispatch(editCurrentUser(newUser));
            })
            .catch(err => console.log(err));

        setTitle('');
        setContent('');
    }

    return (
        <form className='wrapper' onSubmit={createPost}>
            <div className='form-block'>
                <div>
                    <input 
                        className='form-input'
                        type="text"
                        placeholder='Заголовок поста'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div>
                    <textarea 
                        className='form-input'
                        type="text"
                        placeholder='Описание поста'
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div>
                    <button className='btn' type="submit">Запостить</button>
                </div>
            </div>
        </form>
    )
}

export default PostsAddForm;