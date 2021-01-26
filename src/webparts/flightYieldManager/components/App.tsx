import * as React from 'react';
import { sp, Web } from "@pnp/sp/presets/all";
import { IAttachmentInfo } from "@pnp/sp/attachments";
import * as moment from 'moment';
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
    RouteComponentProps
} from 'react-router-dom';

import TopMenu from './TopMenu';
// import FilterPanel from './FilterPanel';

import AircraftList from './AircraftList';
import AircraftDetails from './AircraftDetails';
import PilotList from './PilotList';
import PilotDetails from './PilotDetails';

import FlightLogs from './FlightLogs';
import Form201InAirFlightLog from './forms/Form201InAirFlightLog';

import MonthlyDashBoard from './MonthlyDashboard';
import MonthlyFlightHours from './MonthlyFlightHours';
import MonthlyFlights from './MonthlyFlights';
import MonthlyFuel from './MonthlyFuel';
import MonthlyLandings from './MonthlyLandings';

const allAirportsObject: {} = require('../assets/data/airports.json');


const baseUrl = window.location.href.split('.aspx')[0] + '.aspx';
const baseUrl_rel = baseUrl.split('sharepoint.com')[1];

const mcc = 'background-color:lime;color:black;';


const getDaysInMonth = (month) => {
    const yyyy = month.split('-')[0];
    const m = month.split('-')[1];
    const monthIndex = m - 1; // 0..11 instead of 1..12
    const names = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(yyyy, monthIndex, 1);
    let result = [];
    while (date.getMonth() == monthIndex) {
        result.push(date.getDate() + "-" + names[date.getDay()]);
        date.setDate(date.getDate() + 1);
    }
    return result;
};

const getLogsInMonth = (month, logs) => {
    const logsInMonth = logs ?
        month ? logs.filter(ld => ld.depYearMonth == month)
            : logs
        : null;
    return logsInMonth;
};

const getLogsforAircraft = (aircraft, logs) => {
    console.log('%c : getLogsforAircraft -> aircraft', mcc, aircraft);
    console.log('%c : getLogsforAircraft -> logs', mcc, logs);
    const logsforAircraft = logs ?
        aircraft ? logs.filter(l => l.aircraft_name == aircraft)
            : logs
        : null;
    console.log('%c : getLogsforAircraft -> logsforAircraft', mcc, logsforAircraft);
    return logsforAircraft;
};

const getAircraftFromUrl = (aircraftText, aircraftData) => {
    const aircraftToShowArray = aircraftData
        ? !!aircraftText && aircraftText != 'all'
            ? aircraftData.filter(ad => ad.Title == aircraftText)
            : aircraftData
        : null;
    return aircraftToShowArray;
};


export interface AppProps {
    context: any;
}
type RouteProps = AppProps & RouteComponentProps;


export interface AppState {
    logs_data?: any;
    logs_fields?: any;
    log_months?: any;
    aircraft_data?: any;
    airports_data?: any;
    pilots_data?: any;
    redirect_to?: any;
    openTopMenuBubble?: string;
    // showPanel: boolean;
}

class App extends React.Component<RouteProps, AppState> {
    constructor(props: RouteProps) {
        super(props);
        this.state = {
            // showPanel: false,
        };
    }

