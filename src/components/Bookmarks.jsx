import { Stack, IconButton, Typography, Box } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { Link } from 'react-router-dom'

const Bookmarks = ({ bookmarks }) => {
  return (
    <>
      <Stack direction="row" alignItems="center">
        <IconButton component={Link} to="/" sx={{ color: '#111', mr: 1 }}>
          <ArrowBack />
        </IconButton>

        <Typography variant="h6">Bookmarks</Typography>
      </Stack>
      {!!Object.keys(bookmarks).length ? (
        Object.keys(bookmarks)
          .map((bookmark, index) => {
            return (
              <Box
                component={Link}
                to={`/search/${bookmark}`}
                key={index}
                sx={{
                  p: 2,
                  cursor: 'pointer',
                  backgroundColor: '#fff',
                  borderRadius: 1,
                  textTransform: 'capitalize',
                  my: 2,
                  fontWeight: 800,
                  display: 'block',
                  color: '#111',
                  textDecoration: 'none',
                }}
              >
                {bookmark}
              </Box>
            )
          })
      ) : (
        <Typography align="center" variant="h4" sx={{ mt: 5 }}>
          No bookmarks
        </Typography>
      )}
    </>
  )
}
export default Bookmarks
