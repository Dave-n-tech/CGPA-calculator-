import { reducer } from "./reducer";
import "./App.css";
import { useReducer, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import GradeList from "./GradeList";
import CurrentGrade from "./CurrentGrade";

function App() {
  const courseRef = useRef();
  const unitRef = useRef();
  const scoreRef = useRef();
  const CgpaRef = useRef();
  const semestersRef = useRef();
  const [totalUnit, setTotalUnit] = useState(0);
  const [totalPoint, setTotalPoint] = useState(0);
  const [gradePoint, setGradePoint] = useState(0);
  const [currentGP, setCurrentGP] = useState(0);
  const [numberOfSemesters, setNumberOfSemesters] = useState(0);
  const [cumulativeGradePoint, setCumulativeGradePoint] = useState(0)

  // console.log(currentGP, numberOfSemesters)

  const [gradeInput, setGradeInput] = useState({
    course: "",
    unit: "",
    score: "",
  });

  const getLocalGrades = () => {
    const localValue = localStorage.getItem("GRADES");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  };

  const INITIAL_STATE = getLocalGrades();

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("GRADES", JSON.stringify(state));

    if (state.length === 0) {
      setTotalUnit(0);
      setTotalPoint(0);
      return;
    }

    const sumUnit = state.reduce((total, grade) => total + grade.unit, 0);
    const sumPoint = state.reduce(
      (total, grade) => total + grade.unit * grade.score,
      0
    );
    setTotalUnit(sumUnit);
    setTotalPoint(sumPoint);
  }, [state]);

  const handleInputChange = (e) => {
    setGradeInput((prevInput) => ({
      ...prevInput,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddGrade = (e) => {
    e.preventDefault();

    const newGrade = {
      id: Date.now(),
      course: gradeInput.course,
      unit: gradeInput.unit === "" ? 0 : parseInt(gradeInput.unit, 10),
      score: gradeInput.score === "" ? 0 : parseInt(gradeInput.score, 10),
    };

    if (
      gradeInput.course === "" ||
      gradeInput.unit === "" ||
      gradeInput.score === ""
    ) {
      return;
    }
    dispatch({
      type: "ADD_GRADE",
      payload: newGrade,
    });

    setGradeInput({
      course: "",
      unit: "",
      score: "",
    });

    courseRef.current.value = "";
    unitRef.current.value = "";
    scoreRef.current.value = "";
    
  };

  const handleDeleteGrade = (id) => {
    dispatch({ type: "DELETE_GRADE", payload: id });
  };

  const handleCalculateCgpa = (e) => {
    e.preventDefault();

    if (state.length === 0) {
      return;
    }
    const gpa = totalPoint / totalUnit;
    setGradePoint(gpa.toFixed(2));

    // calculating cumulative grade point average
    const initialSumOfGradePoints = currentGP * numberOfSemesters;
    const newSumOfGradePoints = initialSumOfGradePoints + gpa;

    const newNumberOfSemesters = parseInt(numberOfSemesters)
    const cumulativeGradePointAverage = newSumOfGradePoints / (newNumberOfSemesters + 1);
    setCumulativeGradePoint(cumulativeGradePointAverage.toFixed(2));

    CgpaRef.current.value = "";
    semestersRef.current.value = "";
    
    console.log(cumulativeGradePointAverage);
  };

  return (
    <main>
      <h1>LASU CGPA calculator</h1>
      <form onSubmit={handleAddGrade}>
        <CurrentGrade
          CgpaRef={CgpaRef}
          semestersRef={semestersRef}
          setCurrentGP={setCurrentGP}
          setNumberOfSemesters={setNumberOfSemesters}
        />
        <h2> Enter Grades</h2>
        <div className="input-container">
          <input
            ref={courseRef}
            type="text"
            placeholder="course"
            name="course"
            onChange={handleInputChange}
          />
          <input
            ref={unitRef}
            type="text"
            placeholder="unit"
            name="unit"
            onChange={handleInputChange}
          />
          <input
            ref={scoreRef}
            type="text"
            placeholder="score"
            name="score"
            onChange={handleInputChange}
          />
        </div>
        <button className="add-btn">add</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>COURSE</th>
            <th>UNIT</th>
            <th>SCORE</th>
            <th>CP</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {state.length === 0 && ""}
          {state.map((grade) => {
            return (
              <GradeList
                key={grade.id}
                id={grade.id}
                course={grade.course}
                unit={grade.unit}
                score={grade.score}
                handleDelete={handleDeleteGrade}
              />
            );
          })}
          {state.length !== 0 ? (
            <tr>
              <td></td>
              <td>TNU: {totalUnit}</td>
              <td></td>
              <td>TCP: {totalPoint}</td>
            </tr>
          ) : (
            <tr></tr>
          )}

          <tr>
            <td colSpan="4">GP: {gradePoint != 0 ? gradePoint : ""}</td>
            <td
              style={{
                cursor: "pointer",
                backgroundColor: "#7EA8F8",
                color: "white",
                fontWeight: 600
              }}
              onClick={handleCalculateCgpa}
              className="button"
            >
              calculate
            </td>
          </tr>
          <tr>
            <td colSpan="5">
              CGPA: {cumulativeGradePoint != 0 ? cumulativeGradePoint : ""}
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}

export default App;
