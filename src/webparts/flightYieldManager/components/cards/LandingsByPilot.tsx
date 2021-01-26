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


const mcc = 'background-color:#aaa;color:black;';



export interface LandingsByPilotProps {
    logs: any;
    pilots: any;
}

export interface LandingsByPilotState {
    landingsByPilot?: any;
}

class LandingsByPilot extends React.Component<LandingsByPilotProps, LandingsByPilotState> {
    constructor(props: LandingsByPilotProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        // console.log('%c : LandingsByPilot -> pubilccomponentDidMount -> this.props', mcc, this.props);
        const { logs, pilots } = this.props;

        this.calcLandingsByPilot(logs, pilots).then(pilotsWithLandings => {
            this.setState({
                landingsByPilot: pilotsWithLandings
            });
        });
    }

    public calcLandingsByPilot = (logs, pilots) => new Promise(resolve => {
        const pilotsWithLandings = pilots.map(p => {
            const logsThisPilot = logs.filter(l => l.PICId == p.Id);
            const nightLandings = logsThisPilot.filter(nl => nl.DayNight == 'N').length;
            const dayLandings = logsThisPilot.filter(dl => dl.DayNight == 'D').length;
            const nonRevenueLandings = logsThisPilot.filter(nrl => nrl.DayNight == 'NR').length;
            return {
                name: p.Title,
                'Night Landings': nightLandings,
                'Day Landings': dayLandings,
                'Non-Revenue': nonRevenueLandings,
            };
        });
        resolve(pilotsWithLandings);
    })

    public render() {

        const { landingsByPilot } = this.state;
        const chartHeadingDiv = <div className='chartHeading'>Landings by Pilot</div>;

        const el_chart = landingsByPilot ?
            <>
                <BarChart
                    width={730}
                    height={250}
                    data={landingsByPilot}
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

export default LandingsByPilot;