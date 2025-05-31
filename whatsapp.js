const axios = require('axios');
const logger = require('../config/logger');

class WhatsAppService {
  constructor() {
    this.apiUrl = process.env.WHATSAPP_API_URL;
    this.apiToken = process.env.WHATSAPP_API_TOKEN;
    this.phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
    this.businessAccountId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;
  }

  /**
   * Send a text message via WhatsApp
   * @param {string} to - Recipient phone number with country code
   * @param {string} message - Text message to send
   * @returns {Promise} - API response
   */
  async sendTextMessage(to, message) {
    try {
      // Format phone number if needed
      const formattedNumber = this.formatPhoneNumber(to);
      
      const payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: formattedNumber,
        type: "text",
        text: {
          body: message
        }
      };

      logger.info(`Sending WhatsApp message to ${formattedNumber}`);
      
      // In a real implementation, this would call the WhatsApp Business API
      // For now, we'll simulate the API call
      return this.simulateApiCall(payload);
    } catch (error) {
      logger.error(`Error sending WhatsApp message: ${error.message}`);
      throw error;
    }
  }

  /**
   * Send a template message via WhatsApp
   * @param {string} to - Recipient phone number with country code
   * @param {string} templateName - Name of the template to use
   * @param {Array} components - Template components with parameters
   * @returns {Promise} - API response
   */
  async sendTemplateMessage(to, templateName, components = []) {
    try {
      // Format phone number if needed
      const formattedNumber = this.formatPhoneNumber(to);
      
      const payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: formattedNumber,
        type: "template",
        template: {
          name: templateName,
          language: {
            code: "en_US"
          },
          components: components
        }
      };

      logger.info(`Sending WhatsApp template message to ${formattedNumber}`);
      
      // In a real implementation, this would call the WhatsApp Business API
      // For now, we'll simulate the API call
      return this.simulateApiCall(payload);
    } catch (error) {
      logger.error(`Error sending WhatsApp template message: ${error.message}`);
      throw error;
    }
  }

  /**
   * Send a media message via WhatsApp
   * @param {string} to - Recipient phone number with country code
   * @param {string} mediaType - Type of media (image, document, audio, video)
   * @param {string} mediaUrl - URL of the media to send
   * @param {string} caption - Optional caption for the media
   * @returns {Promise} - API response
   */
  async sendMediaMessage(to, mediaType, mediaUrl, caption = "") {
    try {
      // Format phone number if needed
      const formattedNumber = this.formatPhoneNumber(to);
      
      const payload = {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: formattedNumber,
        type: mediaType,
        [mediaType]: {
          link: mediaUrl,
          caption: caption
        }
      };

      logger.info(`Sending WhatsApp ${mediaType} message to ${formattedNumber}`);
      
      // In a real implementation, this would call the WhatsApp Business API
      // For now, we'll simulate the API call
      return this.simulateApiCall(payload);
    } catch (error) {
      logger.error(`Error sending WhatsApp media message: ${error.message}`);
      throw error;
    }
  }

  /**
   * Process incoming WhatsApp message
   * @param {Object} webhookData - Webhook data from WhatsApp
   * @returns {Object} - Processed message data
   */
  processWebhook(webhookData) {
    try {
      // In a real implementation, this would parse the webhook data from WhatsApp
      // For now, we'll simulate the webhook processing
      
      logger.info('Processing WhatsApp webhook data');
      
      // Extract message data
      const messageData = {
        from: webhookData.from || '',
        body: webhookData.body || '',
        mediaUrl: webhookData.media_url || '',
        messageType: webhookData.message_type || 'text',
        timestamp: new Date()
      };
      
      return messageData;
    } catch (error) {
      logger.error(`Error processing WhatsApp webhook: ${error.message}`);
      throw error;
    }
  }

  /**
   * Format phone number to ensure it has country code
   * @param {string} phoneNumber - Phone number to format
   * @returns {string} - Formatted phone number
   */
  formatPhoneNumber(phoneNumber) {
    // Remove any non-digit characters
    let cleaned = phoneNumber.replace(/\D/g, '');
    
    // Ensure it has Kenya country code
    if (!cleaned.startsWith('254')) {
      // If it starts with 0, replace it with 254
      if (cleaned.startsWith('0')) {
        cleaned = '254' + cleaned.substring(1);
      } else {
        // Otherwise, add 254 prefix
        cleaned = '254' + cleaned;
      }
    }
    
    return cleaned;
  }

  /**
   * Simulate WhatsApp API call (for development)
   * @param {Object} payload - API payload
   * @returns {Promise} - Simulated API response
   */
  async simulateApiCall(payload) {
    // Log the payload that would be sent to the API
    logger.debug(`WhatsApp API payload: ${JSON.stringify(payload)}`);
    
    // Simulate API response
    return {
      messaging_product: "whatsapp",
      contacts: [
        {
          input: payload.to,
          wa_id: payload.to
        }
      ],
      messages: [
        {
          id: "wamid." + Math.random().toString(36).substring(2, 15)
        }
      ]
    };
  }
}

module.exports = new WhatsAppService();
