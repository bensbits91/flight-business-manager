import * as React from 'react';
import FlightHoursPerDay from './cards/FlightHoursPerDay';
import FlightHoursByPilot from './cards/FlightHoursByPilot';
import FlightHoursByAircraft from './cards/FlightHoursByAircraft';
// import styles from './Dashboards.module.scss';
import DashboardTop from './DashboardTop';

import { getSumOfDiffOf2Props } from '../utils/calc';



export interface MonthlyFlightHoursProps {
    logs: any;
    pilots: any;
    aircraft: any;
    monthAndYearText: string;
    daysInMonth: any;
    handler: any;
}

export interface MonthlyFlightHoursState {

}

class MonthlyFlightHours extends React.Component<MonthlyFlightHoursProps, MonthlyFlightHoursState> {
    constructor(props: MonthlyFlightHoursProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { monthAndYearText, logs, daysInMonth, pilots, aircraft } = this.props;

        return (
            <div className='dashboardWrap'>
                <DashboardTop
                    dashboardHeading='Flight Hours'
                    monthAndYearText={monthAndYearText}
                    glanceData={[
                        {
                            label: 'Flight hours this month',
                            value: getSumOfDiffOf2Props(logs, 'HobbsEnd', 'HobbsStart')
                        },
                    ]}
                />
                <div className='dashboardCard'>
                    <FlightHoursPerDay
                        logs={logs}
                        daysInMonth={daysInMonth}
                    />
                </div>
                <div className='dashboardCard'>
                    <FlightHoursByPilot
                        logs={logs}
                        pilots={pilots}
                    />
                </div>
                <div className='dashboardCard'>
                    <FlightHoursByAircraft
                        logs={logs}
                        aircraft={aircraft}
                    />
                </div>
            </div>
        );
    }
}

export default MonthlyFlightHours;