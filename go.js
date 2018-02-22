const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require(('path'))


const app = express()
app.set('port', 8080)
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const storage = multer.diskStorage({
  destination: path.join(__dirname, 'uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
})
const upload = multer({ storage })


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

app.post('/', upload.single('io'), (req, res) => {
  res.end('thanks')
})


app.on('error', console.error)
app.listen(app.get('port'))
