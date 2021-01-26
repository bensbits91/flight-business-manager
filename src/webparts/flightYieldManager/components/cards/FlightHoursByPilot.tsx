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


const mcc = 'background-color:hotpink;color:black;';



export interface FlightHoursByPilotProps {
    logs: any;
    pilots: any;
}

export interface FlightHoursByPilotState {
    hoursByPilot?: any;
}

class FlightHoursByPilot extends React.Component<FlightHoursByPilotProps, FlightHoursByPilotState> {
    constructor(props: FlightHoursByPilotProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        // console.log('%c : FlightHoursByPilot -> pubilccomponentDidMount -> this.props', mcc, this.props);
        const { logs, pilots } = this.props;

        this.calcHoursByPilot(logs, pilots).then(pilotsWithHours => {
            this.setState({
                hoursByPilot: pilotsWithHours
            });
        });
    }

    public calcHoursByPilot = (logs, pilots) => new Promise(resolve => {
        const pilotsWithHours = pilots.map(p => {
            const logsThisPilot = logs.filter(l => l.PICId == p.Id);
            const totalHours = getSumOfDiffOf2Props(logsThisPilot, 'HobbsEnd', 'HobbsStart');
            return {
                name: p.Title,
                'Total Hours': totalHours,
                Revenue: totalHours * .6, //   FAKE REVENUE DATA - NEED TO CALC USING REAL DATA   <--------------------------
                'Non-Revenue': totalHours * .4 //   FAKE REVENUE DATA - NEED TO CALC USING REAL DATA   <--------------------------
            };
        });
        resolve(pilotsWithHours);
    })

    public render() {

        const { hoursByPilot } = this.state;
        const chartHeadingDiv = <div className='chartHeading'>Flight Hours by Pilot</div>;

        const el_chart = hoursByPilot ?
            <>
                <BarChart
                    width={730}
                    height={250}
                    data={hoursByPilot}
                >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Bar dataKey='Total Hours' fill={colors.navy} />
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

export default FlightHoursByPilot;