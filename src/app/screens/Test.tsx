//@ts-nocheck
import React,{Component} from "react";
class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964
    };
  }
  changeDetail = () => {
    this.setState({
        color: "blue",
        brand: "Tesla",
        model:"Model S",
        year: 2020,

    });
  };

componentDidMount() {
      console.log("Component did mount");
      // runs after first render
  }

  componentWillUnmount() {
      console.log("Component will unmount");
      // runs before component unmount
  }

  componentDidUpdate() {}

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
           color:{this.state.color} model:{this.state.model} from {""}
           {this.state.year}
        </p>
        <button
          type="button"
          onClick={this.changeDetail}
        >Change Detail</button>
      </div>
    );
  }
}
export default Test;