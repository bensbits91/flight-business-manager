import * as React from 'react';


const mcc = 'background-color:black;color:lime;';

export interface DashboardTopProps {
    dashboardHeading: string;
    monthAndYearText: string;
    glanceData?: any;
}

export interface DashboardTopState {

}

class DashboardTop extends React.Component<DashboardTopProps, DashboardTopState> {
    constructor(props: DashboardTopProps) {
        super(props);
        this.state = {};
    }

    public render() {
        const { dashboardHeading, monthAndYearText, glanceData } = this.props;

        const glanceDataDivs = glanceData ?
            <div className='dashboardGlance'>
                {glanceData.map(g => {
                    return (
                        <div>
                            <span>{g.label}: </span>
                            <span className='dashboardGlanceValue'>{g.value}</span>
                        </div>
                    );
                })}
            </div> : <></>;

        return (
            <>
                <div className='dashboardHeading'>
                    <span>{dashboardHeading}</span>
                    <span className='monthAndYearText'>{monthAndYearText}</span>
                </div>
                {glanceDataDivs}
            </>
        );
    }
}

export default DashboardTop;