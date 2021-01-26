import * as React from 'react';
// import { DefaultButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { CommandBarButton, IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { IContextualMenuProps } from 'office-ui-fabric-react/lib/ContextualMenu';
import { TeachingBubble } from 'office-ui-fabric-react/lib/TeachingBubble';
import { DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import { useBoolean } from '@uifabric/react-hooks';
import * as moment from 'moment';
import { colors } from '../assets/definitions';

import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';

import styles from './FilterBubble.module.scss';

const choiceGroupStyles = {
    label: {
        fontSize: '18px',
        // fontWeight: '100'
    }
};

const bubbleStyles = {
    content: {
        maxWidth: 'unset',
    },
    bodyContent: {
        padding: '50px',
    },
    subComponentStyles: {
        callout: {
            root: {
                maxWidth: 'unset',
                width: '800px'
            },
        }
    }
};

const commandBarButtonStyles = {
    root: { border: 'none', height: '40px' },
    // rootHovered: { backgroundColor: colors.black.b5 },
    icon: { color: colors.mint },
    iconHovered: { color: colors.navy },
    // label: { color: colors.black.b9 },
    // labelHovered: { color: colors.gray.c },
};


// const menuProps: IContextualMenuProps = {
//     items: [
//         {
//             key: 'emailMessage',
//             text: 'Email message',
//             iconProps: { iconName: 'Mail' },
//         },
//         {
//             key: 'calendarEvent',
//             text: 'Calendar event',
//             iconProps: { iconName: 'Calendar' },
//         },
//     ],
//     // By default, the menu will be focused when it opens. Uncomment the next line to prevent this.
//     // shouldFocusOnMount: false
// };

interface FilterBubbleProps {
    handler: any;
    months: any;
    aircraft: any;
    pilots: any;
}


export const FilterBubble: React.FunctionComponent<FilterBubbleProps> = ({ handler, months, aircraft, pilots }) => {
    const [teachingBubbleVisible, { toggle: toggleTeachingBubbleVisible }] = useBoolean(false);



    const [selectedKeyMonth, setSelectedKeyMonth] = React.useState<string>()/* <string>('N877PA') */;
    const [selectedKeyAircraft, setSelectedKeyAircraft] = React.useState<string>()/* <string>('N877PA') */;
    const [selectedKeyPilot, setSelectedKeyPilot] = React.useState<string>()/* <string>('N877PA') */;

    const onChangeMonth = React.useCallback((ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
        setSelectedKeyMonth(option.key);
    }, []);

    const onChangeAircraft = React.useCallback((ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
        setSelectedKeyAircraft(option.key);
    }, []);

    const onChangePilot = React.useCallback((ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption) => {
        setSelectedKeyPilot(option.key);
    }, []);

    const monthsOptions: IChoiceGroupOption[] = months.map(m => {
        return {
            key: m,
            text: moment(m).add(1, 'month').format('MMMM YYYY'),
            onClick: () => handler('month-' + m)
        };
    });
    const monthsSelect = <div className={styles.filterBubbleSelectWrap}>
        <ChoiceGroup
            selectedKey={selectedKeyMonth}
            options={monthsOptions}
            onChange={onChangeMonth}
            label="Month"
            styles={choiceGroupStyles}
        />
    </div>;

    const aircraftOptions: IChoiceGroupOption[] = aircraft.map(a => {
        return {
            key: a.Title,
            text: a.Title,
            onClick: () => handler('aircraft-' + a.Title)
        };
    });
    const aircraftSelect = <div className={styles.filterBubbleSelectWrap}>
        <ChoiceGroup
            selectedKey={selectedKeyAircraft}
            options={aircraftOptions}
            onChange={onChangeAircraft}
            label="Aircraft"
            styles={choiceGroupStyles}
        />
    </div>;

    const pilotsOptions: IChoiceGroupOption[] = pilots.map(p => {
        return {
            key: p.Title,
            text: p.Title,
            onClick: () => handler('pilot-' + p.Title)
        };
    });
    const pilotsSelect = <div className={styles.filterBubbleSelectWrap}>
        <ChoiceGroup
            selectedKey={selectedKeyPilot}
            options={pilotsOptions}
            onChange={onChangePilot}
            label="Pilot"
            styles={choiceGroupStyles}
        />
    </div>;

    return (
        <div>
            <CommandBarButton
                id="filterButton"
                onClick={toggleTeachingBubbleVisible}
                iconProps={{ iconName: 'Filter' }}
                text='Filters'
                // text={teachingBubbleVisible ? 'Hide Filters' : 'Show Filters'}
                // menuProps={menuProps}
                // styles={{
                //     // ...props.styles,
                //     ...commandBarButtonStyles,
                //     root: { height: '40px' },
                // }}
                styles={commandBarButtonStyles}
            />

            {teachingBubbleVisible && (
                <TeachingBubble
                    target="#filterButton"
                    onDismiss={toggleTeachingBubbleVisible}
                    headline="Filter"
                    // isWide
                    // primaryButtonProps={applyButton}
                    // secondaryButtonProps={cancelButton}
                    // hasCloseIcon
                    calloutProps={{ directionalHint: DirectionalHint.bottomCenter }}
                    styles={bubbleStyles}
                >
                    {monthsSelect}
                    {aircraftSelect}
                    {pilotsSelect}
                </TeachingBubble>
            )}
        </div>
    );
};




    // const applyButton: IButtonProps = React.useMemo(
    //     () => ({
    //         children: 'Apply',
    //         onClick: toggleTeachingBubbleVisible,
    //     }),
    //     [toggleTeachingBubbleVisible],
    // );

    // const cancelButton: IButtonProps = React.useMemo(
    //     () => ({
    //         children: 'Cancel',
    //         onClick: toggleTeachingBubbleVisible,
    //     }),
    //     [toggleTeachingBubbleVisible],
    // );

