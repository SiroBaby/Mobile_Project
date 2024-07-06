import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View, ActivityIndicator } from 'react-native';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface UserData {
  id: string;
  HoVaTen: string;
  TenDangNhap: string;
  MatKhau: string;
  SDT: number;
  Email: string;
  Quyen: number;
  MaLop: string;
  MaMonHoc: string;
  [key: string]: any;
}

interface AttendanceData {
  stt: number;
  mssv: string;
  name: string;
  attendance: boolean[];
}

const Attendance = () => {
  const [classData, setClassData] = useState<AttendanceData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendanceData();
  }, []);

  const fetchAttendanceData = async () => {
    try {
      const userData = await getUserData();
      const subjectId = userData?.MaMonHoc;
      const response = await fetch(`http://localhost:3000/attendance/${subjectId}`);
      const data = await response.json();

      // Ensure attendance is correctly mapped to an array
      const processedData = data.map((student: any, index: number) => ({
        stt: index + 1,
        mssv: student.MSSV,
        name: student.Ten,
        attendance: [student.Dd1 === 1, student.Dd2 === 1, student.Dd3 === 1, student.Dd4 === 1, student.Dd5 === 1],
      }));

      setClassData(processedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      setLoading(false);
    }
  };

  const getUserData = async (): Promise<UserData | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Failed to load user data', e);
      return null;
    }
  };

  const handleAttendanceChange = async (studentIndex: number, attendanceIndex: number, value: boolean) => {
    const updatedClassData = [...classData];
    if (updatedClassData[studentIndex]?.attendance) {
      updatedClassData[studentIndex].attendance[attendanceIndex] = value;

      // Tạo object để cập nhật điểm danh
      const attendanceUpdate = {
        mssv: updatedClassData[studentIndex].mssv,
        dd1: updatedClassData[studentIndex].attendance[0],
        dd2: updatedClassData[studentIndex].attendance[1],
        dd3: updatedClassData[studentIndex].attendance[2],
        dd4: updatedClassData[studentIndex].attendance[3],
        dd5: updatedClassData[studentIndex].attendance[4],
      };

      try {
        const userData = await getUserData();
        const subjectId = userData?.MaMonHoc;
        await fetch(`http://localhost:3000/attendance/${subjectId}/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(attendanceUpdate),
        });
        setClassData(updatedClassData);
      } catch (error) {
        console.error('Error updating attendance:', error);
      }
    }
  };

  if (loading) {
    return (
      <View style={[tw`p-4 h-full bg-white`, styles.center]}>
        <ActivityIndicator size="large" color="#6464db" />
      </View>
    );
  }

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
};

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
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Attendance;
