-- Database Schema for Kenya Criminal Legal Agent Assistant

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone_number TEXT UNIQUE,
  name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  whatsapp_id TEXT UNIQUE,
  is_active BOOLEAN DEFAULT TRUE
);

-- Admin Table
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  phone_number TEXT UNIQUE,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE
);

-- API Keys Table
CREATE TABLE api_keys (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider TEXT NOT NULL,
  key TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  updated_by UUID REFERENCES admins(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Queries Table
CREATE TABLE user_queries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  query_text TEXT NOT NULL,
  query_type TEXT,
  legal_context TEXT,
  research_results JSONB,
  case_laws JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending'
);

-- User Documents Table
CREATE TABLE user_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  query_id UUID REFERENCES user_queries(id),
  document_name TEXT NOT NULL,
  document_type TEXT,
  document_path TEXT NOT NULL,
  extracted_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Generated Documents Table
CREATE TABLE generated_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  query_id UUID REFERENCES user_queries(id),
  document_type TEXT NOT NULL,
  document_content TEXT NOT NULL,
  document_path TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_finalized BOOLEAN DEFAULT FALSE
);

-- User Memory Table
CREATE TABLE user_memory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) UNIQUE,
  memory_data JSONB NOT NULL,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- WhatsApp Messages Table
CREATE TABLE whatsapp_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  message_id TEXT UNIQUE,
  message_content TEXT NOT NULL,
  is_from_user BOOLEAN NOT NULL,
  query_id UUID REFERENCES user_queries(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'sent'
);

-- Legal Statutes Table
CREATE TABLE legal_statutes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  statute_name TEXT NOT NULL,
  statute_text TEXT NOT NULL,
  category TEXT,
  source_url TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Case Law Table
CREATE TABLE case_law (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  case_number TEXT UNIQUE NOT NULL,
  case_name TEXT NOT NULL,
  case_summary TEXT,
  case_text TEXT NOT NULL,
  court TEXT,
  judge TEXT,
  verdict TEXT,
  date_decided DATE,
  source_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- System Settings Table
CREATE TABLE system_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  setting_name TEXT UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES admins(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Model Usage Table
CREATE TABLE model_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  query_id UUID REFERENCES user_queries(id),
  provider TEXT NOT NULL,
  model_id TEXT NOT NULL,
  tokens_used INTEGER NOT NULL,
  cost DECIMAL(10, 6),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Feedback Table
CREATE TABLE feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  query_id UUID REFERENCES user_queries(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  feedback_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_user_queries_user_id ON user_queries(user_id);
CREATE INDEX idx_user_documents_user_id ON user_documents(user_id);
CREATE INDEX idx_user_documents_query_id ON user_documents(query_id);
CREATE INDEX idx_generated_documents_user_id ON generated_documents(user_id);
CREATE INDEX idx_generated_documents_query_id ON generated_documents(query_id);
CREATE INDEX idx_whatsapp_messages_user_id ON whatsapp_messages(user_id);
CREATE INDEX idx_whatsapp_messages_query_id ON whatsapp_messages(query_id);
CREATE INDEX idx_model_usage_user_id ON model_usage(user_id);
CREATE INDEX idx_model_usage_query_id ON model_usage(query_id);
CREATE INDEX idx_feedback_user_id ON feedback(user_id);
CREATE INDEX idx_feedback_query_id ON feedback(query_id);
CREATE INDEX idx_case_law_case_number ON case_law(case_number);
