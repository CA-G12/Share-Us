import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import dayjs from 'dayjs'

import './style.css'
import {
  Card, CardActions, Stack, CircularProgress, CardContent, CardMedia, Typography, Button, Box,
} from '@mui/material'
import ApiService from '../../services/ApiService'

const SearchResult: FC = () => {
  const [data, setData] = useState<any>([])
  const [searchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)

  const category = searchParams.get('category')

  useEffect(() => {
    setLoading(true)
    ApiService.get('/api/v1/search', {
      params: {
        input: searchParams.get('q'),
        category: searchParams.get('category'),
      },
    })
      .then((res) => {
        setData(res.data)
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
        <Card sx={{
          width: '80%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: '0 auto 20px auto',
        }}
        >
          <CardMedia
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              height: '150px',
              width: '150px',
            }}
            component="img"
            alt="Event Image"
            image={e.profileImg}
          />
          <CardContent sx={{ flex: '1 1 auto' }}>
            <Typography gutterBottom variant="h5" component="div">
              {e.username}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {e.bio}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              sx={{
                color: 'white',
                margin: '10px',
                padding: '10px',
                backgroundColor: '#256D85',
                '&:hover': {
                  backgroundColor: '#256D85',
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              size="small"
            >
              Follow
            </Button>
          </CardActions>
        </Card>
      ))}

      {category && (category === 'event' || category === 'hashtags') && data?.data?.map((e:any) => (
        <Card sx={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px',
        }}
        >
          <CardMedia
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              width: '40%',
            }}
            component="img"
            alt="Event Image"
            image={e.img}
          />
          <CardContent sx={{ flex: '1 1 auto' }}>
            <Typography gutterBottom variant="h5" component="div">
              {e.name}
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              { `Date: ${dayjs(e.startTime).format('DD/MM/YYYY')}`}
              { ` | Time: ${dayjs(e.startTime).format('HH:mm:ss a')}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {e.description}
            </Typography>
            <Typography
              className={e.status === 'in-progress' ? 'green' : e.status === 'upcoming' ? 'orange' : e.status === 'closed' ? 'red' : 'transparent'}
              gutterBottom
              variant="body2"
              component="div"
            >
              {e.status}
            </Typography>
            <Box sx={{ display: 'flex' }}>
              { e.Hashtags?.map((ele:any) => (
                <Typography
                  sx={{
                    padding: '3px', margin: '5px 5px 5px 0', backgroundColor: 'lightblue', borderRadius: '5px',
                  }}
                  variant="body2"
                  color="text.secondary"
                >
                  {`# ${ele.title}`}
                </Typography>
              ))}
            </Box>
          </CardContent>
          <CardActions>
            <Button
              sx={{
                color: 'white',
                margin: '10px',
                padding: '10px',
                backgroundColor: '#256D85',
                '&:hover': {
                  backgroundColor: '#256D85',
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              size="small"
            >
              Join
            </Button>
          </CardActions>
        </Card>
      ))}

      {!category && data?.data?.map((e:any) => (
        <Card sx={{
          display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px',
        }}
        >
          <CardMedia
            sx={{
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              width: '40%',
            }}
            component="img"
            alt="Event Image"
            image={e.img}
          />
          <CardContent sx={{ flex: '1 1 auto' }}>
            <Typography gutterBottom variant="h5" component="div">
              {e.name}
            </Typography>
            <Typography gutterBottom variant="body2" component="div">
              <Typography gutterBottom variant="body2" component="div">
                { `Date: ${dayjs(e.startTime).format('DD/MM/YYYY')}`}
                { ` | Time: ${dayjs(e.startTime).format('HH:mm:ss a')}`}
              </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {e.description}
            </Typography>
            <Typography
              className={e.status === 'in-progress' ? 'green' : e.status === 'upcoming' ? 'orange' : e.status === 'closed' ? 'red' : 'transparent'}
              gutterBottom
              variant="body2"
              component="div"
            >
              {e.status}
            </Typography>
            <Box sx={{ display: 'flex' }}>
              { e.Hashtags.map((ele:any) => (
                <Typography
                  sx={{
                    padding: '3px', margin: '5px 5px 5px 0', backgroundColor: 'lightblue', borderRadius: '5px',
                  }}
                  variant="body2"
                  color="text.secondary"
                >
                  {`# ${ele.title}`}
                </Typography>
              ))}
            </Box>
          </CardContent>
          <CardActions>
            <Button
              sx={{
                color: 'white',
                margin: '10px',
                padding: '10px',
                backgroundColor: '#256D85',
                '&:hover': {
                  backgroundColor: '#256D85',
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              size="small"
            >
              Join
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  )
}
export default SearchResult
