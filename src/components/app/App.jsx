import "./app.scss";

import Header from "../header/Header";
import RecipeForm from "../recipe/Recipe";
//import Modal from "../modal/Modal";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { APP_ROUTES } from "../../constants/route.const";

import DisplayRecipe from "../displayRecipe/DisplayRecipe";
//import UserSignUp from "../userSignUp/UserSignUp";
import UserSignIn from "../userSignIn/UserSignIn";
import UserSignUp from "../userSignUp/UserSignUp";
//import Card from "../Card/Card";
//import AllCards from "../allCards/AllCards";
import Filter from "../filter/Filter";
import DisplaySearchRecette from "../searchDisplayRecette/SearchDisplayRecette";
import Footer from "../footer/Footer";


import Accueil from "../accueil/Accueil";
import Dashboard from "../dashBoard/Dashboard";
import Nav from "../Nav/Nav";
import Ingredient from "../Ingredient/Ingredient";
import UpdateRecipe from "../updateRecipe/UpdateRecipe";
import EditRecipe from "../editRecipe/EditRecipe";
import EditIngredientRecipe from "../editIngredient/EditIngredient";
import EditSteptRecipe from "../editStep/EditStep";
import Apropos from "../apropos/Apropos";
import NavAccueil from "../navAccueil/NavAccueil";
import DashboardAdmin from "../dashboardAdmin/DashboardAdmin";
import Contact from "../contact/Contact";
import EditComment from "../editComment/EditComment";
import Favorite from "../favorites/Favorite";
import Message from "../message/Message";

function App(props) {
  return (

    <div className="app">
   
        <BrowserRouter>
          <Header />
          <NavAccueil />
          <Routes>
            <Route
              exact
              path={APP_ROUTES.ACCUEIL}
              element={
                
                  <Accueil />
                
              }
            />
            <Route
              exact
              path={APP_ROUTES.SIGN_IN}
              element={
             
                 
                  <UserSignIn />
                  
                
              }
            />
            <Route
              exact
              path={APP_ROUTES.SIGN_UP}
              element={
                
                 
                  <UserSignUp />
                
              }
            />
             <Route
              exact
              path={APP_ROUTES.MESSAGE}
              element={
                
                 
                  <Message />
                
              }
            />

            <Route
              exact
              path={APP_ROUTES.DASHBOARD}
              element={
              
                  <Dashboard />
                
              }
            />
            <Route
              exact
              path={APP_ROUTES.DASHBOARDADMIN}
              element={
               
                  <DashboardAdmin />
                
              }
            />
            <Route
              exact
              path={`${APP_ROUTES.RECIPE}`}
              element={
                
                  <RecipeForm />
                
              }
            />
            <Route
              path={APP_ROUTES.UPDATE}
              element={
          
                  <UpdateRecipe />
              
              }
            />
          {/*  <Route
              exact
              path={`${APP_ROUTES.DISPLAY}`}
              element={
                
                  <DisplayRecipe />
                
              }
            />*/}
            <Route
              exact
              path={`${APP_ROUTES.SEARCH}`}
              element={
             
                  <DisplaySearchRecette />
               
              }
            />
          {/*  <Route
              exact
              path={`${APP_ROUTES.CARD}`}
              element={
                
                  <Card />
                
              }
            />*/}
          { /* <Route
              exact
              path={`${APP_ROUTES.ALLCARD}`}
              element={
                
                  <AllCards />
                
              }
            />*/}
            <Route
              exact
              path={`${APP_ROUTES.INGREDIENT}`}
              element={
              
                  <Ingredient />
                
              }
            />
            <Route
              exact
              path={`${APP_ROUTES.FILTER}`}
              element={
                
                  <Filter />
                
              }
            />
        <Route
              exact
              path={`${APP_ROUTES.NAV}`}
              element={
              
                  <Nav />
                
              }
            />
            <Route
              exact
              path={`${APP_ROUTES.EDITRECIPE}`}
              element={
                
                  <EditRecipe />
                
              }
            />
            <Route
              exact
              path={`${APP_ROUTES.EDITINGREDIENT}/:idIngr`}
              element={
                
                  <EditIngredientRecipe />
                
              }
            />
            <Route
              exact
              path={`${APP_ROUTES.EDITSTEP}/:idStep`}
              element={
                
                  <EditSteptRecipe />
                
              }
            />
            <Route
              exact
              path={`${APP_ROUTES.APROPOS}`}
              element={
                
                  <Apropos />
                
              }
            />
            <Route
              exact
              path={`${APP_ROUTES.CONTACT}`}
              element={
            
                  <Contact />
             
              }
            />
            <Route
              exact
              path={`${APP_ROUTES.EDITCOMMENT}/:id_recipe/:date_comment/:id_user`}
              element={
                
                  <EditComment />
                
              }
            />
            <Route
              exact
              path={APP_ROUTES.FAVORITE}
              element={
       
                  <Favorite />
              
              }
            />

            <Route
              path={"*"}
              element={
                <main style={{ padding: "1rem" }}>
                  <p>404 error</p>
                  <p>There's nothing here!</p>
                </main>
              }
            />

            {/* <Route component={NotFoundSection} path='*' /> */}
          </Routes>

          <Footer />
        </BrowserRouter>
      </div>

  );
}

export default App;
