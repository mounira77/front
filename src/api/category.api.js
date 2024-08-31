
import { addCategory, addError,startLoading,stopLoading} from "../redux/reducers/category.reducer";
import { getRequest } from "./api";



//fonction thunk peut dispatcher un action ou lire une state avec getState



export const getCategoryThunk = () => async (dispatch, getState)=>{

  const { loading} = getState().categoryState;
  
    dispatch(startLoading());
    const { result, status, error } = await getRequest("category" );
 
console.log(result)
const cate= result.category

console.log(cate)

if (!result?.message || status >= 400 || !!error)
return  dispatch( addError({error:`Something goes wrong: ${error}`}));

console.log("bonjooooooooor")
 

  dispatch(addCategory( cate ));
  dispatch(stopLoading());

 
  
 
 
};



