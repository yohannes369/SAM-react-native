// components/AddStudentForm.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native'; // Import useTheme hook

const AddStudentForm = ({ onAddStudent }) => {
  const [studentName, setStudentName] = useState('');
  const { colors } = useTheme(); // Access theme colors

  const handleAddStudent = () => {
    if (studentName.trim()) {
      onAddStudent(studentName);
      setStudentName('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { borderColor: colors.border, backgroundColor: colors.card }]}
        placeholder="Enter student name"
        value={studentName}
        onChangeText={setStudentName}
      />
      <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.primary }]} onPress={handleAddStudent}>
        <Text style={styles.addButtonText}>Add Student</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  addButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddStudentForm;