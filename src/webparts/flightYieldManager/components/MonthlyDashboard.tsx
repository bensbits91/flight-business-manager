import * as React from 'react';
import FlightHoursPerDay from './cards/FlightHoursPerDay';
import FlightsPerDay from './cards/FlightsPerDay';
import FuelPerDay from './cards/FuelPerDay';
import LandingsPerDay from './cards/LandingsPerDay';
// import styles from './Dashboards.module.scss';
import '../assets/css/Dashboards.css';
import DashboardTop from './DashboardTop';

export interface MonthlyDashBoardProps {
    logs: any;
    month: string;
    monthAndYearText: string;
    daysInMonth: any;
    handler: any;
}

export interface MonthlyDashBoardState {

}

class MonthlyDashBoard extends React.Component<MonthlyDashBoardProps, MonthlyDashBoardState> {
    constructor(props: MonthlyDashBoardProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
    }

    public onClick_card(card) {
        this.props.handler(card, this.props.month);
    }

    public render() {
        const { monthAndYearText, logs, daysInMonth } = this.props;

        return (
            <div className='dashboardWrap'>
                <DashboardTop
                    dashboardHeading='Monthly Dashboard'
                    monthAndYearText={monthAndYearText}
                />
                <div
                    className='dashboardCard'
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.onClick_card('monthlyFlightHours')}
                >
                    <FlightHoursPerDay
                        logs={logs}
                        daysInMonth={daysInMonth}
                        isDashboard
                    />
                </div>
                <div
                    className='dashboardCard'
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.onClick_card('monthlyFlights')}
                >
                    <FlightsPerDay
                        logs={logs}
                        daysInMonth={daysInMonth}
                        isDashboard
                    />
                </div>
                <div
                    className='dashboardCard'
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.onClick_card('monthlyFuel')}
                >
                    <FuelPerDay
                        logs={logs}
                        daysInMonth={daysInMonth}
                        isDashboard
                    />
                </div>
                <div
                    className='dashboardCard'
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.onClick_card('monthlyLandings')}
                >
                    <LandingsPerDay
                        logs={logs}
                        daysInMonth={daysInMonth}
                        isDashboard
                    />
                </div>
            </div>
        );
    }
}

export default MonthlyDashBoard;