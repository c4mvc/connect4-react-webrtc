import React, { Component } from "react";
// import logo from "./logo.svg";
import "./App.css";
import _ from "underscore";

const playerType = {
  One: 1,
  Two: 2,
  None: 0
};

const totalRows = 6;
const totalColumns = 7;

function gameZoneCell(player, rowIndex, columnIndex) {
  this.player = player;
  this.rowIndex = rowIndex;
  this.columnIndex = columnIndex;
}

function GameCursor(isAvailable, columnIndex, player) {
  this.isAvailable = isAvailable;
  this.columnIndex = columnIndex;
  this.player = player;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameZone: [],
      currentRow: undefined,
      currentColumn: undefined,
      currentPlayer: playerType.One,
      gameCursor: new Array(totalColumns)
    };
  }

  buildGameZone() {
    let gameZone = [];
    for (var row = 0; row < totalRows; row++) {
      gameZone[row] = new Array();
      for (var column = 0; column < totalColumns; column++) {
        gameZone[row].push(new gameZoneCell(playerType.None, row, column));
      }
    }
    return gameZone;
  }

  loadGameCursor(columnIndex) {
    let { gameCursor } = this.state;

    _.each(gameCursor, function(cursor, index) {
      var cursorObj = new GameCursor(false, index, playerType.None);
      gameCursor[index] = cursorObj;
    });
    gameCursor[columnIndex] = new GameCursor(
      false,
      columnIndex,
      this.state.currentPlayer
    );
    const lastCursor = _.first(gameCursor);
    return { gameCursor, lastCursor };
  }

  componentDidMount() {
    const gameZone = this.buildGameZone();
    const { gameCursor, lastCursor } = this.loadGameCursor(0);
    this.setState({ gameZone, gameCursor, lastCursor });
  }

  // buildGameZone();

  render() {
    return (
      <div className="container">
        <div className="row">
          <h1 className="game-header">Connect4 Game</h1>
        </div>

        <div className="row">
          <button className="btn-danger btn-lg" ng-click="startNewGame()">
            New Game
          </button>
          <button className="btn-primary btn-sm" ng-click="undoLastMove()">
            Undo
          </button>
          <button className="btn-success btn-sm" ng-click="replayGame()">
            Replay
          </button>
        </div>

        <div className="row">
          <div className="col-md-3">
            <h3>Player1</h3>
            <div className="circleBase circle-red-small" />
          </div>
          <div className="col-md-3">
            <h3>Player2</h3>
            <div className="circleBase circle-yellow-small" />
          </div>
        </div>

        <div className="row">
          <div className="row">
            <div className="col-xs-9">
              <div className="bottom-buffer">
                <div className="clearfix area-width">
                  {this.state.gameCursor.map((cursor, index) => {
                    return (
                      <div className="cursor-area">
                        <div style={{ verticalAlign: "middle" }}>
                          {cursor.player === playerType.One && (
                            <div className="circleBase circle-red" />
                          )}
                          {cursor.player === playerType.Two && (
                            <div className="circleBase circle-yellow" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* <div className="bottom-buffer">
                <div className="clearfix area-width">
                  <div
                    className="cursor-area"
                    ng-mouseover="moveCursor(cursor)"
                    ng-click="dropDiscToZone(cursor)"
                    ng-repeat="cursor in gameCursor"
                  >
                    <div style="vertical-align: middle">
                      <div
                        className="circleBase circle-red"
                        ng-if="cursor.player === playerType.One"
                      />
                      <div
                        className="circleBase circle-yellow"
                        ng-if="cursor.player === playerType.Two"
                      />
                    </div>
                  </div>
                </div>
              </div> */}

              <div>
                {this.state.gameZone.map((row, index) => {
                  return (
                    <div key={index} className="clearfix area-width">
                      {row.map((cell, i) => {
                        return (
                          <div className="box-cell">{/* <h3>a</h3> */}</div>
                        );
                      })}
                    </div>
                  );
                })}

                {/* <div
                  className="clearfix area-width"
                  ng-repeat="row in gameZone"
                >
                  <div ng-repeat="cell in row" className="box-cell">
                    <div>
                      <div
                        className="circleBase circle-red"
                        ng-if="cell.player === playerType.One"
                      />
                      <div
                        className="circleBase circle-yellow"
                        ng-if="cell.player === playerType.Two"
                      />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
