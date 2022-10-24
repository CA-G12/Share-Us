/* eslint-disable no-unused-vars */
import { FC, useEffect, useState } from 'react'
import './style.css'
import {
  Card, CardActions, Stack, CircularProgress, CardContent, CardMedia, Typography, Button, Box,
} from '@mui/material'

import { ISearchResult } from '../../interfaces'
import ApiService from '../../services/ApiService'

const SearchResult:FC<ISearchResult> = ({
  category, input, setCategory, setInput,
}) => {
  const [data, setData] = useState<any>([])
  useEffect(() => {
    ApiService.get('/api/v1/search', {
      params: {
        input,
        category,
      },
    })
      .then((res) => {
        console.log(res.data, '******************************')
        setData(res.data)
      })
  }, [category, input])
  return (
    <Box
      sx={{
        margin: '10% 15%',
        height: '100vh',
      }}
    >

      {category && input && data
        ? category === 'friends'
          ? data.friends && data.friends.map((e:any) => (
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
                alt="Event Image"
                image={e.profileImg}
              />
              <CardContent>
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
          ))
          : category === 'event'
            ? data.event && data.event.map((e:any) => (
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
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {e.name}
                  </Typography>
                  <Typography gutterBottom variant="body2" component="div">
                    {e.startTime}
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
            ))
            : category === 'hashtags'
              ? data.hashtags && data.hashtags.map((e:any) => (
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
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {e.name}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                      {e.startTime}
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
              ))

              : (
                <Stack
                  sx={{
                    color: 'grey.500', display: 'flex', justifyContent: 'center', alignItems: 'center',
                  }}
                  spacing={2}
                  direction="row"
                >
                  <CircularProgress color="primary" />
                </Stack>
              )
        : data.AllEvent && data.AllEvent.map((e:any) => (
          <Card
            key={e.id}
            sx={{
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
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {e.name}
              </Typography>
              <Typography gutterBottom variant="body2" component="div">
                {e.startTime}
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
