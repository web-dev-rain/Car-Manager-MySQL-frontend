import axios from 'axios';
import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom';

function Addauto() {
    const [model, setModel] = useState("");
    const [description, setDescription] = useState("");
    const [enginecapacity, setEnginecapacity] = useState("");
    const [insurance_end_date, setinsurance_end_date] = useState("");
    const [tech_inspection_date, setTechInspectionDate] = useState("");
    const [fuel_consumption, setfuel_consumption] = useState("");
    const [distance_traveled, setdistance_traveled] = useState("");
    const [tire_season_type, setTire_season_type] = useState("");
    const [type_auto_id, setTypeAutoId] = useState("");
    const [insurance_type_id, setInsuranceTypeId] = useState("");

    const [registerStatus, setRegisterStatus] = useState("");

    const navigate = useNavigate()

    // let currentDate = new Date();
    // let year = currentDate.getFullYear();
    // let month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    // let day = ('0' + currentDate.getDate()).slice(-2);
    //
    // let formattedCurrentDate = `${year}-${month}-${day}`;
    // console.log(formattedCurrentDate);

    const create = (e) => {
        e.preventDefault();

        let selectTypeAuto = document.getElementById("select-type-auto");
        let typeAutoId = selectTypeAuto.options[selectTypeAuto.selectedIndex].value;
        let selectTireSeasonType = document.getElementById("select-tire-season-type");
        let tireSeasonType = selectTireSeasonType.options[selectTireSeasonType.selectedIndex].value;
        let selectInsuranceTypeId = document.getElementById("select-insurance-type-id");
        let insuranceTypeId = selectInsuranceTypeId.options[selectInsuranceTypeId.selectedIndex].value;

        //let technicalInspectionDate = selectTireSeasonType.options[selectTireSeasonType.selectedIndex].value;

        axios.post("http://localhost:3001/create", {
            model: model,
            description: description,
            type_auto_id: typeAutoId,
            enginecapacity: enginecapacity,
            insurance_type_id: insuranceTypeId,
            insurance_end_date: insurance_end_date,
            tech_inspection_date: tech_inspection_date,
            fuel_consumption: fuel_consumption,
            distance_traveled: distance_traveled,
            tire_season_type: tireSeasonType
        }).then((response) => {
            // setRegisterStatus(response);
            console.log(response);
            if (response.data.message) {
                setRegisterStatus(response.data.message);
            } else {
                navigate('/auto')
                //alert("Success");
            }
        })
            .catch(err => console.log(err));
    }

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <div className="card w-50">
                <div className="card-header text-center font-weight-bold bg-dark text-white">
                    <h4>Добавить автомобиль</h4>
                </div>
                <div className="card-body align-items-center text-center">
                    <div className="container">
                        <div className="row">
                            <div className="input-group input-group mb-3">
                                <span className="input-group-text">Модель</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Введите модель'
                                    autoComplete='off'
                                    onChange={(e) => {
                                        setModel(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group input-group mb-3">
                                <span className="input-group-text">Описание</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder='Введите описание'
                                    autoComplete='off'
                                    onChange={(e) => {
                                        setDescription(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group input-group mb-3">
                                <span className="input-group-text">Тип авто</span>
                                <select
                                    id="select-type-auto"
                                    className="form-select"
                                    aria-label="Default select example"
                                    onChange={(e) => {
                                        setTypeAutoId(e.target.value)
                                    }}
                                >
                                    <option selected>Выберите тип авто</option>
                                    <option value="1">Седан</option>
                                    <option value="2">Универсал</option>
                                    <option value="3">Кроссовер</option>
                                    <option value="4">Внедорожник</option>
                                    <option value="5">Пикап</option>
                                    <option value="6">Легковой фургон</option>
                                    <option value="7">Минивэн</option>
                                    <option value="8">Грузовой</option>
                                    <option value="9">Хэтчбек</option>
                                    <option value="10">Лимузин</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group input-group mb-3">
                                <span className="input-group-text">Объём двигателя</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Введите объём двигателя"
                                    step={0.1}
                                    min={0.5}
                                    max={50}
                                    autoComplete='off'
                                    onChange={(e) => {
                                        setEnginecapacity(e.target.value)
                                    }}
                                />
                                <span className="input-group-text">Л</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group input-group mb-3">
                                <span className="input-group-text">Тип страховки</span>
                                <select
                                    id="select-insurance-type-id"
                                    className="form-select"
                                    aria-label="Default select example"
                                    onChange={(e) => {
                                        setInsuranceTypeId(e.target.value)
                                    }}
                                >
                                    <option value="1">Базовая</option>
                                    <option value="2">Расширенная</option>
                                    <option value="3">Делюкс</option>
                                </select>
                            </div>
                        </div>
                        <div className="input-group input-group mb-3">
                            <span className="input-group-text">Действует до</span>
                            <input
                                id="input-tech_inspection_date"
                                type="date"
                                className="form-control"
                                placeholder='Введите дату'
                                autoComplete='off'
                                min="2023-01-01"
                                name="insurance_end_date"
                                onChange={(e) => {
                                    setinsurance_end_date(e.target.value)
                                }}
                            />
                        </div>
                        <div className="input-group input-group mb-3">
                            <span className="input-group-text">Техосмотр пройден</span>
                            <input
                                id="input-tech-inspection-date"
                                type="date"
                                className="form-control"
                                placeholder='Введите дату'
                                autoComplete='off'
                                min="2023-01-01"
                                name="tech_inspection_date"
                                onChange={(e) => {
                                    setTechInspectionDate(e.target.value)
                                }}
                            />
                        </div>
                        <div className="row">
                            <div className="input-group input-group mb-3">
                                <span className="input-group-text">Расход топлива</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    step={0.1}
                                    min={0}
                                    max={120}
                                    placeholder="Введите расход топлива на 100 км"
                                    autoComplete='off'
                                    onChange={(e) => {
                                        setfuel_consumption(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group input-group mb-3">
                                <span className="input-group-text">Пройденное расстояние в км</span>
                                <input
                                    type="number"
                                    min={0}
                                    className="form-control"
                                    placeholder="Введите пробег"
                                    autoComplete='off'
                                    onChange={(e) => {
                                        setdistance_traveled(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group input-group mb-3">
                                <span className="input-group-text">Установлены шины</span>
                                <select
                                    id="select-tire-season-type"
                                    className="form-select"
                                    aria-label="Default select example"
                                    onChange={(e) => {
                                        setTire_season_type(e.target.value)
                                    }}
                                >
                                    <option value="summer">Летние</option>
                                    <option value="winter">Зимние</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-dark" onClick={create}>Добавить</button>
                </div>
            </div>
        </div>

    )
}

export default Addauto