import './style.css'
import { FC } from 'react'
import SearchResultComp from '../../components/SearchResult'
import Navbar from '../../components/Navbar/index'

const SearchResult:FC = () => (
  <div>
    <Navbar />
    <SearchResultComp />
  </div>
)

export default SearchResult
