import * as React from 'react';




// import { TextField, ITextFieldStyles } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { DetailsList, DetailsListLayoutMode, Selection, IColumn, IDetailsListStyles } from 'office-ui-fabric-react/lib/DetailsList';
// import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

import styles from './FlightLogsEditableList.module.scss';

import { Shimmer/* , ShimmerElementsGroup, ShimmerElementType */ } from 'office-ui-fabric-react/lib/Shimmer';
import Loading from './Loading';

import { colors } from '../assets/definitions';
import { Icon } from 'office-ui-fabric-react/lib/Icon';



import FieldText from './fields/FieldText';
import FieldDropDown from './fields/FieldDropDown';
import AsdfDateTimePicker from './fields/AsdfDateTimePicker';
// import FieldChoiceButtons from './fields/FieldChoiceButtons';
// import FieldPeoplePicker from './fields/FieldPeoplePicker';




const mcc = 'background-color:aqua;color:black;';


// const style_checkboxIcon = {
//     root: {
//         color: colors.status.green.bg,
//         fontSize: 18,
//         marginRight: 6
//     }
// };
// const style_checkboxErrorIcon = {
//     root: {
//         color: colors.status.red.bg,
//         fontSize: 18,
//         marginRight: 6
//     }
// };
// const CheckboxDoneIcon = () => <Icon
//     iconName='CheckboxCompositeReversed'
//     className='ms-IconExample'
//     styles={style_checkboxIcon}
// />;
// const CheckboxErrorIcon = () => <Icon
//     iconName='Error'
//     className='ms-IconExample'
//     styles={style_checkboxErrorIcon}
// />;
// const CheckboxIcon = () => <Icon
//     iconName='Checkbox'
//     className='ms-IconExample'
//     styles={style_checkboxIcon}
// />;

const style_detailsList: Partial<IDetailsListStyles> = {
    root: {
        // marginTop: 10,
        overflow: 'visible'
    }
};

const style_searchbox = mergeStyles({
    display: 'block',
    marginBottom: '10px',
});

// const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: '300px' } };

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






export interface FlightLogsEditableListProps {
    monthAndYearText: string;
    logs: any;
    aircraftName: string;
    fields: any;
    handler: any;
}

export interface FlightLogsEditableListState {
    logs: IListItem[];
    // colGroups: any;
}

class FlightLogsEditableList extends React.Component<FlightLogsEditableListProps, FlightLogsEditableListState> {

    private _selection: Selection;
    private _allItems: IListItem[];
    private _columns: IColumn[];



    constructor(props: FlightLogsEditableListProps) {
        super(props);

        this._columns = [
            // { key: 'column1', name: 'ID', fieldName: 'id', minWidth: 50, maxWidth: 50, isResizable: false },
            { key: 'aircraft_name', name: 'Aircraft', fieldName: 'aircraft_name', minWidth: 100, maxWidth: 100, isResizable: false },
            { key: 'FlightReleaseNumber', name: 'Flight Release #', fieldName: 'FlightReleaseNumber', minWidth: 100, maxWidth: 100, isResizable: false },
            { key: 'DepartureDateTime', name: 'Time Ish', fieldName: 'DepartureDateTime', minWidth: 130, maxWidth: 130, isResizable: false },
            { key: 'depAirport_name', name: 'From', fieldName: 'depAirport_name', minWidth: 75, maxWidth: 75, isResizable: false },
            { key: 'arrAirport_name', name: 'To', fieldName: 'arrAirport_name', minWidth: 75, maxWidth: 75, isResizable: false },
            { key: 'HobbsStart', name: 'Hobbs Start', fieldName: 'HobbsStart', minWidth: 75, maxWidth: 75, isResizable: false },
            { key: 'HobbsEnd', name: 'Hobbs End', fieldName: 'HobbsEnd', minWidth: 75, maxWidth: 75, isResizable: false },
            { key: 'LegTotal', name: 'Leg Total', fieldName: 'LegTotal', minWidth: 50, maxWidth: 50, isResizable: false },
            { key: 'Engine1Hours', name: 'Engine 1 Hours', fieldName: 'Engine1Hours', minWidth: 75, maxWidth: 75, isResizable: false },
            { key: 'Engine1Tens', name: 'Engine 1 Tens', fieldName: 'Engine1Tens', minWidth: 75, maxWidth: 75, isResizable: false },
            { key: 'Engine2Hours', name: 'Engine 2 Hours', fieldName: 'Engine2Hours', minWidth: 75, maxWidth: 75, isResizable: false },
            { key: 'Engine2Tens', name: 'Engine 2 Tens', fieldName: 'Engine2Tens', minWidth: 75, maxWidth: 75, isResizable: false },
            { key: 'CyclesLandings', name: 'Cycles Landings', fieldName: 'CyclesLandings', minWidth: 75, maxWidth: 75, isResizable: false },
            { key: 'CyclesEngine1', name: 'Cycles Engine 1', fieldName: 'CyclesEngine1', minWidth: 75, maxWidth: 75, isResizable: false },
            { key: 'CyclesEngine2', name: 'Cycles Engine 2', fieldName: 'CyclesEngine2', minWidth: 75, maxWidth: 75, isResizable: false },
            { key: 'FuelIn', name: 'Fuel In', fieldName: 'FuelIn', minWidth: 75, maxWidth: 75, isResizable: false },
            { key: 'FuelOut', name: 'Fuel Out', fieldName: 'FuelOut', minWidth: 75, maxWidth: 75, isResizable: false },
            { key: 'FuelUsed', name: 'Fuel Used', fieldName: 'FuelUsed', minWidth: 50, maxWidth: 50, isResizable: false },
            { key: 'FuelPurchased', name: 'Fuel Purchased', fieldName: 'FuelPurchased', minWidth: 75, maxWidth: 75, isResizable: false },
            { key: 'FuelAmount', name: 'Fuel Amount', fieldName: 'FuelAmount', minWidth: 75, maxWidth: 75, isResizable: false },
            { key: 'PIC', name: 'PIC', fieldName: 'PIC', minWidth: 100, maxWidth: 100, isResizable: false },
            { key: 'NonRevenueHours', name: 'Non-Revenue Hours', fieldName: 'NonRevenueHours', minWidth: 75, maxWidth: 75, isResizable: false },
            { key: 'DayNight', name: 'Day/Night', fieldName: 'DayNight', minWidth: 75, maxWidth: 75, isResizable: false },
            { key: 'view', name: '', fieldName: 'view', minWidth: 100, maxWidth: 100, isResizable: false },
            { key: 'edit', name: '', fieldName: 'edit', minWidth: 100, maxWidth: 100, isResizable: false },
        ];


        this.state = {
            logs: this._allItems,
        };

        this._onRenderItemColumn = this._onRenderItemColumn.bind(this);
        this.onclick_listButton = this.onclick_listButton.bind(this);

    }

