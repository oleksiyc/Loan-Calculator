import './App.css';
import LoanCalculator from "./widgets/MonthlyLoanCalculator";
import Background from "./components/Background";

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
