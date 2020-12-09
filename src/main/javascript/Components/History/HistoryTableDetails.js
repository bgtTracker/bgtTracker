import React from 'react'
import HistoryTable from './HistoryTable.js'
import clientJson from '../../clientJson.js';
import { Create } from '@material-ui/icons';

export default function HistoryTableDetails(props) {
//   const [state, setState] = React.useState();

//   let fromDate;
//   let toDate;
//   let now = new Date;

//   switch(props.period){
//       case 'thisMonth':
//           toDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
//           fromDate = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
//           break;
//       case 'thisYear':
//           toDate = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
//           fromDate = new Date(now.getFullYear(), 0, 1).getTime();
//           break;
//       case 'lastYear':
//           toDate = new Date(now.getFullYear(), 11, 31).getTime();
//           fromDate = new Date(now.getFullYear(), 0, 1).getTime();
//           break;
//       case 'customPeriod':
//           toDate = props.to.getTime();
//           fromDate = props.from.getTime();
//           break;
//       default:
//           console.log("Wrong Period");
//           return( 
//           <div>
//               <h1> Wrong period</h1>
//           </div>
//           )
//   }

//   React.useEffect(() =>{
//     clientJson({method: 'GET', path: '/testapi/summary/', params: {
//         from: fromDate,
//         to: toDate,
//         usrid: props.userID
//     }}).done((response) => {
//         console.log(response.entity);
//         let rows = createRows(response);
//         setState(rows);       
//     })
// }, []);

// function createDetails(id, date, type, name, amount)
// {
//     return{id, date, type, name, amount};
// }

// function createData(id, date, expenses, income, balance, d) {
//     return {
//       id, 
//       date,
//       expenses,
//       income,
//       balance, 
//       details: d
//     };
//   }

// function createRows(resposne) {
//   let rows = [];
//   let expansesIndex = 0;
//   let incomesIndex = 0;
//   console.log(resposne);
//   console.log(resposne.entity.expenses.data.length);
//     for(let i = 0; i<resposne.entity.expenses.data.length; i++)
//     {
//       console.log(1);
//       if(resposne.entity.expenses.data[i] != 0 || resposne.entity.incomes.data[i] != 0)
//       {
//       let details = [];
//       if(resposne.entity.expenses.data[i] != 0)
//       {
//         let detail = createDetails(
//           i,
//           new Date(resposne.entity.expenses.history[expansesIndex].Date).toLocaleString(),
//           resposne.entity.expenses.history[expansesIndex].Category,
//           resposne.entity.expenses.history[expansesIndex].Name,
//           resposne.entity.expenses.history[expansesIndex].Amount
//         );
//         details.push(detail);
//         expansesIndex++;
//       }
//       if(resposne.entity.incomes.data[i] != 0)
//       {
//         let detail = createDetails(
//           i+resposne.entity.expenses.data.length,
//           new Date(resposne.entity.incomes.history[incomesIndex].Date).toLocaleString(),
//           resposne.entity.incomes.history[incomesIndex].Category,
//           resposne.entity.incomes.history[incomesIndex].Name,
//           resposne.entity.incomes.history[incomesIndex].Amount
//         );
//         details.push(detail);
//         incomesIndex++;
//       }
//       rows.push(createData(i,
//         new Date(resposne.entity.expenses.labels[i]).toDateString(),
//         resposne.entity.expenses.data[i],
//         resposne.entity.incomes.data[i],
//         resposne.entity.BalanceData.data[i],
//         details
//         ));
//     }
//   }
//   console.log(rows);
//   return rows;
// }

  return (
    <div>
      {/* {state === undefined ? <h1>Loading...</h1> : <HistoryTable details={true} rows={state}/> } */}
      <HistoryTable details={true}/>
    </div>
  )
}
