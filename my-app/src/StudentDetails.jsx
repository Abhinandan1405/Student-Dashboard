
import React, { Component } from "react";
import StudentDashboard from "./StudentDashboard";

class StudentDetails extends Component {
  constructor(props) {
    super(props);
    console.log("StudentDetails: constructor()");
  }

  componentDidMount() {
    console.log("StudentDetails: componentDidMount()");
  }

  componentDidUpdate(prevProps) {
    console.log("StudentDetails: componentDidUpdate()");
    console.log("Previous student:", prevProps.student);
    console.log("Current student:", this.props.student);
  }

  componentWillUnmount() {
    console.log("StudentDetails: componentWillUnmount()");
  }

  render() {
    console.log("StudentDetails: render()");

    const { student } = this.props;

    return (
      <div className="details-panel">
        <h2>Student Details</h2>

        {student ? (
          <>
            <p><strong>ID:</strong> {student.id}</p>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Course:</strong> {student.course}</p>
            <p><strong>Status:</strong> {student.status}</p>
          </>
        ) : (
          <p>Please select a student to view details.</p>
        )}
      </div>
    );
  }
}

export default StudentDetails;
