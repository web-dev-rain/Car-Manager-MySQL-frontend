import axios from 'axios';
import React, {useState, useEffect} from 'react'
import {Link, useLocation, useNavigate, useParams} from "react-router-dom";

function ShowAuto() {
    const {id} = useParams();
    const [auto, setauto] = useState({
        model: "",
        description: "",
        auto_type: "",
        enginecapacity: "",
        insurance_type: "",
        insurance_end_date: "",
        fuel_consumption: "",
        distance_traveled: "",
        tire_season_type: "",
        remaining_days: "",
        tech_inspection_date: "",
        next_tech_inspection: "",
        days_until_next_tech: "",
        spent_fuel: "",
        replace_tires_need: ""
    });

    const location = useLocation();
    const navigate = useNavigate();

    const autoId = location.pathname.split("/")[2];
    const handleChange = (e) => {
        setauto((prev) => ({...prev, [e.target.name]: e.target.value})); //возможно e.target.name
    };

    useEffect(() => {
        axios.get("http://localhost:3001/get/" + id)
            .then(res => {
                console.log(res.data.Result[0])
                res.data.Result.map(e => {
                    const date = new Date(e.insurance_end_date);
                    const techDate = new Date(e.tech_inspection_date);
                    const nextDate = new Date(e.next_tech_inspection);

                    const formatter = new Intl.DateTimeFormat('en-GB', {timeZone: 'Europe/Moscow'});
                    e.insurance_end_date = formatter.format(date);
                    e.tech_inspection_date = formatter.format(techDate);
                    e.next_tech_inspection = formatter.format((nextDate));
                    // const date2 = new Date(e.next_technical_inspection_date);
                    // e.next_technical_inspection_date = formatter.format(date2);
                })
                setauto(res.data.Result[0]);
            })
            .catch(err => console.log(err))

    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {

            auto.insurance_end_date = new Date(auto.insurance_end_date);
            await axios.put(`http://localhost:3001/update/${autoId}`, auto);
            navigate("/auto"); //navigate("/");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='d-flex flex-column align-items-center pt-2 mt-4'>
            <div className="card w-50 border-dark">
                <div className="card-header text-center font-weight-bold bg-dark text-white">
                    <h2>{auto.model}</h2>
                </div>
                <div className="card-body align-items-center text-center">
                    <h5 className="card-title text-center">Основная информация</h5>
                    <div className="container pb-2">
                        <div className="row align-items-start">
                            <div className="col text-end">Описание</div>
                            <div className="col text-start">{auto.description}</div>
                        </div>
                        <div className="row align-items-start">
                            <div className="col text-end">Тип</div>
                            <div className="col text-start">{auto.auto_type}</div>
                        </div>
                        <div className="row align-items-center">
                            <div className="col text-end">Объём двигателя</div>
                            <div className="col text-start">{auto.enginecapacity}</div>
                        </div>
                        <div className="row align-items-end">
                            <div className="col text-end">Расход топлива</div>
                            <div className="col text-start">{auto.fuel_consumption} л. на 100 км</div>
                        </div>
                        <div className="row align-items-end">
                            <div className="col text-end">Пройденное расстояние</div>
                            <div className="col text-start">{auto.distance_traveled} км</div>
                        </div>
                        <div className="row align-items-end">
                            <div className="col text-end">Израсходовано топлива</div>
                            <div className="col text-start">{auto.spent_fuel} л.</div>
                        </div>
                        <h5 className="card-title text-center">Страховка</h5>
                        <div className="row align-items-center">
                            <div className="col text-end">Тип страховки</div>
                            <div className="col text-start">{auto.insurance_type}</div>
                        </div>
                        <div className="row align-items-end">
                            <div className="col text-end">Страховка заканчивается</div>
                            <div className="col text-start">{auto.insurance_end_date}</div>
                        </div>
                        <div className="row align-items-end">
                            <div className="col text-end">До окончания страховки</div>
                            <div className="col text-start">{auto.remaining_days} дн.</div>
                        </div>
                        <h5 className="card-title text-center">Техосмотр</h5>
                        <div className="row align-items-end">
                            <div className="col text-end">Техосмотр пройден</div>
                            <div className="col text-start">{auto.tech_inspection_date}</div>
                        </div>
                        <div className="row align-items-end">
                            <div className="col text-end">Следующий техосмотр</div>
                            <div className="col text-start">{auto.next_tech_inspection}</div>
                        </div>
                        <div className="row align-items-end">
                            <div className="col text-end">До следующего техосмотра</div>
                            <div className="col text-start">{auto.days_until_next_tech} дн.</div>
                        </div>

                        <h5 className="card-title text-center">Шины</h5>
                        <div className="row align-items-end">
                            <div className="col text-end">Установлены шины</div>
                            <div className="col text-start">{auto.tire_season_type}</div>
                        </div>
                        <div className="row align-items-end">
                            <div className="col text-end">Нужно ли менять шины</div>
                            <div className="col text-start">{auto.replace_tires_need}</div>
                        </div>
                    </div>
                    <div className="btn-group" role="group" aria-label="Basic outlined example">
                        <Link to={`/auto`} className='btn btn-outline-dark'>Назад</Link>
                        <Link to={`/autoedit/` + autoId} className='btn btn-dark btn'>Изменить</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowAuto