import * as React from 'react';
import FuelPerDay from './cards/FuelPerDay';
import FuelPerPilot from './cards/FuelByPilot';
import FuelByAircraft from './cards/FuelByAircraft';
import FuelByAirport from './cards/FuelByAirport';
// import styles from './Dashboard.module.scss';
import DashboardTop from './DashboardTop';

import { getSumOfDiffOf2Props, getSumOf1Prop } from '../utils/calc';



export interface MonthlyFuelProps {
    logs: any;
    pilots: any;
    aircraft: any;
    airports: any;
    monthAndYearText: string;
    daysInMonth: any;
    handler: any;
}

export interface MonthlyFuelState {

}

class MonthlyFuel extends React.Component<MonthlyFuelProps, MonthlyFuelState> {
    constructor(props: MonthlyFuelProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { monthAndYearText, logs, daysInMonth, pilots, aircraft, airports } = this.props;

        return (
            <div className='dashboardWrap'>
                <DashboardTop
                    dashboardHeading='Monthly Fuel'
                    monthAndYearText={monthAndYearText}
                    glanceData={[
                        {
                            label: 'Fuel used this month',
                            value: getSumOfDiffOf2Props(logs, 'FuelIn', 'FuelOut')
                        },
                        {
                            label: 'Fuel purchased this month',
                            value: getSumOf1Prop(logs, 'FuelPurchased')
                        },
                    ]}
                />
                <div className='dashboardCard'>
                    <FuelPerDay
                        logs={logs}
                        daysInMonth={daysInMonth}
                    />
                </div>
                <div className='dashboardCard'>
                    <FuelByAirport
                        logs={logs}
                        airports={airports}
                    />
                </div>
                <div className='dashboardCard'>
                    <FuelPerPilot
                        logs={logs}
                        pilots={pilots}
                    />
                </div>
                <div className='dashboardCard'>
                    <FuelByAircraft
                        logs={logs}
                        aircraft={aircraft}
                    />
                </div>
            </div>
        );
    }
}

export default MonthlyFuel;