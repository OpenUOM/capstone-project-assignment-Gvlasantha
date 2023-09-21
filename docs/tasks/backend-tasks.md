const sqlite3 = require('sqlite3');

let _DBConnection;

const connectDatabase = async () => {
  if (!_DBConnection) {
    if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "test-backend") {
      _DBConnection = new sqlite3.Database(":memory:", sqlite3.OPEN_READWRITE);
    } else {
      _DBConnection = new sqlite3.Database('./db.sqlite', sqlite3.OPEN_READWRITE);
    }
  }
  return _DBConnection;
};

// Function to read all student data
const readStudents = async () => {
  const db = await connectDatabase();
  return new Promise((resolve, reject) => {
    db.all("SELECT * FROM students", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Function to read information of a specified student
const readStudentInfo = async (studentId) => {
  const db = await connectDatabase();
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM students WHERE id = ?", [studentId], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Function to add a student
const addStudent = async (studentData) => {
  const db = await connectDatabase();
  return new Promise((resolve, reject) => {
    const { name, age, grade } = studentData;
    db.run("INSERT INTO students (name, age, grade) VALUES (?, ?, ?)", [name, age, grade], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('Student added successfully');
      }
    });
  });
};

// Function to update details of a specific student
const updateStudent = async (studentId, updatedData) => {
  const db = await connectDatabase();
  return new Promise((resolve, reject) => {
    const { name, age, grade } = updatedData;
    db.run("UPDATE students SET name = ?, age = ?, grade = ? WHERE id = ?", [name, age, grade, studentId], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('Student updated successfully');
      }
    });
  });
};

// Function to delete a specified student
const deleteStudent = async (studentId) => {
  const db = await connectDatabase();
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM students WHERE id = ?", [studentId], (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('Student deleted successfully');
      }
    });
  });
};

const closeConnection = () => {
  if (_DBConnection) {
    _DBConnection.close();
  }
};

module.exports = {
  readStudents,
  readStudentInfo,
  addStudent,
  updateStudent,
  deleteStudent,
  closeConnection
};
