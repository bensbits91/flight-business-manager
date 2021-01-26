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

const mcc = 'background-color:orange;color:black;';



export interface FlightsByAircraftProps {
    logs: any;
    aircraft: any;
}

export interface FlightsByAircraftState {
    flightsByAircraft?: any;
}

class FlightsByAircraft extends React.Component<FlightsByAircraftProps, FlightsByAircraftState> {
    constructor(props: FlightsByAircraftProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        // console.log('%c : FlightsByAircraft -> pubilccomponentDidMount -> this.props', mcc, this.props);

        const { logs, aircraft } = this.props;

        this.calcFlightsByAircraft(logs, aircraft).then(aircraftWithFlights => {
            this.setState({
                flightsByAircraft: aircraftWithFlights
            });
        });
    }


    public calcFlightsByAircraft = (logs, aircraft) => new Promise(resolve => {
        const aircraftWithFlights = aircraft.map(a => {
            const logsThisAircraft = logs.filter(l => l.AircraftId == a.Id);
            const totalFlights = logsThisAircraft.length;
            return {
                name: a.Title,
                'Total Flights': totalFlights,
                Revenue: totalFlights * .6, //   FAKE REVENUE DATA - NEED TO CALC USING REAL DATA   <--------------------------
                'Non-Revenue': totalFlights * .4 //   FAKE REVENUE DATA - NEED TO CALC USING REAL DATA   <--------------------------
            };
        });
        resolve(aircraftWithFlights);
    })

    public render() {

        const { flightsByAircraft } = this.state;
        const chartHeadingDiv = <div className='chartHeading'>Flights by Aircraft</div>;

        const el_chart = flightsByAircraft ?
            <>
                <BarChart
                    width={730}
                    height={250}
                    data={flightsByAircraft}
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

export default FlightsByAircraft;