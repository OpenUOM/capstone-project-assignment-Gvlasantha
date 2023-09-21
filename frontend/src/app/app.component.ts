import { Component } from '@angular/core';
import { StudentService } from './student.service';

@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent {
  studentData: any[] = []; // Initialize with your student data
  searchText: string = ''; // Initialize search text as empty string

  constructor(private studentService: StudentService) {
    // Fetch student data from your service and assign it to studentData
    this.studentData = studentService.getStudents();
  }

  // Implement the search function
  search() {
    if (this.searchText) {
      this.studentData = this.studentData.filter(student =>
        student.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      // If search text is empty, reset to the original data
      this.studentData = this.studentService.getStudents();
    }
  }
}

