module.exports = (io)=>{
    io.on('connection',(socket)=>{
        console.log('use connected');
        socket.on('updatelocation',(id_user,latitude,longitude)=>{
            try {
                console.log(id_user,latitude,longitude);
                
            } catch (error) {
                
            }
        })
    })
}