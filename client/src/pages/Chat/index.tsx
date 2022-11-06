import './style.css'

import { FC } from 'react'
import Navbar from '../../components/Navbar'
import ChatBox from '../../components/ChatBox'

const Chat:FC = () => (
  <>
    <Navbar />
    <ChatBox />
  </>
)

export default Chat
