export const ingredients = (foundItem) => {
  const ingredients = foundItem.map((ingredient) => {
    return {
      id_recipe: ingredient.id_recipe,
      idIngr: ingredient.idIngr,
      ingredients: ingredient.ingrdients,
      unit: ingredient.unite,
      quantite: ingredient.quantite,
    };
  });
  const ingredientsUnique = new Set(ingredients.map(JSON.stringify));

  return Array.from(ingredientsUnique).map(JSON.parse);
};

export const steps = (foundItem) => {
  console.log(foundItem);
  const steps = foundItem.map((step) => {
    return {
      id_recipe: step.id_recipe,
      idStep: step.idStep,
      steps: step.steps,
      order: step.ordre,
      time: step.time,
    };
  });
  const stepsUnique = new Set(steps.map(JSON.stringify));
  return Array.from(stepsUnique)
    .map(JSON.parse)
    .sort((a, b) => a.order - b.order);
}; //fin steparray
