// import logo from './logo.svg';
import './App.css';
// import AxisBankHeader from './components/AxisBankHeader';

import Navbar from './components/Navbar';
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './components/utility/auth';
import Home from './home/Home'
import Registration from './components/customer/register/Registration';
// import PageNotFound from './components/PageNotFound';
import About from './home/About'
// import Multistepform from './components/customer/register/Multistepform';
// import Admin from './components/admin/Admin';
import EmployeeRegistration from './components/admin/EmployeeResistration';
import Sidebar from './components/admin/Sidebar';
// import NewAdmin from './components/admin/NewAdmin';
import FindEmployee from './components/admin/FindEmployee';
import UpdateWorker from './components/admin/UpdateWorker';
import DeleteWorker from './components/admin/DeleteWorker';
import AllWorker from './components/admin/AllWorker';
import Manager from './components/manager/Manager';
// import ProfileAdmin from './components/admin/ProfileAdmin';
import PendingCustomer from './components/manager/PendingCustomer'
import ProfileAdmin from './components/admin/ProfileAdmin';
import ProfileManager from './components/manager/ProfileManager';
import PendingTransaction from './components/manager/PendingTransaction';
import PendingManagerLoan from './components/manager/PendingLoan';
import PendingCreditCardManager from './components/manager/PendingCreditCardApplication';
import LockerManager from './components/manager/Locker';
import Employee from './components/employee/Employee'
import ProfileEmployee from './components/employee/ProfileEmployee'
import RegistrationCustomer from './components/employee/RegisterCustomer';
import Transaction from './components/employee/Transaction';
import PendingEmployeeLoan from './components/employee/PendingLoan';
import PendingCreditCardApplication from './components/employee/PendingCreditCardApplication';
import LockerEmployee from './components/employee/Locker';
import Customer from './components/customer/Customer'
import ProfileCustomer from './components/customer/ProfileCustomer';
import TransactionCustomer from './components/customer/TransactionCustomer';
import CreditCardCustomer from './components/customer/CreditCard';
import ApplyLoan from './components/customer/ApplyLoan'
import LockerCustomer from './components/customer/ApplyLocker';
// import Weather_main from './Weather_Forcast/Weather_main';
// import News_main from './News_Feed/News_main';
import Credit from './new_components/Pages/credit'
import Loan from './new_components/Pages/Loan'
import ForgotPassword from './components/ForgotPassword';
import Otp from './components/Otp';
import GiftCard from './components/customer/GiftCard'


function App() {
  localStorage.setItem("mobile1","9999999999");
  return (
  <div>
    <AuthProvider>
    <Navbar></Navbar>
    <Routes>
    <Route path='login' element={<Login></Login>}></Route>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path='sidebar' element={<Sidebar/>}></Route>
    <Route path='about' element={<About></About>}></Route>
    {/* <Route path='News_main' element={<News_main></News_main>}></Route>
    <Route path='Weather_main' element={<Weather_main></Weather_main>}></Route> */}
    <Route path="/login/otp" element={<Otp></Otp>}></Route>
    
    <Route path='creditCard' element={<Credit></Credit>}></Route>
    <Route path='LoanStatic' element={<Loan></Loan>}></Route>
    <Route path='registration' element={<Registration></Registration>}></Route>
    <Route path="/login/ForgotPassword" element={<ForgotPassword></ForgotPassword>}></Route>
    
    <Route path='/admin' element={<Sidebar/>}>  
        <Route path='createWorker' element={<EmployeeRegistration/>}></Route>
        <Route path='find' element={<FindEmployee/>}></Route>
        <Route path='updateWorker' element={<UpdateWorker/>}></Route>
        <Route path='deleteWorker' element={<DeleteWorker/>}></Route>
        <Route path='allWorker' element={<AllWorker/>}></Route>
        <Route path='profile' element={<ProfileAdmin/>}></Route>
    </Route>
    <Route path='/manager' element={<Manager/>}>  
    <Route path='profile' element={<ProfileManager/>}></Route>
        <Route path='pendingCustomer' element={<PendingCustomer/>}></Route>
        <Route path='pendingTransaction' element={<PendingTransaction/>}></Route>
        <Route path='loanApplications' element={<PendingManagerLoan/>}></Route>
        <Route path='creditCardApplications' element={<PendingCreditCardManager/>}></Route>
        <Route path='locker' element={<LockerManager/>}></Route>
        {/* <Route path='custpro' element={<ProfileCustomer></ProfileCustomer>}></Route> */}
        {/* {<Route path='profile' element={<ProfileAdmin/>}></Route>} */}
    </Route>
    <Route path='/employee' element={<Employee/>}>
      <Route path='profile' element={<ProfileEmployee/>}></Route>
      <Route path='openAccount' element={<RegistrationCustomer/>}></Route>
      <Route path='transaction' element={<Transaction/>}></Route>
      <Route path='loanApplications' element={<PendingEmployeeLoan/>}></Route>
      <Route path='creditCard' element={<PendingCreditCardApplication/>}></Route>
      <Route path='locker' element={<LockerEmployee/>}></Route>
    </Route>
    <Route path='/customer' element={<Customer/>}>
    <Route path='profile' element={<ProfileCustomer/>}></Route>
    <Route path='transaction' element={<TransactionCustomer/>}></Route>
    <Route path='creditCard' element={<CreditCardCustomer/>}></Route>
    <Route path='loan' element={<ApplyLoan/>}></Route>
    <Route path='locker' element={<LockerCustomer/>}></Route>
    <Route path='giftcard' element={<GiftCard></GiftCard>}></Route>
    </Route>

    {/* <Route path='*' element={<PageNotFound/>}></Route> */}
    </Routes>
    </AuthProvider>
    </div>
  );
}

export default App;
