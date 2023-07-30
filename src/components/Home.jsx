import {
  Box,
  Typography,
  FilledInput,
  IconButton,
  useTheme,
} from '@mui/material'

import { Search, Bookmark } from '@mui/icons-material'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  const [word, setWord] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimmedWord = word.trim().toLowerCase()
    if (trimmedWord.split(' ').length > 1) {
      alert('Enter word without any spaces')
      return
    }
    if (!trimmedWord) {
      alert('Enter a word!')
      return
    }

    navigate(`/search/${trimmedWord}`)
  }

  return (
    <Box sx={{ ...theme.mixins.centerContent1 }}>
      <Typography
        variant="h3"
        color="primary"
        sx={{ mt: 10 }}
        className="prevent-select"
      >
        Dictionary
      </Typography>

      <Typography
        color="GrayText"
        variant="h5"
        sx={{ my: 4 }}
        className="prevent-select"
      >
        What word do you want to look up?
      </Typography>

      <Box sx={{ width: '350px' }}>
        <form onSubmit={handleSubmit}>
          <FilledInput
            value={word}
            onChange={(e) => setWord(e.target.value)}
            disableUnderline
            placeholder="Search word"
            sx={{
              backgroundColor: 'white',
              borderRadius: 2,
              boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.05 )',
              '& .MuiFilledInput-input': {
                p: 2,
              },
            }}
            startAdornment={<Search color="disabled" />}
            fullWidth
          />
        </form>
      </Box>

      <IconButton
        to="/bookmarks"
        component={Link}
        sx={{
          mt: 4,
          borderRadius: 2,
          p: 2,
          color: '#fff',
          boxShadow: '0px 10px 10px rgba(221, 114, 133, 0.2)',
          background: 'linear-gradient(to top, #09203f 0%, #537895 100%)',
        }}
      >
        <Bookmark variant="action" />
      </IconButton>
    </Box>
  )
}
export default Home
