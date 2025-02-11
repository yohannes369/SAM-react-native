import React from 'react';
import { ImageBackground, StyleSheet, View, Dimensions } from 'react-native';
import AttendanceRecord from './components/AttendanceRecord';
import CalendarView from './components/CalendarView';

const { width, height } = Dimensions.get('window');

const App = () => {
  return (
    <ImageBackground
      source={{ uri: 'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
      style={styles.backgroundImage}
      resizeMode="cover" // Ensure the image covers the entire background
    >
      <View style={styles.overlay} /> {/* Add a semi-transparent overlay */}
      <View style={styles.container}>
        <CalendarView />
        <AttendanceRecord />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: width, // Ensure the image spans the full width
    height: height, // Ensure the image spans the full height
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // Fill the entire view
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adjust the color and opacity as needed
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default App;
