import {
  Stack,
  Typography,
  Box,
  IconButton,
  Divider,
  CircularProgress,
  useTheme,
  Button,
} from '@mui/material'
import {
  ArrowBack,
  Bookmark,
  BookmarkBorder,
  ModelTrainingSharp,
  PlayArrow,
} from '@mui/icons-material'
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, Fragment } from 'react'
import axios from 'axios'

const Definition = ({ bookmarks, addBookmark, removeBookmark }) => {
  const { word } = useParams()
  const [definitions, setDefinitions] = useState([])
  const [exist, setExist] = useState(true)
  const [audio, setAudio] = useState(null)
  const theme = useTheme()

  const isBookmarked = Object.keys(bookmarks).includes(word)

  const navigate = useNavigate()

  const BASE_API = `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`

  const updateState = (data) => {
    setDefinitions(data)

    const phonetics = data[0].phonetics
    if (!phonetics.length) return

    const url = phonetics[1].audio || phonetics[0].audio || ''

    setAudio(new Audio(url))
  }

  useEffect(() => {
    const fetchDefinition = async () => {
      try {
        const response = await axios.get(BASE_API)

        updateState(response.data)
      } catch (err) {
        setExist(false)
      }
    }

    if (!isBookmarked) fetchDefinition()
    else updateState(bookmarks[word])
  }, [])

  if (!exist) {
    return (
      <Box sx={{ ...theme.mixins.centerContent }}>
        <Typography>Oops! Word not found!</Typography>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            borderRadius: 2,
            p: 2,
            color: '#fff',
            boxShadow: '0px 10px 10px rgba(221, 114, 133, 0.2)',
            background: 'linear-gradient(to top, #09203f 0%, #537895 100%)',
          }}
          onClick={() => navigate('/')}
        >
          Go Back
        </Button>
      </Box>
    )
  }

  if (!definitions.length)
    return (
      <Box sx={{ ...theme.mixins.centerContent }}>
        <CircularProgress />
      </Box>
    )

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <IconButton onClick={() => navigate('/')}>
          <ArrowBack sx={{ color: '#111' }} />
        </IconButton>

        <IconButton
          onClick={() =>
            isBookmarked ? removeBookmark(word) : addBookmark(word, definitions)
          }
        >
          {isBookmarked ? (
            <Bookmark sx={{ color: '#111' }} />
          ) : (
            <BookmarkBorder sx={{ color: '#111' }} />
          )}
        </IconButton>
      </Stack>

      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          my: 3,
          px: 4,
          py: 5,
          color: 'white',
          textTransform: 'capitalize',
          boxShadow: '0px 10px 20px rgba(10, 23, 71, 0.25)',
          borderRadius: 2,
          // background: 'linear-gradient(to right, #485563, #29323c)',
          background: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
        }}
      >
        <Typography variant="h4">{word}</Typography>
        {audio != null && (
          <IconButton
            onClick={() => audio.play()}
            sx={{
              background: '#fff',
              color: '#09203f',
            }}
          >
            <PlayArrow />
          </IconButton>
        )}
      </Stack>

      {definitions.map((def, index) => {
        return (
          <Fragment key={index}>
            <Divider
              sx={{
                display: index === 0 ? 'none' : 'block',
                my: 3,
              }}
            />
            {def.meanings.map((meaning, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    backgroundColor: '#fff',
                    p: 2,
                    mt: 3,
                    borderRadius: 2,
                    boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.05)',
                  }}
                >
                  <Typography color="GrayText" variant="subtitle1">
                    {meaning.partOfSpeech}
                  </Typography>
                  {meaning.definitions.map((definition, index) => {
                    return (
                      <Typography key={index} variant="body2" color="GrayText">
                        {meaning.definitions.length > 1 && `${index + 1}. `}
                        {definition.definition}
                      </Typography>
                    )
                  })}
                </Box>
              )
            })}
          </Fragment>
        )
      })}
    </>
  )
}
export default Definition
