const logger = require('../config/logger');
const Query = require('../models/Query');
const Document = require('../models/Document');
const WhatsappMessage = require('../models/WhatsappMessage');
const documentProcessingAgent = require('./documentProcessingAgent');
const reasoningAgent = require('./reasoningAgent');
const researchAgent = require('./researchAgent');
const caseLawAgent = require('./caseLawAgent');

/**
 * Integration Agent
 * Responsible for coordinating between different agents and
 * providing a unified interface for the legal assistant system
 */
class IntegrationAgent {
  /**
   * Process a user query
   * @param {string} queryText - The user's query text
   * @param {string} userId - User ID
   * @param {string} source - Source of the query (web, whatsapp, etc.)
   * @returns {Promise<Object>} - Processing results
   */
  async processQuery(queryText, userId, source = 'web') {
    try {
      logger.info(`IntegrationAgent: Processing query from ${source}: "${queryText.substring(0, 50)}..."`);
      
      // Create new query in database
      const query = new Query({
        userId,
        queryText,
        source,
        status: 'received',
        queryType: this.classifyQuery(queryText)
      });
      
      await query.save();
      
      // Start processing in background
      this.processQueryAsync(query._id);
      
      return {
        queryId: query._id,
        status: 'received',
        estimatedTime: this.estimateProcessingTime(queryText.length, query.queryType),
        message: 'Your query has been received and is being processed.'
      };
    } catch (error) {
      logger.error(`IntegrationAgent query error: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Process a document
   * @param {Object} documentData - Document data
   * @param {string} userId - User ID
   * @param {string} source - Source of the document (web, whatsapp, etc.)
   * @returns {Promise<Object>} - Processing results
   */
  async processDocument(documentData, userId, source = 'web') {
    try {
      logger.info(`IntegrationAgent: Processing document from ${source}: "${documentData.title}"`);
      
      // Create new document in database
      const document = new Document({
        userId,
        title: documentData.title,
        description: documentData.description || '',
        filePath: documentData.filePath,
        fileType: documentData.fileType,
        documentType: this.classifyDocument(documentData.title, documentData.description),
        source,
        status: 'received'
      });
      
      await document.save();
      
      // Start processing in background
      this.processDocumentAsync(document._id);
      
      return {
        documentId: document._id,
        status: 'received',
        estimatedTime: this.estimateProcessingTime(0, null, documentData.fileType),
        message: 'Your document has been received and is being processed.'
      };
    } catch (error) {
      logger.error(`IntegrationAgent document error: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Get query status and results
   * @param {string} queryId - Query ID
   * @returns {Promise<Object>} - Query status and results
   */
  async getQueryStatus(queryId) {
    try {
      const query = await Query.findById(queryId);
      
      if (!query) {
        throw new Error(`Query not found: ${queryId}`);
      }
      
      return {
        queryId,
        status: query.status,
        queryText: query.queryText,
        queryType: query.queryType,
        answer: query.answer,
        references: query.references,
        caseLaws: query.caseLaws,
        error: query.error,
        createdAt: query.createdAt,
        updatedAt: query.updatedAt
      };
    } catch (error) {
      logger.error(`IntegrationAgent status error: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Get document status and results
   * @param {string} documentId - Document ID
   * @returns {Promise<Object>} - Document status and results
   */
  async getDocumentStatus(documentId) {
    try {
      const document = await Document.findById(documentId);
      
      if (!document) {
        throw new Error(`Document not found: ${documentId}`);
      }
      
      return {
        documentId,
        status: document.status,
        title: document.title,
        documentType: document.documentType,
        analysis: document.analysis,
        recommendations: document.recommendations,
        error: document.error,
        createdAt: document.createdAt,
        updatedAt: document.updatedAt
      };
    } catch (error) {
      logger.error(`IntegrationAgent document status error: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Process a WhatsApp message
   * @param {string} message - Message text
   * @param {string} phone - Phone number
   * @returns {Promise<Object>} - Processing results
   */
  async processWhatsAppMessage(message, phone) {
    try {
      logger.info(`IntegrationAgent: Processing WhatsApp message from ${phone}: "${message.substring(0, 50)}..."`);
      
      // Save message to database
      const whatsappMessage = new WhatsappMessage({
        phone,
        message,
        direction: 'incoming',
        status: 'received'
      });
      
      await whatsappMessage.save();
      
      // Determine if this is a query or a document reference
      if (message.toLowerCase().includes('document:') || message.toLowerCase().includes('file:')) {
        // This is a document reference (in a real system, document would be attached)
        const title = message.split('\n')[0].replace(/document:|file:/i, '').trim();
        
        // Create placeholder document
        const documentData = {
          title,
          description: message,
          filePath: '/placeholder/path',
          fileType: 'text/plain'
        };
        
        // Get or create user ID from phone
        const userId = await this.getUserIdFromPhone(phone);
        
        // Process as document
        const result = await this.processDocument(documentData, userId, 'whatsapp');
        
        // Save response message
        const responseMessage = new WhatsappMessage({
          phone,
          message: `Your document "${title}" has been received and is being processed. You will receive the analysis shortly.`,
          direction: 'outgoing',
          status: 'sent',
          relatedMessageId: whatsappMessage._id
        });
        
        await responseMessage.save();
        
        return {
          messageId: whatsappMessage._id,
          responseId: responseMessage._id,
          documentId: result.documentId,
          status: 'processing_document'
        };
      } else {
        // This is a query
        // Get or create user ID from phone
        const userId = await this.getUserIdFromPhone(phone);
        
        // Process as query
        const result = await this.processQuery(message, userId, 'whatsapp');
        
        // Save response message
        const responseMessage = new WhatsappMessage({
          phone,
          message: `Your legal query has been received and is being processed. You will receive a response shortly.`,
          direction: 'outgoing',
          status: 'sent',
          relatedMessageId: whatsappMessage._id
        });
        
        await responseMessage.save();
        
        return {
          messageId: whatsappMessage._id,
          responseId: responseMessage._id,
          queryId: result.queryId,
          status: 'processing_query'
        };
      }
    } catch (error) {
      logger.error(`IntegrationAgent WhatsApp error: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Process a query asynchronously
   * @param {string} queryId - Query ID
   */
  async processQueryAsync(queryId) {
    try {
      // Update query status
      const query = await Query.findById(queryId);
      query.status = 'processing';
      await query.save();
      
      // Process with reasoning agent
      const reasoningResult = await reasoningAgent.processQuery(queryId);
      
      // Get additional case law
      const caseLawResults = await caseLawAgent.findCaseLawForQuery(queryId);
      
      // Update query with case law if not already included
      if (caseLawResults && caseLawResults.length > 0) {
        const updatedQuery = await Query.findById(queryId);
        
        // Add any case law not already in the results
        const existingCitations = new Set(updatedQuery.caseLaws.map(c => c.caseNumber || c.citation));
        const newCaseLaws = caseLawResults.filter(c => !existingCitations.has(c.citation));
        
        if (newCaseLaws.length > 0) {
          updatedQuery.caseLaws = [
            ...updatedQuery.caseLaws,
            ...newCaseLaws.map(c => ({
              caseNumber: c.citation,
              caseName: c.title,
              summary: c.summary
            }))
          ];
          
          await updatedQuery.save();
        }
      }
      
      // If this came from WhatsApp, send response via WhatsApp
      const query2 = await Query.findById(queryId);
      if (query2.source === 'whatsapp') {
        await this.sendWhatsAppQueryResponse(queryId);
      }
      
      logger.info(`IntegrationAgent: Completed processing query ${queryId}`);
    } catch (error) {
      logger.error(`IntegrationAgent async query error: ${error.message}`);
      
      // Update query status to failed
      try {
        const query = await Query.findById(queryId);
        if (query) {
          query.status = 'failed';
          query.error = error.message;
          await query.save();
          
          // If this came from WhatsApp, send error message
          if (query.source === 'whatsapp') {
            await this.sendWhatsAppErrorMessage(queryId, 'query');
          }
        }
      } catch (saveError) {
        logger.error(`Error updating query status: ${saveError.message}`);
      }
    }
  }
  
  /**
   * Process a document asynchronously
   * @param {string} documentId - Document ID
   */
  async processDocumentAsync(documentId) {
    try {
      // Update document status
      const document = await Document.findById(documentId);
      document.status = 'processing';
      await document.save();
      
      // Process with document processing agent
      const processingResult = await documentProcessingAgent.processDocument(documentId);
      
      // Get relevant case law
      const caseLawResults = await caseLawAgent.findCaseLawForDocument(documentId);
      
      // Update document with case law references
      if (caseLawResults && caseLawResults.length > 0) {
        const updatedDocument = await Document.findById(documentId);
        
        updatedDocument.caseLawReferences = caseLawResults.map(c => ({
          citation: c.citation,
          title: c.title,
          summary: c.summary
        }));
        
        await updatedDocument.save();
      }
      
      // If this came from WhatsApp, send response via WhatsApp
      const document2 = await Document.findById(documentId);
      if (document2.source === 'whatsapp') {
        await this.sendWhatsAppDocumentResponse(documentId);
      }
      
      logger.info(`IntegrationAgent: Completed processing document ${documentId}`);
    } catch (error) {
      logger.error(`IntegrationAgent async document error: ${error.message}`);
      
      // Update document status to failed
      try {
        const document = await Document.findById(documentId);
        if (document) {
          document.status = 'failed';
          document.error = error.message;
          await document.save();
          
          // If this came from WhatsApp, send error message
          if (document.source === 'whatsapp') {
            await this.sendWhatsAppErrorMessage(documentId, 'document');
          }
        }
      } catch (saveError) {
        logger.error(`Error updating document status: ${saveError.message}`);
      }
    }
  }
  
  /**
   * Send WhatsApp response for a query
   * @param {string} queryId - Query ID
   */
  async sendWhatsAppQueryResponse(queryId) {
    try {
      const query = await Query.findById(queryId);
      
      if (!query) {
        throw new Error(`Query not found: ${queryId}`);
      }
      
      // Get user's phone number
      const userId = query.userId;
      const phone = await this.getPhoneFromUserId(userId);
      
      if (!phone) {
        throw new Error(`Phone number not found for user: ${userId}`);
      }
      
      // Construct message
      let message = `*Legal Query Response*\n\n`;
      message += `*Your Question:*\n${query.queryText}\n\n`;
      message += `*Answer:*\n${query.answer}\n\n`;
      
      if (query.references && query.references.length > 0) {
        message += `*References:*\n`;
        query.references.forEach((ref, index) => {
          message += `${index + 1}. ${ref.title} ${ref.section}: ${ref.text}\n`;
        });
        message += '\n';
      }
      
      if (query.caseLaws && query.caseLaws.length > 0) {
        message += `*Relevant Case Law:*\n`;
        query.caseLaws.forEach((caselaw, index) => {
          message += `${index + 1}. ${caselaw.caseName} (${caselaw.caseNumber}): ${caselaw.summary}\n`;
        });
        message += '\n';
      }
      
      message += `For more detailed information, please visit our website at www.sureintel.co.ke or reply with any follow-up questions.`;
      
      // Save response message
      const whatsappMessage = new WhatsappMessage({
        phone,
        message,
        direction: 'outgoing',
        status: 'sent',
        relatedQueryId: queryId
      });
      
      await whatsappMessage.save();
      
      logger.info(`Sent WhatsApp response for query ${queryId} to ${phone}`);
    } catch (error) {
      logger.error(`Error sending WhatsApp query response: ${error.message}`);
    }
  }
  
  /**
   * Send WhatsApp response for a document
   * @param {string} documentId - Document ID
   */
  async sendWhatsAppDocumentResponse(documentId) {
    try {
      const document = await Document.findById(documentId);
      
      if (!document) {
        throw new Error(`Document not found: ${documentId}`);
      }
      
      // Get user's phone number
      const userId = document.userId;
      const phone = await this.getPhoneFromUserId(userId);
      
      if (!phone) {
        throw new Error(`Phone number not found for user: ${userId}`);
      }
      
      // Construct message
      let message = `*Document Analysis*\n\n`;
      message += `*Document:* ${document.title}\n\n`;
      message += `*Analysis:*\n${document.analysis}\n\n`;
      
      if (document.recommendations && document.recommendations.length > 0) {
        message += `*Recommendations:*\n`;
        document.recommendations.forEach((rec, index) => {
          message += `${index + 1}. ${rec}\n`;
        });
        message += '\n';
      }
      
      if (document.caseLawReferences && document.caseLawReferences.length > 0) {
        message += `*Relevant Case Law:*\n`;
        document.caseLawReferences.forEach((caselaw, index) => {
          message += `${index + 1}. ${caselaw.title} (${caselaw.citation}): ${caselaw.summary}\n`;
        });
        message += '\n';
      }
      
      message += `For more detailed analysis, please visit our website at www.sureintel.co.ke or reply with any follow-up questions.`;
      
      // Save response message
      const whatsappMessage = new WhatsappMessage({
        phone,
        message,
        direction: 'outgoing',
        status: 'sent',
        relatedDocumentId: documentId
      });
      
      await whatsappMessage.save();
      
      logger.info(`Sent WhatsApp response for document ${documentId} to ${phone}`);
    } catch (error) {
      logger.error(`Error sending WhatsApp document response: ${error.message}`);
    }
  }
  
  /**
   * Send WhatsA
(Content truncated due to size limit. Use line ranges to read in chunks)