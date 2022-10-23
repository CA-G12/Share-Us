import './style.css'
import { FC, useState } from 'react'
import SearchResultComp from '../../components/SearchResult'
import Navbar from '../../components/Navbar/Navbar'

const SearchResult:FC = () => {
  const [category, setCategory] = useState('')
  const [input, setInput] = useState('')
  return (
    <div>
      <Navbar category={category} input={input} setCategory={setCategory} setInput={setInput} />
      <SearchResultComp category={category} input={input} setCategory={setCategory} setInput={setInput} />
    </div>
  )
}

export default SearchResult
