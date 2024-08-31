import { createSlice } from "@reduxjs/toolkit";

const RECIPE_STATE = {
  //form recipe sans ingredients et steps
  searchForm: {
    chercher: null,
  },
  // le recipe recupérée de la base de donnees
  bddRecipe: [],
  recipeForm: {
    title: "",
    designation: "",
    reference: "",
    tags: "",
    nbrPieces: 0,
    category: 0,

    referenceImg: "",
    alt: "",
  },
  //formulaire steps
  stepForm: {
    designation: "",
    order: 0,
    time: "",
  },
  // formulaire ingredients
  ingredientForm: {
    name_ingredient: "",
    id_ingredient: 0,
    quantite: 0,
    groupe: "",
  },
  //recipe qui contient l'état actuel
  recipe: {
    id_user: 0,
    id_recipe: 0,
    title: "",
    designation: "",
    reference: "",
    tags: "",
    nbr_pieces: 0,
    referenceImg: "",
    alt: "",
    ingredients: [],
    steps: [],
    id_category: 0,

    filePath: "",
    mimeType: "",
    originalName: "",
    size: 0,
  },
  itemSelected: null,
  // pour gérer l'affichage modal steps
  //et afficher les steps sur ajouter recipe
  steps: [],
  // pour gérer l'affichage modal ingredient et afficher les ingrédient sur ajouter recipe
  ingredients: [],
  //formulaire de modefication sur le tableau recipe
  updateFormRecipes: {
    title: "",
    designation: "",
    reference: "",
    tags: "",
    nbr_pieces: 0,
    id_recipe: 0,
  },

  recipeloading: false,
  recipeError: null,
  stepModal: false,
  ingredientModal: false,
  stepError: null,
  ingredientToFilter: 0,
  deleteLoading: false,
  deleteError: "",
  recipeGetloading: "",
  updateRecipeLoading: false,
  recipeUpdateError: "",
  //pour gerer le formulaire update ingrédients
  updateRecipeIngredientLoading: false,
  recipeUpdateIngredient: "",
  updateFormRecipesIngredient: {
    id_recipe: 0,
    id_ingredient: 0,
    quantite: 0,
  },
  signSearch: {
    title: "",
  },
  //pour gerer le formulaire update steps
  updateRecipeStepLoading: false,
  recipeUpdateStepError: "",
  updateFormRecipesStep: {
    id_step: 0,
    id_recipe: 0,
    designation: "",
    time: 0,
  },

  openButton: false,
  errorForm: null,
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState: RECIPE_STATE,
  reducers: {
    //Ajouter une rectte
    addRecipe: (state, action) => {
      const {
        id_user,
        id_recipe,
        title,
        designation,
        reference,
        tags,
        nbr_pieces,
        ingredients,
        steps,
        id_category,

        filePath,
        mimeType,
        originalName,
        size,
        referenceImg,
        alt,
      } = action.payload;

      //elle me retourne le state complete avec le recipe ajouté
      return {
        ...state,
        recipe: {
          ...state.recipe,
          id_user,
          id_recipe,
          title,
          designation,
          reference,
          tags,
          nbr_pieces,
          ingredients,
          steps,
          id_category,
          filePath,
          mimeType,
          originalName,
          size,
          referenceImg,
          alt,
        },
      };
    },

    ////update steps pour gerer l'affichage modal
    addStep: (state, action) => {
      const { designation, order, time } = action.payload;

      //elle me retourne le state complete avec le recipe ajouté
      const step = { designation, order, time };

      return {
        ...state,
        steps: [...state.steps, step],
      };
    },

    // update ingredients pour gerer l'affichage modal

    addIngredient: (state, action) => {
      const { id_ingredient, quantite, name_ingredient, groupe } =
      action.payload;
      const ingredient = { id_ingredient, name_ingredient, quantite, groupe };

      return {
        ...state,
        ingredients: [...state.ingredients, ingredient],
      };
    },
    // charger Bddrecipe depuis la base de donnees
    addBddRecipe: (state, action) => {
      const rec = action.payload;

      return {
        ...state,
        bddRecipe: rec,
      };
    },

    updateRecipeForm: (state, action) => {
      const { value, inputName } = action.payload;
      return {
        ...state,
        recipeForm: {
          ...state.recipeForm,
          [inputName]: value,
        },
      };
    },
    updateSearchForm: (state, action) => {
      const { value, inputName } = action.payload;
      return {
        ...state,
        searchForm: {
          ...state.searchForm,
          [inputName]: value,
        },
      };
    },
    ///la recherche de modefication
    updateSignSearch: (state, action) => {
      const { value, inputName } = action.payload;
      return {
        ...state,
        signSearch: {
          ...state.signSearch,
          [inputName]: value,
        },
      };
    },

    //formulaire  steps

    updateStepForm: (state, action) => {
      const { value, inputName } = action.payload;
      return {
        ...state,
        stepForm: {
          ...state.stepForm,
          [inputName]: value,
        },
      };
    },
    //formulaire  ingredient
    updateingredientForm: (state, action) => {
      const { value, inputName } = action.payload;
      return {
        ...state,
        ingredientForm: {
          ...state.ingredientForm,
          [inputName]: value,
        },
      };
    },

    ///
    updateRecipesStepForm: (state, action) => {
      const { value, inputName } = action.payload;
      return {
        ...state,
        updateFormRecipesStep: {
          ...state.updateFormRecipesStep,
          [inputName]: value,
        },
      };
    },

    /// update formulaire recipe ingredient
    updateRecipesIngredientForm: (state, action) => {
      const { value, inputName } = action.payload;
      return {
        ...state,
        updateFormRecipesIngredient: {
          ...state.updateFormRecipesIngredient,
          [inputName]: value,
        },
      };
    },

    //fill formulaire update recipe

    fillRecipesForm: (state, action) => {
      const { title, designation, reference, tags, nbr_pieces, id_recipe } =
      action.payload;
      return {
        ...state,
        updateFormRecipes: {
          ...state.updateFormRecipes,
          title,
          designation,
          reference,
          tags,
          nbr_pieces,
          id_recipe,
        },
      };
    },
    ////fil recipe ingredient
    fillRecipesIngredientForm: (state, action) => {
      const { quantite, id_ingredient, id_recipe } = action.payload;
      return {
        ...state,
        updateFormRecipesIngredient: {
          ...state.updateFormRecipesIngredient,
          quantite,
          id_ingredient,
          id_recipe,
        },
      };
    },
    /////fill step recipe
    fillRecipesStepForm: (state, action) => {
      const { designation, time, id_step, id_recipe } = action.payload;
      return {
        ...state,
        updateFormRecipesStep: {
          ...state.updateFormRecipesStep,
          designation,
          time,
          id_step,
          id_recipe,
        },
      };
    },

    // le formulaire de edit recipe form
    updateRecipesForm: (state, action) => {
      const { value, inputName } = action.payload;
      return {
        ...state,
        updateFormRecipes: {
          ...state.updateFormRecipes,
          [inputName]: value,
        },
      };
    },

    startRecipeLoading: (state, action) => {
      return { ...state, recipeLoading: true };
    },
    stopRecipeLoading: (state, action) => {
      return { ...state, recipeLoading: false };
    },
    setRecipeError: (state, action) => {
      return {
        ...state,
        recipeError: action.payload.error,
        recipeLoading: false,
      };
    },
    //pour le chargement de recipe bdd
    startGetRecipeLoading: (state, action) => {
      return { ...state, recipeGetloading: true };
    },
    stopGetRecipeLoading: (state, action) => {
      return { ...state, recipeGetloading: false };
    },
    setGetRecipeError: (state, action) => {
      return {
        ...state,
        recipeError: action.payload.error,
        recipeGetloading: false,
      };
    },

    // Delete
    startdeletetLoading: (state, action) => {
      return { ...state, deleteLoading: true };
    },
    stopdeleteLoading: (state, action) => {
      return { ...state, deleteLoading: false };
    },
    deleteError: (state, action) => {
      return {
        ...state,
        deleteError: action.payload.error,
        deleteLoading: false,
      };
    },
    //update recipe recipe
    startUpdateRecipeLoading: (state, action) => {
      return { ...state, updateRecipeLoading: true };
    },
    stopUpdateRecipeLoading: (state, action) => {
      return { ...state, updateRecipeLoading: false };
    },

    updateSetRecipeError: (state, action) => {
      return {
        ...state,
        recipeUpdateError: action.payload.error,
        updateRecipeLoading: false,
      };
    },
    //////

    startUpdateRecipeIngredientLoading: (state, action) => {
      return { ...state, updateRecipeIngredientLoading: true };
    },
    stopUpdateRecipeIngredientLoading: (state, action) => {
      return { ...state, updateRecipeIngredientLoading: false };
    },

    updateSetRecipeIngredientError: (state, action) => {
      return {
        ...state,
        recipeUpdateIngredientError: action.payload.error,
        updateRecipeIngredientLoading: false,
      };
    },

    /////// update ingredient recipe
    startUpdateRecipeStepLoading: (state, action) => {
      return { ...state, updateRecipeStepLoading: true };
    },
    stopUpdateRecipeStepLoading: (state, action) => {
      return { ...state, updateRecipeStepLoading: false };
    },

    updateSetRecipeStepError: (state, action) => {
      return {
        ...state,
        recipeUpdateStepError: action.payload.error,
        updateRecipeStepLoading: false,
      };
    },

    ///////
    deleteOne: (state, action) => {
      const { recipeId } = action.payload;
      return {
        ...state,
        bddRecipe: state.bddRecipe.filter((t) => t.id_recipe !== recipeId),
      };
    },

    //
    setModal: (state, action) => {
      return {
        ...state,
        ...state,
        stepModal: !state.stepModal,
      };
    },
    //fermer le modal en cliquant sur le button Ajouter
    setModalIngredient: (state, action) => {
      return {
        ...state,
        ...state,
        ingredientModal: !state.ingredientModal,
      };
    },

    //burger
    openBurger: (state, action) => {
      return {
        ...state,
        ...state,
        openButton: !state.openButton,
      };
    },
    //pour memoriser id_recipe
    itemSelected: (state, action) => {
      const { id_recipe } = action.payload;
      return {
        ...state,
        itemSelected: { ...state.itemSelected, id_recipe },
      };
    },

    addIngredientTofilter: (state, action) => {
      const { ingredientToFilter } = action.payload;

      return {
        ...state,
        ingredientToFilter: ingredientToFilter,
      };
    },
    updateIngredient: (state, action) => {
      const { quantite, id_recipe, id_ingredient } = action.payload;
      return {
        ...state,
        recipe: {
          ...state.recipe,
          ingredients: state.recipe.ingredients.map((ingredient, i) =>
            ingredient.id_ingredient === id_ingredient &&
            ingredient.id_recipe === id_recipe ? { ...ingredient, ...action.payload.data } :
            ingredient
          ),
        },
      };
    },
    //gerer les erreurs de la form
    setErrorr: (state, action) => {


      return {
        ...state,
        errorForm: action.payload.error,

      };
    },
    ///

    //pour la gestion du fetch api
  },
});

