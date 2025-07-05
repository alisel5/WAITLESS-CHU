-- Create database
CREATE DATABASE waitless_chu;

-- Connect to the database
\c waitless_chu;

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create departments table
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    estimated_time_per_patient INTEGER NOT NULL DEFAULT 30, -- in minutes
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create queue_tickets table
CREATE TABLE queue_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_number VARCHAR(50) UNIQUE NOT NULL,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'waiting' CHECK (status IN ('waiting', 'called', 'completed', 'missed', 'cancelled')),
    position INTEGER NOT NULL,
    estimated_wait_time INTEGER NOT NULL, -- in minutes
    qr_code TEXT NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE NOT NULL,
    called_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    missed_count INTEGER DEFAULT 0,
    last_missed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create notifications table
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    ticket_id UUID NOT NULL REFERENCES queue_tickets(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL CHECK (type IN ('ticket_created', 'position_update', 'ticket_called', 'ticket_missed', 'ticket_completed')),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_queue_tickets_department_status ON queue_tickets(department_id, status);
CREATE INDEX idx_queue_tickets_user_id ON queue_tickets(user_id);
CREATE INDEX idx_queue_tickets_position ON queue_tickets(department_id, position);
CREATE INDEX idx_queue_tickets_status ON queue_tickets(status);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_ticket_id ON notifications(ticket_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_departments_updated_at BEFORE UPDATE ON departments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_queue_tickets_updated_at BEFORE UPDATE ON queue_tickets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample departments
INSERT INTO departments (name, description, estimated_time_per_patient) VALUES
('Cardiology', 'Heart and cardiovascular system', 45),
('Dermatology', 'Skin conditions and treatments', 30),
('Emergency', 'Urgent care and emergency services', 20),
('Neurology', 'Brain and nervous system disorders', 60),
('Orthopedics', 'Bones, joints, and musculoskeletal system', 40),
('Pediatrics', 'Children''s health and development', 35),
('Radiology', 'Medical imaging and diagnostics', 25);

-- Insert sample users
INSERT INTO users (name, email, phone) VALUES
('John Doe', 'john.doe@example.com', '+1234567890'),
('Jane Smith', 'jane.smith@example.com', '+1234567891'),
('Bob Johnson', 'bob.johnson@example.com', '+1234567892'),
('Alice Brown', 'alice.brown@example.com', '+1234567893'),
('Charlie Wilson', 'charlie.wilson@example.com', '+1234567894'); 