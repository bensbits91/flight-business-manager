import * as React from 'react';
import { Image } from 'office-ui-fabric-react/lib/Image';
// import { Stack } from 'office-ui-fabric-react/lib/Stack';



export interface AircraftSummaryProps {
    aircraft: any;
    handler: any;
}

export interface AircraftSummaryState {

}

class AircraftSummary extends React.Component<AircraftSummaryProps, AircraftSummaryState> {
    constructor(props: AircraftSummaryProps) {
        super(props);
        this.state = {};
    }

    public onClick_card() {
        const { aircraft } = this.props;
        const urlPage = window.location.pathname.split('.aspx')[1];
        const msg = urlPage == '/aircraft' ? 'aircraftDetails' : 'pickAnAircraft';
        // const identifier = urlPage == '/aircraft' ? aircraft.Id : aircraft.Title;
        // this.props.handler(msg, identifier);
        this.props.handler(msg, aircraft.Title);
    }

    public render() {
        const { aircraft } = this.props;

        const el_summary = <div
            style={{ cursor: 'pointer' }}
            onClick={() => { this.onClick_card(); }}
            className='summaryCard'
        >
            <div>
                <Image
                    src={aircraft.imageUrl}
                    width={400}
                />
            </div>
            <div>{aircraft.Title}</div>
            <div>{aircraft.Model}</div>
        </div>;


        return (
            el_summary
        );
    }
}

export default AircraftSummary;