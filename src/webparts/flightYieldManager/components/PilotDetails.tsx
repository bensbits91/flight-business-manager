import * as React from 'react';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import * as moment from 'moment';



export interface PilotDetailsProps {
    pilot: any;
}

export interface PilotDetailsState {

}

class PilotDetails extends React.Component<PilotDetailsProps, PilotDetailsState> {
    constructor(props: PilotDetailsProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { pilot } = this.props;

        const el_pilotDetails = <div className="detailsWrap">
            <div className='dashboardHeading'>{pilot.Title}</div>
            {/* <div className='cardHeading'>{pilot.Model}</div> */}
            <Stack horizontal>
                <Image
                    src={pilot.imageUrl}
                    width={400}
                    styles={{ image: { opacity: 0.7 } }}
                />
                <div>details
                    {/* <div><span>Role:</span> {pilot.Role}</div>
                    <div><span>Manufacturer:</span> {pilot.Manufacturer}</div>
                    <div><span>First Flight:</span> {moment(pilot.FirstFlight).format('MMMM Do, YYYY')}</div>
                    <div><span>Introduction:</span> {pilot.Introduction}</div>
                    <div><span>Status:</span> {pilot.Status}</div>
                    <div><span>Primary Users:</span> {pilot.PrimaryUsers}</div>
                    <div><span>Produced:</span> {pilot.Produced}</div>
                    <div><span>Number Built:</span> {pilot.NumberBuilt}</div>
                    <div><span>Developed from:</span> {pilot.DevelopedFrom}</div> */}
                </div>
            </Stack>
            <div className='summaryWrap'>{pilot.Summary}</div>
        </div>;

        return (
            el_pilotDetails
        );
    }
}

export default PilotDetails;