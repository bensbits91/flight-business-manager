import * as React from 'react';
import { DateTimePicker, DateConvention, TimeConvention } from '@pnp/spfx-controls-react/lib/dateTimePicker';


const mcc = 'color:magenta;';



export interface AsdfDateTimePickerProps {
    field: any;
    showDate: boolean;
    showTime: boolean;
    label: boolean;
    handler: any;
}

export interface AsdfDateTimePickerState {

}

class AsdfDateTimePicker extends React.Component<AsdfDateTimePickerProps, AsdfDateTimePickerState> {
    constructor(props: AsdfDateTimePickerProps) {
        super(props);
        this.state = {};
    }

    public _onChange(f, d) {
        console.log('%c : FieldDatePicker -> _onChange -> f', mcc, f);
        console.log('%c : FieldDatePicker -> _onChange -> d', mcc, d);
        this.props.handler(f, d);
    }

    private _onFormatDate = (date: Date): string => {
        return (date.getMonth() + 1) + '/' + date.getDate() /* + '/' + (date.getFullYear()) */;
    }

    public render() {
        const { field, showDate, showTime, label } = this.props;

        const val = field.value ? new Date(field.value) : null;

        const dateConvention = showTime ? DateConvention.DateTime : DateConvention.Date;

        const labelText = label ? field.Title : '';
        const showLabels = label ? true : false;

        return (
            <div>
                <DateTimePicker
                    label={labelText}
                    showLabels={showLabels}
                    placeholder='Please select a date'
                    onChange={d => { this._onChange(field, d); }}
                    showGoToToday={false}
                    value={val}
                    dateConvention={dateConvention}
                    formatDate={this._onFormatDate}
                />
            </div>
        );
    }
}

export default AsdfDateTimePicker;