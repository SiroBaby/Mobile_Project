import React, { useState } from 'react'; // Import React và hook useState từ thư viện React
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native'; // Import các component cần thiết từ React Native
import { TextInput, DataTable } from 'react-native-paper'; // Import các component TextInput và DataTable từ thư viện react-native-paper
import tw from 'twrnc'; // Giả sử 'twrnc' đã được thay thế bằng 'tailwind-react-native-classnames'

const SubjectGradeScreen = () => {
  const [subjectTitle, setSubjectTitle] = useState('Tên Môn Học'); // Biến state cho tiêu đề môn học, khởi tạo giá trị 'Tên Môn Học', và hàm setter
  const [students, setStudents] = useState([ // Biến state cho mảng students, khởi tạo với dữ liệu ban đầu của các sinh viên
    { id: 1, mssv: '2254810057', name: 'Nguyễn Văn A', score1: '', score2: '', score3: '', score4: '' },
    { id: 2, mssv: '2254810056', name: 'Trần Thị B', score1: '', score2: '', score3: '', score4: '' },
    { id: 3, mssv: '2254810083', name: 'Phạm Văn C', score1: '', score2: '', score3: '', score4: '' },
    { id: 4, mssv: '2254810057', name: 'Nguyễn Văn A', score1: '', score2: '', score3: '', score4: '' },
    { id: 5, mssv: '2254810056', name: 'Trần Thị B', score1: '', score2: '', score3: '', score4: '' },
    { id: 6, mssv: '2254810083', name: 'Phạm Văn C', score1: '', score2: '', score3: '', score4: '' },
    { id: 7, mssv: '2254810057', name: 'Nguyễn Văn A', score1: '', score2: '', score3: '', score4: '' },
    { id: 8, mssv: '2254810056', name: 'Trần Thị B', score1: '', score2: '', score3: '', score4: '' },
    { id: 9, mssv: '2254810083', name: 'Phạm Văn C', score1: '', score2: '', score3: '', score4: '' },
    { id: 10, mssv: '2254810057', name: 'Nguyễn Văn A', score1: '', score2: '', score3: '', score4: '' },
    { id: 11, mssv: '2254810056', name: 'Trần Thị B', score1: '', score2: '', score3: '', score4: '' },
    { id: 12, mssv: '2254810083', name: 'Phạm Văn C', score1: '', score2: '', score3: '', score4: '' },
    { id: 13, mssv: '2254810057', name: 'Nguyễn Văn A', score1: '', score2: '', score3: '', score4: '' },
    { id: 14, mssv: '2254810056', name: 'Trần Thị B', score1: '', score2: '', score3: '', score4: '' },
    { id: 15, mssv: '2254810083', name: 'Phạm Văn C', score1: '', score2: '', score3: '', score4: '' },
    // Các đối tượng sinh viên với các trường id, mssv (mã số sinh viên), name, và các trường điểm rỗng
  ]);

  const [expandedStudentId, setExpandedStudentId] = useState<number | null>(null); // Biến state để theo dõi id của sinh viên được mở rộng, khởi tạo là null

  const handleSaveScore = async () => {
    // Hàm async để xử lý việc lưu điểm (chưa được triển khai chi tiết trong ví dụ này)
    // Chuẩn bị dữ liệu để gửi đến endpoint API
    const dataToSend = students.map(student => ({
      id: student.id,
      mssv: student.mssv,
      name: student.name,
      score1: student.score1,
      score2: student.score2,
      score3: student.score3,
      score4: student.score4,
    }));

    // logic fetch để gửi dữ liệu đến endpoint API
    
  };

  // Hàm xử lý thay đổi điểm cho sinh viên
  const handleChangeScore = (text: string, studentId: number, scoreField: string) => {
    // Duyệt qua mảng students và cập nhật trường điểm cho sinh viên cụ thể
    const updatedStudents = students.map(student => {
      if (student.id === studentId) {
        return { ...student, [scoreField]: text }; // Cập nhật trường điểm với giá trị text mới
      }
      return student; // Trả về đối tượng sinh viên không thay đổi nếu id không khớp
    });
    setStudents(updatedStudents); // Cập nhật state với mảng students đã cập nhật
  };

  // Hàm để mở rộng hoặc thu gọn dòng của một sinh viên
  const toggleExpand = (studentId: number) => {
    if (expandedStudentId === studentId) {
      setExpandedStudentId(null); // Thu gọn nếu đã được mở rộng
    } else {
      setExpandedStudentId(studentId); // Mở rộng nếu chưa được mở rộng
    }
  };

  // Hàm tính điểm trung bình và xác định kết quả Đạt/Học lại
  const calculateAverage = (student: any) => {
    const { score1, score2, score3, score4 } = student;
    const diem1 = parseFloat(score1) || 0;
    const diem2 = parseFloat(score2) || 0;
    const diem3 = parseFloat(score3) || 0;
    const diem4 = parseFloat(score4) || 0;

    // Tính điểm trung bình theo trọng số
    const diemTB =( (diem1 * 0.1 + diem2 * 0.1 + diem3 * 0.3 + diem4 * 0.5) / 4);

    // Xác định kết quả Đạt/Học lại
    if (diemTB >= 4) {
      return 'Đạt';
    } else {
      return 'Học lại';
    }
  };

  // Render component
  return (
    <ScrollView contentContainerStyle={tw`flex items-center bg-white p-4`}>
      {/* Tiêu đề môn học */}
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>{subjectTitle}</Text>
      
      {/* DataTable để hiển thị dữ liệu sinh viên */}
      <DataTable>
        {/* Dòng header của DataTable */}
        <DataTable.Header>
          <DataTable.Title>Sinh viên</DataTable.Title> {/* Tiêu đề cột tên sinh viên */}
          <DataTable.Title>MSSV</DataTable.Title> {/* Tiêu đề cột mã số sinh viên */}
          <DataTable.Title>Kết quả</DataTable.Title> {/* Tiêu đề cột điểm trung bình */}
        </DataTable.Header>

        {/* Duyệt qua mảng students để hiển thị các dòng */}
        {students.map(student => (
          <React.Fragment key={student.id}>
            {/* Dòng chính hiển thị tên sinh viên, MSSV và điểm trung bình */}
            <DataTable.Row onPress={() => toggleExpand(student.id)}>
              <DataTable.Cell style={{ borderBottomWidth: 1 }}>
                {student.name} {/* Hiển thị tên sinh viên */}
              </DataTable.Cell>
              <DataTable.Cell style={{ borderBottomWidth: 1 }}>
                {student.mssv} {/* Hiển thị MSSV */}
              </DataTable.Cell>
              <DataTable.Cell style={{ borderBottomWidth: 1 }}>
                {/* Tính và hiển thị điểm trung bình của sinh viên */}
                {calculateAverage(student)}
              </DataTable.Cell>
            </DataTable.Row>

            {/* Dòng mở rộng với các ô nhập điểm */}
            {expandedStudentId === student.id && (
              <DataTable.Row>
                <DataTable.Cell>
                  Đ1:
                  <TextInput
                    style={{ height: 40, width: 50 }} 
                    placeholder=""
                    keyboardType="numeric" // Bàn phím số cho nhập điểm
                    onChangeText={(text) => handleChangeScore(text, student.id, 'score1')} // Xử lý thay đổi văn bản cho điểm 1
                    value={student.score1} // Liên kết giá trị nhập vào với state điểm 2
                  />
                </DataTable.Cell>
                <DataTable.Cell>
                  Đ2:
                  <TextInput
                    style={{ height: 40, width: 50 }} 
                    placeholder=""
                    keyboardType="numeric" // Bàn phím số cho nhập điểm
                    onChangeText={(text) => handleChangeScore(text, student.id, 'score2')} // Xử lý thay đổi văn bản cho điểm 1
                    value={student.score2} // Liên kết giá trị nhập vào với state điểm 2
                  />
                </DataTable.Cell>
                <DataTable.Cell>
                  GK:
                  <TextInput
                    style={{ height: 40, width: 50 }} 
                    placeholder=""
                    keyboardType="numeric" // Bàn phím số cho nhập điểm
                    onChangeText={(text) => handleChangeScore(text, student.id, 'score3')} // Xử lý thay đổi văn bản cho điểm 1
                    value={student.score3} // Liên kết giá trị nhập vào với state điểm 2
                  />
                </DataTable.Cell>
                <DataTable.Cell>
                  CK:
                  <TextInput
                    style={{ height: 40, width: 50 }} 
                    placeholder=""
                    keyboardType="numeric" // Bàn phím số cho nhập điểm
                    onChangeText={(text) => handleChangeScore(text, student.id, 'score4')} // Xử lý thay đổi văn bản cho điểm 1
                    value={student.score4} // Liên kết giá trị nhập vào với state điểm 2
                  />
                </DataTable.Cell>
                <DataTable.Cell>
                  TB: {/* Nhãn điểm trung bình */}
                  <TextInput
                    style={{ height: 40, width: 50 }} // Điều chỉnh chiều rộng nếu cần thiết
                    placeholder=""
                    keyboardType="numeric" // Bàn phím số cho nhập điểm
                    editable={false} // Vô hiệu hóa chỉnh sửa cho ô điểm trung bình
                    value={(() => {
                      // Tính điểm trung bình động
                      const { score1, score2, score3, score4 } = student; // Phân rã các điểm từ đối tượng sinh viên
                      const totalScores = parseFloat(score1) + parseFloat(score2) + parseFloat(score3) + parseFloat(score4); // Tính tổng điểm
                      const diemTB = (parseFloat(score1) * 0.1 + parseFloat(score2) * 0.1 + parseFloat(score3) * 0.3 + parseFloat(score4) * 0.5) / 4;
                      return totalScores ? diemTB.toFixed(2) : ''; // Tính điểm trung bình và định dạng thành 2 chữ số thập phân, nếu totalScores là falsy thì trả về chuỗi rỗng
                    })()}
                  />
                </DataTable.Cell>
              </DataTable.Row>
            )}
          </React.Fragment>
        ))}
      </DataTable>

      {/* Nút LƯU */}
      <TouchableOpacity
        style={tw`h-10 bg-blue-900 py-2 px-3 mt-5 rounded-xl items-center mb-4 w-28`}
        onPress={handleSaveScore} // Gọi hàm handleSaveScore khi nhấn nút
      >
        <Text style={tw`text-white font-bold pt-0.5`}>LƯU</Text> {/* Văn bản nút */}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SubjectGradeScreen; 
