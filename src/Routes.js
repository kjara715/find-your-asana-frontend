
import React from "react";
import Home from "./Home";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import CategoryDetails from "./CategoryDetails";
import PoseDetails from "./PoseDetails";
import ProfilePage from "./ProfilePage";
import EditUserForm from "./EditUserForm";
import AllYogaPoses from "./AllYogaPoses"
import { Route, Switch } from "react-router-dom";


function Routes({signup, login, updateUser, createPost, deletePost, updatePost, deleteUser}){
 
return(
    <main>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/yogacategories/:id">
              <CategoryDetails />
            </Route>
            <Route exact path="/login">
                <LoginForm login={login}/>
            </Route>
            <Route exact path="/yogaposes">
                <AllYogaPoses />
            </Route>
            <Route exact path="/signup">
                <SignUpForm signup={signup}/>
            </Route>
            <Route exact path="/yogaposes/:id">
                <PoseDetails createPost={createPost} updatePost={updatePost} deletePost={deletePost}/>
            </Route>
            <Route exact path="/users/:username">
                <ProfilePage deletePost={deletePost} updatePost={updatePost} deleteUser={deleteUser} />
            </Route>
            <Route exact path="/users/:username/edit">
                <EditUserForm updateUser={updateUser}/>
            </Route>
            <Route>
              <p>Page Not Found</p>
            </Route>
          </Switch>
        </main>
)
}
//

export default Routes