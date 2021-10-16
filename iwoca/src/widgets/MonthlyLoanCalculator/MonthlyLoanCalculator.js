import React, {useState, useEffect} from 'react';
import Table from "../../components/Table/Table";
import Helpers from "../../Helpers/Helpers";
import {Form, InputNumber, Tooltip} from "antd";
import 'antd/dist/antd.css';
import '../widget.css'


const MonthlyLoadCalculator = () => {
    const [amount, setAmount] = useState(10000);
    const [months, setMonths] = useState(4);
    const [interest, setInterest] = useState({
        RFC: 3,
        BL: 3
    });
    const [amountLimits, setAmountLimits] = useState(null);

    /*
        Set up columns with antd
     */
    const columns = [
        {title: 'Repayment Date', dataIndex: 'date'},
        {
            title: 'Principal', dataIndex: 'principal', render: (value, row, index) => {
                return <span>{Helpers.intToCurrency(value, '£')}</span>;
            }
        },
        {
            title: 'Interest', dataIndex: 'interest', render: (value, row, index) => {
                return <span>{Helpers.intToCurrency(value, '£')}</span>;
            }
        },
        {
            title: 'Total Repayment', dataIndex: 'total_repayment', render: (value, row, index) => {
                return <span>{Helpers.intToCurrency(value, '£')}</span>;
            }
        }
    ];


    /*
        On app rendering we want to get the limits from a web api
     */
    useEffect(() => {
        (async () => {
            fetch('https://www.mocky.io/v2/5d4aa9e93300006f000f5ea9')
                .then(response => response.json())
                .then(data => setAmountLimits(data));
        })();
    }, []);


    return (
        <div className="widget-container">
            <Form className="widget-container-header">
                <Form.Item label={<label style={{color: "white"}}>I want to borrow</label>} name="amount">
                    <Tooltip placement="topLeft" title="Enter an amount between 1,000 and 200000" trigger="click">
                        <InputNumber
                            placeholder={amount}
                            defaultValue={amount}
                            value={amount}
                            onChange={(val) => setAmount(val)}
                            formatter={value => `£ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        />
                    </Tooltip>
                    <input id="amount-slider" className="slider" type="range" value={amount} min={1000} max={200000}
                           step={1} onChange={(e) => setAmount(parseInt(e.target.value))}/>
                </Form.Item>
                <Form.Item label={<label style={{color: "white"}}>for</label>} name="months" style={{color: "white"}}>
                    <Tooltip placement="topLeft" title="months" trigger="click">
                        <InputNumber
                            placeholder={months}
                            defaultValue={months}
                            value={months}
                            onChange={(val) => setMonths(val)}
                            formatter={value => value + ' months'}
                        />
                    </Tooltip>
                    <input id="date-slider" className="slider" type="range" value={months} min={1} max={60} step={1}
                           onChange={(e) => setMonths(parseInt(e.target.value))}/>
                </Form.Item>
            </Form>

            <div className="widget-container-body">
                <div className="table-container">
                    <h1>Revolving Credit Facility</h1>
                    <h2>Interest Rate</h2>
                    <InputNumber
                        placeholder={interest.RFC}
                        defaultValue={interest.RFC}
                        value={interest.RFC}
                        onChange={(val) => setInterest({...interest, RFC: val})}
                        formatter={value => value + ' %'}
                    />
                    <Table amount={amount} columns={columns} data-id={"0"} title={"Revolving Credit Facility"}
                       data={Helpers.getMonthlyPaymentValues({
                           amount: amount,
                           months: months,
                           interest: interest.RFC,
                           isBLLoan: false,
                           limits: amountLimits
                       })}/>
                </div>

                <div className="table-container">
                    <h1>Business Loan</h1>
                    <h2>Interest Rate</h2>
                    <InputNumber
                        placeholder={interest.BL}
                        defaultValue={interest.BL}
                        value={interest.BL}
                        onChange={(val) => setInterest({...interest, BL: val})}
                        formatter={value => value + ' %'}
                    />
                    <Table amount={amount} columns={columns} data-id={"1"} title={"Business Loan"}
                       data={Helpers.getMonthlyPaymentValues({
                           amount: amount,
                           months: months,
                           interest: interest.BL,
                           isBLLoan: true,
                           limits: amountLimits
                       })}/>
                </div>
            </div>

        </div>
    );
}

export default MonthlyLoadCalculator;
