import React, { useEffect, useState, Component } from "react";
import { API_URL, API_KEY, Base_Currency } from "../../config";
import "./Main.css";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      rates: {}
    };
  }

  componentDidMount() {
    fetch(`${API_URL}rates?key=${API_KEY}&base=${Base_Currency}`)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            rates: result.rates
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      );
  }

  createTable = () => {
    const rates = this.state;
    let ratesArr = Object.keys(rates).map(i => rates[i])[2];
    let table = [];
    let children = [];

    for (var key in ratesArr) {
      if (ratesArr.hasOwnProperty(key)) {
        children.push(
          <tr>
            <td>{key}</td>
            <td>{ratesArr[key]}</td>
          </tr>
        );
      }
    }
    table.push(<tbody>{children}</tbody>);

    return table;
  };

  render() {
    const { error, isLoaded } = this.state;

    if (error) {
      return <div>Oops: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <main>
          <div>Basic Currency is {Base_Currency} </div>
          <div className="App-body">
            <h2>Currency App</h2>
            <table className="currencyTable">{this.createTable()}</table>
          </div>
        </main>
      );
    }
  }
}

export default Main;
