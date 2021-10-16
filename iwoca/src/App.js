import './App.css';
import LoanCalculator from "./widgets/MonthlyLoanCalculator/MonthlyLoanCalculator";
import Background from "./components/Background/Background";

function App() {
  return (
    <div className="App">
        <div className="app-container">
            <Background/>
            <LoanCalculator/>
        </div>
    </div>
  );
}

export default App;
