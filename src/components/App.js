import React, { Component } from "react";
import "./App.css";
import Form from "./Form";
import Result from "./Result";
const APIkey = `8c666b8370f9bf634478a472bcc9a9f6`;

class App extends Component {
  // constructor()
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "",
    wind: "",
    err: ""
  };

  handleInputChange = e => {
    this.setState({
      value: e.target.value
    });
  };

  // handleCitySubmit = e => {
  //   e.preventDefault();
  //   const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIkey}&units=metric`;

  //   fetch(API)
  //     .then(response => {
  //       if (response.ok) {
  //         return response;
  //       }
  //       throw Error("Nie udało się");
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       const time = new Date().toLocaleString();
  //       this.setState(prevState => ({
  //         err: false,
  //         date: time,
  //         city: prevState.value,
  //         sunrise: data.sys.sunrise,
  //         sunset: data.sys.sunset,
  //         temp: data.main.temp,
  //         pressure: data.main.pressure,
  //         wind: data.wind.speed
  //       }));
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       this.setState(prevState => {
  //         return {
  //           err: true,
  //           city: prevState.value
  //         };
  //       });
  //     });
  // };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.value.length === 0) return;
    if (prevState.value !== this.state.value) {
      const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIkey}&units=metric`;

      fetch(API)
        .then(response => {
          if (response.ok) {
            return response;
          }
          throw Error("Nie udało się");
        })
        .then(response => response.json())
        .then(data => {
          const time = new Date().toLocaleString();
          this.setState(prevState => ({
            err: false,
            date: time,
            city: prevState.value,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            temp: data.main.temp,
            pressure: data.main.pressure,
            wind: data.wind.speed
          }));
        })
        .catch(err => {
          console.log(err);
          this.setState(prevState => {
            return {
              err: true,
              city: prevState.value
            };
          });
        });
    }
    // this.setState({})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Form value={this.state.value} change={this.handleInputChange} />
          <Result weather={this.state} />
        </header>
      </div>
    );
  }
}

export default App;
