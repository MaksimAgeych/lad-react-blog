import { Link } from "react-router-dom";
import './usersListItem.scss';


const UsersListItem = ({avatarUrl, name, email, id}) => {

    return (
        <Link to={`/${id}`} className="user-link">
            <div className="container">
                <div className="row">
                    <img src={avatarUrl} alt="avatar" className="col-md 3"/>
                    <div className="col-md-9">
                        <p>{name}</p>
                        <p>{email}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default UsersListItem;