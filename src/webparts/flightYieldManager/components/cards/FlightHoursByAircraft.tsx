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


export interface FlightHoursByAircraftProps {
    logs: any;
    aircraft: any;
}

export interface FlightHoursByAircraftState {
    hoursByAircraft?: any;
}

class FlightHoursByAircraft extends React.Component<FlightHoursByAircraftProps, FlightHoursByAircraftState> {
    constructor(props: FlightHoursByAircraftProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        // console.log('%c : FlightHoursByAircraft -> pubilccomponentDidMount -> this.props', mcc, this.props);

        const { logs, aircraft } = this.props;




        this.calcHoursByAircraft(logs, aircraft).then(aircraftWithHours => {
            this.setState({
                hoursByAircraft: aircraftWithHours
            });
        });
    }

    public componentDidUpdate(prevProps: FlightHoursByAircraftProps, prevState: FlightHoursByAircraftState) {
        // console.log('%c : FlightHoursByAircraft -> componentDidUpdate -> this.state', mcc, this.state);
    }


    public calcHoursByAircraft = (logs, aircraft) => new Promise(resolve => {
        const aircraftWithHours = aircraft.map(a => {
            const logsThisAircraft = logs.filter(l => l.AircraftId == a.Id);
            const totalHours = getSumOfDiffOf2Props(logsThisAircraft, 'HobbsEnd', 'HobbsStart');
            return {
                name: a.Title,
                'Total Hours': totalHours,
                Revenue: totalHours * .6, //   FAKE REVENUE DATA - NEED TO CALC USING REAL DATA - DayNight == 'NR'???   <--------------------------
                'Non-Revenue': totalHours * .4 //   FAKE REVENUE DATA - NEED TO CALC USING REAL DATA - DayNight == 'NR'???   <--------------------------
            };
        });
        resolve(aircraftWithHours);
    })

    public render() {

        const { hoursByAircraft } = this.state;
        const chartHeadingDiv = <div className='chartHeading'>Flight Hours by Aircraft</div>;

        const el_chart = hoursByAircraft ?
            <>
                <BarChart
                    width={730}
                    height={250}
                    data={hoursByAircraft}
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

export default FlightHoursByAircraft;