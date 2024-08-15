import React, {useEffect, useState} from 'react'
import {Link, Outlet, useNavigate} from 'react-router-dom'
import axios from "axios";
import TechInspectionProblem from "./auto/techinspectionproblem";

function Dashboard() {
    const [wrongTiresCount, setWrongTiresCount] = useState()
    const [insuranceEndCount, setInsuranceEndCount] = useState()
    const [techInspectionProblemCount, setTechInspectionProblemCount] = useState()
    useEffect(() => {
        axios.get('http://localhost:3001/wrongTypeTireCount')
            .then(res => {
                setWrongTiresCount(res.data[0].wrongTiresCount)
            }).catch(err => console.log(err));

        axios.get('http://localhost:3001/insuranceEndCount')
            .then(res => {
                setInsuranceEndCount(res.data[0].insuranceEndCount)
            }).catch(err => console.log(err));

        axios.get('http://localhost:3001/techInspectionProblemCount')
            .then(res => {
                setTechInspectionProblemCount(res.data[0].techInspectionProblemCount)
            }).catch(err => console.log(err));

    }, [])
    const navigate = useNavigate();
    const signOut = () => {
        localStorage.removeItem('Token')
        navigate("/login");
    }
    return (
        <div className="container-fluid main">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
                    <div
                        className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <a href="/"
                           className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 fw-bolder d-none d-sm-inline">Панель управления</span>
                        </a>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-center"
                            id="menu">
                            <li>
                                <Link to="/" data-bs-toggle="collapse"
                                      className="nav-link text-white px-0 align-middle">
                                    <span className="ms-1 d-none d-sm-inline">Статистика</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/auto" className="nav-link px-0 align-middle text-white">
                                    <span className="ms-1 d-none d-sm-inline">Все автомобили</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="expiredinsurance" className="nav-link px-0 align-middle text-white">
                                    <span className="ms-1 d-none d-sm-inline">
                                        Просрочена страховка ({insuranceEndCount})
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link to="techinspectionproblem" className="nav-link px-0 align-middle text-white">
                                    <span className="ms-1 d-none d-sm-inline">
                                        Не пройден техосмотр ({techInspectionProblemCount})
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link to="wrongtire" className="nav-link px-0 align-middle text-white">
                                    <span className="ms-1 d-none d-sm-inline">
                                        Требуют замены шин ({wrongTiresCount})
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <button type='button' className="btn btn-light" onClick={signOut}>Выйти</button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col p-0 m-0">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Dashboard