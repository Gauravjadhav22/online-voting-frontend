import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import { Routes, Route } from "react-router-dom";
import { ProtectedLayout } from "./components/ProtectedLayout";
import { HomeLayout } from "./components/HomeLayout";
import ChatBox from "./components/ChatBox";
import JoinAsVoter from "./pages/JoinAsVoter";
import CreateVoting from "./pages/CreateVoting";
function App() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="/" element={<Landing />} />
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
      <Route element={<ProtectedLayout />}>
        <Route path='/joinAvoting' element={<JoinAsVoter />} />
        <Route path='/createVoting' element={<CreateVoting />} />
      </Route>
    </Routes>

  );
}

export default App;
