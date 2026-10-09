
import React, { Component } from "react";
import StudentDetails from "./StudentDetails";
import "./App.css";

class StudentDashboard extends Component {
  constructor(props) {
    super(props);

    console.log("StudentDashboard: constructor()");

    this.state = {
      students: [
        { id: 1, name: "Ricky Pointing", course: "React", status: "Active" },
        { id: 2, name: "Glen Maxwell", course: "Angular", status: "Active" },
        { id: 3, name: "Steve Smith", course: "JavaScript", status: "Inactive" },
        { id: 4, name: "Mason Greenwood", course: "React", status: "Active" }
      ],
      selectedStudentId: null,
      welcomeMessage: "",
      showDetails: false,
      elapsedSeconds: 0
    };

    this.timerId = null;
  }

  componentDidMount() {
    console.log("StudentDashboard: componentDidMount()");
    console.log("StudentDashboard mounted successfully.");

    this.setState({
      welcomeMessage: "Welcome to the Student Management System!"
    });

    // Start the dashboard timer
    this.timerId = setInterval(() => {
      this.setState((prevState) => ({
        elapsedSeconds: prevState.elapsedSeconds + 1
      }));
    }, 1000);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("StudentDashboard: componentDidUpdate()");

    if (prevState.students !== this.state.students) {
      console.log("Previous students:", prevState.students);
      console.log("Current students:", this.state.students);
    }

    if (prevState.selectedStudentId !== this.state.selectedStudentId) {
      console.log("Selected student ID changed to:", this.state.selectedStudentId);
    }

    if (prevState.showDetails !== this.state.showDetails) {
      console.log("Details visibility changed:", this.state.showDetails);
    }
  }

  componentWillUnmount() {
    console.log("StudentDashboard: componentWillUnmount()");

    // Clean up the timer
    clearInterval(this.timerId);
  }

  handleSelectStudent = (id) => {
    this.setState({
      selectedStudentId: id
    });
  };

  handleChangeCourse = (id) => {
    this.setState((prevState) => ({
      students: prevState.students.map((student) => {
        if (student.id === id) {
          return {
            ...student,
            course: student.course === "React" ? "Angular" : "React"
          };
        }

        return student;
      })
    }));
  };

  handleShowDetails = () => {
    this.setState({ showDetails: true });
  };

  handleHideDetails = () => {
    this.setState({ showDetails: false });
  };

  render() {
    console.log("StudentDashboard: render()");

    const {
      students,
      selectedStudentId,
      welcomeMessage,
      showDetails,
      elapsedSeconds
    } = this.state;

    const selectedStudent =
      students.find((student) => student.id === selectedStudentId) || null;

    return (
      <div className="dashboard">
        <h1>Student Management System</h1>

        {welcomeMessage && (
          <p className="welcome-message">{welcomeMessage}</p>
        )}

        <h3>Total Students: {students.length}</h3>

        <h3>Dashboard Active For: {elapsedSeconds} seconds</h3>

        <div className="student-list">
          {students.map((student) => (
            <div className="student-card" key={student.id}>
              <h2>{student.name}</h2>

              <p><strong>ID:</strong> {student.id}</p>
              <p><strong>Course:</strong> {student.course}</p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={student.status.toLowerCase()}>
                  {student.status}
                </span>
              </p>

              <button
                onClick={() => this.handleSelectStudent(student.id)}
              >
                View Details
              </button>

              <button
                className="course-button"
                onClick={() => this.handleChangeCourse(student.id)}
              >
                Change Course
              </button>
            </div>
          ))}
        </div>

        <div className="details-controls">
          <button onClick={this.handleShowDetails}>
            Show Student Details
          </button>

          <button className="hide-button" onClick={this.handleHideDetails}>
            Hide Student Details
          </button>
        </div>

        {showDetails ? (
          <StudentDetails student={selectedStudent} />
        ) : (
          <div className="details-panel">
            <h2>Student Details</h2>
            <p>Please select a student to view details.</p>
            <p className="hint">
              Click Show Student Details to open the details component.
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default StudentDashboard;
