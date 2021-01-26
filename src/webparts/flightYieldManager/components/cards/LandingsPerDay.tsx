import * as React from 'react';
import LineChartOne from '../charts/LineChartOne';
import { colors } from '../../assets/definitions';
import * as moment from 'moment';


const mcc = 'background-color:yellow;color:black;';



export interface LandingsPerDayProps {
    logs: any;
    daysInMonth: any;
    isDashboard?: boolean;
}

export interface LandingsPerDayState {
    landingsPerDay?: any;
}

class LandingsPerDay extends React.Component<LandingsPerDayProps, LandingsPerDayState> {
    constructor(props: LandingsPerDayProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        // console.log('%c : LandingsPerDay -> pubilccomponentDidMount -> this.props', mcc, this.props);
        const { logs, daysInMonth } = this.props;

        this.calcLandingsPerDay(logs, daysInMonth).then(daysWithLandings => {
            this.setState({
                landingsPerDay: daysWithLandings
            });
        });
    }

    public calcLandingsPerDay = (logs, daysArray) => new Promise(resolve => {
        const daysWithLandings = daysArray.map(d => {
            const logsThisDay = logs.filter(l => moment(l.DepartureDateTime).format('D-ddd') == d);
            const totalNightLandings = logsThisDay.filter(nrl => nrl.DayNight == 'N').length;
            const totalDayLandings = logsThisDay.filter(nrl => nrl.DayNight == 'D').length;
            const totalNRLandings = logsThisDay.filter(nrl => nrl.DayNight == 'NR').length;
            return {
                Day: d,
                'Night Landings': totalNightLandings,
                'Day Landings': totalDayLandings,
                'Non-Revenue': totalNRLandings
            };
        });
        resolve(daysWithLandings);
    })

    public render() {

        const { isDashboard, logs } = this.props;
        const { landingsPerDay } = this.state;
        const cardHeadingDiv = <div className='cardHeading'>Landings</div>;
        const totalFlightsDiv = <div>Total landings this month: {logs ? logs.length : 0}</div>;
        const chartHeadingDiv = <div className='chartHeading'>Landings per Day</div>;

        const el_chart = landingsPerDay ?
            <LineChartOne
                data={landingsPerDay}
                dataKey_x='Day'
                dataKey_y1='Night Landings'
                dataKey_y2='Day Landings'
                dataKey_y3='Non-Revenue'
                width={730}
                height={250}
                stroke_color_1={colors.navy}
                stroke_color_2={colors.mint}
                stroke_color_3={colors.pink}
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

export default LandingsPerDay;