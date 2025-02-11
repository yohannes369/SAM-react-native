import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

const AttendanceButtons = ({ onMarkAttendance }) => {
  const [selectedStatus, setSelectedStatus] = useState(null); // Track the selected button

  const handlePress = (status) => {
    setSelectedStatus(status); // Update the selected status
    onMarkAttendance(status); // Call the parent function to mark attendance
  };

  return (
    <View style={styles.container}>
      {/* Present Button */}
      <TouchableOpacity
        style={[
          styles.button,
          styles.presentButton,
          selectedStatus === 'Present' && styles.selectedButton, // Add selected style if 'Present' is selected
        ]}
        onPress={() => handlePress('Present')}
      >
        <Text style={styles.buttonText}>Present</Text>
      </TouchableOpacity>

      {/* Absent Button */}
      <TouchableOpacity
        style={[
          styles.button,
          styles.absentButton,
          selectedStatus === 'Absent' && styles.selectedButton, // Add selected style if 'Absent' is selected
        ]}
        onPress={() => handlePress('Absent')}
      >
        <Text style={styles.buttonText}>Absent</Text>
      </TouchableOpacity>

      {/* Late Button */}
      <TouchableOpacity
        style={[
          styles.button,
          styles.lateButton,
          selectedStatus === 'Late' && styles.selectedButton, // Add selected style if 'Late' is selected
        ]}
        onPress={() => handlePress('Late')}
      >
        <Text style={styles.buttonText}>Late</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  presentButton: {
    backgroundColor: '#4caf50',
  },
  absentButton: {
    backgroundColor: '#f44336',
  },
  lateButton: {
    backgroundColor: '#ff9800',
  },
  selectedButton: {
    backgroundColor: '#000000', // Change to a darker color when selected
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default AttendanceButtons;