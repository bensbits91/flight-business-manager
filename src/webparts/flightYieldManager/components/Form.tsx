import * as React from 'react';
import FieldText from './fields/FieldText';
import FieldDropDown from './fields/FieldDropDown';
import AsdfDateTimePicker from './fields/AsdfDateTimePicker';
import FieldChoiceButtons from './fields/FieldChoiceButtons';
import FieldPeoplePicker from './fields/FieldPeoplePicker';
import styles from './Form.module.scss';

const mcc = 'background-color:orange;color:black;';



export interface FormProps {
    item: any;
    fields: any;
    handler: any;
    context: any;
}

export interface FormState {
    fields?: any;
}

class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        this.state = {};
    }

    public componentDidMount() {
        console.log('%c : Form -> componentDidMount -> this.props', mcc, this.props);
        const { item, fields } = this.props;
        const form_fields = fields ? fields.map(f => {
            const f_value = item ? item[f.InternalName] : null;
            console.log('%c : Form -> componentDidMount -> f_value', mcc, f_value);
            const ff = {
                Title: f.Title,
                InternalName: f.InternalName,
                TypeAsString: f.TypeAsString,
                Description: f.Description,
                value: f_value
            };
            if (f.Choices) ff['Choices'] = f.Choices;
            return ff;
        }) : null;
        console.log('%c : Form -> componentDidMount -> form_fields', mcc, form_fields);
        this.setState({
            fields: form_fields
        });
    }

    public handler_fields(data) {
        console.log('%c : Form -> handler_fields -> data', mcc, data);
    }


    public render() {
        // const { item } = this.props;

        const { fields } = this.state;

        const el_form = fields ?
            <>
                <div className={styles.formHead}>Wellness Preparticipation Checklist</div>
                <div className={styles.formSectionHead}>Player Info</div>
                {fields.map(f => {
                    const type = f.TypeAsString;
                    const el_field =
                        type == 'Text' && f.InternalName != 'Title' && f.InternalName != 'Acknowledgement' ?
                            <FieldText
                                field={f}
                                handler={this.handler_fields.bind(this)}
                            />
                            : type == 'DateTime' && f.InternalName != 'DateSigned' ?
                                <AsdfDateTimePicker
                                    field={f}
                                    handler={this.handler_fields.bind(this)}
                                />
                                : type == 'Lookup' ?
                                    <FieldDropDown
                                        field={f}
                                        handler={this.handler_fields.bind(this)}
                                    />
                                    : type == 'Choice' && f.InternalName == 'Exposed' ?
                                        <>
                                            <div className={styles.formSectionHead}>Symptoms</div>
                                            <div>
                                                <FieldChoiceButtons
                                                    field={f}
                                                    handler={this.handler_fields.bind(this)}
                                                />
                                            </div>
                                            <div className={styles.formSectionExtraText}>
                                                Do you have any of the following symptoms?
                                            </div>
                                        </>
                                        : type == 'Choice' ?
                                            <div>
                                                <FieldChoiceButtons
                                                    field={f}
                                                    handler={this.handler_fields.bind(this)}
                                                />
                                            </div>
                                            : type == 'User' && f.InternalName != 'SignedBy' ?
                                                <div>
                                                    <FieldPeoplePicker
                                                        field={f}
                                                        handler={this.handler_fields.bind(this)}
                                                        context={this.props.context}
                                                    />
                                                </div>
                                                : <></>;
                    return el_field;
                })}
            </>
            : <></>;


        // const el_aiList = data ? <AgendaItemDroppable
        //     items={data.children}
        //     mtg_start_time={data.EventDate}
        //     handler={this.handler_ai.bind(this)}
        // />
        //     : <></>;

        return (
            <div className={styles.formWrap}>
                {el_form}
                {/* {el_aiList} */}
            </div>
        );
    }

}

export default Form;