import React, { useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import AttendanceButtons from './AttendanceButtons';

const StudentList = ({ students, onMarkAttendance }) => {
  const [isListVisible, setIsListVisible] = useState(false); // State to manage visibility
  const lastPressTime = useRef(0); // Track the time of the last press

  const toggleListVisibility = () => {
    const currentTime = new Date().getTime();
    const doublePressDelay = 300; // Time in milliseconds to detect double press

    if (currentTime - lastPressTime.current < doublePressDelay) {
      // Double press detected
      setIsListVisible(false); // Hide the list
    } else {
      // Single press detected
      setIsListVisible((prev) => !prev); // Toggle visibility
    }

    lastPressTime.current = currentTime; // Update the last press time
  };

  const renderStudentItem = ({ item }) => (
    <View style={styles.studentItem}>
      <Text style={styles.studentName}>{item.name}</Text>
      <AttendanceButtons onMarkAttendance={(status) => onMarkAttendance(item.id, status)} />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Student List Button */}
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={toggleListVisibility} // Handle single and double press
      >
        <Text style={styles.toggleButtonText}>
          {isListVisible ? 'Hide Student List' : 'Show Student List'}
        </Text>
      </TouchableOpacity>

      {/* Student List */}
      {isListVisible && (
        <FlatList
          data={students}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderStudentItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  toggleButton: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 200, // Ensure the button has a minimum width
    minHeight: 50, // Ensure the button has a minimum height
  },
  toggleButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 10,
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  studentName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
});

export default StudentList;