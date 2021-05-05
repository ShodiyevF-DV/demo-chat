const http = require('http')
const express = require('express')
const socket = require('socket.io')
const ejs = require('ejs')

const app = express()
app.engine('html', ejs.renderFile)
app.set('view engine', 'html')
app.use(express.static('views'))

const server = http.createServer(app)
const io = socket(server)

app.get('/', (req, res) => res.render('index'))

io.on('connection', client => {

    client.broadcast.emit('user_join')

    client.on('send_message', data => {

        client.broadcast.emit('new_message', data)
    })
})

server.listen(process.env.POST || 4000, () => console.log('helo'))