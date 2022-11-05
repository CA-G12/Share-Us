import React, { createContext, useState } from 'react'

interface IStartChatContext {
  startChat: any
  setStartChat:Function
}
const initStartChat = {
  startChat: {},
  setStartChat: () => {},
}
export const StartChat = createContext<IStartChatContext>(initStartChat)

export const StartChatProvider = ({ children }: any):React.ReactElement => {
  const [startChat, setStartChat] = useState(initStartChat)

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StartChat.Provider value={{ startChat, setStartChat }}>{children}</StartChat.Provider>
  )
}
