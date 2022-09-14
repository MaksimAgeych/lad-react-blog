import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editCurrentUser } from "../../users/usersSlice";
import './layout.scss';

const Layout = () => {
    const currentUser = useSelector(state => state.users.currentUser);
    const dispatch = useDispatch()

    if (currentUser === null) {
        return <Navigate to="/login" />
    }

    const {id, avatarUrl, name, email } = currentUser;;
    
    const exit = () => {
        dispatch(editCurrentUser(null));
    }
    
    return (
        <div className="container">
            <div className="row">
                <header className="col-md-3">
                    <div className="wrapper">
                        <div className="menu">
                            <div className="links">
                                <ul>
                                    <li><NavLink to="/">Лента</NavLink></li>
                                    <li><NavLink to={`/${id}`}>Мой профиль</NavLink></li>
                                    <li><NavLink to="/liked">Избранное</NavLink></li>
                                    <li><NavLink to="/users">Люди</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="col-md-6">
                    <Outlet/>
                </div>
                <nav className="col-md-3">
                    <div className="wrapper">
                        <div className="mini-info">
                            <img src={avatarUrl} alt="avatar" />
                            <div className="mini-info__content">
                                <div>{name}</div>
                                <div>{email}</div>
                                <button className="btn" onClick={exit}>Выйти</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export {Layout};