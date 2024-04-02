export default function GradeList({ id, course, unit, score, handleDelete }) {

  const cumulativePoint = unit * score
  return (
    <tr key={id}>
      <td>{course}</td>
      <td>{unit}</td>
      <td>{score}</td>
      <td>{cumulativePoint}</td>
      <td className= "delete" style={{cursor: "pointer"}} onClick={() => handleDelete(id)}>Delete</td>
    </tr>
  );
}
