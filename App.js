/**
  * INSTALAÇÃO AXIOS
  * $ npm install axios --save
*/

import React from 'react';
import {StyleSheet, Text, View, ActivityIndicator, TextInput, Button, TouchableOpacity} from 'react-native';

import axios from 'axios';
import MonitoringTable from './src/components/MonitoringTable';

export default class App extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
        dados: [],
        dados_api : [],
        total: 5,
        temperatura: "",
        umididade: "",
        carregando : false,
        error : false
    };
  }

  async onPress() {

    if(this.state.temperatura != "" && this.state.umidade != "") {

      const dados = {
        temp: this.state.temperatura,
        umid: this.state.umidade,
      };

      axios({ 
          method: 'post', 
          url: 'http://gileduardo.com.br/react/api/rest.php',
          headers:{
            "Content-Type": "application/json" 
          }, 
          data: dados
        }).then(response => {
          
          // Recarrega os dados do Monitoramento
          this.setState({ carregando : true });
          setTimeout(() => {
            const url = 'http://gileduardo.com.br/react/api/rest.php/' + this.state.total;
            axios.get(url)
            .then(response => {
                this.setState({
                    dados : response.data,
                    carregando : false
                });
            }).catch(error => {
                this.setState({
                    carregando : false,
                    error : true
                });
            });
          }, 1000);

        }).catch(error => {
          alert('Houve um erro inesperado!!!');
        });
    }
  }

  onChange(key, value) {
    this.setState({
      [key] : value,
    })
  }

  componentDidMount() {

    this.setState({ carregando : true });

    const url = 'http://gileduardo.com.br/react/api/rest.php/' + this.state.total;

    setTimeout(() => {
      // Dados Básicos da API
      axios.get('http://gileduardo.com.br/react/api/rest.php')
        .then(response => {
            this.setState({
                dados_api : response.data,
            });
        }).catch(error => {
            this.setState({
                carregando : false,
                error : true
            });
        });
        // Dados do Monitoramento - Temperatura e Umidade
        axios.get(url)
        .then(response => {
            this.setState({
                dados : response.data,
                carregando : false
            });
        }).catch(error => {
            this.setState({
                carregando : false,
                error : true
            });
        });
      }, 1000);
    }

  render() {
    return (
        <View style={styles.container}>
          { 
            this.state.carregando
            ?
                  <ActivityIndicator size = "large" color="#218c74"/>
            :
              this.state.error
              ?
                  <Text style={style.error}>Ops!!! Algo deu errado!!! =(</Text>
              :
              <View>
                <View style={ { alignItems: 'center', margin: 20 } } >
                  <Text style={ { fontSize: 25, fontWeight: 'bold', letterSpacing: 30, color: '#00cec9' } }>UMIDAE</Text>
                  <Text style={ { fontSize: 10, fontWeight: 'bold', color: '#a2d6d4', marginBottom: 20 } }>Sistema de Monitoramento e Irrigação Monitoramento</Text>
                </View>
                <View style={ {margin: 5, borderColor: '#218c74', alignItems: 'center' } }>
                  <Text style={[styles.welcome, {fontWeight: 'bold'}]}>Status: {this.state.dados_api.status}</Text>
                  <Text style={[styles.welcome, {fontWeight: 'bold'}]}>{this.state.dados_api.info}</Text>
                  <Text style={[styles.welcome, {fontWeight: 'bold'}]}>{this.state.dados_api.soft}</Text>
                  <Text style={[styles.welcome, {fontWeight: 'bold'}]}>{this.state.dados_api.mobi}</Text>
                </View>
                <View style={ {margin: 25, marginTop:30} }>
                  <TextInput
                        style={ styles.input }
                        placeholder = 'Temperatura...'
                        value = { this.state.temp }
                        keyboardType = 'numeric'
                        maxLength={4} 
                        onChangeText = { (value) => this.onChange('temperatura', value) }
                  />
                  <TextInput
                        style={ styles.input }
                        placeholder = 'Umidade...'
                        value = { this.state.temp }
                        keyboardType = 'numeric'
                        maxLength={4} 
                        onChangeText = { (value) => this.onChange('umidade', value) }
                  />

                  <View style={ {marginTop: 10} }>
                    <TouchableOpacity onPress={ () => { this.onPress() }} style={ styles.botao }>
                       <Text style={ styles.botao2 }> Enviar </Text> 
                    </TouchableOpacity>
                  </View>

                </View>
                <MonitoringTable dados={ this.state.dados } />
              </View>

          }
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2d3436',
    alignItems: 'center',
    justifyContent: 'center',

  },
  welcome: {
    fontSize: 13,
    color: '#b2bec3',
    margin: 2,
  },
  input : {
      paddingLeft : 15,
      paddingRight : 5,
      paddingBottom : 10,
      fontSize : 14,
      fontWeight : 'bold',
      marginTop: 10,
      backgroundColor: '#dfe6e9',
      borderRadius: 3,
  },
  botao : {
      paddingLeft : 5,
      paddingRight : 5,
      paddingBottom : 10,
      backgroundColor: '#dfe6e9',
      width: 70,
      borderRadius: 3,
  },
  botao2 : {
      fontSize : 15,
      fontWeight : 'bold',
      textAlign: 'center',
      paddingTop: 10,
      color: '#2d3436',
  }
});
