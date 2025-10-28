-- Таблица с одноразовыми кодами активации
CREATE TABLE IF NOT EXISTS activation_codes (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    used_by_user_id INTEGER,
    used_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    activation_code VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Добавляем внешний ключ
ALTER TABLE activation_codes 
ADD CONSTRAINT fk_used_by_user 
FOREIGN KEY (used_by_user_id) REFERENCES users(id);

-- Вставляем коды активации
INSERT INTO activation_codes (code) VALUES
('DHHDUE'),
('DYUSUWI'),
('FFGSHS'),
('DUUDJEH'),
('CTYSWB'),
('FHUEBRV'),
('DUUWIW'),
('OWOWODH'),
('DUDYRV'),
('DUIEIEOGPFOD'),
('DISGEGV'),
('DUDGRVRV'),
('SUSIEIRU'),
('UDHEVVRBE'),
('DJHRVGRH'),
('SUSIKSJS'),
('DUDHRBJ'),
('SJSJJEHE'),
('UDUDHEHR'),
('DHHEJWKW'),
('DHEJJEBR'),
('DUISOWK'),
('DUDBDH'),
('SJWHHJD'),
('JDISKDDO'),
('UDHAGAG'),
('DJDHDUOG'),
('GPPHPHP'),
('ACCDIXIE'),
('HDUDUDHD');

-- Создаем индексы для быстрого поиска
CREATE INDEX idx_activation_codes_code ON activation_codes(code);
CREATE INDEX idx_activation_codes_is_used ON activation_codes(is_used);
CREATE INDEX idx_users_username ON users(username);