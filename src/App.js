import React, { Component } from 'react';
import './App.css';

import * as firebase from 'firebase';



class App extends Component {

  auth = undefined;
  config = undefined;

  constructor() {
    super();
    this.authenticate = this.authenticate.bind(this);
    this.logout = this.logout.bind(this);
    // Initialize Firebase
    //TODO: Colocar seus dados aqui.
    this.config = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: ""
    };

    this.state = {
      user: undefined
    }
    
  }
  
  componentDidMount() {
    firebase.initializeApp(this.config);
    this.auth = firebase.auth();

    this.auth.onAuthStateChanged((signedUser) => {
      if (signedUser) {
        // User is signed in.
        this.setState({
          user: signedUser
        });
        console.log('Incluindo no localStorage')
        //Não é necessário incluir no localStorage
        //pois a plataforma do Firebase já inclui.
        //localStorage.setItem('firebase_auth', this.state.user);
      } else {
        console.log('The user has been logged out');
        this.setState({
          user: undefined
        });
        //Não é necessário incluir no localStorage
        //pois a plataforma do Firebase já inclui.
        //localStorage.removeItem('firebase_auth');
      }
    }); 
  }

  logout(){
    console.log('User is about to be logged out.')
    this.auth.signOut();
  }

  authenticate(e) {
    e.preventDefault();
    console.log('Call Firebase to authenticate');
    console.log(this.refs.email.value, '-', this.refs.password.value);

    this.auth.signInWithEmailAndPassword(this.refs.email.value, this.refs.password.value).then(signedUser => {
      this.setState({
        user: signedUser
      })
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, ' - ', errorMessage);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
          </div>
          <div className="col-4">
            <div className="container-fluid card-login">
              <div className="card card-shadow">
                <img className="card-img-top img-login align-self-center" src={require('./firebase2.png')} alt="Firebase" />
                <div className="card-body">
                  <form onSubmit={this.authenticate}>
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Email address</label>
                      <input type="email" ref="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                      <small id="emailHelp" className="form-text text-muted">This e-mail must be at Firebase auth store.</small>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleInputPassword1">Password</label>
                      <input type="password" ref="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                    {
                      this.state.user !== undefined ?
                        <button type="button" onClick={this.logout} className="btn btn-primary btn-block">Logout</button> :
                        ''
                    }
                    <small id="cardHelp" className="form-text text-muted text-center">Developer Deck 101 | React + Firebase</small>
                  </form>
                </div>
              </div>

            </div>
          </div>
          <div className="col-4">
          </div>
        </div>
      </div>
    );
  }
}

export default App;
