import * as React from 'react';

import { TextField, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn, IDetailsListStyles } from 'office-ui-fabric-react/lib/DetailsList';
// import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import styles from './List.module.scss';

import { Shimmer/* , ShimmerElementsGroup, ShimmerElementType */ } from 'office-ui-fabric-react/lib/Shimmer';
import Loading from './Loading';

import { colors } from '../assets/definitions';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

const mcc = 'background-color:aqua;color:black;';


const style_checkboxIcon = {
    root: {
        color: colors.status.green.bg,
        fontSize: 18,
        marginRight: 6
    }
};
const style_checkboxErrorIcon = {
    root: {
        color: colors.status.red.bg,
        fontSize: 18,
        marginRight: 6
    }
};
const CheckboxDoneIcon = () => <Icon
    iconName='CheckboxCompositeReversed'
    className='ms-IconExample'
    styles={style_checkboxIcon}
/>;
const CheckboxErrorIcon = () => <Icon
    iconName='Error'
    className='ms-IconExample'
    styles={style_checkboxErrorIcon}
/>;
const CheckboxIcon = () => <Icon
    iconName='Checkbox'
    className='ms-IconExample'
    styles={style_checkboxIcon}
/>;

const style_detailsList: Partial<IDetailsListStyles> = {
    root: {
        marginTop: 10
    }
};

