import * as React from 'react';
import AircraftSummary from './AircraftSummary';




export interface AircraftListProps {
    aircraft: any;
    handler: any;
}

export interface AircraftListState {

}

class AircraftList extends React.Component<AircraftListProps, AircraftListState> {
    constructor(props: AircraftListProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { aircraft } = this.props;

        const urlPage = window.location.pathname.split('.aspx')[1];
        const headingText = urlPage == '/aircraft' ? 'Aircraft' : 'Pick an Aircraft';

        const el_summaries = aircraft.map(a => {
            return (
                <AircraftSummary
                    aircraft={a}
                    handler={this.props.handler.bind(this)}
                />
            );
        });

        return (
            <>
                <div className='dashboardHeading'>{headingText}</div>
                {el_summaries}
            </>
        );
    }
}

export default AircraftList;