import React from 'react';
import { View, Text, StyleSheet, Animated, ScrollView } from 'react-native';

const AttendanceRecord = ({ attendance, students, selectedDate }) => {
  if (!attendance || Object.keys(attendance).length === 0) {
    return (
      <View style={styles.noRecordContainer}>
        <Text style={styles.noRecordText}>No attendance record for this date.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.columnHeader}>Student Name</Text>
        <Text style={styles.columnHeader}>Status</Text>
        <Text style={styles.columnHeader}>Description</Text>
        <Text style={styles.columnHeader}>Date</Text>
      </View>

      {/* Table Rows */}
      {Object.entries(attendance).map(([studentId, status]) => {
        const student = students.find((s) => s.id === studentId);

        // Example description based on status (customize as needed)
        const description =
          status === 'Present'
            ? 'Attended class'
            : status === 'Absent'
            ? 'Did not attend class'
            : 'Arrived late';

        return (
          <View key={studentId} style={styles.recordItem}>
            <Text style={styles.recordName}>{student?.name || 'Unknown'}</Text>
            <Text
              style={[
                styles.recordStatus,
                status === 'Present' && styles.presentStatus,
                status === 'Absent' && styles.absentStatus,
                status === 'Late' && styles.lateStatus,
              ]}
            >
              {status}
            </Text>
            <Text style={styles.recordDescription}>{description}</Text>
            <Text style={styles.recordDate}>{selectedDate}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  noRecordContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  noRecordText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12,
    marginBottom: 12,
  },
  columnHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 1,
    color: '#333',
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  recordName: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  recordStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    flex: 1,
  },
  recordDescription: {
    fontSize: 14,
    color: '#555',
    textAlign: 'right',
    flex: 1,
  },
  recordDate: {
    fontSize: 14,
    color: '#777',
    textAlign: 'right',
    flex: 1,
  },
  presentStatus: {
    color: '#4caf50',
  },
  absentStatus: {
    color: '#f44336',
  },
  lateStatus: {
    color: '#ff9800',
  },
});

export default AttendanceRecord;