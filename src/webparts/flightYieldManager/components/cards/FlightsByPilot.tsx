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


const mcc = 'background-color:hotpink;color:black;';



export interface FlightsByPilotProps {
    logs: any;
    pilots: any;
}

export interface FlightsByPilotState {
    flightsByPilot?: any;
}

class FlightsByPilot extends React.Component<FlightsByPilotProps, FlightsByPilotState> {
    constructor(props: FlightsByPilotProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        // console.log('%c : FlightsByPilot -> pubilccomponentDidMount -> this.props', mcc, this.props);
        const { logs, pilots } = this.props;

        this.calcFlightsByPilot(logs, pilots).then(pilotsWithFlights => {
            this.setState({
                flightsByPilot: pilotsWithFlights
            });
        });
    }

    public calcFlightsByPilot = (logs, pilots) => new Promise(resolve => {
        const pilotsWithFlights = pilots.map(p => {
            const logsThisPilot = logs.filter(l => l.PICId == p.Id);
            const totalFlights = logsThisPilot.length;
            return {
                name: p.Title,
                'Total Flights': totalFlights,
                Revenue: totalFlights * .6, //   FAKE REVENUE DATA - NEED TO CALC USING REAL DATA   <--------------------------
                'Non-Revenue': totalFlights * .4 //   FAKE REVENUE DATA - NEED TO CALC USING REAL DATA   <--------------------------
            };
        });
        resolve(pilotsWithFlights);
    })

    public render() {

        const { flightsByPilot } = this.state;
        const chartHeadingDiv = <div className='chartHeading'>Flights by Pilot</div>;

        const el_chart = flightsByPilot ?
            <>
                <BarChart
                    width={730}
                    height={250}
                    data={flightsByPilot}
                >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    {/* <Legend /> */}
                    <Bar dataKey='Total Flights' fill={colors.navy} />
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

export default FlightsByPilot;