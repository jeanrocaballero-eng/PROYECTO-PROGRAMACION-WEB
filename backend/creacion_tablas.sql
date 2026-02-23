-- Tabla usuarios
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contraseña VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_usuarios_email ON usuarios(email);

-- Tabla egresos
CREATE TABLE egresos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    monto FLOAT NOT NULL,
    categoria VARCHAR(50),
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE INDEX idx_egresos_usuario_id ON egresos(usuario_id);

-- CREACIÓN DE ADMIN
INSERT INTO usuarios (id, nombre, email, contraseña, is_admin, fecha_creacion)
VALUES (
    gen_random_uuid(),
    'Administrador',
    'admin@admin.com',
    'pbkdf2_sha256$120000$0a8a20b128d6d336bb5409a242e18a30$f91cef6cf0caba4f5224b9f2dad531fa1414ded864f2eea118837975c3d5f801',
    true,
    NOW()
);