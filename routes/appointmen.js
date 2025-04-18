
import express from 'express';
import { sendMail } from '../gmail.sendler.js';

const GmailRouter = express.Router();

GmailRouter.post('/agendar-cita', async (req, res) => {
  const { email,fechaD, fechaA } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Faltan campos requeridos: email o nombre' });
  }

  try {
    console.log('📨 Enviando correo a:', email);
    
    const resultado = await sendMail({
      to: email,
      subject: `Cita Agendada el dia ${fechaA}`,
      text: `Hola ${email}, tu cita fue agendada exitosamente para el dia ${fechaD}`
    });

    console.log('✅ Resultado del envío:', resultado);
    res.status(200).json({ message: '📧 Correo enviado', resultado });
    
  } catch (error) {
    console.error('❌ Error al enviar el correo:', error);
    
    const errorMessage = process.env.NODE_ENV === 'development'
      ? error.toString()
      : 'Error interno al enviar el correo';

    res.status(500).json({ message: 'Error al enviar el correo', error: errorMessage });
  }
});

export default GmailRouter;
