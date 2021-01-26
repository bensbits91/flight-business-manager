import * as React from 'react';
import FlightsPerDay from './cards/FlightsPerDay';
import FlightsByPilot from './cards/FlightsByPilot';
import FlightsByAircraft from './cards/FlightsByAircraft';
import FlightsByAirport from './cards/FlightsByAirport';
// import styles from './Dashboards.module.scss';
import DashboardTop from './DashboardTop';




export interface MonthlyFlightsProps {
    logs: any;
    pilots: any;
    aircraft: any;
    airports: any;
    monthAndYearText: string;
    daysInMonth: any;
    handler: any;
}

export interface MonthlyFlightsState {

}

class MonthlyFlights extends React.Component<MonthlyFlightsProps, MonthlyFlightsState> {
    constructor(props: MonthlyFlightsProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { monthAndYearText, logs, daysInMonth, pilots, aircraft, airports } = this.props;

        return (
            <div className='dashboardWrap'>
                <DashboardTop
                    dashboardHeading='Flights'
                    monthAndYearText={monthAndYearText}
                    glanceData={[
                        {
                            label: 'Flights this month',
                            value: logs.length
                        },
                    ]}
                />
                <div className='dashboardCard'>
                    <FlightsPerDay
                        logs={logs}
                        daysInMonth={daysInMonth}
                    />
                </div>
                <div className='dashboardCard'>
                    <FlightsByAirport
                        logs={logs}
                        airports={airports}
                    />
                </div>
                <div className='dashboardCard'>
                    <FlightsByPilot
                        logs={logs}
                        pilots={pilots}
                    />
                </div>
                <div className='dashboardCard'>
                    <FlightsByAircraft
                        logs={logs}
                        aircraft={aircraft}
                    />
                </div>
            </div>
        );
    }
}

export default MonthlyFlights;