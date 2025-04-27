import {v4 as uuidv4} from 'uuid'
import connection from '../db.js';
const userAuthController = {
    Register: (req, res) => {
        const query = 'INSERT INTO users (name, email, password, uuid) VALUES (?, ?, ?, ?)';
        const { name, email, password } = req.body;
      
        if (!name || !email || !password) {
          return res.status(400).json({ message: "❌ Faltan datos requeridos" });
        }
      
        const newUuid = uuidv4();
      
        connection.execute(query, [name, email, password, newUuid], (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "❌ Error al registrar usuario" });
          }
      
          console.log('✅ Usuario registrado con éxito', results);
          return res.status(201).json({
            message: "✅ Usuario registrado con éxito",
            data: { name, email, uuid: newUuid }
          });
        });
      },
      
    Login: (req, res) =>{
        const query = 'SELECT * FROM users WHERE email = ?';
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({ message: "❌ Faltan datos requeridos" });
        }
        connection.execute(query, [email], (err, results) =>{
            if(err){
                console.log(err)
                return
            }
            if (results.length === 0) {
                return res.status(401).json({ message: "❌ Usuario no encontrado" });
            }
            console.log('login succesfully', results)
            return res.status(200).json({ results: results[0] });
        })
    },
    deleteAccount: (req, res) =>{
        const query = 'DELETE FROM users WHERE uuid = ?';
        const uuid = req.headers['x-user-id'];
        if(!uuid){
            return res.status(400).send('ID de usuario no proporcionado');
        }
        connection.execute(query, [uuid], (err, results) =>{
            if(err){
                console.log(results);
            }
            return res.status(204).json({message: 'user deleted succesfully'});
        })
    },
    userData: (req, res) =>{
        const {email} = req.body;
        const query = 'SELECT * FROM users WHERE email = ?';
        connection.execute(query, [email], (err, results) =>{
            if(err){
                console.log(err);
            }
            return res.status(200).json(results)
        })
    }
}


export default userAuthController;