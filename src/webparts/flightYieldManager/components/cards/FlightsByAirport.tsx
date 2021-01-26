import * as React from 'react';
import MapOne from '../maps/MapOne';


const mcc = 'background-color:black;color:yellow;';

export interface FlightsByAirportProps {
    logs: any;
    airports: any;
}

export interface FlightsByAirportState {
    dataMarkers?: any;
    airportsNoCoords?: any;
}

class FlightsByAirport extends React.Component<FlightsByAirportProps, FlightsByAirportState> {
    constructor(props: FlightsByAirportProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        console.log('%c : FlightsByAirport -> componentDidMount -> this.props', mcc, this.props);
        const { airports, logs } = this.props;
        const airportsCopy = JSON.parse(JSON.stringify(airports));
        const airportsWithLandingCounts = airportsCopy.map(a => {
            const logsThisAirport = logs.filter(l => l.depAirport_name == a.Title);
            const landingsThisAirport = logsThisAirport.length;
            a.landings = landingsThisAirport;
            return a;
        });
        Promise.all(airportsWithLandingCounts).then(awlc => {
            const airportsWithCoords = awlc.filter((awlcWc: any) => awlcWc.details && awlcWc.details.latitude && awlcWc.details.longitude);
            const airportsNoCoords = awlc.filter((awlcNc: any) => !awlcNc.details || !awlcNc.details.latitude || !awlcNc.details.longitude); // use this somewhere ?????????????????????????????

            const dataMarkers = airportsWithCoords.map((airport: any) => {
                const markerSize = airport.Title == 'FSM' ? 6
                    : airport.landings ? airport.landings * 2 : 1;
                const markerColor = airport.Title == 'FSM' ? 'red'
                    : airport.landings ? airport.landings > 1 ? 'green' : 'darkorange' : 'white';
                const lat = airport.details ? parseFloat(parseFloat(airport.details.latitude).toFixed(6)) : null;
                const long = airport.details ? parseFloat(parseFloat(airport.details.longitude).toFixed(6)) : null;
                return {
                    label: airport.Title,
                    label_fill: '#eee',
                    label_stroke: 'transparent',
                    label_line_stroke: '#f53',
                    marker_color: markerColor,
                    marker_shape: 'circle',
                    marker_size: markerSize,
                    coords: [long, lat],
                    dx: 30,
                    dy: 5,
                };
            });
            Promise.all(dataMarkers).then(dm => {
                this.setState({
                    dataMarkers: dm,
                    airportsNoCoords: airportsNoCoords
                });
            });
        });

    }

    public componentDidUpdate(prevProps: FlightsByAirportProps, prevState: FlightsByAirportState) {
        console.log('%c : FlightsByAirport -> componentDidUpdate -> this.state', mcc, this.state);
    }

    public handlerMap(data) {
        console.log('%c : FlightsByAirport -> handlerMap -> data', mcc, data);

    }

    public render() {
        const { dataMarkers } = this.state;

        const chartHeadingDiv = <div className='chartHeading'>Flights by Airport</div>;


        const elMap = dataMarkers ?
            <MapOne
                markers={dataMarkers}
            /> : <></>;


        return (
            <div className='map-wrap'>
                {chartHeadingDiv}
                {elMap}
            </div>
        );
    }
}

export default FlightsByAirport;