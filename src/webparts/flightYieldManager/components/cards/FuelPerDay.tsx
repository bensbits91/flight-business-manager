import * as React from 'react';
import LineChartOne from '../charts/LineChartOne';
import { colors } from '../../assets/definitions';
import * as moment from 'moment';

import { getSumOfDiffOf2Props, getSumOf1Prop } from '../../utils/calc';

const mcc = 'background-color:yellow;color:black;';



export interface FuelPerDayProps {
    logs: any;
    daysInMonth: any;
    isDashboard?: boolean;
}

export interface FuelPerDayState {
    totalFuelUsed?: number;
    totalFuelPurchased?: number;
    fuelPerDay?: any;
}

class FuelPerDay extends React.Component<FuelPerDayProps, FuelPerDayState> {
    constructor(props: FuelPerDayProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        // console.log('%c : FuelPerDay -> pubilccomponentDidMount -> this.props', mcc, this.props);

        const { logs, daysInMonth } = this.props;

        this.calcFuelPerDay(logs, daysInMonth).then(daysWithFuel => {
            this.setState({
                totalFuelUsed: getSumOfDiffOf2Props(logs, 'FuelIn', 'FuelOut'),
                totalFuelPurchased: getSumOf1Prop(logs, 'FuelPurchased'),
                fuelPerDay: daysWithFuel
            });
        });
    }

    public calcFuelPerDay = (logs, daysArray) => new Promise(resolve => {
        const daysWithFuel = daysArray.map(d => {
            const logsThisDay = logs.filter(l => moment(l.DepartureDateTime).format('D-ddd') == d);
            const fuelUsed = getSumOfDiffOf2Props(logsThisDay, 'FuelIn', 'FuelOut');
            const fuelPurchased = getSumOf1Prop(logsThisDay, 'FuelPurchased');
            return {
                Day: d,
                'Fuel Used': fuelUsed,
                'Fuel Purchased': fuelPurchased
            };
        });
        resolve(daysWithFuel);
    })

    public render() {

        const { isDashboard } = this.props;
        const { totalFuelUsed, totalFuelPurchased, fuelPerDay } = this.state;
        const cardHeadingDiv = <div className='cardHeading'>Fuel</div>;
        const totalFuelUsedDiv = <div>Total fuel used this month: {totalFuelUsed}</div>;
        const totalFuelPurchasedDiv = <div>Total fuel purchased this month: {totalFuelPurchased}</div>;
        const chartHeadingDiv = <div className='chartHeading'>Fuel per Day</div>;

        const el_chart = fuelPerDay ?
            <LineChartOne
                data={fuelPerDay}
                dataKey_x='Day'
                dataKey_y1='Fuel Used'
                dataKey_y2='Fuel Purchased'
                width={730}
                height={250}
                stroke_color_1={colors.navy}
                stroke_color_2={colors.mint}
                tooltip
                legend
                cart_grid
            /> : <></>;

        return (
            <>
                {isDashboard && cardHeadingDiv}
                {isDashboard && totalFuelUsedDiv}
                {isDashboard && totalFuelPurchasedDiv}
                {chartHeadingDiv}
                {el_chart}
            </>
        );
    }
}

export default FuelPerDay;