import * as React from 'react';
import {
    // Annotations,
    Annotation,
    ComposableMap,
    Geographies,
    Geography,
    // Markers,
    Marker,
    // ZoomableGroup
} from 'react-simple-maps';
import { geoAlbersUsa, geoMercator } from 'd3-geo';


const mcc = 'background-color:green;color:yellow;';

// const projections = [
//     {
//         name: 'geoAlbersUsa',
//         projection: { geoAlbersUsa }
//     },
//     {
//         name: 'geoMercator',
//         projection: { geoMercator }
//     }
// ];


export interface MapOneProps {
    markers: any;
}

export interface MapOneState {
    // data_markers: any;
}


class MapOne extends React.Component<MapOneProps, MapOneState> {
    constructor(props: MapOneProps) {
        super(props);
        this.state = {
            // data_markers: null
        };
    }

    public componentDidMount() {
        console.log('%c : MapOne -> componentDidMount -> this.props', mcc, this.props);
    }

    public componentDidUpdate(prevProps: MapOneProps, prevState: MapOneState) {
        console.log('%c : MapOne -> componentDidUpdate -> this.state', mcc, this.state);
    }

    public render() {

        const { markers } = this.props;
        console.log('%c : MapOne -> render -> markers', mcc, markers);

        const geoUrl = 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-states/us-albers.json';
        // const geoUrl = 'https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json';
        // const geoUrl='https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json'


        const el_map = markers ?
            <div>
                <ComposableMap
                    // projection='geoAlbers'
                    projection='geoAlbersUsa'
                    projectionConfig={{
                        // scale: 100,
                        scale: 400,
                    }}
                    height={180}
                    width={450}
                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map(geo =>
                                <Geography key={geo.rsmKey} geography={geo} />
                            )
                        }
                    </Geographies>
                    {markers.map(m => (
                        <>
                            <Marker
                                key={m.label.replace(/ /g, '-')}
                                coordinates={m.coords}
                                onClick={() => alert(m.label)}
                                name={m.label}
                            >
                                <circle
                                    r={m.marker_size}
                                    fill={m.marker_color}
                                />
                            </Marker>
                            {m.marker_size > 20 && <Annotation
                                subject={m.coords}
                                dx={m.dx}
                                dy={m.dy}
                                connectorProps={{
                                    stroke: m.marker_color,
                                    strokeWidth: 1,
                                    strokeLinecap: "round"
                                }}
                            >
                                <text
                                    dx={10}
                                    dy={5}
                                    fill={m.label_fill}
                                    stroke={m.label_stroke}
                                >
                                    {m.label}
                                </text>
                                {/* <text
                                    dx={10}
                                    dy={25}
                                    fill={m.label_fill}
                                    stroke={m.label_stroke}
                                >
                                    {m.label}
                                </text> */}
                            </Annotation>}
                        </>
                    ))}
                </ComposableMap>
            </div>
            : <></>;

        return (
            el_map
        );
    }
}

// function formatMoney(number) {
//     return number.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
// }

export default MapOne;