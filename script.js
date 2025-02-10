class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      currentSession: "Session",
      secondsLeft: 1500,
      running: false
    };
    this.increaseSL = this.increaseSL.bind(this);
    this.decreaseSL = this.decreaseSL.bind(this);
    this.increaseBL = this.increaseBL.bind(this);
    this.decreaseBL = this.decreaseBL.bind(this);
    this.reset = this.reset.bind(this);
    this.startStop = this.startStop.bind(this);
    this.currentTimeLeft = this.currentTimeLeft.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.countDown, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  countDown() {
    if (this.state.running && this.state.secondsLeft > 0) {
      this.setState((state) => ({
        secondsLeft: state.secondsLeft - 1
      }));

      if (this.state.secondsLeft === 0) this.beep.play();
    } else if (this.state.running && this.state.secondsLeft === 0) {
      if (this.state.currentSession === "Session") {
        this.setState((state) => ({
          currentSession: "Break",
          secondsLeft: state.breakLength * 60
        }));
      } else if (this.state.currentSession === "Break") {
        this.setState((state) => ({
          currentSession: "Session",
          secondsLeft: state.sessionLength * 60
        }));
      }
    }
  }

  currentTimeLeft() {
    if (this.state.secondsLeft <= 0) return "00:00";

    const mins = String(Math.floor(this.state.secondsLeft / 60));
    const secs = String(this.state.secondsLeft % 60);

    return (
      (mins.length < 2 ? "0" + mins : mins) +
      ":" +
      (secs.length < 2 ? "0" + secs : secs)
    );
  }

  increaseSL() {
    if (this.state.sessionLength < 60 && !this.state.running) {
      if (this.state.currentSession === "Session")
        this.setState((state) => ({
          sessionLength: state.sessionLength + 1,
          secondsLeft: (state.sessionLength + 1) * 60
        }));
      else
        this.setState((state) => ({
          sessionLength: state.sessionLength + 1
        }));
    }
  }

  decreaseSL() {
    if (this.state.sessionLength > 1 && !this.state.running) {
      if (this.state.currentSession === "Session")
        this.setState((state) => ({
          sessionLength: state.sessionLength - 1,
          secondsLeft: (state.sessionLength - 1) * 60
        }));
      else
        this.setState((state) => ({
          sessionLength: state.sessionLength - 1
        }));
    }
  }

  increaseBL() {
    if (this.state.breakLength < 60 && !this.state.running) {
      if (this.state.currentSession === "Break")
        this.setState((state) => ({
          breakLength: state.breakLength + 1,
          secondsLeft: (state.breakLength + 1) * 60
        }));
      else
        this.setState((state) => ({
          breakLength: state.breakLength + 1
        }));
    }
  }

  decreaseBL() {
    if (this.state.breakLength > 1 && !this.state.running) {
      if (this.state.currentSession === "Break")
        this.setState((state) => ({
          breakLength: state.breakLength - 1,
          secondsLeft: (state.breakLength - 1) * 60
        }));
      else
        this.setState((state) => ({
          breakLength: state.breakLength - 1
        }));
    }
  }

  reset() {
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      currentSession: "Session",
      secondsLeft: 1500,
      running: false
    });

    this.beep.pause();
    this.beep.currentTime = 0;
  }

  startStop() {
    this.setState((state) => ({
      running: !state.running
    }));
  }

  render() {
    return (
      <div class="container">
        <div class="heading">25 + 5 Clock</div>
        <div class="session-length-container">
          <div id="session-label">Session Length</div>
          <button id="session-increment" onClick={this.increaseSL}>
            <i class="fas fa-plus"></i>
          </button>
          <div id="session-length">{this.state.sessionLength}</div>
          <button id="session-decrement" onClick={this.decreaseSL}>
            <i class="fas fa-minus"></i>
          </button>
        </div>
        <div
          class={
            this.state.secondsLeft <= 60
              ? "timer-container warning"
              : "timer-container"
          }
        >
          <div id="timer-label">{this.state.currentSession}</div>
          <div id="time-left">{this.currentTimeLeft()}</div>
        </div>
        <div class="break-length-container">
          <div id="break-label">Break Length</div>
          <button id="break-increment" onClick={this.increaseBL}>
            <i class="fas fa-plus"></i>
          </button>
          <div id="break-length">{this.state.breakLength}</div>
          <button id="break-decrement" onClick={this.decreaseBL}>
            <i class="fas fa-minus"></i>
          </button>
        </div>
        <div class="control-container">
          <button id="start_stop" onClick={this.startStop}>
            {this.state.running ? (
              <span>
                <i id="toggle-start-stop" class="fas fa-pause"></i>
                <span id="text-start-stop">Pause</span>
              </span>
            ) : (
              <span>
                <i id="toggle-start-stop" class="fas fa-play"></i>
                <span id="text-start-stop">Start</span>
              </span>
            )}
          </button>
          <button id="reset" onClick={this.reset}>
            <i class="fas fa-sync"></i>
            <span>Reset</span>
          </button>
        </div>
        <audio
          id="beep"
          preload="auto"
          ref={(audio) => {
            this.beep = audio;
          }}
          src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
        />
      </div>
    );
  }
}

ReactDOM.render(<Clock />, document.getElementById("app"));
