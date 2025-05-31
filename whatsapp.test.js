// WhatsApp Integration Test Script
const axios = require('axios');
const logger = require('../config/logger');

/**
 * Test script for WhatsApp integration
 * This script simulates various WhatsApp interactions to test the system
 */
async function testWhatsAppIntegration() {
  try {
    logger.info('Starting WhatsApp integration tests');
    
    // Base URL for API
    const baseUrl = 'http://localhost:5000/api';
    
    // Test phone number
    const testPhone = '+254778401063';
    
    // Test 1: Simulate incoming greeting message
    logger.info('Test 1: Simulating incoming greeting message');
    await simulateIncomingMessage(baseUrl, testPhone, 'Hello');
    
    // Test 2: Simulate incoming help request
    logger.info('Test 2: Simulating incoming help request');
    await simulateIncomingMessage(baseUrl, testPhone, 'I need help with a legal matter');
    
    // Test 3: Simulate incoming arrest query
    logger.info('Test 3: Simulating incoming arrest query');
    await simulateIncomingMessage(baseUrl, testPhone, 'What are my rights if I get arrested?');
    
    // Test 4: Simulate incoming bail query
    logger.info('Test 4: Simulating incoming bail query');
    await simulateIncomingMessage(baseUrl, testPhone, 'How does bail work in Kenya?');
    
    // Test 5: Simulate incoming court process query
    logger.info('Test 5: Simulating incoming court process query');
    await simulateIncomingMessage(baseUrl, testPhone, 'What happens during a court hearing?');
    
    // Test 6: Simulate incoming general query
    logger.info('Test 6: Simulating incoming general query');
    await simulateIncomingMessage(baseUrl, testPhone, 'What is the penalty for theft in Kenya?');
    
    // Test 7: Test sending a template message
    logger.info('Test 7: Testing template message sending');
    await sendTemplateMessage(baseUrl, testPhone, 'welcome_message', [
      { type: 'body', parameters: [{ type: 'text', text: 'Test User' }] }
    ]);
    
    // Test 8: Test getting conversation history
    logger.info('Test 8: Testing conversation history retrieval');
    await getConversationHistory(baseUrl, testPhone);
    
    logger.info('WhatsApp integration tests completed successfully');
  } catch (error) {
    logger.error(`WhatsApp integration test error: ${error.message}`);
  }
}

/**
 * Simulate an incoming WhatsApp message
 * @param {string} baseUrl - Base API URL
 * @param {string} from - Sender phone number
 * @param {string} body - Message content
 */
async function simulateIncomingMessage(baseUrl, from, body) {
  try {
    const response = await axios.post(`${baseUrl}/whatsapp/webhook`, {
      from,
      body,
      message_type: 'text'
    });
    
    logger.info(`Simulated message response: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (error) {
    logger.error(`Error simulating incoming message: ${error.message}`);
    throw error;
  }
}

/**
 * Send a template message
 * @param {string} baseUrl - Base API URL
 * @param {string} to - Recipient phone number
 * @param {string} templateName - Template name
 * @param {Array} components - Template components
 */
async function sendTemplateMessage(baseUrl, to, templateName, components) {
  try {
    const response = await axios.post(`${baseUrl}/whatsapp/template`, {
      to,
      templateName,
      components
    });
    
    logger.info(`Template message response: ${JSON.stringify(response.data)}`);
    return response.data;
  } catch (error) {
    logger.error(`Error sending template message: ${error.message}`);
    throw error;
  }
}

/**
 * Get conversation history
 * @param {string} baseUrl - Base API URL
 * @param {string} phone - Phone number
 */
async function getConversationHistory(baseUrl, phone) {
  try {
    const response = await axios.get(`${baseUrl}/whatsapp/history/${phone}`);
    
    logger.info(`Conversation history count: ${response.data.count} messages`);
    return response.data;
  } catch (error) {
    logger.error(`Error getting conversation history: ${error.message}`);
    throw error;
  }
}

// Run the tests
testWhatsAppIntegration();

module.exports = {
  testWhatsAppIntegration,
  simulateIncomingMessage,
  sendTemplateMessage,
  getConversationHistory
};
