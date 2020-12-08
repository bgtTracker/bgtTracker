import React from 'react'
import { CSVDownload } from "react-csv";
import PropTypes from 'prop-types';

export default function CSVexporter(props) {

    return (
        <div>
            <CSVDownload data={props.data} headers={props.labels} target="_blank"/>
        </div>
    )
}

CSVexporter.propsTypes = {
    labels: PropTypes.object.isRequired,
    data: PropTypes.array.isRequired,
}