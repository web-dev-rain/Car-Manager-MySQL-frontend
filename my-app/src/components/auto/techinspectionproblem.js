import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

function TechInspectionProblem() {
    const [data, setData] = useState([])

    function getCurrentSeason() {
        let currentDate = new Date();
        let currentMonth = currentDate.getMonth();

        if (currentMonth > 10 || currentMonth < 2) {
            return "Зимний";
        } else {
            return "Летний";
        }
    }

    let dataArr;
    let season = getCurrentSeason();
    useEffect(() => {
        axios.get('http://localhost:3001/techInspectionProblem')
            .then(res => {
                if (res.data.Status === "Success") {
                    console.log(res.data.Result);
                    res.data.Result.map(e => {
                        const date = new Date(e.tech_inspection_date);
                        const techDate = new Date(e.next_tech_inspection);
                        const formatter = new Intl.DateTimeFormat('en-GB', {timeZone: 'Europe/Moscow'});
                        e.tech_inspection_date = formatter.format(date);
                        e.next_tech_inspection = formatter.format(techDate);

                        let days = Math.abs(e.days_until_next_tech);
                        e.days_until_next_tech = days;
                    })
                    setData(res.data.Result);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/' + id)
            .then(res => {
                if (res.data.Status === "Success") {
                    window.location.reload(true);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='px-5 py-3'>
            <div className='d-flex justify-content-center mt-2'>
                <h3>Не пройден техосмотр</h3>
            </div>

            <div className='mt-3'>
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                    <tr>
                        <th className="text-center">Модель</th>
                        <th className="text-center">Техосмотр пройден</th>
                        <th className="text-center">Просрочен с</th>
                        <th className="text-center">Просрочен на</th>
                        <th className="text-center">Пробег</th>
                        <th className="text-center">Объём двигателя</th>
                        <th className="text-center">Действие</th>
                    </tr>
                    </thead>
                    <tbody className="table-hover">
                    {data.map((auto, index) => {

                        return <tr key={index}>
                            <td className="text-center">{auto.model}</td>
                            <td className="text-center">{auto.tech_inspection_date}</td>
                            <td className="text-center">{auto.next_tech_inspection}</td>
                            <td className="text-center">{auto.days_until_next_tech} дн.</td>
                            <td className="text-center">{auto.distance_traveled} км</td>
                            <td className="text-center">{auto.enginecapacity} л.</td>


                            <td>
                                <div className="btn-group w-100" role="group"
                                     aria-label="Basic mixed styles example">
                                    <Link to={`/showauto/` + auto.id}
                                          className='btn btn-outline-dark btn-sm'>Инфо</Link>
                                    <Link to={`/autoedit/` + auto.id}
                                          className='btn btn-secondary btn-sm'>Изменить</Link>
                                    <button onClick={e => handleDelete(auto.id)}
                                            className='btn btn-sm btn-dark'>Удалить
                                    </button>
                                </div>
                            </td>
                        </tr>
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TechInspectionProblem