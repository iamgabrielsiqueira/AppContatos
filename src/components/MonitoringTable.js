
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import axios from 'axios';

export default class MonitoringTable extends React.Component {

	render() {

		const line = this.props.dados.map((item, index) => {
			return (
				<View key={index} style={ {flexDirection: 'row', margin: 5, marginTop:0, marginBottom: 0} }>
					<View style={ {flex: 1} }>
						<Text style={[styles.welcome, {textAlign: 'center'}]}>{ item.temperatura } °C</Text>
					</View>	
					<View style={ {flex: 1} }>
						<Text style={[styles.welcome, {textAlign: 'center'}]}>{ item.umidade }%</Text>
					</View>
					<View style={ {flex: 1} }>
						<Text style={[styles.welcome, {textAlign: 'center'}]}>{ item.hora }</Text>
					</View>		
				</View>		
			);
		});

	    return (
	    	<View>
		    	<View style={ {flexDirection: 'row', margin: 5} }>
					<View style={ {flex: 1} }>
						<Text style={[styles.welcome, {textAlign: 'center', fontWeight: 'bold'}]}>Tempertura</Text>
					</View>
					<View style={ {flex: 1} }>
						<Text style={[styles.welcome, {textAlign: 'center', fontWeight: 'bold'}]}>Umidade</Text>
					</View>
					<View style={ {flex: 1} }>
						<Text style={[styles.welcome, {textAlign: 'center', fontWeight: 'bold'}]}>Hora</Text>
					</View>
		        </View>
		 		{ line }
		 	</View>
	    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b2bec3',
  },
  welcome: {
    fontSize: 16,
    color: '#81ecec',
    margin: 2,
  },
});
