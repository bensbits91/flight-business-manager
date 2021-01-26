import * as React from 'react';
import AircraftList from '../AircraftList';
import Form201EditableList from './Form201EditableList';


export interface Form201InAirFlightLogProps {
    logs: any;
    aircraftName: string;
    aircraftData: any;
    fields: any;
    handler: any;
}

export interface Form201InAirFlightLogState {

}

class Form201InAirFlightLog extends React.Component<Form201InAirFlightLogProps, Form201InAirFlightLogState> {
    constructor(props: Form201InAirFlightLogProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { logs, aircraftName, aircraftData, fields, handler } = this.props;



        const el = aircraftName == 'all' ?
            <AircraftList
                aircraft={aircraftData}
                handler={handler}
            />
            : <Form201EditableList
                logs={logs}
                aircraftName={aircraftName}
                fields={fields}
                handler={handler}
            />;

        return (
            <>
                <div className='dashboardHeading'>Form 201 - Aircraft Flight Log</div>
                {el}
            </>
        );
    }
}

export default Form201InAirFlightLog;