import * as React from 'react';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import FieldText from './fields/FieldText';
import FieldDropDown from './fields/FieldDropDown';
import { Icon, IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { colors } from '../assets/definitions';

const mcc = 'color:hotpink;background-color:black;';

// const sigDoneIconClass = mergeStyles({
//     fontSize: 30,
//     height: 30,
//     width: 30,
//     margin: '0 25px',
//     color: colors.status.green.txt
// });

// const signIcon: IIconProps = { iconName: 'InsertSignatureLine' };

export interface FilterPanelProps {
    aircraft: any;
    pilots: any;
    showPanel: boolean;
    handler: any;
}
export interface FilterPanelState {
    aircraftFilters?: string[];
    pilotsFilters?: string[];
}

class FilterPanel extends React.Component<FilterPanelProps, FilterPanelState> {
    constructor(props: FilterPanelProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        // console.log('%c : FilterPanel -> componentDidMount -> this.props', mcc, this.props);
        const { aircraft, pilots } = this.props;
        const aircraftFilters = aircraft.map(a => a.Title);
        const pilotsFilters = pilots.map(p => p.Title);
        // console.log('%c : FilterPanel -> componentDidMount -> aircraftFilters', mcc, aircraftFilters);
        this.setState({
            aircraftFilters: ['Show all aircraft', ...aircraftFilters],
            pilotsFilters: ['Show all pilots', ...pilotsFilters],
        });
    }

    public componentDidUpdate(prevProps: FilterPanelProps, prevState: FilterPanelState) {
        // console.log('%c : FilterPanel -> componentDidUpdate -> this.state', mcc, this.state);
    }

    public onChangeFilter(filter, value) {
        // console.log('%c : FilterPanel -> onChangeFilter -> filter', mcc, filter);
        // console.log('%c : FilterPanel -> onChangeFilter -> value', mcc, value);
        this.props.handler(filter + '-' + value);
    }

    public render() {

        const { showPanel, handler } = this.props;
        const { aircraftFilters, pilotsFilters } = this.state;

        const aircraftDropdown = aircraftFilters ? <FieldDropDown
            field={{
                InternalName: 'aircraftFilter',
                Title: 'Aircraft',
                Choices: aircraftFilters,
                TypeAsString: 'Choice',
                Description: '',
                value: null
            }}
            handler={this.onChangeFilter.bind(this)}
        /> : <></>;

        const pilotsDropdown = pilotsFilters ? <FieldDropDown
            field={{
                InternalName: 'pilotFilter',
                Title: 'Pilot',
                Choices: pilotsFilters,
                TypeAsString: 'Choice',
                Description: '',
                value: null
            }}
            handler={this.onChangeFilter.bind(this)}
        /> : <></>;

        const el_panel = aircraftFilters && pilotsFilters ? <Panel
            isOpen={showPanel}
            headerText='Filter Flight Logs'
            closeButtonAriaLabel='Close'
            isLightDismiss={true}
            onDismiss={() => {
                handler('close');
            }}
            type={PanelType.custom}
            customWidth='800px'
            styles={{
                // root: { backgroundColor: bg_color },
                // closeButton: { color: color_1 },
                // main: {
                //     backgroundColor: bg_color,
                // },
                content: {
                    paddingRight: '0!important',
                    paddingLeft: '0!important'
                },
                // headerText: {
                //     color: color_1
                // }
            }}
        >
            {aircraftDropdown}
            {pilotsDropdown}
        </Panel> : <></>;

        return (
            el_panel
        );
    }
}

export default FilterPanel;