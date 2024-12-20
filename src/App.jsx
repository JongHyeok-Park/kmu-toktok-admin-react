import './App.css'
import { Route, Routes } from 'react-router-dom'
import Aside from './components/Aside/Aside'
import useShowAside from './hooks/useShowAside'
import Manage from './routes/Manage/Manage';
import Register from './routes/Register/Register';
import Redirect from './routes/Redirect/Redirect';
import Login from './routes/Login/Login';
import useReissue from './hooks/useReissue';
import WritingList from './routes/WritingList/WritingList';
import History from './routes/History/History';
import Chatbot from './routes/Chatbot/Chatbot';
import ChatStu from './routes/ChatStu/ChatStu';
import WritingSubmit from './routes/WritingSubmit/WritingSubmit';
import File from './routes/File/File';
import Testing from './routes/Testing/Testing';

function App() {
  const showAside = useShowAside();
  useReissue();

  return (
    <div className="page">
      {
        showAside ? <Aside /> : null
      }      
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/chatbot' element={<Chatbot />} />
        <Route path="/chatstu" element={<ChatStu />}>
          <Route path=":studentId" element={<ChatStu />} />
        </Route>
        <Route path='/file' element={<File/>} />
        <Route path='/writing' element={<WritingList />} />
        <Route path='/writing/:writingId' element={<WritingList />} />
        <Route path='/writing/:writingId/:studentId' element={<WritingSubmit />} />
        <Route path='/manage' element={<Manage />} />
        <Route path='/manage/:id' element={<History />} />
        <Route path="/redirect/:option" element={<Redirect />} />
        <Route path="/writing/testing" element={<Testing />} />
      </Routes>
    </div>
  )
}

export default App