import React, { Component } from 'react';
import Footer from '../components/Footer';

class Calendar extends Component {
  render() {
    return (
      <div>
        <h1>Calendar Route</h1>
        <iframe title="mycalendar" src="https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Europe%2FMadrid&amp;src=Ymo5bzBzMGcxMTFtbHI4ZWs5YWNrbGtuYWdAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&amp;src=ZW4uc3BhaW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&amp;color=%23B08B59&amp;color=%231F753C" width="800" height="600" frameborder="0" scrolling="no"></iframe>
      
        <Footer />
      </div>
    );
  }
}

export default Calendar;
