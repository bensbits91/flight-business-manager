import * as React from 'react';
import { Image } from 'office-ui-fabric-react/lib/Image';
// import { Stack } from 'office-ui-fabric-react/lib/Stack';



export interface PilotSummaryProps {
    pilot: any;
    handler: any;
}

export interface PilotSummaryState {

}

class PilotSummary extends React.Component<PilotSummaryProps, PilotSummaryState> {
    constructor(props: PilotSummaryProps) {
        super(props);
        this.state = {};
    }

    public onClick_card() {
        this.props.handler('pilotDetails', this.props.pilot.Id);
    }

    public render() {
        const { pilot } = this.props;

        const el_summary = <div
            style={{ cursor: 'pointer' }}
            onClick={() => { this.onClick_card(); }}
            className='summaryCard'
        >
            <div>
                <Image
                    src={pilot.imageUrl}
                    width={300}
                    styles={{ image: { opacity: 0.7 } }}
                />
            </div>
            <div>{pilot.Title}</div>
            {/* <div>{pilot.Model}</div> */}
        </div>;


        return (
            el_summary
        );
    }
}

export default PilotSummary;