    public componentDidMount() {
        console.time('timer - cdm');
        sp.web.get().then(w => {
            const theWeb = Web(w.Url);
            console.time('timer - get_users');
            this.get_users(theWeb).then((users: any) => {
                console.timeEnd('timer - get_users');
                console.time('timer - get_logs_data');
                this.get_logs_data(theWeb).then((logs: any) => {
                    console.timeEnd('timer - get_logs_data');
                    console.time('timer - get_pilots_data');
                    this.get_pilots_data(theWeb).then((pilots: any) => {
                        console.timeEnd('timer - get_pilots_data');
                        console.time('timer - get_aircraft_data');
                        this.get_aircraft_data(theWeb).then((aircraft: any) => {
                            console.timeEnd('timer - get_aircraft_data');
                            console.time('timer - get_airports_data');
                            this.get_airports_data(theWeb).then((airports: any) => {
                                console.timeEnd('timer - get_airports_data');
                                console.time('timer - usAirportsArray');
                                const usAirportsArray: any = Object.keys(allAirportsObject).map(a => {
                                    return allAirportsObject[a];
                                }).filter(ua => ua.country == 'United States');
                                Promise.all(usAirportsArray).then((uaa: any) => {
                                    console.timeEnd('timer - usAirportsArray');
                                    console.time('timer - airportsWithDetails');
                                    const airportsWithDetails = airports.map(a => {
                                        const thisAirport = uaa.find(usa => usa.iata == a.Title || usa.icao == 'k' + a.Title);
                                        a.details = thisAirport;
                                        return a;
                                    });
                                    Promise.all(airportsWithDetails).then(awd => {
                                        console.timeEnd('timer - airportsWithDetails');
                                        console.time('timer - get_logs_fields');

                                        this.get_logs_fields(theWeb, pilots, aircraft, airports).then((logs_fields: any) => {
                                            console.timeEnd('timer - get_logs_fields');
                                            console.time('timer - logs_with_lookups');
                                            let uniqueMonths = [];
                                            const logs_with_lookups = logs.map(l => {
                                                l.pilot_name = l.PICId ? pilots.find(p => p.Id === l.PICId).Title : null;
                                                l.aircraft_name = aircraft.find(ac => ac.Id === l.AircraftId).Title;

                                                l.depAirport_name = l.DepartureAirportId ? airports.find(dap => dap.Id === l.DepartureAirportId).Title : null;
                                                l.arrAirport_name = l.ArrivalAirportId ? airports.find(aap => aap.Id === l.ArrivalAirportId).Title : null;

                                                l.dateCreated_short = moment(l.Created).format('M/D/YYYY');
                                                const logMonth = moment(l.DepartureDateTime).format('YYYY-M');
                                                l.depYearMonth = logMonth;
                                                if (uniqueMonths.indexOf(logMonth) === -1) uniqueMonths.push(logMonth);
                                                return l;
                                            });
                                            Promise.all(logs_with_lookups).then((lwl: any) => {
                                                console.timeEnd('timer - logs_with_lookups');
                                                console.timeEnd('timer - cdm');
                                                this.setState({
                                                    logs_data: lwl,
                                                    logs_fields: logs_fields,
                                                    log_months: uniqueMonths,
                                                    aircraft_data: aircraft,
                                                    airports_data: airportsWithDetails,
                                                    pilots_data: pilots
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    }

    public componentDidUpdate(prevProps: RouteProps, prevState: AppState) {
        console.log('%c : App -> componentDidUpdate -> this.state', mcc, this.state);
    }





    public get_logs_data = (web) => new Promise(resolve => {
        web.lists.getByTitle('Flight Logs').items
            // .select('Title', 'ID', 'PlayerNameId', 'TeamId')
            // .orderBy('ID'/* , false */)
            .getAll().then(items => {
                resolve(items);
            });
    })

    public get_logs_fields = (web, pilots, aircraft, airports) => new Promise(resolve => {
        web.lists.getByTitle('Flight Logs').fields
            .filter("Hidden eq false and ReadOnlyField eq false and InternalName ne 'ContentType'")
            .select('TypeAsString', 'InternalName', 'Title', 'Required', 'Choices', 'Description')
            .get().then(fields => {
                const new_fields = JSON.parse(JSON.stringify(fields));

                const pilot_field = new_fields.filter(f => f.InternalName == 'PIC')[0];
                pilot_field['Choices'] = pilots.map(t => t.Title);

                const aircraft_field = new_fields.filter(f => f.InternalName == 'Aircraft')[0];
                aircraft_field['Choices'] = aircraft.map(ac => ac.Title);

                const dep_airport_field = new_fields.filter(f => f.InternalName == 'DepartureAirport')[0];
                dep_airport_field['Choices'] = airports.map(dap => dap.Title);

                const arr_airport_field = new_fields.filter(f => f.InternalName == 'ArrivalAirport')[0];
                arr_airport_field['Choices'] = airports.map(aap => aap.Title);

                resolve(new_fields);
            });
    })

    public get_pilots_data = (web) => new Promise(resolve => {
        web.lists.getByTitle('Pilots').items
            // .select('Title', 'ID', 'CoachId')
            // .orderBy('ID'/* , false */)
            .expand('AttachmentFiles')
            .get().then(items => {
                items.map(item => {
                    const firstAttachment/* : IAttachmentInfo[] */ = item.AttachmentFiles[0];
                    item.imageUrl = firstAttachment.ServerRelativeUrl;
                });
                resolve(items);
            });
    })

    public get_airports_data = (web) => new Promise(resolve => {
        web.lists.getByTitle('Airports').items
            // .select('Title', 'ID', 'CoachId')
            // .orderBy('ID'/* , false */)
            .getAll().then(items => {
                resolve(items);
            });
    })

    public get_aircraft_data = (web) => new Promise(resolve => {
        web.lists.getByTitle('Aircraft').items
            // .select('Title', 'ID', 'CoachId')
            // .orderBy('ID'/* , false */)
            .expand('AttachmentFiles')
            .get().then(items => {
                items.map(item => {
                    const firstAttachment/* : IAttachmentInfo[] */ = item.AttachmentFiles[0];
                    item.imageUrl = firstAttachment.ServerRelativeUrl;
                });
                resolve(items);
            });
    })

    public get_users = (web) => new Promise(resolve => {
        web.siteUsers.get().then(users => {
            resolve(users);
        });
    })





    public handler_menu(data) {
        console.log('%c : App -> handler_menu -> data', mcc, data);

        const urlParams = new URLSearchParams(window.location.search);
        const urlPage = window.location.pathname.split('.aspx')[1];
        const urlMonth = urlParams.get('month') || moment().format('YYYY-M');
        const urlAircraft = urlParams.get('aircraft') || 'all';
        // const urlAircraftId = urlParams.get('aircraftId') || 'all';

        if (typeof (data) == 'string') {
            const monthFromHandler = data.split('month-')[1];
            const aircraftFromHandler = data.split('aircraft-')[1];

            if (data == 'home' || data == 'cancel' || data == 'logs') {
                const redir = {
                    pathname: baseUrl_rel + '/list',
                    search: '?month=' + urlMonth + '&aircraft=' + urlAircraft
                };
                this.setState({ redirect_to: redir, });
            }
            else if (monthFromHandler) {
                // const aircraft = urlParams.get('aircraft') || 'all';
                const redir = {
                    pathname: baseUrl_rel + urlPage,
                    search: '?month=' + monthFromHandler + '&aircraft=' + urlAircraft
                };
                this.setState({
                    redirect_to: redir,
                    openTopMenuBubble: 'filters'
                });
            }
            else if (aircraftFromHandler) {
                // const aircraft = urlParams.get('aircraft') || 'all';
                const redir = {
                    pathname: baseUrl_rel + urlPage,
                    search: '?month=' + urlMonth + '&aircraft=' + aircraftFromHandler
                };
                this.setState({
                    redirect_to: redir,
                    openTopMenuBubble: 'filters'
                });
            }

            else if (data == 'form-201') {
                const redir = {
                    pathname: baseUrl_rel + '/form201',
                    search: '?month=' + urlMonth + '&aircraft=' + urlAircraft
                };
                this.setState({ redirect_to: redir, });
            }


            else if (data == 'monthlyDashboard') {
                const redir = {
                    pathname: baseUrl_rel + '/monthlyDashboard',
                    search: '?month=' + urlMonth
                };
                this.setState({ redirect_to: redir, });
            }
            else if (data == 'aircraft') {
                const redir = {
                    pathname: baseUrl_rel + '/aircraft',
                    // search: '?month=' + month
                };
                this.setState({ redirect_to: redir, });
            }
            else if (data == 'pilots') {
                const redir = {
                    pathname: baseUrl_rel + '/pilots',
                    // search: '?month=' + month
                };
                this.setState({ redirect_to: redir, });
            }
            // else if (data == 'filters') {
            //     this.setState({ showPanel: true });
            // }
        }
        else {
            const { key, filter, isChecked } = data;
            if (filter == 'month') {
                const redir = {
                    pathname: baseUrl_rel + urlPage,
                    search: '?month=' + key + '&aircraft=' + urlAircraft
                };
                this.setState({ redirect_to: redir, });
            }
        }


    }

    // public handler_panel(data) {
    //     if (data == 'close') {
    //         this.setState({ showPanel: false });
    //     }
    //     else {
    //         const urlParams = new URLSearchParams(window.location.search);
    //         const urlPage = window.location.pathname.split('.aspx')[1];
    //         const month = urlParams.get('month') || moment().format('YYYY-M');

    //         const urlAircraft = urlParams.get('aircraft') || 'all';
    //         const aircraftFilterValue = data.split('aircraftFilter-')[1];

    //         const urlPilot = urlParams.get('pilot') || 'all';
    //         const pilotFilterValue = data.split('pilotFilter-')[1];




    //         if (aircraftFilterValue) {
    //             const urlAircraftChanged = urlAircraft != aircraftFilterValue && aircraftFilterValue != 'noselection';
    //             if (urlAircraftChanged) {
    //                 const aircraftFilterToUse = aircraftFilterValue == 'Showallaircraft' ? 'all' : aircraftFilterValue;
    //                 const redir = {
    //                     pathname: baseUrl_rel + urlPage,
    //                     search: '?month=' + month + '&aircraftId=' + aircraftFilterToUse + '&pilot=' + urlPilot
    //                 };
    //                 this.setState({ redirect_to: redir, });
    //             }
    //         }




    //         else if (pilotFilterValue) { // ONLY SETTING URL PARAM ------ NOT FILTERING YET !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //             const urlPilotChanged = urlPilot != pilotFilterValue && pilotFilterValue != 'noselection';
    //             if (urlPilotChanged) {
    //                 const pilotFilterToUse = pilotFilterValue == 'Showallpilots' ? 'all' : pilotFilterValue;
    //                 const redir = {
    //                     pathname: baseUrl_rel + urlPage,
    //                     search: '?month=' + month + '&aircraftId=' + urlAircraft + '&pilot=' + pilotFilterToUse
    //                 };
    //                 this.setState({ redirect_to: redir, });
    //             }
    //         }
    //     }
    // }

    public handler_list(data, iid) {
        console.log('%c : App -> handler_list -> data', mcc, data);
        if (data == 'view' || data == 'edit') {
            const redir = {
                pathname: baseUrl_rel + '/form',
                search: '?mode=edit&iid=' + iid
            };
            this.setState({ redirect_to: redir, });
        }
    }

    public handler_form(msg, aircraft) {
        console.log('%c : App -> handler_form -> msg', mcc, msg);
        console.log('%c : App -> handler_form -> aircraft', mcc, aircraft);
        const urlParams = new URLSearchParams(window.location.search);
        const urlMonth = urlParams.get('month') || moment().format('YYYY-M');

        if (msg == 'pickAnAircraft') {
            console.log('%c : App -> handler_aircraftList -> window.location.pathname', mcc, window.location.pathname);
            const redir = {
                pathname: window.location.pathname,
                search: '?month=' + urlMonth + '&aircraft=' + aircraft
            };
            this.setState({ redirect_to: redir, });
        }
    }

    public handler_dashboard(data, month) {
        console.log('%c : App -> handler_dashboard -> data', mcc, data);
        console.log('%c : App -> handler_dashboard -> month', mcc, month);
        if (data == 'monthlyFlightHours') {
            const redir = {
                pathname: baseUrl_rel + '/monthlyFlightHours',
                search: '?month=' + month
            };
            this.setState({ redirect_to: redir, });
        }
        else if (data == 'monthlyFlights') {
            const redir = {
                pathname: baseUrl_rel + '/monthlyFlights',
                search: '?month=' + month
            };
            this.setState({ redirect_to: redir, });
        }
        else if (data == 'monthlyFuel') {
            const redir = {
                pathname: baseUrl_rel + '/monthlyFuel',
                search: '?month=' + month
            };
            this.setState({ redirect_to: redir, });
        }
        else if (data == 'monthlyLandings') {
            const redir = {
                pathname: baseUrl_rel + '/monthlyLandings',
                search: '?month=' + month
            };
            this.setState({ redirect_to: redir, });
        }
    }

    public handler_aircraftList(msg, identifier) {
        console.log('%c : App -> handler_aircraftList -> msg', mcc, msg);
        console.log('%c : App -> handler_aircraftList -> identifier', identifier);
        if (msg == 'aircraftDetails') {
            const redir = {
                pathname: baseUrl_rel + '/aircraftDetails',
                search: '?aircraft=' + identifier
            };
            this.setState({ redirect_to: redir, });
        }
    }

    public handler_pilotList(data, pilotId) {
        console.log('%c : App -> handler_pilotList -> data', mcc, data);
        if (data == 'pilotDetails') {
            const redir = {
                pathname: baseUrl_rel + '/pilotDetails',
                search: '?pilotId=' + pilotId
            };
            this.setState({ redirect_to: redir, });
        }
    }




    public render() {
        if (this.state.redirect_to) {
            const { redirect_to } = this.state;
            this.setState({
                redirect_to: null,
                openTopMenuBubble: null
            });
            return (
                <Router>
                    <Redirect
                        to={redirect_to}
                        push
                    />;
                </Router>
            );
        }

        console.time('render: getting params');

        const urlPage = window.location.pathname.split('.aspx')[1];

        const { logs_data, logs_fields, aircraft_data, airports_data, log_months, pilots_data, openTopMenuBubble } = this.state;

        const urlParams = new URLSearchParams(window.location.search);
        const urlMode = urlParams.get('mode');
        const urlIid = urlParams.get('iid');
        const urlMonth = urlParams.get('month') || moment().format('YYYY-M');
        // const urlAircraftId = urlParams.get('aircraftId');
        const urlPilotId = urlParams.get('pilotId');
        const urlAircraft = urlParams.get('aircraft');

        const logsInMonth = urlMonth ? getLogsInMonth(urlMonth, logs_data) : logs_data;
        const logsForAircraft = urlAircraft ? getLogsforAircraft(urlAircraft, logsInMonth) : logs_data;
        const daysInMonth = urlMonth ? getDaysInMonth(urlMonth) : null;
        const monthAndYearText = moment(urlMonth).add(1, 'month').format('MMMM YYYY');
        const items_len = Array.isArray(logs_data) ? logs_data.length : 0;
        const aircraftFromUrl = urlAircraft ? getAircraftFromUrl(urlAircraft, aircraft_data) : aircraft_data;

        console.timeEnd('render: getting params');




        console.time('render: making el_ constants');

        const el_topMenu = log_months ?
            <TopMenu
                handler={this.handler_menu.bind(this)}
                mode={urlMode}
                page={urlPage}
                months={log_months}
                aircraft={aircraft_data}
                pilots={pilots_data}
                openBubble={openTopMenuBubble}
            /> : <></>;

        // const el_panel = aircraft_data && pilots_data ? <FilterPanel
        //     aircraft={aircraft_data}
        //     pilots={pilots_data}
        //     showPanel={showPanel}
        //     handler={this.handler_panel.bind(this)}
        // /> : <></>;

        const el_flightLogs = aircraftFromUrl ? <FlightLogs
            monthAndYearText={monthAndYearText}
            logsThisMonth={logsInMonth}
            aircraftToShowArray={aircraftFromUrl}
            fields={logs_fields}
            handler={this.handler_list.bind(this)}
        /> : <></>;

        const el_form201 = logs_data ?
            <Form201InAirFlightLog
                logs={logsForAircraft}
                aircraftName={urlAircraft}
                aircraftData={aircraft_data}
                handler={this.handler_form.bind(this)}
                fields={logs_fields}
            /> : <></>;

        const el_monthlyDashboard = logs_data ? <MonthlyDashBoard
            logs={logsInMonth}
            month={urlMonth}
            monthAndYearText={monthAndYearText}
            daysInMonth={daysInMonth}
            handler={this.handler_dashboard.bind(this)}
        /> : <></>;

        const el_monthlyFlightHours = logs_data ? <MonthlyFlightHours
            logs={logsInMonth}
            pilots={pilots_data}
            aircraft={aircraft_data}
            monthAndYearText={monthAndYearText}
            daysInMonth={daysInMonth}
            handler={this.handler_dashboard.bind(this)}
        /> : <></>;

        const el_monthlyFlights = logs_data ? <MonthlyFlights
            logs={logsInMonth}
            pilots={pilots_data}
            aircraft={aircraft_data}
            airports={airports_data}
            monthAndYearText={monthAndYearText}
            daysInMonth={daysInMonth}
            handler={this.handler_dashboard.bind(this)}
        /> : <></>;

        const el_monthlyFuel = logs_data ? <MonthlyFuel
            logs={logsInMonth}
            pilots={pilots_data}
            aircraft={aircraft_data}
            airports={airports_data}
            monthAndYearText={monthAndYearText}
            daysInMonth={daysInMonth}
            handler={this.handler_dashboard.bind(this)}
        /> : <></>;

        const el_monthlyLandings = logs_data ? <MonthlyLandings
            logs={logsInMonth}
            pilots={pilots_data}
            aircraft={aircraft_data}
            monthAndYearText={monthAndYearText}
            daysInMonth={daysInMonth}
            handler={this.handler_dashboard.bind(this)}
        /> : <></>;



        const el_aircraftList = aircraft_data ?
            <AircraftList
                aircraft={aircraft_data}
                handler={this.handler_aircraftList.bind(this)}
            /> : <></>;

        const el_aircraftDetails = aircraft_data && urlAircraft ?
            <AircraftDetails
                aircraft={aircraft_data.find(ad => ad.Title === urlAircraft)}
            /> : <></>;

        const el_pilotList = pilots_data ?
            <PilotList
                pilot={pilots_data}
                handler={this.handler_pilotList.bind(this)}
            /> : <></>;

        const el_pilotDetails = pilots_data && urlPilotId ?
            <PilotDetails
                pilot={pilots_data.find(ad => ad.Id === parseInt(urlPilotId))}
            /> : <></>;



        console.timeEnd('render: making el_ constants');



        return (
            <>
                {el_topMenu}
                {/* {el_panel} */}
                <div className='appBody'>
                    <Router>
                        <Switch>
                            <Route exact path={[baseUrl_rel, baseUrl_rel + '/list']}>
                                {el_flightLogs}
                            </Route>
                            <Route path={baseUrl_rel + '/form201'}>
                                {el_form201}
                            </Route>
                            <Route path={baseUrl_rel + '/monthlyDashboard'}>
                                {el_monthlyDashboard}
                            </Route>
                            <Route path={baseUrl_rel + '/monthlyFlightHours'}>
                                {el_monthlyFlightHours}
                            </Route>
                            <Route path={baseUrl_rel + '/monthlyFlights'}>
                                {el_monthlyFlights}
                            </Route>
                            <Route path={baseUrl_rel + '/monthlyFuel'}>
                                {el_monthlyFuel}
                            </Route>
                            <Route path={baseUrl_rel + '/monthlyLandings'}>
                                {el_monthlyLandings}
                            </Route>
                            <Route path={baseUrl_rel + '/aircraft'}>
                                {el_aircraftList}
                            </Route>
                            <Route path={baseUrl_rel + '/aircraftDetails'}>
                                {el_aircraftDetails}
                            </Route>
                            <Route path={baseUrl_rel + '/pilots'}>
                                {el_pilotList}
                            </Route>
                            <Route path={baseUrl_rel + '/pilotDetails'}>
                                {el_pilotDetails}
                            </Route>
                            <Route>
                                Oops, I think we veered off course.
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </>
        );
    }
}

export default App;