import React from "react";
import { render } from "react-dom";

require("./style.css");

export class StopWatch extends React.Component {
    constructor () {
        super();
        this.state = {
            secondsElapsed: 0,
            laps:[]
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
        this.setState({secondsElapsed: 0, laps:[]})
    }
    lapClick () {
        this.setState({
            laps: this.state.laps.concat(this.state.secondsElapsed)
        })
    }
    render() {
        return (
            <div className="stopwatch">
                <h1 className="stopwatch-timer">{ this.getMinutes() }:{ this.getSeconds() }</h1>
                
                {(this.state.secondsElapsed === 0 || this.incrementer === this.state.lastClearedIncrement)
                ?<button className="btn start-btn" onClick={ this.startClick.bind(this) }>Start</button>
                :<button className="btn stop-btn" onClick={ this.stopClick.bind(this) }>Stop</button>}
                
                {(this.state.secondsElapsed !== 0 && this.incrementer === this.state.lastClearedIncrement)
                ? <button className="btn" onClick={this.resetClick.bind(this)}>Reset</button>
                : null}
                
                  {(this.state.secondsElapsed !== 0 && this.incrementer !== this.state.lastClearedIncrement)
                ? <button className="btn" onClick={this.lapClick.bind(this)}>Lap</button>
                : null}

                <ul className="stopwatch-laps">{this.state.laps.map((lap, i) => {
                    return <li className="stopwatch-lap" key={i}><strong>{i + 1}</strong>{Math.floor(lap/60)}:{('0'+lap%60).slice(-2)}</li>
                })}
                </ul>
            </div>
        )
    }
} 