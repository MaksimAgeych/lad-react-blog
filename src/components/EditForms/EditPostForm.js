import "./editForm.scss";
import { useState } from 'react';
import CancelIcon from "@mui/icons-material/Cancel";

const EditPostForm = ({setShowModal, handleEditPost, title, content}) => {
    const [postTitle, setPostTitle] = useState(title);
    const [postContent, setPostContent] = useState(content);

    return (
        <>
          <form className="editPostForm" onSubmit={(e) => {
            e.preventDefault();
            handleEditPost(postTitle, postContent)
            setShowModal(false);}}>
            <button className="hideBtn"
            onClick={() => setShowModal(false)}>
              <CancelIcon />
            </button>
            <h2>Редактирование поста</h2>
            <div>
              <input
                className="editFormInput"
                type="text"
                name="postTitle"
                placeholder="Заголовок поста"
                value={postTitle}
                onChange={(e)=>setPostTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <textarea
                className="editFormInput"
                name="postDescription"
                placeholder="Описание поста"
                rows={8}
                value={postContent}
                onChange={(e)=>setPostContent(e.target.value)}
                required
              />
            </div>
            <div>
              <button
                className="btn"
                type="submit"
              >
                Сохранить
              </button>
            </div>
          </form>
          <div className="overlay"></div>
        </>
    );
}

export default EditPostForm;