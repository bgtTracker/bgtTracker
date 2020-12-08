import React from 'react'
import PropTypes from 'prop-types';

export default function DataConveret(headCells, data, selected) {
    console.log(data);
    console.log(selected);
    let labels = [];
    for(let i = 0; i < headCells.length; i++)
    {
       labels.push({
         label: headCells[i].label,
         key: headCells[i].id
       })
    }
    
    let retData = [];
    for(let i = 0; i< data.length ; i++)
    {
        console.log(data[i]);
        if(selected.includes(data[i].id))
            retData.push(data[i]);
    }
    let ret =         {
        data: retData,
        labels: labels
    };
    return ret;
}