    public componentDidMount() {
        // console.log('%c : FlightLogsEditableList -> componentDidMount -> this.props', mcc, this.props);
        this._allItems = [];
        if (this.props.logs) {
            this.props.logs.map(log => {
                // console.log('%c : FlightLogsEditableList -> componentDidMount -> log', mcc, log);

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

    // public componentDidUpdate(prevProps: FlightLogsEditableListProps, prevState: FlightLogsEditableListState) {
    //     console.log('%c : FlightLogsEditableList -> componentDidUpdate -> this.state', mcc, this.state);
    // }


    public onclick_listButton(button, iid) {
        this.props.handler(button, iid);
    }

    public handler_fields(data) {
        console.log('%c : FlightLogsEditableList -> handler_fields -> data', mcc, data);

    }

    public _onRenderItemColumn(item: IListItem, index: number, column: IColumn) {
        const fieldContent = item[column.fieldName as keyof IListItem] as string;
        const fieldName = column.fieldName;
        const { fields } = this.props;
        switch (fieldName) {

            /* text fields */
            case 'FlightReleaseNumber':
            case 'HobbsStart':
            case 'HobbsEnd':
            case 'Engine1Hours':
            case 'Engine1Tens':
            case 'Engine2Hours':
            case 'Engine2Tens':
            case 'CyclesLandings':
            case 'CyclesEngine1':
            case 'CyclesEngine2':
            case 'FuelIn':
            case 'FuelOut':
            case 'FuelPurchased':
            case 'FuelAmount':
            case 'NonRevenueHours':
                return <FieldText
                    field={{
                        Title: column.name,
                        InternalName: fieldName,
                        TypeAsString: 'Text',
                        Description: '',
                        value: item[fieldName]
                    }}
                    placeholder=''
                    handler={this.handler_fields.bind(this)}
                />;

            /* calculated fields */
            case 'LegTotal':
                return <span style={{ lineHeight: '32px' }}>{(item.HobbsEnd - item.HobbsStart).toFixed(1)}</span>;

            case 'FuelUsed':
                return <span style={{ lineHeight: '32px' }}>{(item.FuelIn - item.FuelOut)}</span>;

            /* lookup fields */
            case 'aircraft_name':
                return <FieldDropDown
                    field={{
                        Title: column.name,
                        InternalName: fieldName,
                        TypeAsString: 'Choice',
                        Description: '',
                        Choices: fields.find(f => f.InternalName == 'Aircraft').Choices,
                        value: item[fieldName]
                    }}
                    handler={this.handler_fields.bind(this)}
                    label={false}
                />;

            case 'depAirport_name':
            case 'arrAirport_name':
                return <FieldDropDown
                    field={{
                        Title: column.name,
                        InternalName: fieldName,
                        TypeAsString: 'Choice',
                        Description: '',
                        Choices: fields.find(f1 => f1.InternalName == 'DepartureAirport').Choices, // same choices for both airport fields
                        value: item[fieldName]
                    }}
                    handler={this.handler_fields.bind(this)}
                    label={false}
                />;

            case 'PIC':
                return <FieldDropDown
                    field={{
                        Title: column.name,
                        InternalName: fieldName,
                        TypeAsString: 'Choice',
                        Description: '',
                        Choices: fields.find(f => f.InternalName == 'PIC').Choices,
                        value: item.pilot_name
                    }}
                    handler={this.handler_fields.bind(this)}
                    label={false}
                />;

            case 'DayNight':
                return <FieldDropDown
                    field={{
                        Title: column.name,
                        InternalName: fieldName,
                        TypeAsString: 'Choice',
                        Description: '',
                        Choices: fields.find(f => f.InternalName == 'DayNight').Choices,
                        value: item[fieldName]
                    }}
                    handler={this.handler_fields.bind(this)}
                    label={false}
                />;

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
        // console.log('%c : FlightLogsEditableList -> _onColumnResize -> column', mcc, column);
        // console.log('%c : FlightLogsEditableList -> _onColumnResize -> newWidth', mcc, newWidth);
        // console.log('%c : FlightLogsEditableList -> _onColumnResize -> columnIndex', mcc, columnIndex);

        // const { colGroups } = this.state;
        // const newGroups = JSON.parse(JSON.stringify(colGroups));

        // const changedGroup = newGroups.flatMap(ng => ng.columns).find(g => g.colKey == column.key);
        // console.log('%c : FlightLogsEditableList -> _onColumnResize -> changedGroup', mcc, changedGroup);
        // changedGroup.colWidth = newWidth;
        // console.log('%c : FlightLogsEditableList -> _onColumnResize -> changedGroup', mcc, changedGroup);

        // console.log('%c : FlightLogsEditableList -> _onColumnResize -> newGroups', mcc, newGroups);

        // this.setState({ colGroups: newGroups });


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

    // private _onFilter = (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    //     console.log('%c : FlightLogsEditableList -> ev', mcc, ev);
    //     console.log('%c : FlightLogsEditableList -> text', mcc, text);
    //     this.setState({
    //         logs: text ? this._allItems.filter(i => i.Title.toLowerCase().indexOf(text) > -1) : this._allItems,
    //     });
    // }

    public _onItemInvoked(item: IListItem): void {
        this.props.handler('view', item.Id);
    }

    public render() {
        const { aircraftName, monthAndYearText } = this.props;
        const { logs,/*  colGroups selectionDetails */ } = this.state;


        const el_listHeading = <div className={styles.listHeading}>{aircraftName}</div>;


        // const el_columnGroupHeads = colGroups ? <div className={styles.columnGroupHeads}>
        //     {colGroups.map(cw => {
        //         const groupWidth = cw.columns.reduce((a, b) => {
        //             const a_toUse = a.colWidth || a;
        //             return a_toUse + b.colWidth;
        //         });
        //         const groupPaddingRight = cw.columns.length * 20;
        //         return <div
        //             className='temp-columnGroupHead'
        //             style={{
        //                 width: groupWidth,
        //                 paddingRight: groupPaddingRight,
        //                 paddingLeft: 10,
        //                 display: 'inline-block'
        //             }}>
        //             {cw.groupName}
        //         </div>;
        //     })}
        // </div>
        //     : <></>;


        // const el = logs ? <Fabric style={{ overflow: 'scroll' }}>
        const el_list = logs ? <Fabric className={styles.listFabric}>
            {/* <div className={style_searchbox}>{selectionDetails}</div> */}
            {/* <Announced message={selectionDetails} /> */}
            {/* <TextField
                className={style_searchbox}
                label='Filter by name:'
                onChange={this._onFilter}
                styles={textFieldStyles}
            /> */}
            {/* {el_columnGroupHeads} */}
            {/* <Announced message={`Number of logs after filter applied: ${logs.length}.`} /> */}
            {/* <MarqueeSelection selection={this._selection}> */}
            <DetailsList
                key={logs.length}
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
                onRenderItemColumn={this._onRenderItemColumn.bind(this)}
                styles={style_detailsList}
                onColumnResize={this._onColumnResize.bind(this)}
            />
            {/* </MarqueeSelection> */}
        </Fabric>
            : <></>;


        const isLoaded = !!logs;

        // const style_shimmer = { root: { margin: '20px 50px 0 0' } };

        return (
                <Shimmer
                    isDataLoaded={isLoaded}
                    ariaLabel='Loading assessment'
                    // styles={style_shimmer}
                    customElementsGroup={this._getCustomShimmer()}
                >
                    {el_listHeading}
                    {el_list}
                </Shimmer>
        );
    }
}

export default FlightLogsEditableList;