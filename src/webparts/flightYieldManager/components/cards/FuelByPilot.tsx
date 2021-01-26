import * as React from 'react';
import { colors } from '../../assets/definitions';
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend
} from 'recharts';

import { getSumOfDiffOf2Props, getSumOf1Prop } from '../../utils/calc';

const mcc = 'background-color:#aaa;color:black;';



export interface FuelByPilotProps {
    logs: any;
    pilots: any;
}

export interface FuelByPilotState {
    fuelByPilot?: any;
}

class FuelByPilot extends React.Component<FuelByPilotProps, FuelByPilotState> {
    constructor(props: FuelByPilotProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        const { logs, pilots } = this.props;

        this.calcHoursByPilot(logs, pilots).then(pilotsWithFuel => {
            this.setState({
                fuelByPilot: pilotsWithFuel
            });
        });
    }


    public calcHoursByPilot = (logs, pilots) => new Promise(resolve => {
        const pilotsWithFuel = pilots.map(p => {
            const logsThisPilot = logs.filter(l => l.PICId == p.Id);
            const fuelUsed = getSumOfDiffOf2Props(logsThisPilot, 'FuelIn', 'FuelOut');
            const fuelPurchased = getSumOf1Prop(logsThisPilot, 'FuelPurchased');
            return {
                name: p.Title,
                'Fuel Used': fuelUsed,
                'Fuel Purchased': fuelPurchased,
            };
        });
        resolve(pilotsWithFuel);
    })

    public render() {

        const { fuelByPilot } = this.state;
        const chartHeadingDiv = <div className='chartHeading'>Fuel by Pilot</div>;

        const el_chart = fuelByPilot ?
            <>
                <BarChart
                    width={730}
                    height={250}
                    data={fuelByPilot}
                >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='Fuel Used' stackId='a' fill={colors.navy} />
                    <Bar dataKey='Fuel Purchased' stackId='a' fill={colors.pink} />
                    {/* <Bar dataKey='Non-Revenue' fill='#aaa' /> */}
                </BarChart>
            </>
            : <></>;

        return (
            <>
                {chartHeadingDiv}
                {el_chart}
            </>
        );
    }
}

export default FuelByPilot;