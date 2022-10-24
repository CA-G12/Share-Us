export default interface ISearchResult{
  category?: string
  input?: string
  setCategory?:(c:string)=> void
  setInput?:(c:string)=> void
}
