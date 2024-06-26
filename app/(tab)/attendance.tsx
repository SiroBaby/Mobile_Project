import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import tw from 'twrnc';

const initialSubject: Record<string, { stt: number; mssv: string; name: string; attendance: boolean[]; }[]> = {
  "Subject 1": [
    { stt: 1, mssv: "001", name: "Nguyen Van A", attendance: [true, false, true, true, false] },
    { stt: 2, mssv: "002", name: "Tran Thi B", attendance: [true, true, true, false, true] },
    { stt: 3, mssv: "003", name: "Le Van C", attendance: [false, true, false, true, true] },
    { stt: 4, mssv: "004", name: "Pham Thi D", attendance: [true, true, false, false, true] },
    { stt: 5, mssv: "005", name: "Hoang Van E", attendance: [false, false, true, true, true] },
  ],
  "Subject 2": [
    { stt: 1, mssv: "006", name: "Nguyen Van F", attendance: [true, true, false, true, false] },
    { stt: 2, mssv: "007", name: "Tran Thi G", attendance: [false, true, true, true, true] },
    { stt: 3, mssv: "008", name: "Le Van H", attendance: [true, false, true, false, true] },
    { stt: 4, mssv: "009", name: "Pham Thi I", attendance: [true, true, true, true, false] },
    { stt: 5, mssv: "010", name: "Hoang Van J", attendance: [false, false, false, true, true] },
  ],
  "Subject 3": [
    { stt: 1, mssv: "011", name: "Nguyen Van K", attendance: [true, false, false, true, true] },
    { stt: 2, mssv: "012", name: "Tran Thi L", attendance: [true, true, false, false, false] },
    { stt: 3, mssv: "013", name: "Le Van M", attendance: [false, true, true, true, true] },
    { stt: 4, mssv: "014", name: "Pham Thi N", attendance: [true, false, true, false, true] },
    { stt: 5, mssv: "015", name: "Hoang Van O", attendance: [true, true, true, true, false] },
  ]
};

const Attendance = () => {
  const [selectedSubject, setSelectedSubject] = useState<string>("Subject 1");
  const [classData, setClassData] = useState(initialSubject);

  const handleAttendanceChange = (className: string, studentIndex: number, attendanceIndex: number, value: boolean) => {
    const updatedClassData = { ...classData };
    updatedClassData[className][studentIndex].attendance[attendanceIndex] = value;
    setClassData(updatedClassData);
  };

  return (
    <View style={tw`p-4`}>
      <Picker
        selectedValue={selectedSubject}
        style={tw`mb-4`}
        onValueChange={(itemValue) => setSelectedSubject(itemValue)}
      >
        {Object.keys(classData).map((className) => (
          <Picker.Item label={className} value={className} key={className} />
        ))}
      </Picker>
      <ScrollView horizontal>
        <View>
          <View style={styles.headerRow}>
            <View style={[styles.headerCell, styles.sttCell]}>
              <Text style={styles.headerText}>STT</Text>
            </View>
            <View style={[styles.headerCell, styles.mssvCell]}>
              <Text style={styles.headerText}>MSSV</Text>
            </View>
            <View style={[styles.headerCell, styles.nameCell]}>
              <Text style={styles.headerText}>Tên SV</Text>
            </View>
            <View style={[styles.headerCell, styles.attendanceCell]}>
              <Text style={styles.headerText}>Điểm danh 1</Text>
            </View>
            <View style={[styles.headerCell, styles.attendanceCell]}>
              <Text style={styles.headerText}>Điểm danh 2</Text>
            </View>
            <View style={[styles.headerCell, styles.attendanceCell]}>
              <Text style={styles.headerText}>Điểm danh 3</Text>
            </View>
            <View style={[styles.headerCell, styles.attendanceCell]}>
              <Text style={styles.headerText}>Điểm danh 4</Text>
            </View>
            <View style={[styles.headerCell, styles.attendanceCell]}>
              <Text style={styles.headerText}>Điểm danh 5</Text>
            </View>
          </View>
          {classData[selectedSubject].map((student, studentIndex) => (
            <View key={studentIndex} style={styles.dataRow}>
              <View style={[styles.dataCell, styles.sttCell]}>
                <Text>{student.stt}</Text>
              </View>
              <View style={[styles.dataCell, styles.mssvCell]}>
                <Text>{student.mssv}</Text>
              </View>
              <View style={[styles.dataCell, styles.nameCell]}>
                <Text>{student.name}</Text>
              </View>
              {student.attendance.map((attended, attendanceIndex) => (
                <View key={attendanceIndex} style={[styles.dataCell, styles.attendanceCell]}>
                  <Switch
                    value={attended}
                    trackColor={{ false: "#acacac", true: "#6464db" }}

                    onValueChange={(newValue: boolean) => handleAttendanceChange(selectedSubject, studentIndex, attendanceIndex, newValue)}
                  />
                </View>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 8,
  },
  headerCell: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dataCell: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sttCell: {
    minWidth: 40,
  },
  mssvCell: {
    minWidth: 60,
  },
  nameCell: {
    minWidth: 120,
  },
  attendanceCell: {
    minWidth: 60,
  },
});

export default Attendance;
