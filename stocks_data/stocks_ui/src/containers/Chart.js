import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData:props.chartData
        }
    }

    static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right',
        location:'City'
    };

    render(){
        return (
            <div className="chart">
                <Line
                    data={this.state.chartData}
                    height={500}
                    options={{
                        title:{
                            display:this.props.displayTitle,
                            text:this.props.location,
                            fontSize:25
                        },
                        legend:{
                            display:this.props.displayLegend,
                            position:this.props.legendPosition
                        },
                        maintainAspectRatio: false
                    }}
                />
            </div>
        )
    }
}

export default Chart;