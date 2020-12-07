import React from 'react'
import { CSVDownload } from "react-csv";
import PropTypes from 'prop-types';

export default function CSVexporter() {

    const data = props.lables.concat(props.data);

    return (
        <div>
            <CSVDownload data={data} target="_blank"/>
        </div>
    )
}

CSVexporter.propsTypes = {
    lables: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
}