import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import tw from 'twrnc';

const initialSubject: { stt: number; mssv: string; name: string; attendance: boolean[]; }[] = [
  { stt: 1, mssv: "001", name: "Nguyen Van A", attendance: [true, false, true, true, false] },
  { stt: 2, mssv: "002", name: "Tran Thi B", attendance: [true, true, true, false, true] },
  { stt: 3, mssv: "003", name: "Le Van C", attendance: [false, true, false, true, true] },
  { stt: 4, mssv: "004", name: "Pham Thi D", attendance: [true, true, false, false, true] },
  { stt: 5, mssv: "005", name: "Hoang Van Ed wjkefb ưklefn dhwe fwhje fkwef kwjef kjfqw", attendance: [false, false, true, true, true] },
  { stt: 6, mssv: "006", name: "Nguyen Van F", attendance: [true, true, false, true, false] },
  { stt: 7, mssv: "007", name: "Tran Thi G", attendance: [false, true, true, true, true] },
  { stt: 8, mssv: "008", name: "Le Van H", attendance: [true, false, true, false, true] },
  { stt: 9, mssv: "009", name: "Pham Thi I", attendance: [true, true, true, true, false] },
  { stt: 10, mssv: "010", name: "Hoang Van J", attendance: [false, false, false, true, true] },
  { stt: 11, mssv: "011", name: "Hoang Van J", attendance: [false, false, false, true, true] },
  { stt: 12, mssv: "012", name: "Hoang Van J", attendance: [false, false, false, true, true] },
];

const Attendance = () => {
  const [classData, setClassData] = useState(initialSubject);

  const handleAttendanceChange = (studentIndex: number, attendanceIndex: number, value: boolean) => {
    const updatedClassData = [...classData];
    updatedClassData[studentIndex].attendance[attendanceIndex] = value;
    setClassData(updatedClassData);
  };

  return (
    <View style={tw`p-4 h-full bg-white`}>
      <ScrollView>
        <ScrollView horizontal>
          <View>
            <View style={styles.headerRow}>
              <View style={tw`w-12 justify-center items-center py-2`}>
                <Text style={tw`font-bold`}>STT</Text>
              </View>
              <View style={tw`w-20 justify-center items-center py-2`}>
                <Text style={tw`font-bold`}>MSSV</Text>
              </View>
              <View style={tw`w-44 justify-center items-center py-2`}>
                <Text style={tw`font-bold`}>Tên SV</Text>
              </View>
              <View style={tw`w-18 justify-center items-center py-2`}>
                <Text style={tw`font-bold`}>DD1</Text>
              </View>
              <View style={tw`w-18 justify-center items-center py-2`}>
                <Text style={tw`font-bold`}>DD2</Text>
              </View>
              <View style={tw`w-18 justify-center items-center py-2`}>
                <Text style={tw`font-bold`}>DD3</Text>
              </View>
              <View style={tw`w-18 justify-center items-center py-2`}>
                <Text style={tw`font-bold`}>DD4</Text>
              </View>
              <View style={tw`w-18 justify-center items-center py-2`}>
                <Text style={tw`font-bold`}>DD5</Text>
              </View>
            </View>
            {classData.map((student, studentIndex) => (
              <View key={studentIndex} style={styles.dataRow}>
                <View style={tw`w-12 justify-center items-center`}>
                  <Text>{student.stt}</Text>
                </View>
                <View style={tw`w-20 justify-center items-center`}>
                  <Text>{student.mssv}</Text>
                </View>
                <View style={tw`w-44 justify-center`}>
                  <Text>{student.name}</Text>
                </View>
                {student.attendance.map((attended, attendanceIndex) => (
                  <View key={attendanceIndex} style={[styles.dataCell, styles.attendanceCell]}>
                    <Switch
                      value={attended}
                      trackColor={{ false: "#acacac", true: "#6464db" }}
                      onValueChange={(newValue: boolean) => handleAttendanceChange(studentIndex, attendanceIndex, newValue)}
                    />
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
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
