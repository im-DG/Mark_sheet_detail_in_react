
import React from 'react';

const Summary = ({ studentsData }) => {
  const numStudents = studentsData.length;
  const totalExamGrade = studentsData.reduce((acc, student) => acc + student.exam_grade, 0);
  const totalRatingGrade = studentsData.reduce((acc, student) => acc + student.rating_grade, 0);
  const finalGrades = studentsData.map((student) => 0.6 * student.exam_grade + 0.4 * student.rating_grade);
  const avgExamGrade = totalExamGrade / numStudents;
  const avgRatingGrade = totalRatingGrade / numStudents;
  const avgFinalGrade = finalGrades.reduce((acc, grade) => acc + grade, 0) / numStudents;
  const numPassed = finalGrades.filter((grade) => grade >= 4).length;
  const numFailed = numStudents - numPassed;

  return (
    <div className='summ' style={{ 
      backgroundColor: 'black',
      color:'white',
      padding: '20px',
    width:'42%',
      borderRadius: '10px',
      boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.1)',
      margin: '20px 0'
    }}>
      <p style={{ margin: '0', fontSize: '18px', fontWeight: 'bold' }}>Summary</p>
      <p>Total number of students: {numStudents}</p>
      <p>Average exam grade: {avgExamGrade.toFixed(2)}</p>
      <p>Average rating grade: {avgRatingGrade.toFixed(2)}</p>
      <p>Average final grade: {avgFinalGrade.toFixed(2)}</p>
      <p>Number of students passed: {numPassed}</p>
      <p>Number of students failed: {numFailed}</p>
    </div>
  );
};

export default Summary;
