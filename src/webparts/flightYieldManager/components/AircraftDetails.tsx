import * as React from 'react';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import * as moment from 'moment';



export interface AircraftDetailsProps {
    aircraft: any;
}

export interface AircraftDetailsState {

}

class AircraftDetails extends React.Component<AircraftDetailsProps, AircraftDetailsState> {
    constructor(props: AircraftDetailsProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { aircraft } = this.props;

        const el_aircraftDetails = <div className="detailsWrap">
            <div className='dashboardHeading'>{aircraft.Title}</div>
            <div className='cardHeading'>{aircraft.Model}</div>
            <Stack horizontal>
                <Image
                    src={aircraft.imageUrl}
                    width={600}
                />
                <div>
                    <div><span>Role:</span> {aircraft.Role}</div>
                    <div><span>Manufacturer:</span> {aircraft.Manufacturer}</div>
                    <div><span>First Flight:</span> {moment(aircraft.FirstFlight).format('MMMM Do, YYYY')}</div>
                    <div><span>Introduction:</span> {aircraft.Introduction}</div>
                    <div><span>Status:</span> {aircraft.Status}</div>
                    <div><span>Primary Users:</span> {aircraft.PrimaryUsers}</div>
                    <div><span>Produced:</span> {aircraft.Produced}</div>
                    <div><span>Number Built:</span> {aircraft.NumberBuilt}</div>
                    <div><span>Developed from:</span> {aircraft.DevelopedFrom}</div>
                </div>
            </Stack>
            <div className='summaryWrap'>{aircraft.Summary}.. Read more: <a href={aircraft.MoreInfoLink}>{aircraft.MoreInfoLink}</a></div>
        </div>;

        return (
            el_aircraftDetails
        );
    }
}

export default AircraftDetails;