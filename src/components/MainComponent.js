import Menu from './MenuComponent'
import DishDetail from './DishdetailComponent ';
import { DISHES } from '../shared/dishes'
import { COMMENTS } from '../shared/comments';
import { LEADERS } from '../shared/leaders';
import { PROMOTIONS } from '../shared/promotions';
import React, { Component } from 'react';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect } from 'react-router-dom';



class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments : COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS

    }
  }

  render() {
          const HomePage = ()=>{
            return(
              <Home dish={this.state.dishes.filter((dish) => dish.featured)[0]}
              promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
              leader={this.state.leaders.filter((leader) => leader.featured)[0]}
              />
            )
          }

          const DishWithId = ({match})=>{
             return(
              <DishDetail dish={this.state.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />

             )
          }
    return (
      <div>

        <Header />

        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
          <Route path="/menu/:dishId" component={DishWithId}/>
          <Route exact path="/contactus" component={Contact}/>
          <Route path="/aboutus" component={()=> <About leaders={this.state.leaders}/>}/>
          <Redirect to="/home"/>    
          {/* Redirect is used to give the default Path. */}
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default Main;
