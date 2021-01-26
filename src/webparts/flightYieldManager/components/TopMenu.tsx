import * as React from 'react';
import * as moment from 'moment';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { CommandBarButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
// import { FilterBubble } from './FilterBubble';
import TopMenuBubble from './TopMenuBubble';
import { colors } from '../assets/definitions';

const mcc = 'color:darkorange;';





const homeButton = {
    key: 'home',
    button_id: 'home',
    text: 'Home',
    iconProps: { iconName: 'Home' },
},
    editButton = {
        key: 'edit',
        button_id: 'edit',
        text: 'Edit',
        iconProps: { iconName: 'PageHeaderEdit' },
    },
    printButton = {
        key: 'print',
        button_id: 'print',
        text: 'Print',
        iconProps: { iconName: 'Print' },
    },
    exportButton = {
        key: 'export',
        button_id: 'export',
        text: 'Export',
        iconProps: { iconName: 'ExcelLogoInverse' },
    },
    shareButton = {
        key: 'share',
        button_id: 'share',
        text: 'Share',
        iconProps: { iconName: 'Share' },
    },
    saveButton = {
        key: 'save',
        button_id: 'save',
        text: 'Save',
        iconProps: { iconName: 'SaveAll' },
    },
    cancelButton = {
        key: 'cancel',
        button_id: 'cancel',
        text: 'Cancel',
        iconProps: { iconName: 'Cancel' },
    },
    newLogButton = {
        key: 'newLog',
        button_id: 'newLog',
        text: 'New Log',
        iconProps: { iconName: 'CloudAdd' },
    },
    monthlyDashboardButton = {
        key: 'monthlyDashboard',
        button_id: 'monthlyDashboard',
        text: 'Monthly Dashboard',
        iconProps: { iconName: 'BIDashboard' },
    },
    logsButton = {
        key: 'logs',
        button_id: 'logs',
        text: 'Flight Logs',
        iconProps: { iconName: 'BacklogBoard' },
    },
    filtersButton = {
        key: 'filters',
        button_id: 'filters',
        text: 'More Filters',
        iconProps: { iconName: 'Filter' },
    },
    separator = {
        key: 'sep',
        // button_id: 'filters',
        text: '',
        ariaLabel: 'Menu separator', // This needs an ariaLabel since it's icon-only
        iconOnly: true,
        iconProps: { iconName: 'Separator' },
    },
    bigSeparator = {
        key: 'bigSep',
        // button_id: 'filters',
        text: '',
        ariaLabel: 'Big Menu separator', // This needs an ariaLabel since it's icon-only
        iconOnly: true,
        iconProps: { iconName: 'Separator' },
    },
    top_menu_farItems: ICommandBarItemProps[] = [
        {
            key: 'size',
            button_id: 'size',
            text: 'Toggle compact mode',
            ariaLabel: 'Toggle compact mode', // This needs an ariaLabel since it's icon-only
            iconOnly: true,
            iconProps: { iconName: 'SizeLegacy' },
        },
        {
            key: 'mode',
            button_id: 'mode',
            text: 'Toggle dark mode',
            ariaLabel: 'Toggle dark mode',
            iconOnly: true,
            iconProps: { iconName: 'ClearNight' },
        },
        {
            key: 'layout',
            button_id: 'layout',
            text: 'Change layout',
            ariaLabel: 'Change layout',
            iconOnly: true,
            iconProps: { iconName: 'Tiles' },
        },
        {
            key: 'info',
            button_id: 'info',
            text: 'Info',
            ariaLabel: 'Info',
            iconOnly: true,
            iconProps: { iconName: 'Info' },
        }
    ],
    itemStyles = {
        // root: { backgroundColor: colors.black.b3 },
        root: { border: 'none' },
        // rootHovered: { backgroundColor: colors.black.b5 },
        icon: { color: colors.mint },
        iconHovered: { color: colors.navy },
        // label: { color: colors.black.b9 },
        // labelHovered: { color: colors.gray.c },
    },
    styles_commandBar = {
        secondarySet: { paddingTop: 12 }
    },
    formLinks = [
        {
            heading: 'In Air Forms',
            links: [
                {
                    key: 'form-201',
                    text: 'Form 201 - Flight Log',
                },
                {
                    key: 'form-202',
                    text: 'Form 202 - Flight Manifest',
                },
            ]
        },
        {
            heading: 'Aircraft Maintenance Forms',
            links: [
                {
                    key: 'form-203',
                    text: 'Form 203 - Aircraft Status Report',
                },

            ]
        },
        {
            heading: 'Pilot Forms',
            links: [
                {
                    key: 'form-101',
                    text: 'Form 101 - Status',
                },
                {
                    key: 'form-102',
                    text: 'Form 102 - Qualifications',
                },
                {
                    key: 'form-103',
                    text: 'Form 103 - Weekly Duty',
                },
                {
                    key: 'form-104',
                    text: 'Form 104 - Time Limits',
                },
            ]
        },
        {
            heading: 'Employee Onboarding Forms',
            links: [
                {
                    key: 'form-301',
                    text: 'Aureus Measurement',
                },
                {
                    key: 'form-302',
                    text: 'HUB Pilot Record',
                },
                {
                    key: 'form-303',
                    text: 'Employee Handbook',
                },
                {
                    key: 'form-304',
                    text: 'Employee Notification',
                },
                {
                    key: 'form-305',
                    text: 'PRIA Background Check',
                },
                {
                    key: 'form-306',
                    text: 'Receipt/Acknowledgement',
                },
                {
                    key: 'form-307',
                    text: 'Drug History Release',
                },
                {
                    key: 'form-308',
                    text: 'Drug-Alcohol Abatement Program',
                },
            ]
        },

    ];


export interface TopMenuProps {
    handler: any;
    mode: string;
    page: string;
    months: any;
    aircraft: any;
    pilots: any;
    openBubble: string;
}
export interface TopMenuState { }


class TopMenu extends React.Component<TopMenuProps, { /* TopMenuState */ }> {

    constructor(props: TopMenuProps) {
        super(props);
        // this.state = {};
    }

    // public componentDidMount() {
    //     console.log('%c : TopMenu -> componentDidMount -> this.props', mcc, this.props);
    // }

    public filterMonthButton = {
        key: 'filterMonth',
        button_id: 'filterMonth',
        text: 'Month',
        iconProps: { iconName: 'CalendarMirrored' },
        subMenuProps: {
            items: this.props.months.map(m => {
                return {
                    key: m,
                    text: moment(m).add(1, 'month').format('MMMM YYYY'),
                    onClick: () => this.props.handler('month-' + m)
                };
            }),
        },
    };

    public formsButton = {
        key: 'forms',
        button_id: 'forms',
        text: 'Forms',
        iconProps: { iconName: 'Album' },
        subMenuProps: {
            items: [
                {
                    key: 'inAirForms',
                    text: 'In Air Forms',
                    subMenuProps: {
                        items: [
                            {
                                key: 'f201',
                                text: 'Form 201 - Flight Log',
                                onClick: () => this.props.handler('form-201')
                            },
                            {
                                key: 'f202',
                                text: 'Form 202 - Flight Manifest',
                                onClick: () => this.props.handler('form-202')
                            },
                        ],
                    },
                },
                {
                    key: 'aircraftMaintenanceForms',
                    text: 'Aircraft Maintenance Forms'
                },
                {
                    key: 'pilotStatusForms',
                    text: 'Pilot Forms'
                },
                {
                    key: 'employeeOnboardingForms',
                    text: 'Employee Onboarding Forms'
                },
            ],
        },
    };

    public profilesButton = {
        key: 'profiles',
        button_id: 'profiles',
        text: 'Profiles',
        iconProps: { iconName: 'CalendarMirrored' },
        subMenuProps: {
            items: [
                this.props.page != '/aircraft' && {
                    key: 'aircraft',
                    button_id: 'aircraft',
                    text: 'Aircraft',
                    iconProps: { iconName: 'Airplane' },
                    onClick: () => this.props.handler('aircraft')
                },
                this.props.page != '/pilots' && {
                    key: 'pilots',
                    button_id: 'pilots',
                    text: 'Pilots',
                    iconProps: { iconName: 'BacklogBoard' },
                    onClick: () => this.props.handler('pilots')
                },
            ],
        },
    };

    // public filterAircraftButton = {
    //     key: 'filterAircraft',
    //     button_id: 'filterAircraft',
    //     text: 'Aircraft',
    //     iconProps: { iconName: 'Airplane' },
    //     subMenuProps: {
    //         items: [
    //             {
    //                 key: 'aircraft-all',
    //                 text: 'All Aircraft',
    //                 iconProps: { iconName: 'AirplaneSolid' },
    //                 onClick: () => this.props.handler('aircraft-all')
    //             },
    //             {
    //                 key: 'aircraft-N877PA',
    //                 text: 'N877PA',
    //                 iconProps: { iconName: 'AirplaneSolid' },
    //                 onClick: () => this.props.handler('aircraft-N877PA')
    //             },
    //             {
    //                 key: 'aircraft-N876PA',
    //                 text: 'N876PA',
    //                 iconProps: { iconName: 'AirplaneSolid' },
    //                 onClick: () => this.props.handler('aircraft-N876PA')
    //             },
    //             {
    //                 key: 'aircraft-N619PA',
    //                 text: 'N619PA',
    //                 iconProps: { iconName: 'AirplaneSolid' },
    //                 onClick: () => this.props.handler('aircraft-N619PA')
    //             },

    //         ],
    //     },
    // };

    public buildTopMenu() {
        const { page } = this.props;
        let items: ICommandBarItemProps[];
        // console.log('%c : TopMenu -> page', mcc, page);
        switch (page) {

            case '/list':
                items = [
                    newLogButton,
                    separator,
                    monthlyDashboardButton,
                    separator,
                    // aircraftButton,
                    // pilotsButton,
                    this.profilesButton,
                    this.formsButton,
                    bigSeparator,
                    // this.filterMonthButton,
                    filtersButton,
                ];
                break;

            case '/monthlyDashboard':
                items = [
                    logsButton,
                    // aircraftButton,
                    // pilotsButton,
                    this.profilesButton,
                    this.formsButton,
                    bigSeparator,
                    this.filterMonthButton,
                ];
                break;

            // case '/monthlyFlightHours':
            // case '/monthlyFlights':
            // case '/monthlyFuel':
            // case '/monthlyLandings':
            //     items = [
            //         logsButton,
            //         monthlyDashboardButton,
            //         aircraftButton,
            //         pilotsButton,
            //         this.filterMonthButton,
            //     ];
            //     break;

            case '/aircraft':
                items = [
                    logsButton,
                    monthlyDashboardButton,
                    // pilotsButton,
                    this.profilesButton,
                    this.formsButton
                ];
                break;

            case '/pilots':
                items = [
                    logsButton,
                    monthlyDashboardButton,
                    // aircraftButton,
                    this.profilesButton,
                    this.formsButton
                ];
                break;

            case '/aircraftDetails':
            case '/pilotDetails':
                items = [
                    logsButton,
                    monthlyDashboardButton,
                    // aircraftButton,
                    // pilotsButton,
                    this.profilesButton,
                    this.formsButton
                ];
                break;

            default: items = [
                logsButton,
                monthlyDashboardButton,
                // aircraftButton,
                // pilotsButton,
                this.profilesButton,
                this.filterMonthButton,
                this.formsButton
            ];
        }
        // console.log('%c : TopMenu -> items', mcc, items);
        return items;
    }

    public render() {

        const { /* page, mode,  */handler } = this.props;

        const CustomButton: React.FunctionComponent<IButtonProps> = (props: any) => {
            // console.log('%c : TopMenu -> render -> CustomButton -> props', mcc, props);
            if (props.ariaLabel == 'Menu separator')
                return (
                    <CommandBarButton
                        {...props}
                        // onClick={() => handler(props.button_id)}
                        styles={{
                            ...props.styles,
                            ...itemStyles,
                            root: { border: 'none', cursor: 'default' },
                            rootHovered: { backgroundColor: 'transparent' },
                            rootPressed: { backgroundColor: 'transparent' },
                            icon: { color: colors.gray },
                            iconHovered: { color: colors.gray },
                        }}
                    />
                );

            else if (props.ariaLabel == 'Big Menu separator')
                return (
                    <CommandBarButton
                        {...props}
                        // onClick={() => handler(props.button_id)}
                        styles={{
                            ...props.styles,
                            ...itemStyles,
                            root: { border: 'none', cursor: 'default', marginLeft: 30, marginRight: 30 },
                            rootHovered: { backgroundColor: 'transparent' },
                            rootPressed: { backgroundColor: 'transparent' },
                            icon: { color: colors.gray },
                            iconHovered: { color: colors.gray },
                        }}
                    />
                );


            else if (props.button_id == 'filters')
                return (
                    <TopMenuBubble
                        buttonText='Filters'
                        buttonIconName='Filter'
                        months={this.props.months}
                        aircraft={this.props.aircraft}
                        pilots={this.props.pilots}
                        isOpen={this.props.openBubble == 'filters'}
                        handler={this.props.handler.bind(this)}
                    />
                );

            else if (props.button_id == 'forms')
                return (
                    <TopMenuBubble
                        buttonText='Forms'
                        buttonIconName='Album'
                        links={formLinks}
                        isOpen={false}
                        handler={this.props.handler.bind(this)}
                    />
                );

            return (
                <CommandBarButton
                    {...props}
                    onClick={() => handler(props.button_id)}
                    styles={{
                        ...props.styles,
                        ...itemStyles
                    }}
                />
            );
        };

        return (
            <CommandBar
                // items={items_mode}
                items={this.buildTopMenu()}
                // overflowItems={top_menu_overflowItems}
                // overflowButtonProps={overflowProps}
                farItems={top_menu_farItems}
                // ariaLabel='Use left and right arrow keys to navigate between commands'
                styles={styles_commandBar}
                buttonAs={CustomButton}
            />
        );
    }
}

export default TopMenu;