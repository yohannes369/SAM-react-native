// components/SubmitButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SubmitButton = ({ onSubmit }) => {
  return (
    <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
      <Text style={styles.submitButtonText}>Submit Attendance</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  submitButton: {
    backgroundColor: 'yellowgreen',
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
    fontSize: 10,
    marginLeft: 90,
    // paddingVertical: 5,  // Adjust the vertical padding
    // paddingHorizontal: 10, // Adjust the horizontal padding
    width: 150, // Set a specific width
    height: 40, // Set a specific height
},


  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    padding: 5,
   
  },
});

export default SubmitButton;