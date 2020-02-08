import React, {Component} from 'react';
import {format} from 'date-fns'
import LineChart from "recharts/lib/chart/LineChart";
import XAxis from "recharts/lib/cartesian/XAxis";
import Tooltip from "recharts/lib/component/Tooltip";
import CartesianGrid from "recharts/lib/cartesian/CartesianGrid";
import Line from "recharts/lib/cartesian/Line";
import YAxis from "recharts/lib/cartesian/YAxis";
import Legend from "recharts/lib/component/Legend";
import {DATE_FORMAT} from "../constants/constants";

class SelectStock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stock: '',
            stockData: [],
            startDate: new Date(),
            endDate: new Date(),
        };
        this.dateChanged = this.dateChanged.bind(this);
    }

    componentDidMount() {
        fetch('/getAllStocksHistory')
            .then(res => res.json())
            //.then(stock => this.setState({stockData:stock},()=> console.log('Stocks fetched..')));
            .then(stock => Object.values(stock))
            .then(data => {
                let stockData = null;
                if (data.length !== 0) {
                    stockData = data.map((stock, index) => {
                        if (index === 0)
                            this.setState({startDate: new Date(stock.date)});
                        else {
                            if (index === data.length - 1)
                                this.setState({endDate: new Date(stock.date)})
                        }
                        return {
                            name: format(new Date(stock.date), DATE_FORMAT),
                            date: new Date(stock.date),
                            closePrice: stock.closePrice,
                            pv: 10,
                            amt: stock.closePrice
                        }
                    });
                }
                this.setState({stockData: stockData});

            });
        // .then(info => this.setState({stockData:info}).then(console.log(this.state.stockData)));
    }

    dateChanged(event) {
        this.setState({
            ...this.state,
            [event.target.id]: event.target.value
        })
    }

    render() {

        return (
            <div>
                <LineChart width={2000} height={1000} data={
                    this.state.stockData.filter(ele =>
                        format(new Date(ele.date), DATE_FORMAT) >= format(new Date(this.state.startDate), DATE_FORMAT)
                        &&
                        format(new Date(ele.date), DATE_FORMAT) >= format(new Date(this.state.endDate), DATE_FORMAT)
                    )}
                           margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend/>
                    <Line type="monotone" dataKey="closePrice" stroke="#8884d8" activeDot={{r: 8}}/>
                    <Line type="monotone" dataKey="pv" stroke="#82ca9d"/>
                </LineChart>

                <div>
                    <input type="date" id="startDate" name="trip-start"
                           onChange={event => this.dateChanged(event)}
                           value={format(new Date(this.state.startDate), 'YYYY-MM-DD')}
                           min="2010-01-01" max={format(new Date(), 'YYYY-MM-DD')}/>
                    <span> to: </span>
                    <input type="date" id="endDate" name="trip-start"
                           onChange={event => this.dateChanged(event)}
                           value={format(new Date(this.state.endDate), 'YYYY-MM-DD')}
                           min={format(new Date(this.state.startDate), 'YYYY-MM-DD')} max={format(new Date(), 'YYYY-MM-DD')}/>
                </div>

            </div>

        );

    }
}

export default SelectStock;