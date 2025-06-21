import React from "react";
import { Route, Routes} from "react-router-dom";
import ChooseGenresPage from "./pages/ChooseGenres";
import SignupPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import Cart from './pages/Cart';
import Home from "./pages/Home";
import Library from "./pages/Library";
import Offers from "./pages/Offers";
import Services from "./pages/Servises";
import ProtectedRoute from "./slices/ProtectedRoute"; 
import BookDetailsPage from "./pages/BookDetailsPage";
import MyCollection from './pages/MyCollections';
import SecureBookViewer from './components/SecureBookViewer';
import LandingPage from "./pages/LandingPage";
import Wishlist from "./pages/WishlistPage";
import Success from "./paymentscompants/Success";
import Fail from "./paymentscompants/Fail";
import SuccessSubscription from "./paymentscompants/SuccessSubscription";
import FailSubscription from "./paymentscompants/FailSubscription";
import Profile from "./pages/Profile";
import AdminRoute from "./AdminComponts/AdminRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AddBookForm from "./AdminComponts/addBookForm";
import AdminBooksList from "./AdminComponts/Adminbooklist";
import EditBookForm from "./AdminComponts/Editbookform";
import AddPlanForm from "./AdminComponts/AddPlanForm"
import AdminPlanlist from "./AdminComponts/Planlist"
function App() {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/genreupdate" element={<ChooseGenresPage />} />
     
<Route path="/my-collection" element={<MyCollection />} />
<Route path="/my-Wishlist" element={<Wishlist/>} />
  <Route path="/reader/:bookId" element={  <ProtectedRoute><SecureBookViewer /></ProtectedRoute>} />
        {/* Protected Routes */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/library" 
          element={
            <ProtectedRoute>
              <Library />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/offers" 
          element={
            <ProtectedRoute>
              <Offers />
            </ProtectedRoute>
          }
        />
       <Route 
  path="/services" 
  element={
    <ProtectedRoute>
      <Services />
    </ProtectedRoute>
  }
/>
        <Route 
          path="/cart" 
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/success" 
          element={
            <ProtectedRoute>
              <Success/>
            </ProtectedRoute>
          }
        />
        
        <Route 
          path="/fail" 
          element={
            <ProtectedRoute>
              <Fail/>
            </ProtectedRoute>
          }
        />
        <Route 
          path="/failSub" 
          element={
            <ProtectedRoute>
              <FailSubscription/>
            </ProtectedRoute>
          }
        /><Route 
          path="/SuccessSub" 
          element={
            <ProtectedRoute>
              <SuccessSubscription/>
            </ProtectedRoute>
          }
        />
        <Route 
           path="/book/:id"
          element={
            <ProtectedRoute>
              <BookDetailsPage />
            </ProtectedRoute>
          }
        />
        {/* Redirect root ("/") to "/home" */}
      <Route path="/" element={<LandingPage />} />
<Route
  path="/admin/dashboard"
  element={
    <AdminRoute>
      <AdminDashboard />
    </AdminRoute>
  }
/>
<Route
  path="/admin/add-book"
  element={
    <AdminRoute>
      <AddBookForm />
    </AdminRoute>
  }
/>
<Route
  path="/admin/add-plan"
  element={
    <AdminRoute>
      <AddPlanForm/>
    </AdminRoute>
  }
/>
<Route path="/admin/books" element={<AdminBooksList />} />
<Route path="/admin/plans" element={<AdminPlanlist />} />
<Route path="/admin/edit-book/:id" element={<EditBookForm />} />

      </Routes>
    </div>
  );
}

export default App;
