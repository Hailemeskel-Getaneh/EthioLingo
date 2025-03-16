import React, { useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, StyleSheet, View, Image, Animated } from 'react-native';

const WelcomeScreen = () => {
    const navigation = useNavigation();
    const progressAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(progressAnim, {
            toValue: 1,
            duration: 3000, 
            useNativeDriver: false,
        }).start(() => navigation.replace('GetStartedScreen')); 
    }, []);

    return (
        <View style={styles.container}>
            <Image source={require('../../assets/images/e.jpg')} style={styles.image} />
            <Text style={styles.ethio}>EthioLingo</Text>
            <Text style={styles.subtitle}>Learn different Ethiopian languages</Text>
            
            <View style={styles.progressBar}>
                <Animated.View
                    style={[
                        styles.progress,
                        { width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) },
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 150,
        height: 150,
        marginBottom: 20,
        borderRadius: 10,
    },
    ethio: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#313574',
        textAlign: 'center',
        padding: 10,
      
    },
    subtitle: {
        fontSize: 16,
        color: '#8257fe',
        marginBottom: 20,
    },
    progressBar: {
        width: 200,
        height: 5,
        backgroundColor: '#ddd',
        borderRadius: 5,
        overflow: 'hidden',
        marginTop: 20,
    },
    progress: {
        height: '100%',
        backgroundColor: '#8257fe',
    },
});

export default WelcomeScreen;
