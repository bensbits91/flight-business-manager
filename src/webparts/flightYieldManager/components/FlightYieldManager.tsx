import * as React from 'react';
// import styles from './FlightYieldManager.module.scss';
import { IFlightYieldManagerProps } from './IFlightYieldManagerProps';
// import { escape } from '@microsoft/sp-lodash-subset';

import App from './App';
import '../assets/css/temp.css';

export default class FlightYieldManager extends React.Component<IFlightYieldManagerProps, {}> {
  public render(): React.ReactElement<IFlightYieldManagerProps> {
    return (
      // <div className={styles.flightYieldManager}>
      <App context={this.props.context} />
      // </div>
    );
  }
}
