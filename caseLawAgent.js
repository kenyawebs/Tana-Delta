const logger = require('../config/logger');
const Query = require('../models/Query');
const Document = require('../models/Document');
const researchAgent = require('./researchAgent');
const fs = require('fs').promises;
const path = require('path');

/**
 * Case Law Retrieval Agent
 * Responsible for finding and analyzing relevant case law
 * for legal queries and documents
 */
class CaseLawAgent {
  constructor() {
    // Initialize case law database
    this.caseLawDB = {
      criminal: {},
      constitutional: {},
      civil: {}
    };
    
    // Cache directory for storing case law results
    this.cacheDir = path.join(__dirname, '../cache/caselaw');
    
    // Initialize cache directory
    this.initializeCache();
    
    // Load case law database
    this.loadCaseLawDatabase();
  }
  
  /**
   * Initialize cache directory
   */
  async initializeCache() {
    try {
      await fs.mkdir(this.cacheDir, { recursive: true });
      logger.info('Case law cache directory initialized');
    } catch (error) {
      logger.error(`Error initializing case law cache: ${error.message}`);
    }
  }
  
  /**
   * Load case law database
   */
  async loadCaseLawDatabase() {
    try {
      // In a real implementation, this would load from a database or API
      // For now, we'll initialize with some sample data
      
      // Criminal cases
      this.caseLawDB.criminal['murder'] = [
        {
          citation: '[2017] eKLR',
          title: 'Francis Karioko Muruatetu & another v Republic',
          court: 'Supreme Court of Kenya',
          date: '2017-12-14',
          summary: 'Mandatory death sentence declared unconstitutional',
          url: 'http://kenyalaw.org/caselaw/cases/view/145409/'
        },
        {
          citation: '[2020] eKLR',
          title: 'Joseph Mwangi Gitau v Republic',
          court: 'Court of Appeal',
          date: '2020-03-20',
          summary: 'Elements required to prove murder clarified',
          url: 'http://kenyalaw.org/caselaw/cases/view/189765/'
        }
      ];
      
      this.caseLawDB.criminal['robbery'] = [
        {
          citation: '[2014] eKLR',
          title: 'Joseph Lendrix Waswa v Republic',
          court: 'Court of Appeal',
          date: '2014-10-31',
          summary: 'Elements of robbery with violence under Section 296(2)',
          url: 'http://kenyalaw.org/caselaw/cases/view/102347/'
        }
      ];
      
      // Constitutional cases
      this.caseLawDB.constitutional['bail'] = [
        {
          citation: '[2018] eKLR',
          title: 'Republic v Joktan Mayende & 4 others',
          court: 'High Court',
          date: '2018-03-23',
          summary: 'Bail is a constitutional right, not a privilege',
          url: 'http://kenyalaw.org/caselaw/cases/view/148746/'
        },
        {
          citation: '[2011] eKLR',
          title: 'Aboud Rogo Mohammed & another v Republic',
          court: 'High Court',
          date: '2011-05-17',
          summary: 'Burden of proving compelling reasons to deny bail rests with prosecution',
          url: 'http://kenyalaw.org/caselaw/cases/view/77060/'
        }
      ];
      
      logger.info('Case law database loaded successfully');
    } catch (error) {
      logger.error(`Error loading case law database: ${error.message}`);
    }
  }
  
