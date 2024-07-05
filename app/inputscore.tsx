import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput, DataTable, Text } from 'react-native-paper';
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

interface Student {
  MSSV: string;
  Ten: string;
  Diem1: number | string;
  Diem2: number | string;
  DiemGK: number | string;
  DiemCK: number | string;
}

const SubjectGradeScreen = () => {
  const [subjectTitle, setSubjectTitle] = useState('Tên Môn Học');
  const [students, setStudents] = useState<Student[]>([]);
  const [expandedStudents, setExpandedStudents] = useState<{ [mssv: string]: boolean }>({});

  useEffect(() => {
    const fetchStudents = async () => {
      const userData = await getUserData();
      const subjectId = userData?.MaMonHoc;
      if (subjectId) {
        fetch(`http://localhost:3000/students/${subjectId}`)
          .then(response => response.json())
          .then(data => setStudents(data))
          .catch(error => console.error('Error:', error));
      }
    };

    fetchStudents();
  }, []);

  const getUserData = async (): Promise<UserData | null> => {
    try {
      const jsonValue = await AsyncStorage.getItem('userData');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.error('Failed to load user data', e);
      return null;
    }
  };

  const handleSaveScore = async () => {
    const userData = await getUserData();
    const subjectId = userData?.MaMonHoc;
    if (!subjectId) return;

    const dataToSend = students.map(student => ({
        mssv: student.MSSV,
        score1: student.Diem1,
        score2: student.Diem2,
        scoreGK: student.DiemGK,
        scoreCK: student.DiemCK
    }));

    try {
        await Promise.all(dataToSend.map(student =>
            fetch(`http://localhost:3000/students/${subjectId}/update-scores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(student),
            })
        ));
        alert('Lưu điểm thành công');
    } catch (error) {
        console.error('Error:', error);
        alert('Lưu điểm thất bại');
    }
};

const handleChangeScore = (text: string, mssv: string, scoreField: keyof Student) => {
  if (text === '' || (parseFloat(text) >= 0 && parseFloat(text) <= 10)) {
      const updatedStudents = students.map(student => {
          if (student.MSSV === mssv) {
              return { ...student, [scoreField]: text };
          }
          return student;
      });
      setStudents(updatedStudents);
  }
};

const calculateAverage = (student: Student) => {
  const { Diem1, Diem2, DiemGK, DiemCK } = student;
  const diem1 = parseFloat(Diem1 as string) || 0;
  const diem2 = parseFloat(Diem2 as string) || 0;
  const diemGK = parseFloat(DiemGK as string) || 0;
  const diemCK = parseFloat(DiemCK as string) || 0;
  const diemTB = (diem1 * 0.1 + diem2 * 0.1 + diemGK * 0.3 + diemCK * 0.5);
  const allScoresFilled = Diem1 !== null && Diem2 !== null && DiemGK !== null && DiemCK !== null;
  return allScoresFilled ? diemTB.toFixed(2) : '';
};

const determineResult = (student: Student) => {
  const allScoresFilled = student.Diem1 !== '' && student.Diem2 !== '' && student.DiemGK !== '' && student.DiemCK !== '';
  if (allScoresFilled) {
    const diemTB = parseFloat(calculateAverage(student));
    return diemTB >= 4 ? 'Đạt' : 'Học lại';
  } else {
    return '';
  }
};

const toggleExpand = (mssv: string) => {
  setExpandedStudents(prevState => ({ ...prevState, [mssv]: !prevState[mssv] }));
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{subjectTitle}</Text>

      <DataTable style={styles.dataTable}>
        <DataTable.Header>
          <DataTable.Title style={[styles.tableTitle, { flex: 2 }]}>
            <Text variant="labelLarge">Sinh viên</Text>
          </DataTable.Title>
          <DataTable.Title numeric style={[styles.tableTitle, { flex: 1 }]}>
            <Text variant="labelLarge">MSSV</Text>
          </DataTable.Title>
          <DataTable.Title numeric style={[styles.tableTitle, { flex: 1 }]}>
            <Text variant="labelLarge">Trung bình</Text>
          </DataTable.Title>
          <DataTable.Title style={[styles.tableTitle, { flex: 1 }]}>
            <Text variant="labelLarge">Kết quả</Text>
          </DataTable.Title>
        </DataTable.Header>

        {students.map((student) => (
          <React.Fragment key={student.MSSV}>
            <DataTable.Row onPress={() => toggleExpand(student.MSSV)}>
              <DataTable.Cell style={[styles.tableCell, { flex: 2 }]}>
                <Text variant="labelSmall">{student.Ten}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={[styles.tableCell, { flex: 1 }]}>
                <Text variant="labelSmall">{student.MSSV}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={[styles.tableCell, { flex: 1 }]}>
                <Text variant="labelSmall">{calculateAverage(student)}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={[styles.tableCell, { flex: 1 }]}>
                <Text variant="labelSmall">{determineResult(student)}</Text>
              </DataTable.Cell>
            </DataTable.Row>

            {expandedStudents[student.MSSV] && (
              <DataTable.Row style={styles.expandedRow}>
                <DataTable.Cell style={styles.expandedCell}>
                  <Text variant="labelLarge">Đ1:</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={(text) => handleChangeScore(text, student.MSSV, 'Diem1')}
                    value={student.Diem1.toString()}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={styles.expandedCell}>
                  <Text variant="labelLarge">Đ2:</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={(text) => handleChangeScore(text, student.MSSV, 'Diem2')}
                    value={student.Diem2.toString()}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={styles.expandedCell}>
                  <Text variant="labelLarge">GK:</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={(text) => handleChangeScore(text, student.MSSV, 'DiemGK')}
                    value={student.DiemGK.toString()}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={styles.expandedCell}>
                  <Text variant="labelLarge">CK:</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={(text) => handleChangeScore(text, student.MSSV, 'DiemCK')}
                    value={student.DiemCK.toString()}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            )}
          </React.Fragment>
        ))}
      </DataTable>

      <TouchableOpacity style={styles.button} onPress={handleSaveScore}>
        <Text style={styles.buttonText}>LƯU</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  dataTable: {
    marginBottom: 16,
  },
  tableTitle: {
    justifyContent: 'center',
  },
  tableCell: {
    justifyContent: 'center',
  },
  expandedRow: {
    backgroundColor: '#f0f0f0',
  },
  expandedCell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 8,
  },
  input: {
    backgroundColor: 'white',
    width: 40,
    height: 20,
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#007bff',
    borderRadius: 4,
    padding: 10,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SubjectGradeScreen;
