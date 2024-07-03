import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput, DataTable, Text } from 'react-native-paper';

import tw from 'twrnc';

const SubjectGradeScreen = () => {
  const [subjectTitle, setSubjectTitle] = useState('Tên Môn Học');
  const [students, setStudents] = useState([
    { mssv: '2254810057', name: 'Nguyễn Văn Hoàng Lam linh lan lam như lệ man', score1: '', score2: '', score3: '', score4: '', TB: '', KQ: '' },
    { mssv: '2254810056', name: 'Trần Thị B', score1: '', score2: '', score3: '', score4: '', TB: '', KQ: '' },
    { mssv: '2254810083', name: 'Phạm Văn C', score1: '', score2: '', score3: '', score4: '', TB: '', KQ: '' },
    { mssv: '2254810085', name: 'Phạm Văn D', score1: '', score2: '', score3: '', score4: '', TB: '', KQ: '' },
    { mssv: '2254810086', name: 'Phạm Văn E', score1: '', score2: '', score3: '', score4: '', TB: '', KQ: '' },
    { mssv: '2254810088', name: 'Phạm Văn Ei', score1: '', score2: '', score3: '', score4: '', TB: '', KQ: '' },
    { mssv: '2254810053', name: 'Nguyễn Văn Hoàng Lam linh lan lam như lệ man', score1: '', score2: '', score3: '', score4: '', TB: '', KQ: '' },
    { mssv: '2254810052', name: 'Trần Thị B', score1: '', score2: '', score3: '', score4: '', TB: '', KQ: '' },
    { mssv: '2254810081', name: 'Phạm Văn C', score1: '', score2: '', score3: '', score4: '', TB: '', KQ: '' },
    { mssv: '2254810082', name: 'Phạm Văn D', score1: '', score2: '', score3: '', score4: '', TB: '', KQ: '' },
    { mssv: '2254810084', name: 'Phạm Văn E', score1: '', score2: '', score3: '', score4: '', TB: '', KQ: '' },
    { mssv: '2254810089', name: 'Phạm Văn Ei', score1: '', score2: '', score3: '', score4: '', TB: '', KQ: '' },
    { mssv: '2254810050', name: 'Nguyễn Văn Hoàng Lam linh lan lam như lệ man', score1: '', score2: '', score3: '', score4: '', TB: '', KQ: '' },
    { mssv: '2254810051', name: 'Trần Thị B', score1: '', score2: '', score3: '', score4: '', TB: '', KQ: '' },
    { mssv: '2254810077', name: 'Phạm Văn C', score1: '', score2: '', score3: '', score4: '', TB: '', KQ: '' },
    { mssv: '2254810080', name: 'Phạm Văn D', score1: '', score2: '', score3: '', score4: '', TB: '', KQ: '' },
    { mssv: '2254810022', name: 'Phạm Văn E', score1: '', score2: '', score3: '', score4: '', TB: '', KQ: '' },
    { mssv: '2254810066', name: 'Phạm Văn Ei', score1: '', score2: '', score3: '', score4: '', TB: '', KQ: '' },
  ]);
  const [expandedStudents, setExpandedStudents] = useState<{ [mssv: string]: boolean }>({});

  const handleSaveScore = async () => {
    const dataToSend = students.map(student => ({
      // Chuẩn bị dữ liệu để gửi đến endpoint API
    }));
    // Viết logic gửi dữ liệu đến endpoint API ở đây
  };

  const handleChangeScore = (text: string, mssv: string, scoreField: string) => {
    if (text === '' || (parseFloat(text) >= 0 && parseFloat(text) <= 10)) {
      const updatedStudents = students.map(student => {
        if (student.mssv === mssv) {
          return { ...student, [scoreField]: text };
        }
        return student;
      });
      setStudents(updatedStudents);
    }
  };

  const calculateAverage = (student: any) => {
    const { score1, score2, score3, score4 } = student;
    const diem1 = parseFloat(score1) || 0;
    const diem2 = parseFloat(score2) || 0;
    const diem3 = parseFloat(score3) || 0;
    const diem4 = parseFloat(score4) || 0;
    const diemTB = (diem1 * 0.1 + diem2 * 0.1 + diem3 * 0.3 + diem4 * 0.5);
    const allScoresFilled = score1 !== '' && score2 !== '' && score3 !== '' && score4 !== '';
    if (allScoresFilled) {
      return diemTB.toFixed(2);
    } else {
      return '';
    }
  };

  const determineResult = (student: any) => {
    const { score1, score2, score3, score4 } = student;
    const allScoresFilled = score1 !== '' && score2 !== '' && score3 !== '' && score4 !== '';
    if (allScoresFilled) {
      const diemTB = calculateAverage(student);
      return parseFloat(diemTB) >= 4 ? 'Đạt' : 'Học lại';
    } else {
      return '';
    }
  };

  const toggleExpand = (mssv: string) => {
    setExpandedStudents(prevState => ({
      ...prevState,
      [mssv]: !prevState[mssv]
    }));
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

        {students.map(student => (
          <React.Fragment key={student.mssv}>
            <DataTable.Row onPress={() => toggleExpand(student.mssv)}>
              <DataTable.Cell style={[styles.tableCell, { flex: 2}]}>
                <Text variant="labelSmall">{student.name}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={[styles.tableCell, { flex: 1}]}>
                <Text variant="labelSmall">{student.mssv}</Text>
              </DataTable.Cell>
              <DataTable.Cell numeric style={[styles.tableCell, { flex: 1}]}>
                <Text variant="labelSmall">{calculateAverage(student)}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={[styles.tableCell, { flex: 1}]}>
                <Text variant="labelSmall">{determineResult(student)}</Text>
              </DataTable.Cell>
            </DataTable.Row>

            {expandedStudents[student.mssv] && (
              <DataTable.Row style={styles.expandedRow}>
                <DataTable.Cell style={styles.expandedCell}>
                <Text variant="labelLarge">Đ1:</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={(text) => handleChangeScore(text, student.mssv, 'score1')}
                    value={student.score1}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={styles.expandedCell}>
                <Text variant="labelLarge">Đ2:</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={(text) => handleChangeScore(text, student.mssv, 'score2')}
                    value={student.score2}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={styles.expandedCell}>
                <Text variant="labelLarge">GK:</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={(text) => handleChangeScore(text, student.mssv, 'score3')}
                    value={student.score3}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={styles.expandedCell}>
                <Text variant="labelLarge">CK:</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={(text) => handleChangeScore(text, student.mssv, 'score4')}
                    value={student.score4}
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
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingVertical: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dataTable: {
    
    marginVertical: 10,
  },
  tableTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97ABCE',
    paddingVertical: 8,
  },
  tableCell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  expandedRow: {
    backgroundColor: '#ffffff',
  },
  expandedCell: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#f6f6ee',
  },
  input: {
    height: 20,
    width: 40,
    fontSize: 12,
    backgroundColor: '#f6f6ee',
  },
  button: {
    backgroundColor: '#2E328C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  cellText: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default SubjectGradeScreen;
