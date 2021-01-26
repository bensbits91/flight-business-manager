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



export interface LandingsByAircraftProps {
    logs: any;
    aircraft: any;
}

export interface LandingsByAircraftState {
    landingsByAircraft?: any;
}

class LandingsByAircraft extends React.Component<LandingsByAircraftProps, LandingsByAircraftState> {
    constructor(props: LandingsByAircraftProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        // console.log('%c : LandingsByAircraft -> pubilccomponentDidMount -> this.props', mcc, this.props);
        const { logs, aircraft } = this.props;

        this.calcLandingsByAircraft(logs, aircraft).then(aircraftWithLandings => {
            this.setState({
                landingsByAircraft: aircraftWithLandings
            });
        });
    }

    public calcLandingsByAircraft = (logs, aircraft) => new Promise(resolve => {
        const aircraftWithLandings = aircraft.map(a => {
            const logsThisAircraft = logs.filter(l => l.AircraftId == a.Id);
            const nightLandings = logsThisAircraft.filter(nl => nl.DayNight == 'N').length;
            const dayLandings = logsThisAircraft.filter(dl => dl.DayNight == 'D').length;
            const nonRevenueLandings = logsThisAircraft.filter(nrl => nrl.DayNight == 'NR').length;
            return {
                name: a.Title,
                'Night Landings': nightLandings,
                'Day Landings': dayLandings,
                'Non-Revenue': nonRevenueLandings,
            };
        });
        resolve(aircraftWithLandings);
    })

    public render() {

        const { landingsByAircraft } = this.state;
        const chartHeadingDiv = <div className='chartHeading'>Landings by Aircraft</div>;

        const el_chart = landingsByAircraft ?
            <>
                <BarChart
                    width={730}
                    height={250}
                    data={landingsByAircraft}
                >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='Night Landings' stackId='a' fill={colors.navy} />
                    <Bar dataKey='Day Landings' stackId='a' fill={colors.yellow} />
                    <Bar dataKey='Non-Revenue' stackId='a' fill={colors.pink} />
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

export default LandingsByAircraft;