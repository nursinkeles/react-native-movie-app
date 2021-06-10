import React, { useState } from 'react';
import axios from 'axios';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  Modal,
} from 'react-native';

const App = () => {

  const apiurl = 'http://www.omdbapi.com/?apikey=9d72ba71';
  const [state, setState] = useState({
    s: '',
    results: [],
    selected: {}
  });

  const search = () => {
    axios(apiurl + '&s=' + state.s).then(({ data }) => {
      let results = data.Search;

      setState((prevState) => {
        return { ...prevState, results: results };
      });
    });
  };

  const openPopup = (id) => {
    axios(apiurl + '&i=' + id).then(({ data }) => {
      let result = data;

      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MOVIE DATABASE</Text>
      <View style={{flexDirection:'row',alignItems:'center'}}>
   <TextInput
      placeholder="Enter a movie..."
        style={styles.searchInput}
        value={state.s}
        onChangeText={(text) =>
          setState((prevState) => {
            return { ...prevState, s: text };
          })
        }
        onSubmitEditing={search}
   /> 
      <Image 
      source={{uri:'https://cdn.icon-icons.com/icons2/2566/PNG/512/search_icon_153438.png'}}
     style={{width:40,height:40,position:'absolute',right:5}}
     resizeMode="cover"
     /> 
      </View>
      <ScrollView style={styles.results}>
        {state.results.map((result) => (
          <TouchableHighlight
            key={result.imdbID}
            onPress={() => openPopup(result.imdbID)}>
            <View style={styles.result}>
              <Image
                source={{ uri: result.Poster }}
                style={{ width: '100%', height: 250 }}
                resizeMode="cover"
              />
              <Text style={styles.heading}>{result.Title}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={false}
        visible={typeof state.selected.Title != 'undefined'}>
        <View style={styles.popup}>
        <View style={{flexDirection:'row',alignItems:'center'}}>
        <Image
                source={{uri:state.selected.Poster}}
                style={styles.img}
                resizeMode="cover"
              />
          <Text style={styles.poptitle}>{state.selected.Title}</Text>
         </View>
         
          <Text style={styles.rating}>
            Rating: {state.selected.imdbRating}
          </Text>
          <Text style={styles.poptext}>{state.selected.Plot}</Text>
        </View>

        <TouchableHighlight
          onPress={() =>
            setState((prevState) => {
              return { ...prevState, selected: {} };
            })
          }>
          <Text
            style={styles.closeBtn}>
            Close
          </Text>
        </TouchableHighlight>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#111',
    padding: 20,
  },
  title: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
    margin: 25,
  },
  searchInput: {
    padding: 15,
    fontSize: 20,
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 4,
    color: '#111',
  },
  results: {
    marginTop: 25,
    flex: 1,
  },
  result: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  heading: {
    color: '#fff',
    fontSize: 18,
    backgroundColor: '#333',
    padding: 15,
  },
  popup: {
    marginTop:70,
    padding: 45,
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 40,
    borderWidth: 2,
    borderColor:'#333',
    marginRight:10
    },
  poptitle: {
    fontSize: 27,
    fontWeight: '700',
    color:'#333',    
  },
  rating: {
    color:'#444',
    fontSize:15,
    margin:15,
    marginTop:20
  },
  poptext: {
    padding: 20,
    fontSize: 20,
    letterSpacing:1.1,
  },
  closeBtn: {
    marginRight: 'auto',
    marginLeft:'auto',
    textAlign:'center',
    width:'30%',
    padding: 20,
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    backgroundColor: '#333',
    }
});

export default App;