import * as React from 'react';
import {
    PieChart, Pie, Sector, Cell,
} from 'recharts';
import { colors } from '../../assets/definitions';

const mcc = 'background-color:white;color:darkorange;';


const COLORS = [colors.navy, colors.mint, colors.yellow, colors.orange];

const RADIAN = Math.PI / 180;

interface PieChartOneProps {
    data: any;
    height?: number;
    width?: number;
    dataKey_x?: string;
    dataKey_y1?: string;
    dataKey_y2?: string;
    dataKey_y3?: string;
    stroke_color_1?: string;
    stroke_color_2?: string;
    stroke_color_3?: string;
    tooltip?: boolean;
    legend?: boolean;
    cart_grid?: boolean;
}

interface PieChartOneState {
    opacity: any;
    color: any;
}

export default class PieChartOne extends React.Component<PieChartOneProps, PieChartOneState> {
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
        const { data } = this.props;
        console.log('%c : PieChartOne -> render -> data', mcc, data);

        const renderCustomizedLabel = ({
            cx, cy, midAngle, innerRadius, outerRadius, percent, index
        }) => {
            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);
            const xOut = cx + radius * Math.cos(-midAngle * RADIAN) * 2.5;
            const yOut = cy + radius * Math.sin(-midAngle * RADIAN) * 2.5;

            const outerLabelText = data[index].value + ' ' + data[index].name;

            return (
                <>
                    <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
                        {`${(percent * 100).toFixed(0)}%`}
                    </text>
                    <text x={xOut} y={yOut} fill='black' textAnchor={xOut > cx ? 'start' : 'end'} dominantBaseline='central'>
                        {outerLabelText}
                    </text>
                </>
            );
        };



        return (
            <PieChart width={600} height={300}>
                <Pie
                    data={data}
                    cx='50%'
                    cy='50%'
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill='#8884d8'
                    dataKey='value'
                >
                    {
                        data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                    }
                </Pie>
            </PieChart>
        );
    }
}
