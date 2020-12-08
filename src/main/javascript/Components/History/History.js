import React from 'react'
import HistoryTable from './HistoryTable.js'

export default function History() {
    let headCells = [
        { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
        { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
        { id: 'account', numeric: false, disablePadding: false, label: 'Account' }, //?? acount numberic or not
        { id: 'amount', numeric: true, disablePadding: false, label: 'Amount' },
      ];

    return (
        <div>
             <HistoryTable details={false} headCells={headCells}/>        
        </div>
    )
}
