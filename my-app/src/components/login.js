import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import loginimg from '../images/login.png';
import {setToken} from './Auth.js'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState('')
    const navigate = useNavigate()

    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/login", {
            email: email,
            password: password,
        })
            .then(res => {
                console.log(res);
                if (res.data.Status === 'Success') {
                    console.log(res.data.Token);
                    setToken(res.data.Token)
                    navigate('/');
                } else {
                    setError(res.data.Error);
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="container" style={{paddingTop: 60}}>
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5 text-center">
                        <img src={loginimg} alt="" className="img-fluid"/>
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 text-center">
                        <form>
                            <div
                                className="d-flex flex-row align-items-center justify-content-center justify-content-lg-center">
                                <p className="lead fw-normal mb-0 me-3">Войдите в свою учётную запись</p>
                            </div>
                            <h1 style={{
                                color: 'red',
                                fontSize: '15px',
                                textAlign: 'center',
                                marginTop: '20px'
                            }}>{error && error}</h1>

                            <div className="input-group mb-3">
                                <span
                                    className="input-group-text"
                                    id="basic-addon2"
                                >
                                    Email
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Введите корректный email"
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

                            <div className="text-center text-lg-center">
                                <button type="button" className="btn btn-dark" onClick={login}>Войти</button>
                                <p className="small fw-bold mt-2 mb-0">Нет учётной записи? <a href="signup"
                                                                                                   className="link-secondary">Создать</a>
                                </p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;