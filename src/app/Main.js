import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import Order from './Order';
import Entry from './components/Entry';
import Loading from './components/Loading';
import { Login } from './config/router';
import { OrderForm } from './config/router';
import { connect } from 'react-redux';
import { appReady } from './actions/appReady';
import { signIn } from './actions/auth';
import { auth } from './firebase';

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Expo.Asset.fromModule(image).downloadAsync();
    }
  });
}

function cacheFonts(fonts) {
  return fonts.map(font => Expo.Font.loadAsync(font));
};

class Main extends Component {

  constructor(props) {
    super(props)

  }
  
  async checkLogInStatus () {

    let user_data = await AsyncStorage.getItem('user_data');
    let user = JSON.parse(user_data)
    if (user != null) {
      this.props.signIn(user.email, user.password);
    } else {
      console.log('nope')
    }
  }


  async checking() {
    try {
      await this.checkLogInStatus()
    } catch(error) {
      console.log(error)
    }
  }

  componentWillMount() {
    var that = this;
    this.checkLogInStatus()
    this._loadAssetsAsync()
      .then(
        setTimeout(function() {
          that.props.appReady()
        }, 3000)
      )
  }

  render() {
    if (!this.props.appIsReady) {
      return <Loading />;
    }
    if(!this.props.auth.loggedIn && this.props.appIsReady) {
      return <Login />;
    }
    return (
      <View style={styles.container}>
        <OrderForm />
      </View>
    );
  }


  async _loadAssetsAsync() {
    const imageAssets = cacheImages([
      require('./assets/img/mine_final_logo.png'),
      require('./assets/img/mine_final.png'),
      require('./assets/img/mine_finalWORDS.png'),
      require('./assets/img/protein.png'),
      require('./assets/img/proteinFlavors.png'),
      require('./assets/img/vegetables.png'),
      require('./assets/img/starches.png'),
      require('./assets/img/dinner.png'),
      require('./assets/img/veggies.jpg'),
    ]);

    await Promise.all([
      ...imageAssets,
    ])
    
  }
};

export default Main;

const styles = {
	container: {
		flex: 1,       
	}
};