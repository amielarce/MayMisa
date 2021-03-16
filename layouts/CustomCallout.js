import React, {Component} from 'react';
import { StyleSheet, View, Text, Dimensions, Button } from 'react-native';
import {Svg, Image as ImageSvg} from 'react-native-svg';
import Utility from './../functions/Utility';

const { width, height } = Dimensions.get('window');

const CustomCallout = (props) => {
    return (
        <View style={styles.container}>
            <Svg height={100} width={width*0.25}>
                <ImageSvg
                    width={'100%'}
                    height={'100%'}
                    preserveAspectRatio={"xMidYMid slice"}
                    href={{uri: props.image}} />
            </Svg>
            <View style={styles.txtContainer}>
                <Text style={styles.headerText}>{props.name}</Text>
                <Text>{'Next Mass: ' + Utility.formatToTwelveHourTime(props.nextMass)}</Text>
                <Text>{'Language: ' + props.language}</Text>
                <Text style={styles.linkText}>(Tap to show more ...)</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: width * 0.75,
        flexDirection: 'row',
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderColor: '#000',
        borderWidth: 0.5
    },
    svgContainer: {
        height: 90,
        width: width * 0.25,
        // resizeMode: 'cover',
    },
    txtContainer: {
        width: width * 0.5,
        flexDirection: 'column',
        padding: 4
    },
    linkText: {
        color: 'blue',
        fontStyle: 'italic'
    },
    headerText: {
        fontWeight: 'bold'
    }
});

export default CustomCallout;