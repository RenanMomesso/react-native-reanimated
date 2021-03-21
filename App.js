import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Graph from "./Graph";
import Footer from "./components/footer"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
});

const Rainbow = () => {
  return (
    <View style={styles.container}>
      <SafeAreaProvider>
      <Graph />
        
      <Footer />
      </SafeAreaProvider>
    </View>
  );
};

export default Rainbow;