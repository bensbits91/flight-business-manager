import * as React from 'react';
import LineChartOne from '../charts/LineChartOne';
import { colors } from '../../assets/definitions';
import * as moment from 'moment';


const mcc = 'color:hotpink;';



export interface FlightsPerDayProps {
    logs: any;
    daysInMonth: any;
    isDashboard?: boolean;
}

export interface FlightsPerDayState {
    flightsPerDay?: any;
}

class FlightsPerDay extends React.Component<FlightsPerDayProps, FlightsPerDayState> {
    constructor(props: FlightsPerDayProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        // console.log('%c : FlightsPerDay -> pubilccomponentDidMount -> this.props', mcc, this.props);
        const { daysInMonth, logs } = this.props;

        this.calcFlightsPerDay(logs, daysInMonth).then(daysWithSums => {
            this.setState({
                flightsPerDay: daysWithSums
            });
        });
    }

    public calcFlightsPerDay = (logs, daysArray) => new Promise(resolve => {
        const daysWithSums = daysArray.map(d => {
            const logsThisDay = logs.filter(l => moment(l.DepartureDateTime).format('D-ddd') == d);
            const totalFlights = logsThisDay.length;
            return { Day: d, Flights: totalFlights };
        });
        resolve(daysWithSums);
    })

    public render() {
        const { isDashboard, logs } = this.props;
        const { flightsPerDay } = this.state;
        const cardHeadingDiv = <div className='cardHeading'>Flights</div>;
        const totalFlightsDiv = <div>Total flights this month: {logs.length}</div>;
        const chartHeadingDiv = <div className='chartHeading'>Flights per Day</div>;

        const el_chart = flightsPerDay ?
            <LineChartOne
                data={flightsPerDay}
                dataKey_x='Day'
                dataKey_y1='Flights'
                // dataKey_y2='Guests'
                width={730}
                height={250}
                stroke_color_1={colors.navy}
                // stroke_color_2={colors.mint}
                tooltip
                legend
                cart_grid
            /> : <></>;

        return (
            <>
                {isDashboard && cardHeadingDiv}
                {isDashboard && totalFlightsDiv}
                {chartHeadingDiv}
                {el_chart}
            </>
        );
    }
}

export default FlightsPerDay;