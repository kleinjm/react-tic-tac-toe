import React from 'react';
import axios from 'axios';

const ENDPOINT = 'https://calendarific.com/api/v2/holidays?api_key=bd61a8637be3c4cdbb8ad717231ab44dc24038f0&country=US&year=2021';

class Holidays extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      holidays: []
    };
  }

  fetchHolidays() {
    axios.get(ENDPOINT)
      .then(response => {
        this.setState({ holidays: response.data.response.holidays })
      }).catch((err) => {
        console.error(err)
      })
  }

  render() {
    const holidays = this.state.holidays.map((holiday, index) => {
      return (
        <li key={index}>
          {holiday.name}
        </li>
      )
    });

    return (
      <div>
        <button onClick={() => this.fetchHolidays()}>
          Load Holidays
        </button>
        <ul>{holidays}</ul>
      </div>
    )
  }
}

export default Holidays;
