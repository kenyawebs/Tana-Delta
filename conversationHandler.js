const WhatsappMessage = require('../models/WhatsappMessage');
const User = require('../models/User');
const Query = require('../models/Query');
const whatsappService = require('../services/whatsapp');
const logger = require('../config/logger');

class ConversationHandler {
  /**
   * Process incoming WhatsApp message and generate appropriate response
   * @param {Object} messageData - Processed message data
   * @returns {Promise<Object>} - Response data
   */
  async handleIncomingMessage(messageData) {
    try {
      const { from, body, mediaUrl, messageType } = messageData;
      
      logger.info(`Processing message from ${from}: ${body}`);
      
      // Find or create user
      const user = await this.findOrCreateUser(from);
      
      // Save incoming message to database
      const savedMessage = await this.saveIncomingMessage(user._id, messageData);
      
      // Analyze message content and determine intent
      const intent = this.determineIntent(body);
      
      // Generate response based on intent
      const responseData = await this.generateResponse(user, intent, body, savedMessage._id);
      
      // Save outgoing message to database
      await this.saveOutgoingMessage(user._id, from, responseData.message, savedMessage._id, responseData.relatedQuery);
      
      // Send response via WhatsApp
      await whatsappService.sendTextMessage(from, responseData.message);
      
      return responseData;
    } catch (error) {
      logger.error(`Error handling incoming message: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Find existing user or create new one based on phone number
   * @param {string} phoneNumber - User's phone number
   * @returns {Promise<Object>} - User object
   */
  async findOrCreateUser(phoneNumber) {
    try {
      // Find existing user
      let user = await User.findOne({ phone: phoneNumber });
      
      // Create new user if not found
      if (!user) {
        user = await User.create({
          name: `WhatsApp User ${phoneNumber.substring(phoneNumber.length - 4)}`,
          phone: phoneNumber,
          whatsappVerified: true
        });
        logger.info(`Created new user from WhatsApp: ${user._id}`);
      }
      
      return user;
    } catch (error) {
      logger.error(`Error finding/creating user: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Save incoming message to database
   * @param {string} userId - User ID
   * @param {Object} messageData - Message data
   * @returns {Promise<Object>} - Saved message
   */
  async saveIncomingMessage(userId, messageData) {
    try {
      const { from, body, mediaUrl, messageType } = messageData;
      
      const message = await WhatsappMessage.create({
        user: userId,
        phoneNumber: from,
        direction: 'incoming',
        messageType: messageType || 'text',
        content: body,
        mediaUrl: mediaUrl,
        status: 'delivered'
      });
      
      return message;
    } catch (error) {
      logger.error(`Error saving incoming message: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Save outgoing message to database
   * @param {string} userId - User ID
   * @param {string} phoneNumber - Recipient phone number
   * @param {string} content - Message content
   * @param {string} replyToMessageId - ID of message being replied to
   * @param {string} relatedQueryId - ID of related query (if applicable)
   * @returns {Promise<Object>} - Saved message
   */
  async saveOutgoingMessage(userId, phoneNumber, content, replyToMessageId, relatedQueryId = null) {
    try {
      const message = await WhatsappMessage.create({
        user: userId,
        phoneNumber: phoneNumber,
        direction: 'outgoing',
        messageType: 'text',
        content: content,
        status: 'sent',
        relatedQuery: relatedQueryId
      });
      
      return message;
    } catch (error) {
      logger.error(`Error saving outgoing message: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Determine user intent from message content
   * @param {string} messageContent - Message content
   * @returns {string} - Determined intent
   */
  determineIntent(messageContent) {
    const content = messageContent.toLowerCase();
    
    // Check for greetings
    if (/^(hi|hello|hey|hujambo|habari|sasa)/.test(content)) {
      return 'greeting';
    }
    
    // Check for help request
    if (/help|assist|support|msaada/.test(content)) {
      return 'help';
    }
    
    // Check for legal query intents
    if (/arrest|arrested|kushikwa|police/.test(content)) {
      return 'arrest_query';
    }
    
    if (/bail|bond|dhamana/.test(content)) {
      return 'bail_query';
    }
    
    if (/court|hearing|kesi|mahakama/.test(content)) {
      return 'court_query';
    }
    
    if (/lawyer|advocate|wakili/.test(content)) {
      return 'lawyer_query';
    }
    
    if (/rights|haki/.test(content)) {
      return 'rights_query';
    }
    
    // Default to general query
    return 'general_query';
  }
  
  /**
   * Generate response based on user intent
   * @param {Object} user - User object
   * @param {string} intent - Determined intent
   * @param {string} messageContent - Original message content
   * @param {string} messageId - ID of incoming message
   * @returns {Promise<Object>} - Response data
   */
  async generateResponse(user, intent, messageContent, messageId) {
    try {
      let response = '';
      let relatedQueryId = null;
      
      switch (intent) {
        case 'greeting':
          response = `Hello! Welcome to the Kenya Criminal Legal Agent Assistant. How can I help you today? You can ask me about:
          
1. Your rights if arrested
2. Bail and bond procedures
3. Court processes
4. Finding a lawyer
5. Any other legal questions`;
          break;
          
        case 'help':
          response = `I'm here to help with your legal questions. Here are some things I can assist with:
          
1. Explaining your rights under Kenyan law
2. Providing information about arrest procedures
3. Explaining bail and bond processes
4. Guiding you through court procedures
5. Helping you understand legal documents

Just type your question, and I'll do my best to assist you.`;
          break;
          
        case 'arrest_query':
          // Create a query in the database
          const arrestQuery = await Query.create({
            user: user._id,
            queryText: messageContent,
            queryType: 'procedural_guidance',
            status: 'completed',
            answer: this.getArrestRightsResponse(),
            references: [
              {
                title: 'Constitution of Kenya',
                section: 'Article 49',
                text: 'Rights of arrested persons'
              },
              {
                title: 'Criminal Procedure Code',
                section: 'Section 21-24',
                text: 'Arrest procedures'
              }
            ],
            processingTime: 1.2
          });
          
          relatedQueryId = arrestQuery._id;
          response = this.getArrestRightsResponse();
          break;
          
        case 'bail_query':
          // Create a query in the database
          const bailQuery = await Query.create({
            user: user._id,
            queryText: messageContent,
            queryType: 'procedural_guidance',
            status: 'completed',
            answer: this.getBailInformationResponse(),
            references: [
              {
                title: 'Constitution of Kenya',
                section: 'Article 49(1)(h)',
                text: 'Right to bail'
              },
              {
                title: 'Criminal Procedure Code',
                section: 'Section 123',
                text: 'Bail procedures'
              }
            ],
            processingTime: 1.5
          });
          
          relatedQueryId = bailQuery._id;
          response = this.getBailInformationResponse();
          break;
          
        case 'court_query':
          // Create a query in the database
          const courtQuery = await Query.create({
            user: user._id,
            queryText: messageContent,
            queryType: 'procedural_guidance',
            status: 'completed',
            answer: this.getCourtProcessResponse(),
            references: [
              {
                title: 'Criminal Procedure Code',
                section: 'Section 200-205',
                text: 'Court procedures'
              }
            ],
            processingTime: 1.3
          });
          
          relatedQueryId = courtQuery._id;
          response = this.getCourtProcessResponse();
          break;
          
        case 'lawyer_query':
          response = `To find a lawyer in Kenya, you have several options:

1. Law Society of Kenya (LSK) - Contact them at +254 720 904 294 or visit www.lsk.or.ke
2. Legal Aid Centre of Eldoret (LACE) - For those in Western Kenya
3. Kituo Cha Sheria - Provides free legal advice, contact +254 727 773 991
4. FIDA Kenya - Specializes in women's rights issues

If you can't afford a lawyer, you may qualify for free legal aid under the Legal Aid Act. Would you like more specific information about legal aid services?`;
          break;
          
        case 'rights_query':
          // Create a query in the database
          const rightsQuery = await Query.create({
            user: user._id,
            queryText: messageContent,
            queryType: 'legal_definition',
            status: 'completed',
            answer: this.getLegalRightsResponse(),
            references: [
              {
                title: 'Constitution of Kenya',
                section: 'Article 49-51',
                text: 'Rights of arrested persons'
              }
            ],
            processingTime: 1.1
          });
          
          relatedQueryId = rightsQuery._id;
          response = this.getLegalRightsResponse();
          break;
          
        case 'general_query':
        default:
          // Create a general query in the database
          const generalQuery = await Query.create({
            user: user._id,
            queryText: messageContent,
            queryType: 'general',
            status: 'pending'
          });
          
          relatedQueryId = generalQuery._id;
          response = `Thank you for your question. I've recorded your query and our legal team will analyze it shortly. For complex legal matters, we recommend visiting our website at www.sureintel.co.ke for more comprehensive assistance.

In the meantime, is there any specific aspect of Kenyan criminal law you'd like to know about?`;
          
          // Simulate processing the query in the background
          this.processQueryInBackground(generalQuery._id);
          break;
      }
      
      return {
        message: response,
        intent: intent,
        relatedQuery: relatedQueryId
      };
    } catch (error) {
      logger.error(`Error generating response: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Process a query in the background (simulated)
   * @param {string} queryId - Query ID
   */
  async processQueryInBackground(queryId) {
    // Simulate background processing
    setTimeout(async () => {
      try {
        const query = await Query.findById(queryId);
        
        if (!query) {
          logger.error(`Query not found: ${queryId}`);
          return;
        }
        
        // Update query with results
        query.status = 'completed';
        query.answer = 'Based on Kenyan criminal law, this situation would typically be handled according to the Criminal Procedure Code. The specific details would depend on the exact circumstances of your case.';
        query.references = [
          {
            title: 'Criminal Procedure Code',
            section: 'Various sections',
            text: 'Relevant procedures for this type of case'
          }
        ];
        query.processingTime = 15.3; // seconds
        await query.save();
        
        // Get user
        const user = await User.findById(query.user);
        
        if (!user) {
          logger.error(`User not found for query: ${queryId}`);
          return;
        }
        
        // Send follow-up message
        const followUpMessage = `We've completed the analysis of your query. Here's what we found:

${query.answer}

Would you like more specific information about any aspect of this response?`;
        
        await whatsappService.sendTextMessage(user.phone, followUpMessage);
        
        // Save outgoing message
        await WhatsappMessage.create({
          user: user._id,
          phoneNumber: user.phone,
          direction: 'outgoing',
          messageType: 'text',
          content: followUpMessage,
          status: 'sent',
          relatedQuery: query._id
        });
        
        logger.info(`Processed query ${queryId} and sent follow-up message`);
      } catch (error) {
        logger.error(`Error in background query processing: ${error.message}`);
      }
    }, 15000); // Simulate 15 second processing time
  }
  
  /**
   * Get response for arrest rights queries
   * @returns {string} - Formatted response
   */
  getArrestRightsResponse() {
    return `If you are arrested in Kenya, you have the following rights:

1. Right to be informed promptly of the reason for arrest
2. Right to remain silent
3. Right to communicate with an advocate and other persons
4. Right to be brought before a court within 24 hours
5. Right not to be compelled to make any confession or admission
6. Right to be released on bond or bail on reasonable conditions
7. Right to be presumed innocent until proven guilty

If any of these rights are violated, inform your lawyer immediately as evidence obtained through rights violations may be inadmissible in court.`;
  }
  
  /**
   * Get response for bail information queries
   * @returns {string} - Formatted response
   */
  getBailInformationResponse() {
    return `Bail and Bond in Kenya:

Bail is a constitutional right under Article 49(1)(h) of the Constitution of Kenya. Here's what you need to know:

1. You can apply for bail at the police station (police bail) or in court
2. The court considers factors like the seriousness of the offense, your character, and flight risk
3. Bail can be granted with or without sureties (people who guarantee your appearance)
4. Bail amounts vary based on the offense and circumstances
5. If denied bail, you can appeal the decision to a higher court

For serious offenses like murder or terrorism, bail may be harder to obtain but is still possible.`;
  }
  
  /**
   * Get response for court process queries
   * @returns {string} - Formatted response
   */
  getCourtProcessResponse() {
    return `The Kenyan criminal court process follows these general steps:

1. Arrest and police custody (maximum 24 hours)
2. First appearance in court (plea taking)
3. Bail/bond application
4. Pre-trial procedures (disclosure of evidence)
5. Trial (prosecution and defense present cases)
6. Judgment and sentencing (if found guilty)
7. Appeal (if desired)

The process can take anywhere from a few months to several years depending on the complexity of the case and court backlog. During this time, you have the right to legal representation and fair treatment.`;
  }
  
  /**
   * Get response for legal rights queries
   * @returns {string} - Formatted response
   */
  getLegalRightsResponse() {
    return `Your Legal Rights in Kenya's Criminal Justice System:

1. Right to dignity and fair treatment
2. Right to legal representation (advocate of your choice)
3. Right to be presumed innocent until proven guilty
4. Right to remain silent and not incriminate yourself
5. Right to be informed of charges in a language you understand
6. Right to a fair and public trial without unreasonable delay
7. Right to be present
(Content truncated due to size limit. Use line ranges to read in chunks)