import * as React from 'react';
import * as moment from 'moment';
import { CommandBarButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import styles from './TopMenuBubble.module.scss';
import { colors } from '../assets/definitions';


const mcc = 'background-color:darkorange;color:black;';


const choiceGroupStyles = {
    label: {
        fontSize: '18px',
    }
};

const bubbleStyles = {
    content: {
        maxWidth: 'unset',
    },
    bodyContent: {
        padding: '50px',
    },
    subComponentStyles: {
        callout: {
            root: {
                maxWidth: 'unset',
                width: '800px' // could be props
            },
        }
    }
};

const commandBarButtonStyles = {
    root: { border: 'none', height: '40px' },
    // rootHovered: { backgroundColor: colors.black.b5 },
    icon: { color: colors.mint },
    iconHovered: { color: colors.navy },
    // label: { color: colors.black.b9 },
    // labelHovered: { color: colors.gray.c },
};



export interface TopMenuBubbleProps {
    buttonText: string;
    buttonIconName?: string;
    months?: any; // could be props - optional, more
    aircraft?: any;
    pilots?: any;
    links?: any;
    handler: any;
    isOpen: boolean;
}

export interface TopMenuBubbleState {
    teachingBubbleVisible: boolean;
    selectedKey_month?: string; // same as prev comment
    selectedKey_aircraft?: string;
    selectedKey_pilot?: string;
}

class TopMenuBubble extends React.Component<TopMenuBubbleProps, TopMenuBubbleState> {
    constructor(props: TopMenuBubbleProps) {
        super(props);
        this.state = {
            teachingBubbleVisible: this.props.isOpen
        };
    }

    public componentDidMount() {
        console.log('%c : TopMenuBubble -> componentDidMount -> this.props', mcc, this.props);
        const urlParams = new URLSearchParams(window.location.search);
        // const urlMode = urlParams.get('mode');
        // const urlIid = urlParams.get('iid');
        const urlMonth = urlParams.get('month') || moment().format('YYYY-M');
        // const urlAircraftId = urlParams.get('aircraftId');
        // const urlPilotId = urlParams.get('pilotId');
        const urlAircraft = urlParams.get('aircraft') || 'all';
        this.setState({
            selectedKey_month: urlMonth,
            selectedKey_aircraft: urlAircraft,
        });

    }

    public onChangeRadio(ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption, choiceGroup) {
        // console.log('%c : TopMenuBubble -> onChangeRadio -> ev', mcc, ev);
        // console.log('%c : TopMenuBubble -> onChangeRadio -> option', mcc, option);
        // console.log('%c : TopMenuBubble -> onChangeRadio -> choiceGroup', mcc, choiceGroup);
        const targetState = 'selectedKey_' + choiceGroup;
        let newState = {};
        newState[targetState] = option.key;
        this.setState(
            newState, () => {
                this.props.handler(choiceGroup + '-' + option.key);
            });
    }

    public onClickLink(ev: React.SyntheticEvent<HTMLElement>, key) {
        console.log('%c : TopMenuBubble -> onClickLink -> ev', mcc, ev);
        console.log('%c : TopMenuBubble -> onClickLink -> key', mcc, key);
        // console.log('%c : TopMenuBubble -> onClickLink -> asdf', mcc, asdf);
        // console.log('%c : TopMenuBubble -> onClickLink -> qwer', mcc, qwer);
        this.props.handler(key);
    }

    public toggleTeachingBubbleVisible() {
        const { teachingBubbleVisible } = this.state;
        this.setState({
            teachingBubbleVisible: !teachingBubbleVisible
        });
    }

    public render() {
        const { buttonText, buttonIconName, months, aircraft, pilots, links, handler } = this.props;
        const { teachingBubbleVisible } = this.state;

        const buttonIconProps = { iconName: buttonIconName };


        const monthsOptions: IChoiceGroupOption[] = months ? months.map(m => {
            return {
                key: m,
                text: moment(m).add(1, 'month').format('MMMM YYYY'),
                // onClick: () => handler('month-' + m)
            };
        }) : null;
        // @ts-ignore
        const monthsSelect = months ? <div className={styles.bubbleColumnWrap}>
            <ChoiceGroup
                selectedKey={this.state.selectedKey_month}
                options={monthsOptions}
                onChange={(e, o) => this.onChangeRadio(e, o, 'month')}
                // onChange={this.onChangeMonth.bind(this)}
                label='Month'
                styles={choiceGroupStyles}
            />
        </div> : <></>;

        const allAircraftOption = {
            key: 'all',
            text: 'All aircraft'
        };
        const aircraftOptions: IChoiceGroupOption[] = aircraft ? [allAircraftOption, ...aircraft.map(a => {
            return {
                key: a.Title,
                text: a.Title,
                // onClick: () => handler('aircraft-' + a.Title)
            };
        })] : null;
        // @ts-ignore
        const aircraftSelect = aircraft ? <div className={styles.bubbleColumnWrap}>
            <ChoiceGroup
                selectedKey={this.state.selectedKey_aircraft}
                options={aircraftOptions}
                onChange={(e, o) => this.onChangeRadio(e, o, 'aircraft')}
                // onChange={this.onChangeAircraft.bind(this)}
                label='Aircraft'
                styles={choiceGroupStyles}
            />
        </div> : <></>;

        const allPilotsOption = {
            key: 'all',
            text: 'All pilots'
        };
        const pilotsOptions: IChoiceGroupOption[] = pilots ? [allPilotsOption, ...pilots.map(p => {
            return {
                key: p.Title,
                text: p.Title,
                // onClick: () => handler('pilot-' + p.Title)
            };
        })] : null;
        // @ts-ignore
        const pilotsSelect = pilots ? <div className={styles.bubbleColumnWrap}>
            <ChoiceGroup
                selectedKey={this.state.selectedKey_pilot}
                options={pilotsOptions}
                onChange={(e, o) => this.onChangeRadio(e, o, 'pilot')}
                // onChange={this.onChangePilot.bind(this)}
                label="Pilot"
                styles={choiceGroupStyles}
            />
        </div> : <></>;

        const linksDiv = links ? links.map(l => {
            return (
                // @ts-ignore
                <div className={styles.bubbleColumnWrap}>
                    {/* @ts-ignore */}
                    <div className={styles.bubbleColumnHeading}>
                        {l.heading}
                    </div>
                    {/* @ts-ignore */}
                    <div className={styles.linkGroup}>
                        {
                            l.links.map(ll => {
                                return (
                                    <a onClick={e => this.onClickLink(e, ll.key)}>
                                        {ll.text}
                                    </a>
                                );
                            })
                        }
                    </div>
                </div>
            );
        })
            : <></>;


        return (
            <div>
                <CommandBarButton
                    id={buttonText + 'Button'}
                    onClick={this.toggleTeachingBubbleVisible.bind(this)}
                    iconProps={buttonIconProps}
                    text={buttonText}
                    // text={teachingBubbleVisible ? 'Hide Filters' : 'Show Filters'}
                    // menuProps={menuProps}
                    // styles={{
                    //     // ...props.styles,
                    //     ...commandBarButtonStyles,
                    //     root: { height: '40px' },
                    // }}
                    styles={commandBarButtonStyles}
                />

                {teachingBubbleVisible && (
                    <TeachingBubble
                        target={'#' + buttonText + 'Button'}
                        onDismiss={this.toggleTeachingBubbleVisible.bind(this)}
                        // headline="Filter"
                        // isWide
                        // primaryButtonProps={applyButton}
                        // secondaryButtonProps={cancelButton}
                        hasCloseIcon
                        calloutProps={{ directionalHint: DirectionalHint.bottomCenter }}
                        styles={bubbleStyles}
                    >
                        {monthsSelect}
                        {aircraftSelect}
                        {pilotsSelect}
                        {linksDiv}
                    </TeachingBubble>
                )}
            </div>
        );
    }
}

export default TopMenuBubble;