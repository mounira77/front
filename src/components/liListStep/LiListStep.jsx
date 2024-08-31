import { useEffect } from "react";
const LiListStep = (props) => {
  //afficher les eteps en saisant
  const { array } = props;
  useEffect(() => {
    console.log(array);
  });
  return (
    <>
      <h2>Les étapes :</h2>
      <ul>
        {array.map((number, i) => {
          return (
            <li key={i}>{` ${number.order}-   ${
              number.designation.charAt(0).toUpperCase() +
              number.designation.slice(1)
            },${number.time}`}</li>
          );
        })}
      </ul>
    </>
  );
};

export default LiListStep;
