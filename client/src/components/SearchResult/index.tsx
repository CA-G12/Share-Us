import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import './style.css'
import {
  Stack, CircularProgress, Box,
} from '@mui/material'
import ApiService from '../../services/ApiService'
import EventCard from '../EventCard/EventCard'
// import EventCardHashtag from './EventCard'
import FriendCard from './FriendCard'

const SearchResult: FC = () => {
  const [data, setData] = useState<any>([])
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const category = searchParams.get('category')

  useEffect(() => {
    setLoading(true)
    ApiService.get('/search', {
      params: {
        input: searchParams.get('q'),
        category: searchParams.get('category'),
      },
    })
      .then((res) => {
        setData(res.data)
        console.log(res.data)

        setLoading(false)
      }).catch(() => setLoading(false))
  }, [searchParams])
  return (
    <Box
      sx={{
        margin: '10% 15%',
        height: '100vh',
      }}
    >

      {loading && (
      <Stack
        sx={{
          color: 'grey.500', display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}
        spacing={2}
        direction="row"
      >
        <CircularProgress color="primary" />
      </Stack>
      )}

      {category && category === 'friends' && data?.data?.map((e:any) => (
        <FriendCard
          key={e.id}
          image={e.profileImg}
          username={e.username}
          bio={e.bio}
          id={e.id}
          button="Follow"
        />
      ))}

      {category && (category === 'event' || category === 'hashtags')
        && (
          <>
            <h3 className="search-title">Searched Results</h3>
            <div className="card-container">
              {
            data?.data?.map((e:any) => (
              <EventCard event={e} key={e.id} />
            ))
          }
            </div>
          </>
        )}

      {!category && data?.data?.map((e:any) => (
        <EventCard event={e} />

      ))}
    </Box>
  )
}
export default SearchResult
