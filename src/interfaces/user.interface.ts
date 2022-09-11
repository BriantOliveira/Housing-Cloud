export interface CreateUserPayload {
  firstName: string;
  lastName: string;
  privilege: "Student" | "Staff" | "Admin" | "User";
  password: string;
  phoneNumber?: string;
  email: string;
}

export interface UserUpdateParams {
  firstName?: string;
  lastName?: string;
  privilege?: "Student" | "Staff" | "Admin" | "User";
  password?: string;
  phoneNumber?: string;
  email?: string;
}
