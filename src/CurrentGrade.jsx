
export default function CurrentGrade({CgpaRef, semestersRef, setCurrentGP, setNumberOfSemesters}) {

  return (
    <div
      className="input-container"
      style={{ justifyContent: "space-between" }}
    >
      <input
        ref = {CgpaRef}
        type="text"
        placeholder="current CGPA"
        name="currentCGPA"
        onChange={(e) => setCurrentGP(e.target.value)}
      />
      <input
        ref={semestersRef}
        type="text"
        placeholder="no. of semesters taken"
        name="numberOfSemesters"
        onChange={(e) => setNumberOfSemesters(e.target.value)}
      />
    </div>
  );
}
