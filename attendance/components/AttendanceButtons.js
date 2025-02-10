import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet, Animated } from 'react-native';

const AttendanceButtons = ({ onMarkAttendance }) => {
  const [selectedStatus, setSelectedStatus] = useState(null); // Track the selected button
  const buttonScale = new Animated.Value(1); // For button press animation

  const handlePress = (status) => {
    setSelectedStatus(status); // Update the selected status
    onMarkAttendance(status); // Call the parent function to mark attendance
  };

  const onPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95, // Slightly scale down the button
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1, // Return to original size
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {/* Present Button */}
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.presentButton,
            selectedStatus === 'Present' && styles.selectedButton, // Add selected style if 'Present' is selected
          ]}
          onPress={() => handlePress('Present')}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <Text style={styles.buttonText}>Present</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Absent Button */}
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.absentButton,
            selectedStatus === 'Absent' && styles.selectedButton, // Add selected style if 'Absent' is selected
          ]}
          onPress={() => handlePress('Absent')}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <Text style={styles.buttonText}>Absent</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Late Button */}
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.lateButton,
            selectedStatus === 'Late' && styles.selectedButton, // Add selected style if 'Late' is selected
          ]}
          onPress={() => handlePress('Late')}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <Text style={styles.buttonText}>Late</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  presentButton: {
    backgroundColor: '#4caf50', // Green for Present
  },
  absentButton: {
    backgroundColor: '#f44336', // Red for Absent
  },
  lateButton: {
    backgroundColor: '#ff9800', // Orange for Late
  },
  selectedButton: {
    backgroundColor: '#333', // Darker color when selected
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default AttendanceButtons;