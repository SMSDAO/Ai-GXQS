-- init.sql
-- Initialize SmartPrompt Database

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('admin', 'dev', 'user')),
    api_key TEXT UNIQUE NOT NULL,
    rate_limit INTEGER DEFAULT 100,
    usage_count BIGINT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    wallet_address TEXT,
    score FLOAT DEFAULT 0,
    intent TEXT,
    status TEXT DEFAULT 'new',
    converted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    amount DECIMAL(20,8) NOT NULL,
    type TEXT NOT NULL,
    admin_share DECIMAL(20,8),
    dev_share DECIMAL(20,8),
    community_share DECIMAL(20,8),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    endpoint TEXT NOT NULL,
    duration_ms INTEGER,
    status INTEGER,
    cost DECIMAL(20,8),
    created_at TIMESTAMP DEFAULT NOW()
);
