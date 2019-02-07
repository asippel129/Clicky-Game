//imports dependencies and files
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import Jumbotron from "./components/Jumbotron";
import FriendCard from "./components/FriendCard";
import Footer from "./components/Footer";
import char from "./officecharacters.json";
import "./App.css";

//sets state to 0 or empty
class App extends Component {
  state = {
    char,
    clickedChar: [],
    score: 0
  };

//when you click on a card ... the office character is taken out of the array
  imageClick = event => {
    const currentChar = event.target.alt;
    const CharAlreadyClicked =
      this.state.clickedChar.indexOf(currentChar) > -1;

//if you click on a character that has already been selected, the game is reset and cards reordered
    if (CharAlreadyClicked) {
      this.setState({
        fish: this.state.char.sort(function(a, b) {
          return 0.5 - Math.random();
        }),
        clickedChar: [],
        score: 0
      });
        alert("You lose. Play again?");

//if you click on an available characters, your score is increased and cards reordered
    } else {
      this.setState(
        {
          fish: this.state.char.sort(function(a, b) {
            return 0.5 - Math.random();
          }),
          clickedChar: this.state.clickedChar.concat(
            currentChar
          ),
          score: this.state.score + 1
        },

//if you get all 12 characters correct you get a congrats message and the game resets        
        () => {
          if (this.state.score === 12) {
            alert("Yay! You Win!");
            this.setState({
              char: this.state.char.sort(function(a, b) {
                return 0.5 - Math.random();
              }),
              clickedChar: [],
              score: 0
            });
          }
        }
      );
    }
  };

//the order of components to be rendered: navbar, jumbotron, friendcard, footer 
  render() {
    return (
      <div>
        <Navbar 
          score={this.state.score}
        />
        <Jumbotron />
        <div className="wrapper">
          {this.state.char.map(char => (
            <FriendCard
              imageClick={this.imageClick}
              id={char.id}
              key={char.id}
              image={char.image}
            />
          ))}
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;