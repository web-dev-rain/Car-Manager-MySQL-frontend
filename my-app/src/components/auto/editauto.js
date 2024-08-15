import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";

function Editauto() {
    const {id} = useParams();
    const [auto, setauto] = useState({
        model: "",
        description: "",
        type_auto_id: "",
        enginecapacity: "",
        insurance_type_id: "",
        insurance_end_date: "",
        tech_inspection_date: "",
        fuel_consumption: "",
        distance_traveled: "",
        tire_season_type: ""
    });

    const location = useLocation();
    const navigate = useNavigate();

    const autoId = location.pathname.split("/")[2];

    let ins_date;
    let tech_date;

    const handleChange = (e) => {
        setauto((prev) => ({...prev, [e.target.name]: e.target.value})); //возможно e.target.name
    };

    useEffect(() => {
        axios.get("http://localhost:3001/get/" + id)
            .then(res => {
                console.log(res.data.Result[0]);

                res.data.Result.map(e => {
                    const date = new Date(e.insurance_end_date);
                    const techDate = new Date(e.tech_inspection_date);

                    const formatter = new Intl.DateTimeFormat('en-GB', {timeZone: 'Europe/Moscow'});

                    e.insurance_end_date = formatter.format(date);
                    e.tech_inspection_date = formatter.format(techDate);
                })
                setauto(res.data.Result[0]);

            })
            .catch(err => console.log(err))
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {

            //auto.insurance_end_date = new Date(auto.insurance_end_date);
            //auto.technical_inspection_date = new Date(auto.technical_inspection_date);

            let select = document.getElementById("tire-type-select");
            auto.tire_season_type = select.options[select.selectedIndex].value;
            let selectAutoType = document.getElementById("select-type-auto");
            auto.type_auto_id = selectAutoType.options[selectAutoType.selectedIndex].value;
            let selectInsuranceTypeId = document.getElementById("select-insurance-type-id");
            auto.insurance_type_id = selectInsuranceTypeId.options[selectInsuranceTypeId.selectedIndex].value;

            auto.insurance_end_date = (auto.insurance_end_date)
                .split('/')
                .reverse()
                .join('-')

            auto.tech_inspection_date = (auto.tech_inspection_date)
                .split('/')
                .reverse()
                .join('-')


            await axios.put(`http://localhost:3001/update/${autoId}`, auto); //http://localhost:3001/update/${autoId}
            navigate("/auto"); //navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='d-flex flex-column align-items-center pt-4'>
            <div className="card w-50">
                <div className="card-header text-center font-weight-bold bg-dark text-white">
                    <h4>Изменить данные о автомобиле</h4>
                </div>
                <div className="card-body align-items-center text-center">
                    <div className="container">
                        <div className="row">
                            <div className="input-group input-group mb-3">
                                <span className="input-group-text">Модель</span>
                                <input
                                    type="text"
                                    className="form-control input-sm"
                                    placeholder='Введите модель'
                                    autoComplete='off'
                                    name="model"
                                    value={auto.model}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group input-group mb-3">
                                <span className="input-group-text">Описание</span>
                                <input
                                    type="text"
                                    className="form-control input-sm"
                                    placeholder='Введите описание'
                                    autoComplete='off'
                                    name="description"
                                    value={auto.description}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group input-group mb-3">
                                <span className="input-group-text">Тип авто</span>
                                <select id="select-type-auto" className="form-select"
                                        aria-label="Floating label select example" onChange={handleChange}>
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
                                    placeholder='Введите объём двигателя'
                                    autoComplete='off'
                                    name="enginecapacity"
                                    step={0.1}
                                    min={0.5}
                                    max={50}
                                    value={auto.enginecapacity}
                                    onChange={handleChange}
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
                                    aria-label="Floating label select example" onChange={handleChange}>
                                    <option value="1">Базовая</option>
                                    <option value="2">Расширенная</option>
                                    <option value="3">Делюкс</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group input-group mb-3">
                                <span className="input-group-text">Действует до</span>
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder='Введите дату'
                                    autoComplete='off'
                                    min="2023-01-01"
                                    name="insurance_end_date"
                                    value={
                                        (auto.insurance_end_date)
                                            .split('/')
                                            .reverse()
                                            .join('-')
                                    }
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group input-group mb-3">
                                <span className="input-group-text">Техосмотр пройден</span>
                                <input
                                    type="date"
                                    className="form-control"
                                    placeholder='Введите дату'
                                    autoComplete='off'
                                    min="2021-01-01"
                                    name="tech_inspection_date"
                                    value={
                                        (auto.tech_inspection_date)
                                            .split('/')
                                            .reverse()
                                            .join('-')
                                    }
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group input-group mb-3">
                                <span className="input-group-text">Расход топлива</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder='Введите расход топлива'
                                    autoComplete='off'
                                    name="fuel_consumption"
                                    step={0.1}
                                    min={0}
                                    max={120}
                                    value={auto.fuel_consumption}
                                    onChange={handleChange}
                                />
                                <span className="input-group-text">л на 100 км</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group input-group mb-3">
                                <span className="input-group-text">Пройденное расстояние в км</span>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder='Введите пробег'
                                    autoComplete='off'
                                    name="distance_traveled"
                                    min={0}
                                    step={0.001}
                                    value={auto.distance_traveled}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-group input-group mb-3">
                                <span className="input-group-text">Установлены шины</span>
                                <select id="tire-type-select" className="form-select"
                                        aria-label="Floating label select example" onChange={handleChange}>
                                    <option value="summer">Летние</option>
                                    <option value="winter">Зимние</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-dark" onClick={handleUpdate}>Обновить</button>
                </div>
            </div>
        </div>
    )
}

export default Editauto