import * as React from 'react';
import LineChartOne from '../charts/LineChartOne';
import { colors } from '../../assets/definitions';
import * as moment from 'moment';
import { getSumOfDiffOf2Props } from '../../utils/calc';


const mcc = 'color:yellow;';



export interface FlightHoursPerDayProps {
    logs: any;
    daysInMonth: any;
    isDashboard?: boolean;
}

export interface FlightHoursPerDayState {
    totalHours?: number;
    hoursPerDay?: any;
}

class FlightHoursPerDay extends React.Component<FlightHoursPerDayProps, FlightHoursPerDayState> {
    constructor(props: FlightHoursPerDayProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        // console.log('%c : FlightHoursPerDay -> pubilccomponentDidMount -> this.props', mcc, this.props);
        const { daysInMonth, logs } = this.props;

        // this.calcTotalHours(logs).then((hours: number) => {
            this.calcHoursPerDay(logs, daysInMonth).then(daysWithHourSums => {
                this.setState({
                    totalHours: getSumOfDiffOf2Props(logs, 'HobbsEnd', 'HobbsStart'),
                    hoursPerDay: daysWithHourSums
                });
            });
        // });
    }

    // public calcTotalHours = (logs) => new Promise(resolve => {
    //     const totalHours = getSumOfDiffOf2Props(logs, 'HobbsEnd', 'HobbsStart');
    //     resolve(totalHours);
    // })

    public calcHoursPerDay = (logs, daysArray) => new Promise(resolve => {
        const daysWithHourSums = daysArray.map(d => {
            const logsThisDay = logs.filter(l => moment(l.DepartureDateTime).format('D-ddd') == d);
            const totalHours = getSumOfDiffOf2Props(logsThisDay, 'HobbsEnd', 'HobbsStart');
            return { Day: d, Hours: totalHours };
        });
        resolve(daysWithHourSums);
    })

    public render() {
        const { isDashboard } = this.props;
        const { totalHours, hoursPerDay } = this.state;
        const cardHeadingDiv = <div className='cardHeading'>Flight Hours</div>;
        const totalHoursDiv = <div>Total flight hours this month: {totalHours}</div>;
        const chartHeadingDiv = <div className='chartHeading'>Flight Hours per Day</div>;

        const el_chart = hoursPerDay ?
            <LineChartOne
                data={hoursPerDay}
                dataKey_x='Day'
                dataKey_y1='Hours'
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
                {isDashboard && totalHoursDiv}
                {chartHeadingDiv}
                {el_chart}
            </>
        );
    }
}

export default FlightHoursPerDay;