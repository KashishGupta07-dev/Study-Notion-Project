import {  Route, Routes, useNavigate } from 'react-router';
import Signup from './pages/Signup';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import NavBar from './components/core/common/NavBar';
import  VerifyEmail  from './components/core/Auth/VerifyEmail';
import { ResetPassword } from './pages/ResetPassword';
import { ResetPasswordToken } from './pages/ResetPasswordToken';
import { Error } from './pages/Error';
import { Dashboard } from './pages/Dashboard';
import { AboutPage } from './pages/AboutPage';
import { ContactUs } from './pages/ContactUs';
import { OpenRoute } from './components/core/Auth/OpenRoute';
import {PrivateRoute} from "./components/core/Auth/PrivateRoute"
import { MyProfile } from './components/core/Dashboard/MyProfile';
import { Settings } from './components/core/Dashboard/Settings';
import {  useSelector } from 'react-redux';
import { AddCourse } from './components/core/Course/AddCourse';
import { ViewCourse } from './components/core/Course/ViewCourse/ViewCourse';
import { Cart } from './components/core/Dashboard/Cart';
import { CategoryView } from './components/core/Category/CategoryView';
import { CourseDetails } from './components/core/Category/CourseDetails';
import { EnrolledCourses } from './components/core/EnrolledCourses/EnrolledCourses';
import { ViewEnrolledCourse } from './components/core/ViewEnrolledCourse/ViewEnrolledCourse';
import { ViewVideo } from './components/core/ViewEnrolledCourse/ViewVideo';
import { InstructorDashboard } from './components/core/Dashboard/Instructor Dashboard/InstructorDashboard';
import { EditCourse } from './components/core/Course/ViewCourse/EditCourse';
function App() {
  const {user} = useSelector((state)=>state.profile);
  return (
   <div className='flex min-h-screen w-screen flex-col bg-richblack-900 font-inter'>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={  
        <OpenRoute>
      <Signup/>
      </OpenRoute>
       }/>
      <Route path='/login' element={
       <OpenRoute>
        <Login/>
        </OpenRoute>
      }/>
      <Route path='/verify-email' element={<VerifyEmail/>}/>
      <Route path='/reset-password' element={
        <OpenRoute>
      <ResetPasswordToken/>
      </OpenRoute>
      }/>
      <Route path='/reset-password/:id' element={
        <OpenRoute>
      <ResetPassword/>
      </OpenRoute>
      }/>
      <Route path={"/catalog/:categoryName"} element={<CategoryView/>}/>
      <Route path='/course/:courseId' element={<CourseDetails/>}/>
      <Route  element={<PrivateRoute>
                        <Dashboard/>
                        </PrivateRoute>}>
      <Route path={"/dashboard/my-profile"} element={<MyProfile/>}/>
      <Route path={"/dashboard/settings"} element={<Settings/>}/>
        {
         user?.accountType === "Student" &&
         <>
        <Route path={"/dashboard/cart"} element={<Cart/>}/>
        <Route path={"/dashboard/enrolled-courses"} element={<EnrolledCourses/>}/>
        </>
       }
       {
         user?.accountType === "Instructor" &&
         <>
        <Route path={"/dashboard/add-course"} element={<AddCourse/>}/>
        <Route path={"/dashboard/my-courses"} element={<ViewCourse/>}/>
        <Route path={"/dashboard/instructor-dashboard"} element={<InstructorDashboard/>}/>
        <Route path='/dashboard/edit-course/:courseId' element={<EditCourse/>}/>
        </>
       }
        </Route>      
        <Route element={<PrivateRoute>
                        <ViewEnrolledCourse/>
                        </PrivateRoute>}>
          {
         user?.accountType === "Student" &&
       <Route path='/view-course/:courseId/section/:sectionId/sub-section/:subSectionId' element={<ViewVideo/>}/>
       }
        </Route>
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='/contact' element={<ContactUs/>}/>
      <Route path="*" element={<Error/>}/>
    </Routes>
   </div>
  );
}

export default App;
