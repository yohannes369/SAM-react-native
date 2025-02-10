// components/AddStudentForm.js
import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Animated, Platform } from 'react-native';
import { useTheme } from '@react-navigation/native'; // Import useTheme hook

const AddStudentForm = ({ onAddStudent, onCancel }) => {
  const [studentName, setStudentName] = useState('');
  const { colors } = useTheme(); // Access theme colors
  const buttonScale = new Animated.Value(1);
  const lastPressTime = useRef(null); // Track the last press time for double-tap detection

  const handleAddStudent = () => {
    if (studentName.trim()) {
      onAddStudent(studentName);
      setStudentName('');
    }
  };

  const handleCancel = () => {
    setStudentName(''); // Clear the input field
    if (onCancel) {
      onCancel(); // Optionally call the parent's cancel function
    }
  };

  const onPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleButtonPress = () => {
    const now = new Date().getTime();

    // Check for double-tap (within 300ms)
    if (lastPressTime.current && now - lastPressTime.current < 300) {
      handleCancel(); // Double-tap detected: Cancel or hide the form
    } else {
      handleAddStudent(); // Single tap: Add the student
    }

    // Update the last press time
    lastPressTime.current = now;
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: colors.border,
            backgroundColor: colors.card,
            color: colors.text,
            shadowColor: colors.text,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          },
        ]}
        placeholder="Enter student name"
        placeholderTextColor={colors.text}
        value={studentName}
        onChangeText={setStudentName}
      />
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          style={[
            styles.addButton,
            {
              backgroundColor: colors.primary,
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 4,
              elevation: 5,
            },
          ]}
          onPress={handleButtonPress}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
        >
          <Text style={[styles.addButtonText, { color: colors.buttonText }]}>Add Student</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  addButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddStudentForm;