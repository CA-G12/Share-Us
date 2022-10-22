import { FC, useEffect, useState } from 'react'
import './style.css'
import {
  Card, CardActions, CardContent, CardMedia, Typography, Button, Box,
} from '@mui/material'
import ApiService from '../../services/ApiService'

interface props {
  state: string
}

const SearchResult:FC<props> = ({ state }) => {
  const [data, setData] = useState({})

  useEffect(() => {
    ApiService.get('/api/v1/search')
      .then((res) => {
        console.log(res.data)
        setData({ text: data })
      })
  }, [])

  return (
    <Box
      sx={{
        margin: '10% 15%',
        height: '100vh',
      }}
    >

      {state === 'friend'
        ? (
          <Card sx={{
            display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: '20px',
          }}
          >
            <CardMedia
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                height: '100%',
                width: '40%',
              }}
              component="img"
              alt="green iguana"
              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Brenna Ambrois
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hey people! I am my own person and I love blogging because I just love to share the small incidents of my daily life with people! #mylife
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
        )
        : state === 'hashtag' || state === 'event'
          ? (
            <div>
              <Card sx={{
                display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: '20px',
              }}
              >
                <CardMedia
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    height: '100%',
                    width: '40%',
                  }}
                  component="img"
                  alt="green iguana"
                  image="https://img.freepik.com/free-vector/flat-golden-circle-balloons-birthday-background_52683-34659.jpg?w=2000"
                />
                <CardContent sx={{ padding: '0 16px' }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Birthday Party
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    Date 10/12/2022 from 2pm tp 6pm
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    You are invited!
                    We are planning to have a magnificent birthday party on [date]
                    at our residence. We cordially invite you along with your family to grace the event.
                    We invite you to be present with us on the beautiful evening of our life as we are having a spectacular celebration of the birthday of our beloved
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{ margin: '10px 0' }}
                  >
                    #birthday , #birthday_Girl
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    sx={{
                      margin: '10px',
                      color: 'white',
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
              <Card sx={{
                display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: '20px',
              }}
              >
                <CardMedia
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    height: '100%',
                    width: '40%',
                  }}
                  component="img"
                  alt="green iguana"
                  image="https://img.freepik.com/free-vector/flat-golden-circle-balloons-birthday-background_52683-34659.jpg?w=2000"
                />
                <CardContent sx={{ padding: '0 16px' }}>
                  <Typography gutterBottom variant="h5" component="div">
                    Birthday Party
                  </Typography>
                  <Typography variant="body1" color="text.primary">
                    Date 10/12/2022 from 2pm tp 6pm
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    You are invited!
                    We are planning to have a magnificent birthday party on [date]
                    at our residence. We cordially invite you along with your family to grace the event.
                    We invite you to be present with us on the beautiful evening of our life as we are having a spectacular celebration of the birthday of our beloved
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.primary"
                    sx={{ margin: '10px 0' }}
                  >
                    #birthday , #birthday_Girl
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    sx={{
                      margin: '10px',
                      color: 'white',
                      padding: '10px',
                      backgroundColor: '#256D85',
                      '&:hover': {
                        backgroundColor: '#256D85',
                        opacity: [0.9, 0.8, 0.7],
                      },
                    }}
                    // onClick={console.log('test')}
                    size="small"
                  >
                    Join

                  </Button>
                </CardActions>
              </Card>
            </div>

          ) : <>test</>}

    </Box>
  )
}

export default SearchResult
