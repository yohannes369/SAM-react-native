// components/AttendanceRecord.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AttendanceRecord = ({ attendance, students, selectedDate }) => {
  if (!attendance || Object.keys(attendance).length === 0) {
    return <Text style={styles.noRecordText}>No attendance record for this date.</Text>;
  }

  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  columnHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 1,
  },
  recordItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  recordName: {
    fontSize: 16,
    flex: 1,
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
  noRecordText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
});

export default AttendanceRecord;