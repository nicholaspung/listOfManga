import React from "react";

class DisplayUptime extends React.Component {
  state = {
    uptime: 0,
    displayTime: "0 days, 0 hours, 0 minutes, 0 seconds"
  };

  componentDidMount() {
    setInterval(this.updateUptime, 1000);
  }

  updateUptime = () => {
    this.setState(prevState => ({ uptime: prevState.uptime + 1 }));
    this.setState(prevState => ({
      displayTime: this.setDateAndTime(prevState.uptime)
    }));
  };

  setDateAndTime = time => {
    let seconds = time % 60,
      secondsWord;
    seconds > 1 || seconds === 0
      ? (secondsWord = "seconds")
      : (secondsWord = "second");

    let minutes = parseInt((time / 60) % 60),
      minutesWord;
    minutes > 1 || minutes === 0
      ? (minutesWord = "minutes")
      : (minutesWord = "minute");

    let hours = parseInt((time / 60 / 60) % 24),
      hoursWord;
    hours > 1 || hours === 0 ? (hoursWord = "hours") : (hoursWord = "hour");

    let days = parseInt(time / 60 / 60 / 24),
      daysWord;
    days > 1 || days === 0 ? (daysWord = "days") : (daysWord = "day");

    return `${days} ${daysWord}, ${hours} ${hoursWord}, ${minutes} ${minutesWord} and ${seconds} ${secondsWord}`;
  };

  render() {
    return (
      <div>
        <p>Current Uptime: {this.state.displayTime}</p>
      </div>
    );
  }
}

export default DisplayUptime;
