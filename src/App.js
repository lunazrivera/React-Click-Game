// Requiring dependencies with ES6 syntax and passing Component to add extra functionality to our application
import React, {Component} from "react";
import Container from "./components/Container";
import Header from "./components/Header";
import cards from "./cards.json";
import Card from "./components/Card";

class App extends Component {
     //Setting  state
     state = {
          cards,
          score: 0,
          highscore: 0
     };

     gameOver = () => {
          if (this.state.score > this.state.highscore) {
               this.setState({highscore: this.state.score}, () => {
                    console.log(this.state.highscore);
               });
          };
          this.state.cards.forEach(card =>  {
               card.count = 0;
          });
          alert(`Game Over \nscore: ${this.state.score}`);
          this.setState({score: 0});
          return true;
     };

     clickCount = (id) => {
          this.state.cards.find((o,i) => {
               if (o.id === id) {
                    if(cards[i].count === 0) {
                         cards[i].count = cards[i].count + 1;
                         this.setState({score: this.state.score + 1}, function () {
                              console.log(this.state.score);
                         });
                         this.state.cards.sort(() => Math.random() - 0.5)
                         return true;
                    } else if (this.state.score === 12 ) {
                         this.state.cards.forEach(card => {
                              card.count = 0;
                         });
                    }
                    else {
                         this.gameOver();
                    }
               }
          });
     }

     //Mapping over this.state.cards and render Card component for each object
     render() {
          return (
               <Container>
                    <Header score={this.state.score} highscore={this.state.highscore}>CLICK GAME</Header>
          {this.state.cards.map(card => (<Card clickCount={this.clickCount} id={card.id} key={card.id} image={card.image}/>))}
               </Container>
          )
     }

}

export default App;