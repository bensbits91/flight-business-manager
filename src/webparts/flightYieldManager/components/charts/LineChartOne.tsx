import * as React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
// import * as times from '../times';
// import {orange} from '../colors';

import { colors } from '../../assets/definitions';

const mcc = 'color: aqua;';

interface LineChartOneProps {
    data: any;
    height?: number;
    width?: number;
    type?: string;
    dataKey_x?: string;
    dataKey_y1?: string;
    dataKey_y2?: string;
    dataKey_y3?: string;
    stroke_color_1?: string;
    stroke_color_2?: string;
    stroke_color_3?: string;
    strokeWidth?: string;
    tooltip?: boolean;
    legend?: boolean;
    cart_grid?: boolean;
}

interface LineChartOneState {
    opacity: any;
    color: any;
}

export default class LineChartOne extends React.Component<LineChartOneProps, LineChartOneState> {
    constructor(props) {
        super(props);
        this.state = {
            opacity: {
                [this.props.dataKey_y1]: 1,
                [this.props.dataKey_y2]: 1,
                [this.props.dataKey_y3]: 1,
            },
            color: {
                [this.props.dataKey_y1]: null,
                [this.props.dataKey_y2]: null,
                [this.props.dataKey_y3]: null,
            },
        };
    }

    public handleMouseEnter = (o) => {
        const { dataKey } = o;
        const { opacity, color } = this.state;

        this.setState({
            opacity: { ...opacity, [dataKey]: 0.5 },
            color: { ...color, [dataKey]: colors.orange },
        });
    }

    public handleMouseLeave = (o) => {
        const { dataKey } = o;
        const { opacity, color } = this.state;

        this.setState({
            opacity: { ...opacity, [dataKey]: 1 },
            color: { ...color, [dataKey]: null },
        });
    }


    public render() {
        const { opacity, color } = this.state;

        const p = this.props;

        const width = p.width ? p.width : 300;
        const height = p.height ? p.height : 100;

        const data = p.data/*  ? p.data : data_temp_1 */;

        const type = p.type ? p.type : 'monotone';

        const dataKey_x = p.dataKey_x ? p.dataKey_x : null;
        const dataKey_y1 = p.dataKey_y1 ? p.dataKey_y1 : null;
        const dataKey_y2 = p.dataKey_y2 ? p.dataKey_y2 : null;
        const dataKey_y3 = p.dataKey_y3 ? p.dataKey_y3 : null;

        const stroke_color_1 =
            color[dataKey_y1] ? color[dataKey_y1]
                : p.stroke_color_1 ? p.stroke_color_1
                    : '#8884d8';

        const stroke_color_2 =
            color[dataKey_y2] ? color[dataKey_y2]
                : p.stroke_color_2 ? p.stroke_color_2
                    : '#82ca9d';

        const stroke_color_3 =
            color[dataKey_y3] ? color[dataKey_y3]
                : p.stroke_color_3 ? p.stroke_color_3
                    : '#82ca9d';

        // const stroke_color_2 = p.stroke_color_2 ? p.stroke_color_2 : '#82ca9d';
        const strokeWidth = p.strokeWidth ? p.strokeWidth : 2;

        return (
            <LineChart
                width={width}
                height={height}
                data={data}
            >
                <Line
                    animationBegin={1000}
                    type={type}
                    dataKey={dataKey_y1}
                    // stroke={color[dataKey_y1]}
                    stroke={stroke_color_1}
                    strokeWidth={strokeWidth}
                    // strokeOpacity={opacity[dataKey_y1]}
                    activeDot={{ r: 8 }}
                />
                {dataKey_y2 &&
                    <Line
                        animationBegin={1500}
                        // animationDuration={2000}
                        type={type}
                        dataKey={dataKey_y2}
                        // stroke={color[dataKey_y2]}
                        stroke={stroke_color_2}
                        strokeWidth={strokeWidth}
                    // strokeOpacity={opacity[dataKey_y2]}
                    />
                }
                {dataKey_y3 &&
                    <Line
                        animationBegin={1500}
                        // animationDuration={2000}
                        type={type}
                        dataKey={dataKey_y3}
                        // stroke={color[dataKey_y3]}
                        stroke={stroke_color_3}
                        strokeWidth={strokeWidth}
                    // strokeOpacity={opacity[dataKey_y3]}
                    />
                }
                {p.cart_grid &&
                    <CartesianGrid strokeDasharray="3 3" />
                }
                {p.cart_grid &&
                    <XAxis dataKey={dataKey_x} />
                }
                {p.cart_grid &&
                    <YAxis />
                }
                {this.props.tooltip &&
                    <Tooltip />
                }
                {this.props.legend &&
                    <Legend
                        onMouseEnter={this.handleMouseEnter}
                        onMouseLeave={this.handleMouseLeave}
                    />
                }
            </LineChart>
        );
    }
}