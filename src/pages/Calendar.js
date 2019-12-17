import React, { Component } from 'react';
import Footer from '../components/Footer';

import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda
} from "@syncfusion/ej2-react-schedule";

class Calendar extends Component {
  render() {
    return (
      <div className="calendar">
        <ScheduleComponent currentView="Month">
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
        <Footer />
      </div>
    );
  }
}

export default Calendar;
