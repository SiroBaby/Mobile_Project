import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, DataTable } from 'react-native-paper';
import tw from 'twrnc';

const SubjectGradeScreen = () => {
  const [subjectTitle, setSubjectTitle] = useState('Tên Môn Học'); // có mã lớp học phần thì hiện thêm mã lớp học phần
  const [students, setStudents] = useState([
    // ví dụ tượng trưng
    { mssv: '2254810057', name: 'Nguyễn Văn A', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    { mssv: '2254810056', name: 'Trần Thị B', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    { mssv: '2254810083', name: 'Phạm Văn C', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    { mssv: '2254810085', name: 'Phạm Văn D', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    { mssv: '2254810086', name: 'Phạm Văn E', score1: '', score2: '', score3: '', score4: '', TB:'', KQ:'' },
    
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
    const updatedStudents = students.map(student => {
      if (student.mssv === mssv) {
        return { ...student, [scoreField]: text };
      }
      return student;
    });
    setStudents(updatedStudents);
  };
// tính điểm trung bình
  const calculateAverage = (student: any) => {
    const { score1, score2, score3, score4 } = student;
    const diem1 = parseFloat(score1) || 0;
    const diem2 = parseFloat(score2) || 0;
    const diem3 = parseFloat(score3) || 0;
    const diem4 = parseFloat(score4) || 0;

    const diemTB = (diem1 * 0.1 + diem2 * 0.1 + diem3 * 0.3 + diem4 * 0.5);

    return diemTB.toFixed(2);//làm tròn 2 chữ số thập phaan
  };
// hiện kết quả sau khi đã nhập xong 4 cột điểm và tính điểm tb
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


  //những cái đang thiếu, sai và tui đang làm sửa 
//bổ sung điều kiện chỉ nhập điểm từ dạng số từ 0 tới 10 sau
//bổ sung tự động ẩn hàng nhập điểm khi nhấn chọn vào 1 sinh viên khác 
//chỉnh sửa lại css 

  const toggleExpand = (mssv: string) => {
    setExpandedStudents(prevState => ({
      ...prevState,
      [mssv]: !prevState[mssv] // Đảo ngược trạng thái mở rộng của sinh viên khi người dùng nhấn vào
    }));
  };



  return (
    <ScrollView contentContainerStyle={tw`flex items-center bg-white p-4`}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>{subjectTitle}</Text>
      
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Sinh viên</DataTable.Title>
          <DataTable.Title>MSSV</DataTable.Title>
          <DataTable.Title>Kết quả</DataTable.Title>
        </DataTable.Header>

        {students.map(student => (
          <React.Fragment key={student.mssv}>
            <DataTable.Row onPress={() => toggleExpand(student.mssv)}>
              <DataTable.Cell style={{ borderBottomWidth: 1 }}>
                {student.name}
              </DataTable.Cell>
              <DataTable.Cell style={{ borderBottomWidth: 1 }}>
                {student.mssv}
              </DataTable.Cell>
              <DataTable.Cell style={{ borderBottomWidth: 1 }}>
                {determineResult(student)}
              </DataTable.Cell>
            </DataTable.Row>

            {expandedStudents[student.mssv] && (
              <DataTable.Row key={`${student.mssv}-expanded`}>
                <DataTable.Cell>
                  Đ1:
                  <TextInput
                    style={{ height: 40, width: 50 }}
                    placeholder=""
                    keyboardType="numeric"
                    onChangeText={(text) => handleChangeScore(text, student.mssv, 'score1')}
                    value={student.score1}
                  />
                </DataTable.Cell>
                <DataTable.Cell>
                  Đ2:
                  <TextInput
                    style={{ height: 40, width: 50 }}
                    placeholder=""
                    keyboardType="numeric"
                    onChangeText={(text) => handleChangeScore(text, student.mssv, 'score2')}
                    value={student.score2}
                  />
                </DataTable.Cell>
                <DataTable.Cell>
                  GK:
                  <TextInput
                    style={{ height: 40, width: 50 }}
                    placeholder=""
                    keyboardType="numeric"
                    onChangeText={(text) => handleChangeScore(text, student.mssv, 'score3')}
                    value={student.score3}
                  />
                </DataTable.Cell>
                <DataTable.Cell>
                  CK:
                  <TextInput
                    style={{ height: 40, width: 50 }}
                    placeholder=""
                    keyboardType="numeric"
                    onChangeText={(text) => handleChangeScore(text, student.mssv, 'score4')}
                    value={student.score4}
                  />
                </DataTable.Cell>
                <DataTable.Cell>
                  TB: {calculateAverage(student)}
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

export default SubjectGradeScreen;
