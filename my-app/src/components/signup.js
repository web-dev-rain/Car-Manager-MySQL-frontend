import React, {useState} from "react";
import Axios from "axios";
import signupimg from '../images/signup.png';

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [registerStatus, setRegisterStatus] = useState("");

    const register = (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/register", {
            email: email,
            name: name,
            password: password,
        }).then((response) => {
            console.log(response);
            if (response.data.message) {
                setRegisterStatus(response.data.message);
            } else {
                setRegisterStatus("Учётная запись создана успешно");
            }
        })
    }

    return (
        <div className="container" style={{paddingTop: 60}}>
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 text-center">
                        <form>
                            <div
                                className="d-flex flex-row align-items-center justify-content-center justify-content-lg-center">
                                <p className="lead fw-normal mb-0 me-3">Создайте учётную запись</p>
                            </div>
                            <p><h1
                                style={{fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{registerStatus}</h1>
                            </p>

                            <div className="input-group flex-nowrap mb-3">
                                <span className="input-group-text" id="addon-wrapping">Имя</span>
                                <input type="text" className="form-control" placeholder="Введите имя"
                                       aria-label="Username"
                                       onChange={(e) => {
                                           setName(e.target.value)
                                       }}
                                       aria-describedby="addon-wrapping"/>
                            </div>

                            <div className="input-group mb-3">
                                <span
                                    className="input-group-text"
                                    id="basic-addon2"
                                >
                                    Email
                                </span>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Введите email"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                    }} required
                                />
                            </div>

                            <div className="input-group mb-3">
                                <span
                                    className="input-group-text"
                                    id="basic-addon2"
                                >
                                    Пароль
                                </span>
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Введите пароль"
                                    aria-label="Recipient's username"
                                    aria-describedby="basic-addon2"
                                    onChange={(e) => {
                                        setPassword(e.target.value)
                                    }} required
                                />
                            </div>

                            <div className="text-center text-lg-center mt-2">
                                <button type="button" className="btn btn-dark"
                                        onClick={register}>Зарегистрироваться
                                </button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Есть учётная запись? <a href="login"
                                                                                                    className="link-secondary">Войти</a>
                                </p>
                            </div>

                        </form>
                    </div>
                    <div className="col-md-9 col-lg-6 col-xl-5 text-center">
                        <img src={signupimg} alt="" className="img-fluid"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;