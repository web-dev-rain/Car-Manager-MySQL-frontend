import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
import {RequireToken} from './components/Auth.js'
 
import Dashboard from "./components/dashboard";
import Home from "./components/home";
import Auto from "./components/auto/auto";
import SortByModel from "./components/auto/sort/sortbymodel";
import Sortbyremdays from "./components/auto/sort/sortbyremdays";
import Addauto from "./components/auto/addauto";
import ShowAuto from "./components/auto/showauto";
import Editauto from './components/auto/editauto'
import SortByRemDays from "./components/auto/sort/sortbyremdays";
import SortByDistanceTraveled from "./components/auto/sort/sortbydistancetraveled";
import WrongTire from "./components/auto/wrongtire";
import ExpiredInsurance from "./components/auto/expiredinsurance";
import "./App.css";
import TechInspectionProblem from "./components/auto/techinspectionproblem";
 
function App() {
  return (
    <div className="app">
        <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
               
              <Route path='/' element={
                  <RequireToken>
                    <Dashboard />
                  </RequireToken>
                  }>
                  <Route path='' element={<Home />}></Route>
                  <Route path='/auto' element={<Auto />}></Route>
                  <Route path='/sortbymodel' element={<SortByModel />}></Route>
                  <Route path='/sortbyremdays' element={<SortByRemDays />}></Route>
                  <Route path='/sortbydistancetraveled' element={<SortByDistanceTraveled />}></Route>
                  <Route path='/create' element={<Addauto />}></Route>
                  <Route path='/autoedit/:id' element={<Editauto />}></Route>
                  <Route path='/showauto/:id' element={<ShowAuto />}></Route>
                  <Route path='/wrongtire' element={<WrongTire />}></Route>
                  <Route path='/expiredinsurance' element={<ExpiredInsurance />}></Route>
                  <Route path='/techinspectionproblem' element={<TechInspectionProblem />}></Route>
              </Route>
            </Routes>
        </BrowserRouter>
    </div>
  );
}
   
export default App;