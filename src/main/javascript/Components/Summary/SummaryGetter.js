import React, {useState, useEffect} from 'react';
import Charts from '../Charts/Charts.js';
import clientJson from '../../clientJson.js';

export default function SummaryGetter(props) {

    const [state, setState] = useState();

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];
    let monthChartData = {
        labels : ["2020-11-00", "2020-11-01", "2020-11-02", "2020-11-03", "2020-11-04", "2020-11-05", "2020-11-06", "2020-11-07", 
        "2020-11-08", "2020-11-09", "2020-11-10", "2020-11-11", "2020-11-12", "2020-11-13", "2020-11-14", "2020-11-15", 
        "2020-11-16", "2020-11-17", "2020-11-18", "2020-11-19", "2020-11-20", "2020-11-21", "2020-11-22", "2020-11-23", 
        "2020-11-24", "2020-11-25", "2020-11-26", "2020-11-27", "2020-11-28", "2020-11-29"],
        data: [2805, 632, 3110, 1902, 3068, 1810, 2422, 1033, 2055, 1221, 2067, 2036, 2110, 1535, 1951, 3341, 2786, 525, 1842, 3090, 1061, 2918, 3044, 3827, 1492, 2413, 2581, 2375, 2694, 2188],
        name: "Expenses"
    }

    let SpentCirceData = {
        labels: ["Spent This Month"],
        data: [87]
    }

    let CategoryData = {
        labels: ['Food', 'Home', 'Car', 'Commute', 'Luxuries'],
        data: [1000, 400, 500, 150, 400],
        name: "Expanses by category"
    }

    let BalanceData = {
        labels: ["2020-11-00", "2020-11-01", "2020-11-02", "2020-11-03", "2020-11-04", "2020-11-05", "2020-11-06", "2020-11-07", 
        "2020-11-08", "2020-11-09", "2020-11-10", "2020-11-11", "2020-11-12", "2020-11-13", "2020-11-14", "2020-11-15", 
        "2020-11-16", "2020-11-17", "2020-11-18", "2020-11-19", "2020-11-20", "2020-11-21", "2020-11-22", "2020-11-23", 
        "2020-11-24", "2020-11-25", "2020-11-26", "2020-11-27", "2020-11-28", "2020-11-29"],
        data: [886, -279, -237, -886, -168, -159, 1245, 1991, 337, 1714, -223, 1717, 386, 252, -546, 1832, 592, -879, 1071, -908, -89, 1118, 1211, -823, 810, 1189, 1263, 377, 999, 1103],
        labelsType: 'datetime',
        name: "Balance for day: "
    }

    useEffect(() =>{
        clientJson({method: 'GET', path: '/testapi/summary/'}).done((response) => {
            setState(response.entity);
            console.log(response.entity);       
        })
    }, []);

    return (
        <div>
            {state === undefined ? <h1>Loading...</h1> : <Charts categoryData={state.CategoryData} balanceData = {state.BalanceData} monthChartData={state.expenses}/> }
        </div>
    )
}
