import React, { useState } from 'react';
import { View, ImageBackground, Image, StyleSheet, Text, TextInput,KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import {RectButton} from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { AppLoading } from 'expo';




const Home = () => {
    const navigation = useNavigation();
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');

    function handleNavigatetoPoints() {
      navigation.navigate('Points', {
        uf,
        city
      });
    }
        
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ImageBackground 
          source={require('../../assets/home-background.png')} 
          style= {styles.container} 
          imageStyle={{ width:274,height:368 }}
        >
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')} />
                <View>
                  <Text style={styles.title}>Seu Marketplace de Coleta de Resíduos</Text>
                  <Text style={styles.description}>Ajudamos Pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
                </View>
            </View>

            <View style={styles.footer}>
              <TextInput 
                style={styles.input}
                placeholder="Digite a UF"
                value={uf}
                maxLength={2}
                autoCapitalize="characters"
                autoCorrect={false}
                onChangeText={text => setUf(text)}
              />
              <TextInput 
                style={styles.input}
                placeholder="Digite a cidade"
                value={city}
                autoCorrect={false}
                onChangeText={setCity}
              />
              <RectButton style={styles.button} onPress={handleNavigatetoPoints}>
                  <View style={styles.buttonIcon}>
                    <Feather name="arrow-right" color="#fff" size={24} />
                  </View>
                  <Text style={styles.buttonText}>Entrar</Text>
              </RectButton>
            </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 54,
      backgroundColor:'#f0f0f5'
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      //fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      //fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
      
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      //fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

export default Home;