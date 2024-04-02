

export function reducer(state, action) {
  switch (action.type) {
    case "ADD_GRADE":
      return [...state, action.payload];
    case "UPDATE_GRADE":
      return state.map((grade) =>
        grade.id === action.payload.id ? action.payload : grade
      );
    case "GET_STORED_GRADE":
      return [...state, action.payload]
    case "DELETE_GRADE":
      return state.filter((grade) => grade.id !== action.payload);
    default:
      return state;
  }
}
