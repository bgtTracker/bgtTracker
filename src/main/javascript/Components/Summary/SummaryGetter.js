import React, {useState, useEffect} from 'react';
import Charts from '../Charts/Charts.js';
import clientJson from '../../clientJson.js';
import { SystemUpdate } from '@material-ui/icons';

const fromatData = (date) => {
    let dataStr = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+(date.getDate());
    return dataStr
}



export default function SummaryGetter(props) {

    const [state, setState] = useState();

    let fromDate;
    let toDate;
    let now = new Date;

    switch(props.period){
        case 'thisMonth':
            toDate = fromatData(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
            fromDate = fromatData(new Date(now.getFullYear(), now.getMonth(), 1));
            break;
        case 'thisYear':
            toDate = fromatData(new Date(now.getFullYear(), now.getMonth(), now.getDate()));
            fromDate = fromatData(new Date(fromDate.getFullYear(), 0, 1));
            break;
        case 'lastYear':
            toDate = fromatData(new Date(now.getFullYear(), 11, 31));
            fromDate = fromatData(new Date(now.getFullYear(), 0, 1));
            break;
        case 'customPeriod':
            toDate = fromatData(props.to);
            fromDate = fromatData(props.from);
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
        }}).done((response) => {
            setState(response.entity);       
        })
    }, []);

    return (
        <div>
            {state === undefined ? <h1>Loading...</h1> : <Charts categoryData={state.CategoryData} balanceData = {state.BalanceData} monthChartData={state.expenses}/> }
        </div>
    )
}
