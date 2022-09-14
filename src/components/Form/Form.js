import { useState } from "react";
import "./form.scss";

const Form = ({title, handleClick}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    return (
        <form className="login-form" onSubmit={(e) => {
            e.preventDefault();
            handleClick(email, password, name)}}>
            <h2>{title === "register" ? "Регистрация" : "Авторизация"}</h2>
            {title === "register" ? 
                <div>
                    <input 
                    className="form-input"
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"/>
                </div> :
                null
            }
            <div>
                <input 
                    className="form-input"
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
            </div>
            <div>
                <input 
                    className="form-input"
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
            </div>
            <div>
                <button type="submit" className="btn">Отправить</button>
            </div>
            
        </form>
    )
}

export default Form;