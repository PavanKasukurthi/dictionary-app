import { ThemeProvider, CssBaseline, Grid } from '@mui/material'
import './App.css'
import theme from './theme'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Bookmarks from './components/Bookmarks'
import Definition from './components/Definition'
import { useEffect, useState } from 'react'

function App() {
  const [bookmarks, setBookmarks] = useState(
    JSON.parse(localStorage.getItem('bookmarks')) || {}
  )

  console.log(bookmarks)

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }, [bookmarks])

  const addBookmark = (word, definitions) =>
    setBookmarks((oldBookmarks) => ({
      ...oldBookmarks,
      [word]: definitions,
    }))

  const removeBookmark = (word) =>
    setBookmarks((oldBookmarks) => {
      const temp = { ...oldBookmarks }
      delete temp[word]
      return temp
    })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container sx={{ p: 2 }} justifyContent="center" >
        <Grid item xs={12} sm={8} md={5} lg={3}>
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/bookmarks"
                element={<Bookmarks bookmarks={bookmarks} />}
              />
              <Route
                path="/search/:word"
                element={
                  <Definition
                    bookmarks={bookmarks}
                    addBookmark={addBookmark}
                    removeBookmark={removeBookmark}
                  />
                }
              />
            </Routes>
          </Router>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}

export default App
