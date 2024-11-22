import nodemailer from 'nodemailer'; // Usando a sintaxe de importação ES

// Configurar o transporte de e-mail
let transporter = nodemailer.createTransport({
    service: 'gmail', // Pode ser outro serviço como 'hotmail', 'yahoo', etc.
    auth: {
        user: 'contato.touccan@gmail.com',   // E-mail de envio (Touccan)
        pass: 'snbt dqeb rnrj ossm'          // Senha do e-mail
    }
});

// Função para enviar e-mail
export async function enviarEmail(destinatario, assunto, corpo) {
    try {
        let info = await transporter.sendMail({
            from: '"Touccan" <contato.touccan@gmail.com>', // Remetente
            to: destinatario,                              // Destinatário
            subject: assunto,                              // Assunto
            text: corpo                                    // Corpo do e-mail em texto simples
        });
        console.log('Mensagem enviada!');
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
    }
}
