import React, {useState} from 'react';
import './table.css'
import BarGraph from '../BarGraph/BarGraph'
import {FaList, FaChartBar} from "react-icons/fa"
import {Table} from 'antd'
import Helpers from '../../Helpers/Helpers'

const Tables = (props) => {
    const [view, changeView] = useState('table');

    return (
        <>
            <div className="switch-field">
                <input type="radio" id={"radio-one" + props['data-id']} name={"switch-one" + props['data-id']}
                       value="table" checked={view === 'table'}
                       onChange={(e) => changeView(e.target.value)}/>
                <label htmlFor={"radio-one" + props['data-id']}><FaList/></label>
                <input type="radio" id={"radio-two" + props['data-id']} name={"switch-two" + props['data-id']}
                       value="graph" checked={view === 'graph'}
                       onChange={(e) => changeView(e.target.value)}/>
                <label htmlFor={"radio-two" + props['data-id']}><FaChartBar/></label>
            </div>

            {
                view === 'graph' ?
                    <BarGraph id={props['data-id']} data={props.data}></BarGraph>
                    : <div className="table-wrapper">
                        <Table key={'table + props["data-id"]'} dataSource={props.data} columns={props.columns} pagination={false}
                           locale={{emptyText: 'Those inputs are not eligible for this type of loan'}} bordered
                           summary={pageData => {
                               return (
                                   <>
                                       <Table.Summary.Row>
                                           <Table.Summary.Cell>Total</Table.Summary.Cell>
                                           <Table.Summary.Cell>
                                               {Helpers.intToCurrency(props.amount, '£')}
                                           </Table.Summary.Cell>
                                           <Table.Summary.Cell>
                                               {Helpers.intToCurrency(Helpers.reduceSum(props.data, 'interest'), '£')}
                                           </Table.Summary.Cell>
                                           <Table.Summary.Cell>
                                               {Helpers.intToCurrency(Helpers.reduceSum(props.data, 'total_repayment'), '£')}
                                           </Table.Summary.Cell>
                                       </Table.Summary.Row>
                                   </>
                               );
                           }}/>

                    </div>
            }
        </>
    );
}

export default Tables;
