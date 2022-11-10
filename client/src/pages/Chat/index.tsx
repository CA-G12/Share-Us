import './style.css'

import { FC, useState } from 'react'
import Navbar from '../../components/Navbar'
import ChatBox from '../../components/ChatBox'

const Chat:FC = () => {
  const [asRead, setAsRead] = useState<number>(0)

  return (
    <>
      <Navbar asRead={asRead} />
      <ChatBox
        setAsRead={setAsRead}
      />
    </>
  )
}

export default Chat
