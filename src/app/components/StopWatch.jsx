import React from "react";
import { render } from "react-dom";

require("./style.css");

export class StopWatch extends React.Component {
    constructor () {
        super();
        this.state = {
            secondsElapsed: 0
        }

    }
    getSeconds () {
        return ('0'  + this.state.secondsElapsed % 60).slice(-2);
    }
    getMinutes () {
        return (Math.floor(this.state.secondsElapsed / 60));
    }
    startClick () {
        this.incrementer = setInterval(()=>{
            this.setState({
            secondsElapsed: this.state.secondsElapsed +1
        })
        },1000)
        
    }
    stopClick () {
        clearInterval(this.incrementer);
        this.setState({ lastClearedIncrement : this.incrementer })
    }
    resetClick () {
        this.setState({secondsElapsed: 0})
    }
    render() {
        return (
            <div>
                <p>Root Page</p>
                <h1>{ this.getMinutes() }:{ this.getSeconds() }</h1>
                {(this.state.secondsElapsed === 0 || this.incrementer === this.state.lastClearedIncrement)
                ?<button onClick={ this.startClick.bind(this) }>Start</button>
                :<button onClick={ this.stopClick.bind(this) }>Stop</button>}
                {(this.state.secondsElapsed !== 0)
                ? <button onClick={this.resetClick.bind(this)}>Reset</button>
                : null}
            </div>
        )
    }
} 