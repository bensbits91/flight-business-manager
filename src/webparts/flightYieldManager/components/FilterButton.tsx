import * as React from 'react';
import {
    ContextualMenuItemType,
    DirectionalHint,
    IContextualMenuItem,
    IContextualMenuProps,
} from 'office-ui-fabric-react/lib/ContextualMenu';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

const mcc = 'background-color:#555;color:#fff;';


interface FilterButtonProps {
    handler: any;
}



export const FilterButton: React.FunctionComponent<FilterButtonProps> = ({ handler }) => {
    const [selection, setSelection] = React.useState<{ [key: string]: boolean }>({});
    console.log('%c : selection', mcc, selection);
    console.log('%c : setSelection', mcc, setSelection);


    const onToggleSelect = React.useCallback(
        (ev?: React.MouseEvent<HTMLButtonElement>, item?: IContextualMenuItem): void => {
            ev && ev.preventDefault();


            if (item) {
                setSelection({ ...selection, [item.key]: selection[item.key] === undefined ? true : !selection[item.key] });

                console.log('%c : item', mcc, item);
                console.log('%c : selection', mcc, selection);
                console.log('%c : setSelection', mcc, setSelection);

                const isCheckedNow = !item.isChecked == true;
                console.log('%c : isCheckedNow', mcc, isCheckedNow);

                handler({
                    key: item.key,
                    filter: item.filter,
                    isChecked: isCheckedNow
                });
                // handler(item.key);
            }
        },
        [selection],
    );

    const menuItems: IContextualMenuItem[] = React.useMemo(
        () => [
            {
                key: 'month',
                text: 'Month',
                // canCheck: true,
                isChecked: selection['month'],
                subMenuProps: {
                    items: [ // TO DO: generate items from props
                        {
                            key: '2020-06',
                            text: '2020-06',
                            canCheck: true,
                            isChecked: selection['2020-06'],
                            onClick: onToggleSelect,
                            filter: 'month'
                        },
                        {
                            key: '2020-07',
                            text: '2020-07',
                            canCheck: true,
                            isChecked: selection['2020-07'],
                            onClick: onToggleSelect,
                        },
                    ],
                },
            },
            {
                key: 'aircraft',
                text: 'Aircraft',
                // canCheck: true,
                isChecked: selection['aircraft'],
                subMenuProps: {
                    items: [ // TO DO: generate items from props
                        {
                            key: 'aircraft1',
                            text: 'aircraft1',
                            canCheck: true,
                            isChecked: selection['aircraft1'],
                            onClick: onToggleSelect,
                        },
                        {
                            key: 'aircraft2',
                            text: 'aircraft2',
                            canCheck: true,
                            isChecked: selection['aircraft2'],
                            onClick: onToggleSelect,
                        },
                    ],
                },
            },
            {
                key: 'pilots',
                text: 'Pilots',
                // canCheck: true,
                isChecked: selection['pilots'],
                subMenuProps: {
                    items: [ // TO DO: generate items from props
                        {
                            key: 'pilot1',
                            text: 'pilot1',
                            canCheck: true,
                            isChecked: selection['pilot1'],
                            onClick: onToggleSelect,
                        },
                        {
                            key: 'pilot2',
                            text: 'pilot2',
                            canCheck: true,
                            isChecked: selection['pilot2'],
                            onClick: onToggleSelect,
                        },
                    ],
                },
            },
            // {
            //     key: 'divider_1',
            //     itemType: ContextualMenuItemType.Divider,
            // },

            // {
            //     key: keys[3],
            //     text: 'Print',
            //     canCheck: true,
            //     isChecked: selection[keys[3]],
            //     onClick: onToggleSelect,
            // },
            // {
            //     key: keys[4],
            //     text: 'Music',
            //     canCheck: true,
            //     isChecked: selection[keys[4]],
            //     onClick: onToggleSelect,
            // },
            // {
            //     key: keys[5],
            //     iconProps: {
            //         iconName: 'MusicInCollectionFill',
            //     },
            //     subMenuProps: {
            //         items: [
            //             {
            //                 key: keys[6],
            //                 text: 'Email message',
            //                 canCheck: true,
            //                 isChecked: selection[keys[6]],
            //                 onClick: onToggleSelect,
            //             },
            //             {
            //                 key: keys[7],
            //                 text: 'Calendar event',
            //                 canCheck: true,
            //                 isChecked: selection[keys[7]],
            //                 onClick: onToggleSelect,
            //             },
            //         ],
            //     },
            //     text: 'Split Button',
            //     canCheck: true,
            //     isChecked: selection[keys[5]],
            //     split: true,
            //     onClick: onToggleSelect,
            //     ariaLabel: 'Split Button. Click to check/uncheck. Press right arrow key to open submenu.',
            // },
            // {
            //     key: keys[8],
            //     iconProps: {
            //         iconName: 'MusicInCollectionFill',
            //     },
            //     subMenuProps: {
            //         items: [
            //             {
            //                 key: keys[9],
            //                 text: 'Email message',
            //                 canCheck: true,
            //                 isChecked: selection[keys[9]],
            //                 onClick: onToggleSelect,
            //             },
            //             {
            //                 key: keys[10],
            //                 text: 'Calendar event',
            //                 canCheck: true,
            //                 isChecked: selection[keys[10]],
            //                 onClick: onToggleSelect,
            //             },
            //         ],
            //     },
            //     text: 'Split Button',
            //     canCheck: true,
            //     isChecked: selection[keys[8]],
            //     split: true,
            //     onClick: onToggleSelect,
            //     disabled: true,
            //     ariaLabel: 'Split Button. Click to check/uncheck. Press right arrow key to open submenu.',
            // },
            // {
            //     key: keys[11],
            //     iconProps: {
            //         iconName: 'MusicInCollectionFill',
            //     },
            //     subMenuProps: {
            //         directionalHint: DirectionalHint.leftCenter,
            //         items: [
            //             {
            //                 key: keys[12],
            //                 text: 'Email message',
            //                 canCheck: true,
            //                 isChecked: selection[keys[12]],
            //                 onClick: onToggleSelect,
            //             },
            //             {
            //                 key: keys[13],
            //                 text: 'Calendar event',
            //                 canCheck: true,
            //                 isChecked: selection[keys[13]],
            //                 onClick: onToggleSelect,
            //             },
            //         ],
            //     },
            //     text: 'Split Button Left Menu',
            //     canCheck: true,
            //     isChecked: selection[keys[11]],
            //     split: true,
            //     onClick: onToggleSelect,
            //     ariaLabel: 'Split Button Left Menu. Click to check/uncheck. Press right arrow key to open submenu.',
            // },
            // {
            //     key: keys[12],
            //     iconProps: {
            //         iconName: 'MusicInCollectionFill',
            //     },
            //     subMenuProps: {
            //         items: [
            //             {
            //                 key: keys[12],
            //                 name: 'Email message',
            //                 canCheck: true,
            //                 isChecked: selection[keys[12]],
            //                 onClick: onToggleSelect,
            //             },
            //         ],
            //     },
            //     name: 'Split Button Disabled Primary',
            //     split: true,
            //     primaryDisabled: true,
            //     ariaLabel: 'Split Button Disabled Primary. Click to check/uncheck. Press right arrow key to open submenu.',
            // },
            // {
            //     key: keys[13],
            //     iconProps: {
            //         iconName: selection![keys[13]] ? 'SingleBookmarkSolid' : 'SingleBookmark',
            //     },
            //     name: selection![keys[13]] ? 'Toogled command no checkmark' : 'Toogle command no checkmark',
            //     canCheck: false,
            //     isChecked: selection![keys[13]],
            //     onClick: onToggleSelect,
            // },
        ],
        [selection, onToggleSelect],
    );

    const menuProps: IContextualMenuProps = React.useMemo(
        () => ({
            shouldFocusOnMount: true,
            items: menuItems,
        }),
        [menuItems],
    );

    return <DefaultButton text="Click for ContextualMenu" menuProps={menuProps} />;
};
