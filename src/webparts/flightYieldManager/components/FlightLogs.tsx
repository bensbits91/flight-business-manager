import * as React from 'react';
import DashboardTop from './DashboardTop';
import FlightLogsEditableList from './FlightLogsEditableList';





export interface FlightLogsProps {
    monthAndYearText: string;
    logsThisMonth: any;
    aircraftToShowArray: any;
    fields: any;
    handler: any;
}

export interface FlightLogsState {

}

class FlightLogs extends React.Component<FlightLogsProps, FlightLogsState> {
    constructor(props: FlightLogsProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { aircraftToShowArray, logsThisMonth, monthAndYearText, fields, handler } = this.props;
        const items_len = logsThisMonth.length;

        const el_dashboardTop =/*  logs ? */
            <DashboardTop
                dashboardHeading='Flight Logs'
                monthAndYearText={monthAndYearText}
                glanceData={[
                    {
                        label: 'Flights this month',
                        value: logsThisMonth.length
                    },
                ]}
            />/*  : <></> */;


        const el_list = aircraftToShowArray ? aircraftToShowArray.map(a => {
            const aircraftLogs = logsThisMonth.filter(l => l.aircraft_name == a.Title);
            return <FlightLogsEditableList
                key={items_len}
                monthAndYearText={monthAndYearText}
                logs={aircraftLogs}
                aircraftName={a.Title}
                fields={fields}
                handler={handler.bind(this)}
            />;
        }) : <></>;

        return (
            <div className='dashboardWrap'>
                {el_dashboardTop}
                {el_list}
            </div>
        );
    }
}

export default FlightLogs;