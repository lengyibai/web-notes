function useState<T>(state: T) {
  let currentState = state;
  const changeState = (newState: T) => {
    currentState = newState;
  };
  return [currentState, changeState];
}

const [counter, changeState] = useState(10);
console.log(counter, changeState);
