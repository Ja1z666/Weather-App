import React from "react";
import { Info } from "./components/info";
import { Form } from "./components/form";
import { Weather } from "./components/weather";

const API_KEY = "4243f663d86eabbb1ceb89a91a02d221";

const stateDefault = {
    temp: undefined,
    city: undefined,
    country: undefined,
    pressure: undefined,
    sunset: undefined,
    error: undefined,
};

class App extends React.Component {
    state = stateDefault;

    gettingWeather = async (e: any) => {
        e.preventDefault();
        const city = e.target.elements.city.value;

        if (city) {
            const api_url = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            const data = await api_url.json();

            try {
                var sunset = data.sys.sunset;
                var date = new Date();
                date.setTime(sunset);
                var sunset_date =
                    date.getHours() +
                    ":" +
                    date.getMinutes() +
                    ":" +
                    date.getSeconds();

                this.setState({
                    temp: data.main.temp,
                    city: data.name,
                    country: data.sys.country,
                    pressure: data.main.pressure,
                    sunset: sunset_date,
                    error: undefined,
                });
            } catch (error) {
                this.setState({
                    ...stateDefault,
                    error: "Ведите название города",
                });
            }
        } else {
            this.setState({
                ...stateDefault,
                error: "Ведите название города",
            });
        }
    };

    render() {
        return (
            <div className="main-content">
                <div className="items">
                    <div className="hero info">
                        <Info />
                    </div>
                    <div className="content form">
                        <Form weatherMethod={this.gettingWeather} />
                        <div>
                            <Weather {...this.state} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
