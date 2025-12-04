const sendEmail = require('../utils/sendEmail');
const path = require('path');

exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;
        const files = req.files || [];

        console.log('Contact form submission:', { name, email, message });
        console.log('Files received:', files.length);

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Please provide name, email and message'
            });
        }

        // Prepare attachments
        const attachments = files.map(file => {
            console.log('Processing file:', file);
            return {
                filename: file.originalname,
                path: path.resolve(file.path) // Use absolute path
            };
        });

        // Send email to admin
        const adminMessage = `
            New Contact Form Submission
            
            Name: ${name}
            Email: ${email}
            
            Message:
            ${message}
        `;

        console.log('Sending admin email to:', process.env.EMAIL_USER);
        console.log('With attachments:', attachments);

        await sendEmail({
            email: process.env.EMAIL_USER, // Send to the site admin/owner
            subject: `New Contact Message from ${name}`,
            message: adminMessage,
            attachments: attachments
        });

        // Optional: Send confirmation to user
        const userMessage = `
            Hi ${name},
            
            Thanks for contacting us. We have received your message and will get back to you shortly.
            
            Best regards,
            EchoSocial Team
        `;

        await sendEmail({
            email: email,
            subject: 'We received your message',
            message: userMessage
        });

        res.status(200).json({
            success: true,
            message: 'Message sent successfully'
        });
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({
            success: false,
            message: 'Email could not be sent'
        });
    }
};
