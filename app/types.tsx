
export interface StudentInfoType {
    name: string;
    studentId: string;
    cccd: string;
    dob: string;
    gender: string;
    ethnicity: string;
    address: string;
    hometown: string;
    email: string;
    phone: string;
    class: string;
    major: string;
    school: string;
}

export type RootStackParamList = {
    home: undefined;
    addnew: undefined;
    list: undefined;
    attendance: undefined;
    inputscore: undefined;
    List: undefined;
    profile: { studentId: string };
  };
