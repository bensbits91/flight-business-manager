import * as React from 'react';
import MapOne from '../maps/MapOne';
import { colors } from '../../assets/definitions';

import { getSumOfDiffOf2Props, getSumOf1Prop } from '../../utils/calc';

const mcc = 'background-color:black;color:yellow;';

export interface FuelByAirportProps {
    logs: any;
    airports: any;
}

export interface FuelByAirportState {
    dataMarkers?: any;
    airportsNoCoords?: any;
}

class FuelByAirport extends React.Component<FuelByAirportProps, FuelByAirportState> {
    constructor(props: FuelByAirportProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        console.log('%c : FuelByAirport -> componentDidMount -> this.props', mcc, this.props);
        const { airports, logs } = this.props;
        const airportsCopy = JSON.parse(JSON.stringify(airports));
        const airportsWithFuelSums = airportsCopy.map(a => {
            const logsThisAirport = logs.filter(l => l.depAirport_name == a.Title);
            const fuelUsed = getSumOfDiffOf2Props(logsThisAirport, 'FuelIn', 'FuelOut');
            const fuelPurchased = getSumOf1Prop(logsThisAirport, 'FuelPurchased');


            a.fuelUsedGettingHere = fuelUsed;
            a.fuelPurchasedHere = fuelPurchased;
            return a;
        });
        Promise.all(airportsWithFuelSums).then(awlc => {
            const airportsWithCoords = awlc.filter((awlcWc: any) => awlcWc.details && awlcWc.details.latitude && awlcWc.details.longitude);
            const airportsNoCoords = awlc.filter((awlcNc: any) => !awlcNc.details || !awlcNc.details.latitude || !awlcNc.details.longitude); // use this somewhere ?????????????????????????????
            let dataMarkers = [];
            const dataMarkersMap = airportsWithCoords.map((airport: any) => {

                const markerSize_used = airport.Title == 'FSM' ? 6 :
                    airport.fuelUsedGettingHere ? airport.fuelUsedGettingHere / 500 : 1;

                const markerSize_purchased = airport.Title == 'FSM' ? 3 :
                    airport.fuelPurchasedHere ? airport.fuelPurchasedHere / 100 : 1;

                const markerColor_used = airport.Title == 'FSM' ? 'red'
                    : airport.fuelUsedGettingHere ? airport.fuelUsedGettingHere > 1 ? colors.mint : colors.orange : 'white';

                const markerColor_purchased = airport.Title == 'FSM' ? 'red'
                    : airport.fuelPurchasedHere ? colors.pink : 'white';

                const lat = airport.details ? parseFloat(parseFloat(airport.details.latitude).toFixed(6)) : null;
                const long = airport.details ? parseFloat(parseFloat(airport.details.longitude).toFixed(6)) : null;

                dataMarkers.push(
                    {
                        label: airport.Title,
                        label_fill: '#eee',
                        label_stroke: 'transparent',
                        label_line_stroke: '#f53',
                        marker_color: markerColor_used,
                        marker_shape: 'circle',
                        marker_size: markerSize_used,
                        coords: [long, lat],
                        dx: 30,
                        dy: 5,
                    },
                    {
                        label: airport.Title,
                        label_fill: '#eee',
                        label_stroke: 'transparent',
                        label_line_stroke: '#f53',
                        marker_color: markerColor_purchased,
                        marker_shape: 'circle',
                        marker_size: markerSize_purchased,
                        coords: [long, lat],
                        dx: 30,
                        dy: 5,
                    }
                );
            });
            Promise.all(dataMarkersMap).then(dm => {
                this.setState({
                    dataMarkers: dataMarkers,
                    airportsNoCoords: airportsNoCoords
                });
            });
        });

    }

    public componentDidUpdate(prevProps: FuelByAirportProps, prevState: FuelByAirportState) {
        console.log('%c : FuelByAirport -> componentDidUpdate -> this.state', mcc, this.state);
    }

    public handlerMap(data) {
        console.log('%c : FuelByAirport -> handlerMap -> data', mcc, data);

    }

    public render() {
        const { dataMarkers } = this.state;

        const chartHeadingDiv = <div className='chartHeading'>Fuel by Airport</div>;


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

export default FuelByAirport;