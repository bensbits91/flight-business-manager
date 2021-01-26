import * as React from 'react';
import PieChartOne from '../charts/PieChartOne';
import { colors } from '../../assets/definitions';


const mcc = 'background-color:white;color:black;';



export interface LandingsByTypeProps {
    logs: any;
}

export interface LandingsByTypeState {
    landingsByType?: any;
}

class LandingsByType extends React.Component<LandingsByTypeProps, LandingsByTypeState> {
    constructor(props: LandingsByTypeProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        // console.log('%c : LandingsByType -> pubilccomponentDidMount -> this.props', mcc, this.props);
        const { logs } = this.props;

        this.calcLandingsByType(logs).then(landingsByTypeArray => {
            this.setState({ landingsByType: landingsByTypeArray });
        });
    }

    public calcLandingsByType = (logs) => new Promise(resolve => {
        const totalNightLandings = logs.filter(ln => ln.DayNight == 'N').length;
        const totalDayLandings = logs.filter(ld => ld.DayNight == 'D').length;
        const totalNRLandings = logs.filter(lnr => lnr.DayNight == 'NR').length;
        const landingsByTypeArray = [
            { name: 'Night Landings', value: totalNightLandings },
            { name: 'Day Landings', value: totalDayLandings },
            { name: 'Non-Revenue Landings', value: totalNRLandings },
        ];
        resolve(landingsByTypeArray);
    })

    public render() {

        const { landingsByType } = this.state;
        const chartHeadingDiv = <div className='chartHeading'>Landings by Type</div>;

        const el_chart = landingsByType ?
            <PieChartOne
                data={landingsByType}
                dataKey_x='Day'
                dataKey_y1='Night Landings'
                dataKey_y2='Day Landings'
                dataKey_y3='NR Landings'
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
                {/* {totalNightLandingsDiv}
                {totalDayLandingsDiv} */}
                {chartHeadingDiv}
                {el_chart}
            </>
        );
    }
}

export default LandingsByType;