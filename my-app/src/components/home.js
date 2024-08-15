import React, {useEffect, useState} from 'react'
import axios from 'axios'
import auto from "./auto/auto";

function Home() {
    const [fuelconsumptionAVG, setfuelconsumptionAVG] = useState()
    const [autoCount, setAutoCount] = useState()
    const [sumOfSpentFuel, setSumOfSpentFuel] = useState()
    const [insuranceEndCount, setInsuranceEndCount] = useState()
    const [techInspectionProblemCount, setTechInspectionProblemCount] = useState()
    const [wrongTiresCount, setWrongTiresCount] = useState()
    const [popular_model, setPopularModel] = useState()
    const [model_count, setModelCount] = useState()
    const [sumDistanceTraveled, setSumDistanceTraveled] = useState()
    const [averageEnginecapacity, setAverageEnginecapacity] = useState()

    useEffect(() => {
        axios.get('http://localhost:3001/averageFuelConsumption')
            .then(res => {
                let avg = res.data[0].averageFuelConsumption;
                setfuelconsumptionAVG(avg.toFixed(2))
            }).catch(err => console.log(err));

        axios.get('http://localhost:3001/autoCount')
            .then(res => {
                setAutoCount(res.data[0].auto)
            }).catch(err => console.log(err));

        axios.get('http://localhost:3001/sumOfSpentFuel')
            .then(res => {
                setSumOfSpentFuel(res.data[0].sumOfSpentFuel)
            }).catch(err => console.log(err));

        axios.get('http://localhost:3001/insuranceEndCount')
            .then(res => {
                setInsuranceEndCount(res.data[0].insuranceEndCount)
            }).catch(err => console.log(err));

        axios.get('http://localhost:3001/techInspectionProblemCount')
            .then(res => {
                setTechInspectionProblemCount(res.data[0].techInspectionProblemCount)
            }).catch(err => console.log(err));

        axios.get('http://localhost:3001/wrongTypeTireCount')
            .then(res => {
                setWrongTiresCount(res.data[0].wrongTiresCount)
            }).catch(err => console.log(err));

        axios.get('http://localhost:3001/sumOfDistanceTraveled')
            .then(res => {
                setSumDistanceTraveled(res.data[0].sumDistanceTraveled)
            }).catch(err => console.log(err));

        axios.get('http://localhost:3001/popularType')
            .then(res => {
                setPopularModel(res.data[0].popular_model)
                setModelCount(res.data[0].model_count)
            }).catch(err => console.log(err));

        axios.get('http://localhost:3001/averageEnginecapacity')
            .then(res => {
                let avg = res.data[0].averageEnginecapacity;
                setAverageEnginecapacity(avg.toFixed(2));
            }).catch(err => console.log(err));

    }, [])

    return (
        <div>
            <div className='p-3 d-flex justify-content-around mt-3 text-center'>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25 rounded-3'>
                    <div className='pb-1'>
                        <h4>Ср. расход топлива</h4>
                    </div>
                    <hr/>
                    <div>
                        <h5>{fuelconsumptionAVG} л. на 100 км: </h5>
                    </div>
                </div>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25 rounded-3'>
                    <div className='text-center pb-1'>
                        <h4>Авто</h4>
                    </div>
                    <hr/>
                    <div>
                        <h5>Всего: {autoCount} авто</h5>
                    </div>
                </div>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25 rounded-3'>
                    <div className='text-center pb-1'>
                        <h4>Самая популярная</h4>
                    </div>
                    <hr/>
                    <div>
                        <h5 className='text-center'>{popular_model} - {model_count} авто</h5>
                    </div>
                </div>
            </div>
            <div className='p-3 d-flex justify-content-around mt-3 text-center'>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25 rounded-3'>
                    <div className='text-center pb-1'>
                        <h4>Просрочена страховка</h4>
                    </div>
                    <hr/>
                    <div>
                        <h5 className='text-center'>{insuranceEndCount} авто</h5>
                    </div>
                </div>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25 rounded-3'>
                    <div className='text-center pb-1'>
                        <h4>Не пройден техосмотр</h4>
                    </div>
                    <hr/>
                    <div>
                        <h5 className='text-center'>{techInspectionProblemCount} авто</h5>
                    </div>
                </div>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25 rounded-3'>
                    <div className='text-center pb-1'>
                        <h4>Нужна замена шин</h4>
                    </div>
                    <hr/>
                    <div>
                        <h5 className='text-center'>{wrongTiresCount} авто</h5>
                    </div>
                </div>
            </div>
            <div className='p-3 d-flex justify-content-around mt-3 text-center'>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25 rounded-3'>
                    <div className='pb-1'>
                        <h4>Потрачено топлива</h4>
                    </div>
                    <hr/>
                    <div>
                        <h5>Всего: {sumOfSpentFuel} л.</h5>
                    </div>
                </div>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25 rounded-3'>
                    <div className='text-center pb-1'>
                        <h4>Общий пробег</h4>
                    </div>
                    <hr/>
                    <div>
                        <h5 className='text-center'>Всего: {sumDistanceTraveled} км.</h5>
                    </div>
                </div>
                <div className='px-3 pt-2 pb-3 border shadow-sm w-25 rounded-3'>
                    <div className='text-center pb-1'>
                        <h4>Средний V двигателя</h4>
                    </div>
                    <hr/>
                    <div>
                        <h5 className='text-center'>Всего: {averageEnginecapacity} л.</h5>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home