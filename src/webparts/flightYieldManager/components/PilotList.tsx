import * as React from 'react';
import PilotSummary from './PilotSummary';




export interface PilotListProps {
    pilot: any;
    handler: any;
}

export interface PilotListState {

}

class PilotList extends React.Component<PilotListProps, PilotListState> {
    constructor(props: PilotListProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { pilot } = this.props;
        const el_summaries = pilot.map(a => {
            return (
                <PilotSummary
                    pilot={a}
                    handler={this.props.handler.bind(this)}
                />
            );
        });

        return (
            <>
                <div className='dashboardHeading'>Pilot</div>
                {el_summaries}
            </>
        );
    }
}

export default PilotList;