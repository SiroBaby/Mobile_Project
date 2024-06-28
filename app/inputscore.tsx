import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet  } from 'react-native';
import { TextInput, DataTable } from 'react-native-paper';
import tw from 'twrnc';

const SubjectGradeScreen = () => {
  const [subjectTitle, setSubjectTitle] = useState('Tên Môn Học'); // có mã lớp học phần thì hiện thêm mã lớp học phần
  const [students, setStudents] = useState([
    // ví dụ tượng trưng
    { mssv: '2254810057', name: 'Nguyễn Văn Hoàng Lam linh lan lam như lệ man', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    { mssv: '2254810056', name: 'Trần Thị B', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    { mssv: '2254810083', name: 'Phạm Văn C', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    { mssv: '2254810085', name: 'Phạm Văn D', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    { mssv: '2254810086', name: 'Phạm Văn E', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    { mssv: '2254810088', name: 'Phạm Văn Ei', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    { mssv: '2254810053', name: 'Nguyễn Văn Hoàng Lam linh lan lam như lệ man', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    { mssv: '2254810052', name: 'Trần Thị B', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    { mssv: '2254810081', name: 'Phạm Văn C', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    { mssv: '2254810082', name: 'Phạm Văn D', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    { mssv: '2254810084', name: 'Phạm Văn E', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    { mssv: '2254810089', name: 'Phạm Văn Ei', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    { mssv: '2254810050', name: 'Nguyễn Văn Hoàng Lam linh lan lam như lệ man', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    { mssv: '2254810051', name: 'Trần Thị B', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    { mssv: '2254810077', name: 'Phạm Văn C', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    { mssv: '2254810080', name: 'Phạm Văn D', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    { mssv: '2254810022', name: 'Phạm Văn E', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    { mssv: '2254810066', name: 'Phạm Văn Ei', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    
  ]);
  const [expandedStudents, setExpandedStudents] = useState<{ [mssv: string]: boolean }>({});

  const handleSaveScore = async () => {
    const dataToSend = students.map(student => ({
      // Chuẩn bị dữ liệu để gửi đến endpoint API
    }));
    // Viết logic gửi dữ liệu đến endpoint API ở đây
  };

  // kiểu dữ liệu của mssv đặt tạm
  const handleChangeScore = (text: string, mssv: string, scoreField: string) => {
    // Kiểm tra nếu đầu vào là rỗng hoặc là số từ 0 đến 10
    if (text === '' || (parseFloat(text) >= 0 && parseFloat(text) <= 10)) {
      // Tạo mảng sinh viên mới với điểm đã được cập nhật
      const updatedStudents = students.map(student => {
        // Tìm sinh viên cần cập nhật điểm
        if (student.mssv === mssv) {
          return { ...student, [scoreField]: text }; // Cập nhật điểm cho sinh viên này
        }
        return student; // Giữ nguyên sinh viên khác
      });
      setStudents(updatedStudents); // Cập nhật state students với mảng sinh viên đã được cập nhật điểm
    }
    };

// tính điểm trung bình
  const calculateAverage = (student: any) => {
    const { score1, score2, score3, score4 } = student;
    const diem1 = parseFloat(score1) || 0;
    const diem2 = parseFloat(score2) || 0;
    const diem3 = parseFloat(score3) || 0;
    const diem4 = parseFloat(score4) || 0;

    const diemTB = (diem1 * 0.1 + diem2 * 0.1 + diem3 * 0.3 + diem4 * 0.5);

    //điều kiện phải nhập đủ 4 cột điểm mới hiện điểm trung bình
    const allScoresFilled = score1 !== '' && score2 !== '' && score3 !== '' && score4 !== '';
    if (allScoresFilled) {
      return diemTB.toFixed(2);//làm tròn 2 chữ số thập phaan
    } else {
      return ''; // trống khi chưa đủ 4 cột điểm
    }
  };
// hiện kết quả sau khi đã nhập xong 4 cột điểm và tính điểm tb (khi chưa có đủ 4 cột điểm thì nó trống) 
  const determineResult = (student: any) => {
    const { score1, score2, score3, score4 } = student;
    const allScoresFilled = score1 !== '' && score2 !== '' && score3 !== '' && score4 !== '';
    if (allScoresFilled) {
      const diemTB = calculateAverage(student);
      return parseFloat(diemTB) >= 4 ? 'Đạt' : 'Học lại';
    } else {
      return ''; // trống khi chưa đủ 4 cột điểm
    }
  };

  const toggleExpand = (mssv: string) => {
    setExpandedStudents(prevState => ({
      ...prevState,
      [mssv]: !prevState[mssv] // Đảo ngược trạng thái mở rộng của sinh viên khi người dùng nhấn vào
    }));
  };



  return (
    <ScrollView contentContainerStyle={tw`flex items-center bg-white p-4`}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>{subjectTitle}</Text>
      
      <DataTable style={styles.dataTable}>
        <DataTable.Header>
          <DataTable.Title style={styles.tableTitle}><Text style={tw`text-base font-bold text-black`}>Sinh viên</Text></DataTable.Title>
          <DataTable.Title style={styles.tableTitle}><Text style={tw`text-base font-bold text-black`}>MSSV</Text></DataTable.Title>
          <DataTable.Title style={styles.tableTitle}><Text style={tw`text-base font-bold text-black `}>Kết quả</Text></DataTable.Title>
          <DataTable.Title style={styles.tableTitle}><Text style={tw`text-base font-bold text-black `}>Trung Bình</Text></DataTable.Title>
        </DataTable.Header>

        {students.map(student => (
          <React.Fragment key={student.mssv}>
            <DataTable.Row onPress={() => toggleExpand(student.mssv)}>
              <DataTable.Cell style={styles.tableCell}>
                <Text style={styles.cellText}>{student.name}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={styles.tableCell}>
                <Text style={styles.cellText}>{student.mssv}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={styles.tableCell}>
                <Text style={styles.cellText}>{determineResult(student)}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={styles.tableCell2}>
                <Text style={styles.cellText}>{calculateAverage(student)}</Text>
              </DataTable.Cell>
            </DataTable.Row>

            {expandedStudents[student.mssv] && (
              <DataTable.Row key={`${student.mssv}-expanded`}>
                <DataTable.Cell style={{ justifyContent: 'center', alignItems: 'center', borderRightWidth: 0.2, backgroundColor: '#f6f6ee'}}>
                  Đ1:
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={(text) => handleChangeScore(text, student.mssv, 'score1')}
                    value={student.score1}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: 'center', alignItems: 'center', borderRightWidth: 0.2, backgroundColor: '#f6f6ee'  }}>
                  Đ2:
                  <TextInput
                    style={styles.input}
                    placeholder=""
                    keyboardType="numeric"
                    onChangeText={(text) => handleChangeScore(text, student.mssv, 'score2')}
                    value={student.score2}
                  />
                  </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: 'center', alignItems: 'center', borderRightWidth: 0.2, backgroundColor: '#f6f6ee'}}>
                  GK:
                  <TextInput
                    style={styles.input}
                    placeholder=""
                    keyboardType="numeric"
                    onChangeText={(text) => handleChangeScore(text, student.mssv, 'score3')}
                    value={student.score3}
                  />
                </DataTable.Cell>
                <DataTable.Cell style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#f6f6ee'}}>
                  CK:
                  <TextInput
                    style={styles.input}
                    placeholder=""
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

      <TouchableOpacity
        style={tw`h-10 bg-blue-900 py-2 px-3 mt-5 rounded-xl items-center mb-4 w-28`}
        onPress={handleSaveScore}
      >
        <Text style={tw`text-white font-bold pt-0.5`}>LƯU</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dataTable: {
    borderRadius: 8,
    borderWidth: 0.5,
    marginVertical: 10,
  },
  tableTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    paddingVertical: 8,
  },
  headerText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  tableRow: {
    backgroundColor: '#ffffff',
  },
  tableCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0.2,
    paddingVertical: 8, 
  },
  tableCell2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8, 
  },
  expandedRow: {
    backgroundColor: '#ffffff',
  },
  expandedCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 0.2,
    paddingVertical: 8,
  },
  input: {
    height: 20,
    width: 40,
    fontSize: 13,
    backgroundColor: '#f6f6ee',
    
  },
  cellText: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default SubjectGradeScreen;
