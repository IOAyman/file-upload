const express = require('express')
const cors = require('cors')
const multer = require('multer')
const { join } = require('path')


const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const storage = multer.diskStorage({
  destination: join(__dirname, 'uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
})
const upload = multer({ storage })


app.get('/', (req, res) => res.sendFile(join(__dirname, 'index.html')))

app.post('/', upload.single('io'), (req, res) => res.end('thanks'))

app.all('*', (req, res) => res.redirect('/'))
app.use((err, req, res, next) => {
  console.error(err)
  res.end('woops!')
  next()
})

app.on('error', console.error)
app.listen(process.env.NODE_PORT || 9999)
