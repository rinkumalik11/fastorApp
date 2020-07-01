import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends React.Component {
  state = {mail: '', pass: '', errormail: null, error: null, neterr: null};

  signin = async() => {
    let {mail, pass} = this.state;
    let errmail = '';
    let err = '';
    let loading = true;
    if (this.state.mail === '') {
      errmail = true;
      loading = false;
    } else {
      errmail = false;
    }
    if (this.state.pass === '') {
      err = true;
      loading = false;
    } else {
      err = false;
    }
    if (errmail === false && err === false) {
      fetch('https://staging.fastor.in/v1/web/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.state.mail,
          password: this.state.pass,
        }),
      })
        .then(results => results.json())
        .then(async result => {
         console.warn('result',result)
         await AsyncStorage.setItem('@token', result.token);
        this.setState({loading:false, mail:''})
        result.message==='Logged in Successfully'?this.props.navigation.navigate('History'):alert('Something wrong')
        })
        .catch(e=>this.setState({loading:false, error:"E-mail or Password isn't correct"}))
          this.setState({pass: '', error: '', errormail: '', neterr:''});
    }
    this.setState({errmail, err, loading});
  };

  keyPress = () => {
    this.setState({errormail: ''}),
      this.setState({neterr: ''}),
      this.setState({errmail: ''}),
      this.setState({err: ''}),
      this.setState({error: ''});
  };
  keyPressPass = () => {
    this.setState({errormail: ''}),
      this.setState({neterr: ''}),
      this.setState({errmail: ''}),
      this.setState({err: ''}),
      this.setState({error: ''});
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground
          source={require('../assets/back.jpg')}
          style={{height: '100%', width: '100%'}}>
          <View
            style={{
              top: '6%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Image source={require('../assets/banqapay3.png')} /> */}
            <Text style={{color:'orange', fontSize:35}}>FASTOR</Text>
          </View>
          <View
            style={{
              top: '20%',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginHorizontal: '5%',
            }}>
            <View
              style={{
                flex: 1,
                borderBottomColor: '#069fff',
                borderBottomWidth: 2,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 20,
                  alignSelf: 'center',
                  bottom: '25%',
                }}>
                Sign In
              </Text>
            </View>

            
          </View>
          <View style={{marginHorizontal: '5%', top: '22%'}}>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: 'white',
                borderBottomWidth: 1,
              }}>
              <Image source={require('../assets/usericon.png')} />

              <TextInput
                placeholder="Email"
                placeholderTextColor="white"
                style={styles.input}
                onChangeText={mail => this.setState({mail})}
                value={this.state.mail}
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={this.keyPress}
              />
            </View>
            <View style={{top: '2%'}}>
              <View>
                <Text style={{color: 'red', alignSelf: 'center'}}>
                  {this.state.errmail
                    ? 'Email is a required field'
                    : this.state.errormail
                    ? `${this.state.errormail}`
                    : null}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                borderBottomColor: 'white',
                borderBottomWidth: 1,
              }}>
              <Image source={require('../assets/lockicon.png')} />
              <TextInput
                placeholder="Password"
                placeholderTextColor="white"
                style={styles.input}
                onChangeText={pass => this.setState({pass})}
                value={this.state.pass}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                onFocus={this.keyPressPass}
              />
            </View>
          </View>
          <View style={{top: '23%'}}>
            <View>
              <Text style={{color: 'red', alignSelf: 'center'}}>
                {this.state.err
                  ? 'Password is required'
                  : this.state.error
                  ? `${this.state.error}`
                  : null}
              </Text>
            </View>
            <Text style={{color: 'red', alignSelf: 'center'}}>
              {this.state.neterr && 'Network Error!!! Please Try Again'}
            </Text>
          </View>
          <View style={{margin: '5%', top: '28%'}}>
            <TouchableOpacity
              onPress={this.signin}
              style={{
                borderRadius: 5,
                backgroundColor: '#069fff',
                alignItems: 'center',
              }}>
              {this.state.loading ? (
                <ActivityIndicator size={60} color="white" />
              ) : (
                <Text style={{fontSize: 20, padding: '5%', color: 'white'}}>
                  Sign In
                </Text>
              )}
            </TouchableOpacity>
          </View>
          {/* <View style={{top: '30%'}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ForgotPass')}>
              <Text style={{color: 'white', alignSelf: 'center'}}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </View> */}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {flex: 1, color: 'white'},
});
