import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Home = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>I am Rich</Text>
            <Image 
                source={require('../../assets/images/i_am_rich.jpg')} 
                style={styles.image} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        color: '#81BFDA',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 200,
    },
    image: {
        justifyContent: 'center',
        width: 300,
        height: 300,
        resizeMode: 'contain',
    },
});

export default Home;