// Frontend test script for Kenya Criminal Legal Agent Assistant
// This script tests all major frontend functionality

describe('Kenya Criminal Legal Agent Assistant Frontend Tests', () => {
  // Responsive design tests
  describe('Responsive Design Tests', () => {
    const viewports = [
      { width: 375, height: 667, device: 'mobile' },
      { width: 768, height: 1024, device: 'tablet' },
      { width: 1280, height: 800, device: 'desktop' }
    ];
    
    viewports.forEach(viewport => {
      it(`Homepage should display correctly on ${viewport.device}`, () => {
        cy.viewport(viewport.width, viewport.height);
        cy.visit('/');
        
        // Check that key elements are visible
        cy.get('header').should('be.visible');
        cy.get('nav').should('exist');
        cy.get('footer').should('be.visible');
        
        // Check hero section
        cy.get('[data-testid="hero-section"]').should('be.visible');
        
        // Check that navigation is appropriate for viewport
        if (viewport.device === 'mobile') {
          cy.get('[data-testid="mobile-menu"]').should('exist');
          cy.get('[data-testid="desktop-menu"]').should('not.be.visible');
        } else {
          cy.get('[data-testid="desktop-menu"]').should('be.visible');
        }
      });
    });
  });
  
  // User authentication tests
  describe('Authentication Tests', () => {
    it('Should allow WhatsApp login', () => {
      cy.visit('/login');
      cy.get('[data-testid="whatsapp-login"]').should('be.visible');
      cy.get('[data-testid="phone-input"]').type('+254700000000');
      cy.get('[data-testid="login-button"]').click();
      
      // Should show verification code input
      cy.get('[data-testid="verification-code-input"]').should('be.visible');
      
      // Simulate entering verification code
      cy.get('[data-testid="verification-code-input"]').type('123456');
      cy.get('[data-testid="verify-button"]').click();
      
      // Should redirect to dashboard or home
      cy.url().should('include', '/dashboard');
    });
    
    it('Should show appropriate error for invalid phone number', () => {
      cy.visit('/login');
      cy.get('[data-testid="phone-input"]').type('invalid');
      cy.get('[data-testid="login-button"]').click();
      
      // Should show error message
      cy.get('[data-testid="error-message"]').should('be.visible');
      cy.get('[data-testid="error-message"]').should('contain', 'valid phone number');
    });
  });
  
  // Query submission tests
  describe('Query Submission Tests', () => {
    beforeEach(() => {
      // Login before each test
      cy.login('+254700000000');
    });
    
    it('Should allow submitting a legal query', () => {
      cy.visit('/query');
      cy.get('[data-testid="query-input"]').type('What are the legal requirements for bail in Kenya?');
      cy.get('[data-testid="submit-query-button"]').click();
      
      // Should show loading or processing state
      cy.get('[data-testid="query-processing"]').should('be.visible');
      
      // Should eventually redirect to results page
      cy.url().should('include', '/results');
    });
    
    it('Should validate query length', () => {
      cy.visit('/query');
      cy.get('[data-testid="submit-query-button"]').click();
      
      // Should show error for empty query
      cy.get('[data-testid="error-message"]').should('be.visible');
      
      // Try with very long query
      const longQuery = 'A'.repeat(2000);
      cy.get('[data-testid="query-input"]').type(longQuery);
      
      // Should show warning about length
      cy.get('[data-testid="length-warning"]').should('be.visible');
    });
  });
  
  // Document upload tests
  describe('Document Upload Tests', () => {
    beforeEach(() => {
      // Login before each test
      cy.login('+254700000000');
    });
    
    it('Should allow uploading a legal document', () => {
      cy.visit('/documents');
      cy.get('[data-testid="document-title"]').type('Test Charge Sheet');
      cy.get('[data-testid="document-description"]').type('A test charge sheet for system testing');
      
      // Upload file
      cy.get('[data-testid="document-upload"]').attachFile('test-document.pdf');
      
      // Submit form
      cy.get('[data-testid="upload-document-button"]').click();
      
      // Should show loading or processing state
      cy.get('[data-testid="document-processing"]').should('be.visible');
      
      // Should eventually redirect to results page
      cy.url().should('include', '/results');
    });
    
    it('Should validate document type', () => {
      cy.visit('/documents');
      
      // Try with invalid file type
      cy.get('[data-testid="document-upload"]').attachFile('invalid-file.exe');
      
      // Should show error for invalid file type
      cy.get('[data-testid="error-message"]').should('be.visible');
      cy.get('[data-testid="error-message"]').should('contain', 'file type');
    });
  });
  
  // Results display tests
  describe('Results Display Tests', () => {
    beforeEach(() => {
      // Login and set up a completed query
      cy.login('+254700000000');
      cy.setupCompletedQuery();
    });
    
    it('Should display query results correctly', () => {
      cy.visit('/results/query/123456');
      
      // Check that key elements are visible
      cy.get('[data-testid="query-text"]').should('be.visible');
      cy.get('[data-testid="query-answer"]').should('be.visible');
      cy.get('[data-testid="references-section"]').should('exist');
      cy.get('[data-testid="case-law-section"]').should('exist');
    });
    
    it('Should allow downloading results as PDF', () => {
      cy.visit('/results/query/123456');
      
      // Click download button
      cy.get('[data-testid="download-pdf-button"]').click();
      
      // Should trigger download
      cy.verifyDownload('legal-query-results.pdf');
    });
  });
  
  // Admin interface tests
  describe('Admin Interface Tests', () => {
    beforeEach(() => {
      // Login as admin
      cy.loginAsAdmin();
    });
    
    it('Should display admin dashboard correctly', () => {
      cy.visit('/admin');
      
      // Check that key elements are visible
      cy.get('[data-testid="stats-overview"]').should('be.visible');
      cy.get('[data-testid="recent-queries-table"]').should('be.visible');
      cy.get('[data-testid="recent-documents-table"]').should('be.visible');
    });
    
    it('Should allow managing users', () => {
      cy.visit('/admin/users');
      
      // Check that user table is visible
      cy.get('[data-testid="users-table"]').should('be.visible');
      
      // Test adding a new user
      cy.get('[data-testid="add-user-button"]').click();
      cy.get('[data-testid="user-name-input"]').type('New Test User');
      cy.get('[data-testid="user-phone-input"]').type('+254711111111');
      cy.get('[data-testid="user-email-input"]').type('newtest@example.com');
      cy.get('[data-testid="save-user-button"]').click();
      
      // Should show success message
      cy.get('[data-testid="success-message"]').should('be.visible');
      
      // New user should appear in table
      cy.get('[data-testid="users-table"]').should('contain', 'New Test User');
    });
    
    it('Should allow changing system settings', () => {
      cy.visit('/admin/settings');
      
      // Toggle a setting
      cy.get('[data-testid="whatsapp-enabled-toggle"]').click();
      
      // Change a numeric setting
      cy.get('[data-testid="max-query-length-input"]').clear().type('1500');
      
      // Save settings
      cy.get('[data-testid="save-settings-button"]').click();
      
      // Should show success message
      cy.get('[data-testid="success-message"]').should('be.visible');
    });
  });
  
  // WhatsApp integration visual tests
  describe('WhatsApp Integration Visual Tests', () => {
    it('Should display WhatsApp QR code on contact page', () => {
      cy.visit('/contact');
      
      // Check that WhatsApp QR code is visible
      cy.get('[data-testid="whatsapp-qr-code"]').should('be.visible');
    });
    
    it('Should have WhatsApp chat button throughout site', () => {
      // Check homepage
      cy.visit('/');
      cy.get('[data-testid="whatsapp-chat-button"]').should('be.visible');
      
      // Check query page
      cy.visit('/query');
      cy.get('[data-testid="whatsapp-chat-button"]').should('be.visible');
      
      // Check about page
      cy.visit('/about');
      cy.get('[data-testid="whatsapp-chat-button"]').should('be.visible');
    });
  });
  
  // Accessibility tests
  describe('Accessibility Tests', () => {
    const pagesToTest = ['/', '/query', '/documents', '/about', '/contact', '/services'];
    
    pagesToTest.forEach(page => {
      it(`${page} should be accessible`, () => {
        cy.visit(page);
        cy.injectAxe();
        cy.checkA11y();
      });
    });
  });
});
