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

import { getSumOfDiffOf2Props } from '../../utils/calc';

const mcc = 'background-color:orange;color:black;';



export interface FuelByAircraftProps {
    logs: any;
    aircraft: any;
}

export interface FuelByAircraftState {
    fuelByAircraft?: any;
}

class FuelByAircraft extends React.Component<FuelByAircraftProps, FuelByAircraftState> {
    constructor(props: FuelByAircraftProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        // console.log('%c : FuelByAircraft -> pubilccomponentDidMount -> this.props', mcc, this.props);
        const { logs, aircraft } = this.props;

        this.calcFuelByAircraft(logs, aircraft).then(aircraftWithFuel => {
            this.setState({
                fuelByAircraft: aircraftWithFuel
            });
        });
    }


    public calcFuelByAircraft = (logs, aircraft) => new Promise(resolve => {
        const aircraftWithFuel = aircraft.map(a => {
            const logsThisAircraft = logs.filter(l => l.AircraftId == a.Id);
            const totalFuel = getSumOfDiffOf2Props(logsThisAircraft, 'FuelIn', 'FuelOut');
            return {
                name: a.Title,
                'Total Fuel': totalFuel,
            };
        });
        resolve(aircraftWithFuel);
    })

    public render() {

        const { fuelByAircraft } = this.state;
        const chartHeadingDiv = <div className='chartHeading'>Fuel by Aircraft</div>;

        const el_chart = fuelByAircraft ?
            <>
                <BarChart
                    width={730}
                    height={250}
                    data={fuelByAircraft}
                >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='Total Fuel' fill={colors.navy} />
                    {/* <Bar dataKey='Revenue' fill='#82ca9d' />
                    <Bar dataKey='Non-Revenue' fill='#aaa' /> */}
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

export default FuelByAircraft;