  /**
   * Find relevant case law for a query
   * @param {string} queryId - ID of the query
   * @returns {Promise<Array>} - Relevant case law
   */
  async findCaseLawForQuery(queryId) {
    try {
      logger.info(`CaseLawAgent: Finding case law for query ${queryId}`);
      
      // Retrieve query from database
      const query = await Query.findById(queryId);
      
      if (!query) {
        throw new Error(`Query not found: ${queryId}`);
      }
      
      // Check cache first
      const cacheKey = `query_${queryId}`;
      const cacheResult = await this.checkCache(cacheKey);
      if (cacheResult) {
        logger.info(`CaseLawAgent: Found cached results for query ${queryId}`);
        return cacheResult;
      }
      
      // Extract keywords from query
      const keywords = this.extractKeywords(query.queryText);
      
      // Find relevant case law
      const caseLaw = await this.findRelevantCaseLaw(keywords, query.queryType);
      
      // Cache results
      await this.cacheResults(cacheKey, caseLaw);
      
      logger.info(`CaseLawAgent: Found ${caseLaw.length} relevant cases for query ${queryId}`);
      
      return caseLaw;
    } catch (error) {
      logger.error(`CaseLawAgent error: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Find relevant case law for a document
   * @param {string} documentId - ID of the document
   * @returns {Promise<Array>} - Relevant case law
   */
  async findCaseLawForDocument(documentId) {
    try {
      logger.info(`CaseLawAgent: Finding case law for document ${documentId}`);
      
      // Retrieve document from database
      const document = await Document.findById(documentId);
      
      if (!document) {
        throw new Error(`Document not found: ${documentId}`);
      }
      
      // Check cache first
      const cacheKey = `document_${documentId}`;
      const cacheResult = await this.checkCache(cacheKey);
      if (cacheResult) {
        logger.info(`CaseLawAgent: Found cached results for document ${documentId}`);
        return cacheResult;
      }
      
      // Extract keywords from document title and description
      const keywords = [
        ...this.extractKeywords(document.title),
        ...this.extractKeywords(document.description)
      ];
      
      // Find relevant case law
      const caseLaw = await this.findRelevantCaseLaw(keywords, document.documentType);
      
      // Cache results
      await this.cacheResults(cacheKey, caseLaw);
      
      logger.info(`CaseLawAgent: Found ${caseLaw.length} relevant cases for document ${documentId}`);
      
      return caseLaw;
    } catch (error) {
      logger.error(`CaseLawAgent error: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Find case law by citation
   * @param {string} citation - Case citation
   * @returns {Promise<Object>} - Case details
   */
  async findCaseByCitation(citation) {
    try {
      logger.info(`CaseLawAgent: Finding case by citation ${citation}`);
      
      // Check cache first
      const cacheKey = `citation_${citation.replace(/[\[\]\/\s]/g, '_')}`;
      const cacheResult = await this.checkCache(cacheKey);
      if (cacheResult) {
        logger.info(`CaseLawAgent: Found cached results for citation ${citation}`);
        return cacheResult;
      }
      
      // In a real implementation, this would search a database or API
      // For now, we'll use the research agent to simulate the search
      
      // Extract year and court from citation if possible
      let searchTerm = citation;
      if (citation.includes('eKLR')) {
        searchTerm = citation.replace(/[\[\]]/g, '');
      }
      
      const result = await researchAgent.researchCaseLaw(searchTerm);
      
      // Cache results
      await this.cacheResults(cacheKey, result);
      
      return result;
    } catch (error) {
      logger.error(`CaseLawAgent citation error: ${error.message}`);
      throw error;
    }
  }
  
  /**
   * Find relevant case law based on keywords and type
   * @param {Array} keywords - Keywords to search for
   * @param {string} type - Type of query or document
   * @returns {Promise<Array>} - Relevant case law
   */
  async findRelevantCaseLaw(keywords, type) {
    try {
      // Determine which category to search based on type
      let categories = ['criminal', 'constitutional', 'civil'];
      
      if (type === 'criminal' || type === 'legal_definition' || type === 'procedural_guidance') {
        categories = ['criminal', 'constitutional'];
      } else if (type === 'constitutional' || type === 'rights') {
        categories = ['constitutional', 'criminal'];
      } else if (type === 'civil') {
        categories = ['civil', 'constitutional'];
      }
      
      // Search for relevant cases
      const relevantCases = [];
      
      // Search each category
      for (const category of categories) {
        const categoryDB = this.caseLawDB[category];
        
        // Search each keyword
        for (const keyword of keywords) {
          if (categoryDB[keyword]) {
            relevantCases.push(...categoryDB[keyword]);
          }
        }
      }
      
      // If no cases found in our database, use research agent
      if (relevantCases.length === 0) {
        // Use the first 3 keywords for research
        const searchKeywords = keywords.slice(0, 3).join(' ');
        const researchResult = await researchAgent.researchCaseLaw(searchKeywords);
        
        if (researchResult.found && researchResult.cases.length > 0) {
          return researchResult.cases;
        }
      }
      
      // Remove duplicates
      const uniqueCases = [];
      const citations = new Set();
      
      for (const caseItem of relevantCases) {
        if (!citations.has(caseItem.citation)) {
          citations.add(caseItem.citation);
          uniqueCases.push(caseItem);
        }
      }
      
      return uniqueCases;
    } catch (error) {
      logger.error(`Error finding relevant case law: ${error.message}`);
      return [];
    }
  }
  
  /**
   * Extract keywords from text
   * @param {string} text - Text to extract keywords from
   * @returns {Array} - Extracted keywords
   */
  extractKeywords(text) {
    // In a real implementation, this would use NLP techniques
    // For now, we'll use a simple approach
    
    if (!text) return [];
    
    // Convert to lowercase and remove punctuation
    const cleanText = text.toLowerCase().replace(/[^\w\s]/g, '');
    
    // Split into words
    const words = cleanText.split(/\s+/);
    
    // Filter out common words
    const commonWords = new Set([
      'the', 'and', 'or', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'with',
      'by', 'about', 'as', 'of', 'from', 'is', 'are', 'was', 'were', 'be',
      'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
      'would', 'should', 'could', 'can', 'may', 'might', 'must', 'shall'
    ]);
    
    const filteredWords = words.filter(word => !commonWords.has(word) && word.length > 2);
    
    // Find legal keywords
    const legalKeywords = [
      'murder', 'robbery', 'theft', 'assault', 'bail', 'bond', 'arrest',
      'court', 'trial', 'appeal', 'sentence', 'evidence', 'witness',
      'prosecution', 'defense', 'rights', 'constitution', 'penal', 'criminal'
    ];
    
    const extractedKeywords = new Set();
    
    // Add legal keywords found in text
    for (const keyword of legalKeywords) {
      if (cleanText.includes(keyword)) {
        extractedKeywords.add(keyword);
      }
    }
    
    // Add other potentially relevant words
    for (const word of filteredWords) {
      if (word.length > 3) {
        extractedKeywords.add(word);
      }
    }
    
    return Array.from(extractedKeywords);
  }
  
  /**
   * Check cache for results
   * @param {string} cacheKey - Cache key
   * @returns {Promise<Object|null>} - Cached results or null if not found
   */
  async checkCache(cacheKey) {
    try {
      const cacheFile = path.join(this.cacheDir, `${cacheKey}.json`);
      const data = await fs.readFile(cacheFile, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      // File not found or other error
      return null;
    }
  }
  
  /**
   * Cache results
   * @param {string} cacheKey - Cache key
   * @param {Object} results - Results to cache
   */
  async cacheResults(cacheKey, results) {
    try {
      const cacheFile = path.join(this.cacheDir, `${cacheKey}.json`);
      await fs.writeFile(cacheFile, JSON.stringify(results, null, 2), 'utf8');
      logger.info(`Cached case law results to ${cacheFile}`);
    } catch (error) {
      logger.error(`Cache write error: ${error.message}`);
    }
  }
}

module.exports = new CaseLawAgent();