export const {
  setErrorr,
  addRecipe,
  updateRecipeForm,
  startRecipeLoading,
  stopRecipeLoading,
  setRecipeError,
  updateStepForm,
  addStep,
  setModal,
  addIngredient,
  updateingredientForm,
  setModalIngredient,
  RecipeInsert,
  itemSelected,
  addBddRecipe,
  addIngredientTofilter,
  updateSearchForm,
  deleteError,
  stopdeleteLoading,
  startdeletetLoading,
  deleteOne,
  startGetRecipeLoading,
  stopGetRecipeLoading,
  setGetRecipeError,
  updateSignSearch,
  updateRecipesForm,
  startUpdateRecipeLoading,
  stopUpdateRecipeLoading,
  updateSetRecipeError,
  fillRecipesForm,
  startUpdateRecipeStepLoading,
  stopUpdateRecipeStepLoading,
  updateSetRecipeStepError,
  startUpdateRecipeIngredientLoading,
  stopUpdateRecipeIngredientLoading,
  updateSetRecipeIngredientError,
  updateRecipesIngredientForm,
  fillRecipesStepForm,
  fillRecipesIngredientForm,
  updateRecipesStepForm,
  updateIngredient,
  openBurger,
} = recipeSlice.actions;

export default recipeSlice.reducer;
