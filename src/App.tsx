import "./App.css";
import Footer from "./components/footer/footer";
import NavBar from "./components/navbar/NavBar";
import SelectSkipPage from "./pages/SelectSkipPage";

function App() {
  return (
    <>
      <NavBar />
      <main className="">
        <SelectSkipPage />
      </main>
        <Footer/>
    </>
  
  );
}

export default App;
