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
    backgroundColor: '#6200ee',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SubmitButton;