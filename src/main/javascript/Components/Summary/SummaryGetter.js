import React, {useState, useEffect} from 'react';
import Charts from '../Charts/Charts.js';
import clientJson from '../../clientJson.js';


export default function SummaryGetter(props) {

    const [state, setState] = useState();

    let fromDate;
    let toDate;
    let now = new Date;

    switch(props.period){
        case 'thisMonth':
            toDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime().toString();
            fromDate = new Date(now.getFullYear(), now.getMonth(), 1).getTime().toString();
            break;
        case 'thisYear':
            toDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime().toString();
            fromDate = new Date(now.getFullYear(), 0, 1).getTime().toString();
            break;
        case 'lastYear':
            toDate = new Date(now.getFullYear(), 11, 31).getTime().toString();
            fromDate = new Date(now.getFullYear(), 0, 1).getTime().toString();
            break;
        case 'customPeriod':
            toDate = props.to.getTime().toString();
            fromDate = props.from.getTime().toString();
            break;
        default:
            console.log("Wrong Period");
            return( 
            <div>
                <h1> Wrong period</h1>
            </div>
            )
    }

    useEffect(() =>{
        clientJson({method: 'GET', path: '/testapi/summary/', params: {
            from: fromDate,
            to: toDate,
            usrid: props.userID
        }}).then((response) => {
            setState(response.entity);       
        })
    }, []);

    return (
        <div>
            {state === undefined ? <h1>Loading...</h1> : <Charts categoryData={state.CategoryData} balanceData = {state.BalanceData} monthChartData={state.expenses}/> }
        </div>
    )
}
