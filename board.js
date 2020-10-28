import React, { Component } from 'react'
import {
    Text,
    View,
    ScrollView,
    StyleSheet,
    PanResponder
} from 'react-native'

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        width: '100%',
    },
    buttonGroup: {

    },
    row: {
        flexDirection: 'row',
    },
    buttonRed: {
        backgroundColor: 'rgb(255, 127, 127)',
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonGreen: {
        backgroundColor: 'rgb(127, 255, 127)',
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonBlue: {
        backgroundColor: 'rgb(127, 127, 255)',
        height: 20,
        width: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const m1 = [
    ['Q', 'W', 'E'],
    ['A', 'S', 'D'],
    ['Z', 'X', 'C'],
];

const m2 = [
    ['R', 'T', 'Y'],
    ['F', 'G', 'H'],
    ['V', 'B', 'N'],
];

const m3 = [
    ['U', 'I', 'O'],
    ['J', 'K', 'L'],
    ['M', 'P', '_'],
];

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myText: '',
            x0: 0,
            y0: 0,
            dx: 0,
            dy: 0,
            next: "",
        };
    }
    createButton = (style, letter) => {
        return <View style={style}>
            <Text>{letter}</Text>
        </View>;
    };
    createButtonRow = (style, letters) => {
        return <View style={styles.row}>
            {letters.map(letter => this.createButton(style, letter))}
        </View>;
    };
    createButtonGroup = (style, letterMatrix) => {
        return <View style={styles.buttonGroup} {...this._panResponder.panHandlers}>
            {letterMatrix.map(letters => this.createButtonRow(style, letters))}
        </View>;
    };
    createSpace = height => {
        return <View style={{height: height}}/>
    };
    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => true,
            onPanResponderMove: (e, g) => this.updatePress(e, g),
            onPanResponderEnd: (e, g) => {this.updateText()},
            onPanResponderStart: (e, g) => this.updatePress(e, g),
        });
    }
    updateText = () => {
        let newText = this.state.myText + this.state.next;
        const maxLen = 35;
        if (newText.length > maxLen) {
            newText = newText.substr(1, maxLen);
        }
        if (this.state.next === "%") this.delete();
        else this.setState({myText: newText});
    };
    delete = () => {
        this.setState({myText: this.state.myText.substring(0, this.state.myText.length - 1)});
    };
    updatePress = (evt, g) => {
        let xDir = 1;
        let yDir = 1;
        if (g.dx > 20) xDir = 2;
        if (g.dx < -20) xDir = 0;
        if (g.dy > 20) yDir = 2;
        if (g.dy < -20) yDir = 0;
        let m = m1;
        if (g.x0 > 220) m = m3;
        else if (g.x0 > 160) m = m2;

        this.setState({
            x0: Math.round(g.x0),
            y0: Math.round(g.y0),
            dx: Math.round(g.dx),
            dy: Math.round(g.dy),
            next: g.numberActiveTouches === 2 ? "%" : m[yDir][xDir],
        });
    };
    render() {
        return (
            <View style={styles.screen}>
                {this.createSpace(100)}

                <View style={styles.row}>
                    <View style={{width:100}} />
                    <View style={{height:40}}>
                        <Text style={{width: 200}} >{">>" + this.state.myText}</Text>
                    </View>
                </View>

                {this.createSpace(200)}
                <View style={styles.row}>
                    <View style={{width:100}} />
                    {this.createButtonGroup(styles.buttonRed, m1)}
                    {this.createButtonGroup(styles.buttonGreen, m2)}
                    {this.createButtonGroup(styles.buttonBlue, m3)}
                </View>
            </View>
        );
    }


}