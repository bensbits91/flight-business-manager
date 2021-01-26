import * as React from 'react';
import LandingsPerDay from './cards/LandingsPerDay';
import LandingsByType from './cards/LandingsByType';
import LandingsByPilot from './cards/LandingsByPilot';
import LandingsByAircraft from './cards/LandingsByAircraft';
// import styles from './Dashboards.module.scss';
import DashboardTop from './DashboardTop';




export interface MonthlyLandingsProps {
    logs: any;
    pilots: any;
    aircraft: any;
    monthAndYearText: string;
    daysInMonth: any;
    handler: any;
}

export interface MonthlyLandingsState {

}

class MonthlyLandings extends React.Component<MonthlyLandingsProps, MonthlyLandingsState> {
    constructor(props: MonthlyLandingsProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { monthAndYearText, logs, daysInMonth, pilots, aircraft } = this.props;

        return (
            <div className='dashboardWrap'>
                <DashboardTop
                    dashboardHeading='Landings'
                    monthAndYearText={monthAndYearText}
                    glanceData={[
                        {
                            label: 'Landings this month',
                            value: logs.length
                        },
                    ]}
                />
                <div className='dashboardCard'>
                    <LandingsPerDay
                        logs={logs}
                        daysInMonth={daysInMonth}
                    />
                </div>
                <div className='dashboardCard'>
                    <LandingsByType
                        logs={logs}
                    />
                </div>
                <div className='dashboardCard'>
                    <LandingsByPilot
                        logs={logs}
                        pilots={pilots}
                    />
                </div>
                <div className='dashboardCard'>
                    <LandingsByAircraft
                        logs={logs}
                        aircraft={aircraft}
                    />
                </div>
            </div>
        );
    }
}

export default MonthlyLandings;