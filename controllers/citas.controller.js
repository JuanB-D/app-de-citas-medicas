
import {v4 as uuidv4} from 'uuid'
import connection from '../db.js';
const citasController = {
      saveCita: (req, res) => {
        const { email, fechaD, fechaA, tipo } = req.body;
    
        const query = `
      UPDATE users
      SET citas_medicas = JSON_ARRAY_APPEND(
          citas_medicas,
          '$',
          JSON_OBJECT(
              'tipo', ?, 
              'fechaD', ?, 
              'fechaA', ?,
              'uuid', ?
          )
      )
      WHERE email = ?;
    `;
    const uuid = uuidv4();
    connection.execute(query, [tipo, fechaD, fechaA,uuid, email], (err, results) =>{
        if(err){
            console.log(err)
        }
        return res.status(200).json({results, data:{cita_uuid: uuid}});
    })
      
    },
    deleteCita: (req, res) => {
        const { uuid, cita_uuid } = req.body;
        if (!uuid || !cita_uuid) {
          return res.status(400).json({ message: 'uuid or cita_uuid not found' });
        }
      
        const query1 = 'SELECT citas_medicas FROM users WHERE uuid = ?';
        const query2 = 'UPDATE users SET citas_medicas = ? WHERE uuid = ?';
      
        connection.execute(query1, [uuid], (err, results) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ message: 'Error fetching citas_medicas' });
          }
      
          if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          let citasMedicas = results[0].citas_medicas;
      
          if (typeof citasMedicas === 'string') {
            citasMedicas = JSON.parse(citasMedicas);
          }
          if (!Array.isArray(citasMedicas)) {
            citasMedicas = [];
          }
      
          citasMedicas = citasMedicas.filter(cita => cita.uuid !== cita_uuid);
      
          connection.execute(query2, [JSON.stringify(citasMedicas), uuid], (err2, updateResult) => {
            if (err2) {
              console.log(err2);
              return res.status(500).json({ message: 'Error updating citas_medicas' });
            }
      
            return res.status(200).json({ message: 'Cita eliminada correctamente' });
          });
        });
      }
}

export default citasController;