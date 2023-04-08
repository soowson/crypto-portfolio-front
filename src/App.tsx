import React from 'react';
import {Route, Routes} from 'react-router-dom'
import {MainView} from "./comoponents/Views/MainView";
import {Header} from "./comoponents/Header/Header";
import {PortfolioView} from "./comoponents/Views/PortfolioView";
import {AddTransaction} from "./comoponents/PortfolioTracker/Transactions/TransactionsHandling/AddTransaction";
import {TransactionsTable} from "./comoponents/PortfolioTracker/Transactions/TransactionsTable";
import {LoginView} from "./comoponents/Views/LoginView";
import {RegistrationView} from "./comoponents/Views/RegistrationView";
import {ProtectedRoute} from "./comoponents/ProtectedRoutes/ProtectedRoutes";
import {RegistrationSuccess} from "./comoponents/Auth/Registration/RegistrationSuccess";
import {AuthProvider} from "./comoponents/utils/context/LoginContext/AuthProvider";
import {CoinListProvider} from "./comoponents/utils/context/CoinListContext/CoinlistProvider";
import {TransactionsProvider} from "./comoponents/utils/context/TransactionsContext/TransactionsProvider";
import {EditTransaction} from "./comoponents/PortfolioTracker/Transactions/TransactionsHandling/EditTransaction";
import {PortfolioProvider} from "./comoponents/utils/context/PortfolioContext/PortfolioProvider";
import {NotFoundView} from "./comoponents/Views/NotFoundView";

import './App.css';


export function App() {

  return <AuthProvider>
    <CoinListProvider>
      <PortfolioProvider>
        <TransactionsProvider>
          <div className="App">
            <Header/>
            <Routes>
              <Route path="/" element={<MainView/>}/>
              <Route path="/auth/login" element={<LoginView/>}/>
              <Route path="/user/registration" element={<RegistrationView/>}/>
              <Route path="/user/registration/success" element={<RegistrationSuccess/>}/>
              <Route path="/portfolio" element={<ProtectedRoute><PortfolioView/></ProtectedRoute>}/>
              <Route path="/transaction/add-transaction" element={<ProtectedRoute><AddTransaction/></ProtectedRoute>}/>
              <Route path="/transaction" element={<ProtectedRoute><TransactionsTable/></ProtectedRoute>}/>
              <Route path="/transaction/edit-transaction/:transactionId" element={<ProtectedRoute><EditTransaction/></ProtectedRoute>}/>
              <Route path="*" element={<NotFoundView/>}/>
            </Routes>
          </div>
        </TransactionsProvider>
      </PortfolioProvider>
    </CoinListProvider>
  </AuthProvider>
}


