import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function SortByRemDays() {
    const [data, setData] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:3001/sortByDays')
            .then(res => {
                if (res.data.Status === "Success") {
                    console.log(res.data.Result);
                    res.data.Result.map(e => {
                        const date = new Date(e.insurance_end_date);
                        const formatter = new Intl.DateTimeFormat('en-GB', {timeZone: 'Europe/Moscow'});
                        e.insurance_end_date = formatter.format(date);
                    })
                    setData(res.data.Result);
                } else {
                    alert("Error")
                }
            })
            .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:3001/delete/'+id)
            .then(res => {
                if(res.data.Status === "Success") {
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
                <h3>Контроль состояния автомобилей</h3>
            </div>
            <div className="row">
                <div className="btn-group" role="group" aria-label="Basic outlined example">
                    <Link to="/sortbymodel" className='btn btn-outline-dark'>Сортировать по модели</Link>
                    <Link to="/sortbyremdays" className='btn btn-outline-dark'>Сортировать по дате</Link>
                    <Link to="/sortbydistancetraveled" className='btn btn-outline-dark'>Сортировать по пробегу</Link>
                </div>
            </div>

            <div className='mt-3'>
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                    <tr>
                        <th className="text-center">Модель</th>
                        <th className="text-center">Объём двигателя</th>
                        <th className="text-center">Расход топлива</th>
                        <th className="text-center">Пройденное расстояние</th>
                        <th className="text-center">Страховка заканчивается</th>
                        <th className="text-center">Действие</th>
                    </tr>
                    </thead>
                    <tbody className="table-hover">
                    {data.map((auto, index) => {

                        return <tr key={index}>
                            <td className="text-center">{auto.model}</td>
                            <td className="text-center">{auto.enginecapacity} л.</td>
                            <td className="text-center">{auto.fuel_consumption} л. на 100 км</td>
                            <td className="text-center">{auto.distance_traveled} км</td>
                            <td className="text-center">{(auto.insurance_end_date)}</td>


                            <td>
                                <div className="btn-group w-100" role="group" aria-label="Basic mixed styles example">
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
                <div className="text-center"><Link to="/create" className='btn btn-dark'>Добавить</Link></div>
            </div>
        </div>
    )
}

export default SortByRemDays