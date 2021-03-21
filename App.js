import { PanGestureHandler } from 'react-native-gesture-handler';
import React, { useRef } from "react";
import { Text, View, StyleSheet, Button, TouchableWithoutFeedback } from "react-native";
import Animated, { useSharedValue, interpolate, useAnimatedStyle, useDerivedValue, withTiming, Easing, Extrapolate, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated'
import Svg, { G, Path, Circle, Rect } from "react-native-svg";
const SIZE = 250;
const aspectRatio = 417 / 256;
const App = (props) => {

  const animation = useSharedValue(300);
  const posX = useSharedValue(0)
  const posY = useSharedValue(0)

  const animationMove = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: animation.value },
      ],
      opacity: interpolate(
        animation.value,
        [300, 50, 0],
        [0, 1, 0.3]
      )
    }
  });

  React.useEffect(() => {
    animation.value = withTiming(0,
      { duration: 6000, easing: Easing.bounce }
    );
  }, [])

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(event, ctx) {
      ctx.posX = posX.value;
      ctx.posY = posY.value;
    },
    onActive(event, ctx) {
      posX.value = ctx.posX + event.translationX;
      posY.value = ctx.posY + event.translationY;
    },
    onEnd(event, ctx) {
      posX.value = withSpring(0)
      posY.value = withSpring(0)
      console.log("POSITION X", ctx.posX)
      console.log("POSITION Y", ctx.posY)
      console.log("EVENTTRANSLATIONX", event.translationX)
    }
  })

  const positionStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: posX.value },
        { translateY: posY.value }
      ]
    }
  })

  return (
    <View style={styles.container}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[{ width: 150, height: 150, backgroundColor: 'red' }, positionStyle]}>
        </Animated.View>
      </PanGestureHandler>
      <Animated.Text style={[
        { fontSize: 30, backgroundColor: 'red', padding: 30, borderRadius: 30, color: 'white' },
        animationMove,
      ]}>OLA PESSOAL</Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fadingContainer: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "powderblue"
  },
  fadingText: {
    fontSize: 28,
    textAlign: "center",
    margin: 10
  },
  buttonRow: {
    flexDirection: "row",
    marginVertical: 16
  }
});

export default App;