const exampleChildClass = mergeStyles({
    display: 'block',
    marginBottom: '10px',
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px' } };

export interface IListItem {
    key: number;
    Id: number;
    Title: string;

    // AircraftId: string;
    // ArrivalAirportId: number;
    ArrivalTime: string;
    CyclesEngine1: number;
    CyclesEngine2: number;
    CyclesLandings: number;
    DayNight: string;
    // DepartureAirportId: number;
    DepartureDateTime: string;
    Engine1Hours: number;
    Engine1Tens: number;
    Engine2Hours: number;
    Engine2Tens: number;
    FlightReleaseNumber: string;
    FuelAmount: number;
    FuelIn: number;
    FuelOut: number;
    FuelPurchased: number;
    FuelUsed: number;
    HobbsEnd: number;
    HobbsStart: number;
    LegTotal: number;
    NonRevenueHours: number;
    // PICId: number;
    aircraft_name: string;
    arrAirport_name: string;
    depAirport_name: string;
    pilot_name: string;

    dateCreated_short: string;

    view: number;
    edit: number;
}






export interface ListProps {
    logs: any;
    handler: any;
}

export interface ListState {
    logs: IListItem[];
    colGroups: any;
}

class List extends React.Component<ListProps, ListState> {

    private _selection: Selection;
    private _allItems: IListItem[];
    private _columns: IColumn[];



    constructor(props: ListProps) {
        super(props);

        this._columns = [
            // { key: 'column1', name: 'ID', fieldName: 'id', minWidth: 50, maxWidth: 50, isResizable: false },
            { key: 'aircraft_name', name: 'Aircraft', fieldName: 'aircraft_name', minWidth: 50, maxWidth: 50, isResizable: true },
            { key: 'FlightReleaseNumber', name: 'Flight Release #', fieldName: 'FlightReleaseNumber', minWidth: 50, maxWidth: 100, isResizable: true },
            { key: 'DepartureDateTime', name: 'Time Ish', fieldName: 'DepartureDateTime', minWidth: 50, maxWidth: 130, isResizable: true },
            { key: 'depAirport_name', name: 'From', fieldName: 'depAirport_name', minWidth: 50, maxWidth: 50, isResizable: true },
            { key: 'arrAirport_name', name: 'To', fieldName: 'arrAirport_name', minWidth: 50, maxWidth: 50, isResizable: true },
            { key: 'HobbsStart', name: 'Hobbs Start', fieldName: 'HobbsStart', minWidth: 50, maxWidth: 50, isResizable: true },
            { key: 'HobbsEnd', name: 'Hobbs End', fieldName: 'HobbsEnd', minWidth: 50, maxWidth: 50, isResizable: true },
            { key: 'LegTotal', name: 'Leg Total', fieldName: 'LegTotal', minWidth: 50, maxWidth: 50, isResizable: true },
            { key: 'view', name: '', fieldName: 'view', minWidth: 100, maxWidth: 100, isResizable: false },
            { key: 'edit', name: '', fieldName: 'edit', minWidth: 100, maxWidth: 100, isResizable: false },
        ];

        const colGroups_init = [
            {
                groupName: 'group0',
                columns: [
                    {
                        colKey: "aircraft_name",
                        colWidth: this._columns.filter(c => c.key == "aircraft_name")[0].maxWidth
                    },
                    {
                        colKey: "FlightReleaseNumber",
                        colWidth: this._columns.filter(c => c.key == "FlightReleaseNumber")[0].maxWidth
                    },
                    {
                        colKey: "DepartureDateTime",
                        colWidth: this._columns.filter(c => c.key == "DepartureDateTime")[0].maxWidth
                    },
                    {
                        colKey: "depAirport_name",
                        colWidth: this._columns.filter(c => c.key == "depAirport_name")[0].maxWidth
                    },
                    {
                        colKey: "arrAirport_name",
                        colWidth: this._columns.filter(c => c.key == "arrAirport_name")[0].maxWidth
                    },
                ]
            },
            {
                groupName: 'groupHobbs',
                columns: [
                    {
                        colKey: "HobbsStart",
                        colWidth: this._columns.filter(c => c.key == "HobbsStart")[0].maxWidth
                    },
                    {
                        colKey: "HobbsEnd",
                        colWidth: this._columns.filter(c => c.key == "HobbsEnd")[0].maxWidth
                    },
                    {
                        colKey: "LegTotal",
                        colWidth: this._columns.filter(c => c.key == "LegTotal")[0].maxWidth
                    },
                ]
            },
            {
                groupName: 'groupActions',
                columns: [
                    {
                        colKey: "view",
                        colWidth: this._columns.filter(c => c.key == "view")[0].maxWidth
                    },
                    {
                        colKey: "edit",
                        colWidth: this._columns.filter(c => c.key == "edit")[0].maxWidth
                    },
                ]
            },
        ];


        this.state = {
            logs: this._allItems,
            colGroups: colGroups_init
        };

        this._onRenderItemColumn = this._onRenderItemColumn.bind(this);
        this.onclick_listButton = this.onclick_listButton.bind(this);

    }

    public componentDidMount() {
        console.log('%c : List -> componentDidMount -> this.props', mcc, this.props);
        this._allItems = [];
        if (this.props.logs) {
            this.props.logs.map(log => {
                // console.log('%c : List -> componentDidMount -> log', mcc, log);

                this._allItems.push({
                    key: log.Id,
                    Title: log.Title,
                    Id: log.Id,

                    // AircraftId: log.AircraftId,
                    // ArrivalAirportId: log.ArrivalAirportId,
                    ArrivalTime: log.ArrivalTime,
                    CyclesEngine1: log.CyclesEngine1,
                    CyclesEngine2: log.CyclesEngine2,
                    CyclesLandings: log.CyclesLandings,
                    DayNight: log.DayNight,
                    // DepartureAirportId: log.DepartureAirportId,
                    DepartureDateTime: log.DepartureDateTime,
                    Engine1Hours: log.Engine1Hours,
                    Engine1Tens: log.Engine1Tens,
                    Engine2Hours: log.Engine2Hours,
                    Engine2Tens: log.Engine2Tens,
                    FlightReleaseNumber: log.FlightReleaseNumber,
                    FuelAmount: log.FuelAmount,
                    FuelIn: log.FuelIn,
                    FuelOut: log.FuelOut,
                    FuelPurchased: log.FuelPurchased,
                    FuelUsed: log.FuelUsed,
                    HobbsEnd: log.HobbsEnd,
                    HobbsStart: log.HobbsStart,
                    LegTotal: log.LegTotal,
                    NonRevenueHours: log.NonRevenueHours,
                    // // PICId: log.PICId,
                    aircraft_name: log.aircraft_name,
                    arrAirport_name: log.arrAirport_name,
                    depAirport_name: log.depAirport_name,
                    pilot_name: log.pilot_name,

                    dateCreated_short: log.dateCreated_short,

                    view: null,
                    edit: null
                });
            });
            this.setState({ logs: this._allItems });
        }
    }

    public componentDidUpdate(prevProps: ListProps, prevState: ListState) {
        console.log('%c : List -> componentDidUpdate -> this.state', mcc, this.state);
    }


    public onclick_listButton(button, iid) {
        this.props.handler(button, iid);
    }

    // public get_symptoms(checklist) {

    //     const symptoms = {
    //         exposed: checklist.Exposed,
    //         soreThroat: checklist.SoreThroat,
    //         cough: checklist.Cough,
    //         fever: checklist.Fever,
    //         shortBreath: checklist.ShortBreath,
    //         chills: checklist.Chills,
    //         musclePain: checklist.MusclePain,
    //         lostTasteSmell: checklist.LostTasteSmell,
    //         icon: null
    //     };

    //     // const checkboxes = symptoms.map(s => {
    //     //     if (s.signedBy) return <CheckboxDoneIcon />;
    //     //     return <CheckboxIcon />;
    //     // });
    //     return symptoms;
    // }

    public _onRenderItemColumn(item: IListItem, index: number, column: IColumn) {
        const fieldContent = item[column.fieldName as keyof IListItem] as string;
        // const { pct } = item;
        // const bgColor = pct <= 39 ? colors.status.red.bg
        //     : pct <= 69 ? colors.status.yellow.bg
        //         : colors.status.green.bg;


        // const { symptoms } = item;
        // const el_symptom_icons = Object.keys(symptoms).map(symptom => {
        //     // console.log('%c : List -> get_symptoms -> symptom (mapping keys)', mcc, symptom);
        //     // console.log('%c : List -> get_symptoms -> symptom (mapping values)', mcc, symptoms[symptom]);
        //     const el_icon = symptoms[symptom] == 'Yes' ? <CheckboxDoneIcon /> : symptoms[symptom] == 'No' ? <CheckboxErrorIcon /> : <CheckboxIcon />;
        //     return el_icon;
        // });



        switch (column.fieldName) {

            // case 'symptoms':
            //     return <div className={styles.iconsWrap}>
            //         {el_symptom_icons}
            //     </div>;

            case 'view':
                return <DefaultButton
                    text='View'
                    onClick={(e) => this.onclick_listButton(column.fieldName, item.Id)}
                />;

            case 'edit':
                return <DefaultButton
                    text='Edit'
                    onClick={(e) => this.onclick_listButton(column.fieldName, item.Id)}
                />;

            default:
                return <span style={{ lineHeight: '32px' }}>{fieldContent}</span>;
        }
    }

    public makeColumnGroupHeaders() {

    }

    public _onColumnResize(column?: IColumn, newWidth?: number, columnIndex?: number) {
        console.log('%c : List -> _onColumnResize -> column', mcc, column);
        console.log('%c : List -> _onColumnResize -> newWidth', mcc, newWidth);
        console.log('%c : List -> _onColumnResize -> columnIndex', mcc, columnIndex);

        const { colGroups } = this.state;
        const newGroups = JSON.parse(JSON.stringify(colGroups));

        const changedGroup = newGroups.flatMap(ng => ng.columns).find(g => g.colKey == column.key);
        console.log('%c : List -> _onColumnResize -> changedGroup', mcc, changedGroup);
        changedGroup.colWidth = newWidth;
        console.log('%c : List -> _onColumnResize -> changedGroup', mcc, changedGroup);

        console.log('%c : List -> _onColumnResize -> newGroups', mcc, newGroups);

        this.setState({ colGroups: newGroups });


        // const category = categoryGroups.flatMap(cg => cg.Categories)
        //    .find(c => c.Id === categoryId);


        // const colToFind = column.key;
        // const foundEntry = Object.entries(newGroups)
        //     .find(
        //         ([, arr]) => arr.some(
        //             ({ meal_id }) => meal_id === colToFind
        //         )
        //     );
        // if (foundEntry) {
        //     console.log(foundEntry[0]);
        // }


    }


    private _getCustomShimmer = (): JSX.Element => {
        return (
            <Loading />
        );
    }

    private _onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
        console.log('%c : List -> ev', mcc, ev);
        console.log('%c : List -> text', mcc, text);
        this.setState({
            logs: text ? this._allItems.filter(i => i.Title.toLowerCase().indexOf(text) > -1) : this._allItems,
        });
    }

    public _onItemInvoked(item: IListItem): void {
        this.props.handler('view', item.Id);
    }

    public render() {
        const { logs, colGroups /* selectionDetails */ } = this.state;


        const el_columnGroupHeads = colGroups ? <div className='temp-columnGroupHeads'>
            {colGroups.map(cw => {
                const groupWidth = cw.columns.reduce((a, b) => {
                    const a_toUse = a.colWidth || a;
                    return a_toUse + b.colWidth;
                });
                const groupPaddingRight = cw.columns.length * 20;
                return <div
                    className='temp-columnGroupHead'
                    style={{
                        width: groupWidth,
                        paddingRight: groupPaddingRight,
                        paddingLeft: 10,
                        display: 'inline-block'
                    }}>
                    {cw.groupName}
                </div>;
            })};
        </div>
            : <></>;


        const el = logs ? <Fabric style={{ padding: '10px 40px' }}>
            {/* <div className={exampleChildClass}>{selectionDetails}</div> */}
            {/* <Announced message={selectionDetails} /> */}
            <TextField
                className={exampleChildClass}
                label='Filter by name:'
                onChange={this._onFilter}
                styles={textFieldStyles}
            />
            {el_columnGroupHeads}
            {/* <Announced message={`Number of logs after filter applied: ${logs.length}.`} /> */}
            {/* <MarqueeSelection selection={this._selection}> */}
            <DetailsList
                compact={true}
                items={logs}
                columns={this._columns}
                setKey='set'
                layoutMode={DetailsListLayoutMode.justified}
                // selection={this._selection}
                // selectionPreservedOnEmptyClick={true}
                onItemInvoked={this._onItemInvoked.bind(this)}
                // ariaLabelForSelectionColumn='Toggle selection'
                // ariaLabelForSelectAllCheckbox='Toggle selection for all items'
                // checkButtonAriaLabel='Row checkbox'
                checkboxVisibility={2}
                onRenderItemColumn={this._onRenderItemColumn}
                styles={style_detailsList}
                onColumnResize={this._onColumnResize.bind(this)}
            />
            {/* </MarqueeSelection> */}
        </Fabric>
            : <></>;


        const isLoaded = !!logs;

        const style_shimmer = { root: { margin: '20px 50px 0 0' } };

        return (
            <Shimmer
                isDataLoaded={isLoaded}
                ariaLabel='Loading assessment'
                styles={style_shimmer}
                customElementsGroup={this._getCustomShimmer()}
            >
                {el}
            </Shimmer>
        );
    }
}

export default List;