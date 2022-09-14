import "./editForm.scss";
import { useState } from 'react';
import CancelIcon from "@mui/icons-material/Cancel";

const EditPostForm = ({setShowModal, handleEditUser, avatarUrl, about, name}) => {
    const [avatarUser, setAvatarUser] = useState(avatarUrl);
    const [aboutUser, setAboutUser] = useState(about);
    const [nameUser, setNameUser] = useState(name);

    return (
        <>
          <form className="editPostForm" onSubmit={(e) => {
            e.preventDefault();
            handleEditUser(avatarUser, nameUser, aboutUser);
            setShowModal(false)}}>
            <button className="hideBtn"
            onClick={() => setShowModal(false)}>
              <CancelIcon />
            </button>
            <h2>Редактирование пользователя</h2>
            <div>
              <input
                className="editFormInput"
                type="text"
                placeholder="Аватар пользователя"
                value={avatarUser}
                onChange={(e)=>setAvatarUser(e.target.value)}
                required
              />
            </div>
            <div>
              <input
                className="editFormInput"
                type="text"
                placeholder="Имя пользователя"
                value={nameUser}
                onChange={(e)=>setNameUser(e.target.value)}
                required
              />
            </div>
            <div>
              <textarea
                className="editFormInput"
                placeholder="Описание пользователя"
                rows={8}
                value={aboutUser}
                onChange={(e)=>setAboutUser(e.target.value)}
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