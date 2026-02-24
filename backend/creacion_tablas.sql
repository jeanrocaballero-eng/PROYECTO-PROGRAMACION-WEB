
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

<<<<<<< HEAD
-- Tabla para "cambio de contraseña" con PIN de 6 dígitos

CREATE TABLE IF NOT EXISTS cambio_password (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,

  pin CHAR(6) NOT NULL,
  expira_en TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  usado_tiempo TIMESTAMP WITHOUT TIME ZONE NULL,

  CONSTRAINT fk_cambio_password_user
    FOREIGN KEY (user_id) REFERENCES usuarios(id)
    ON DELETE CASCADE,

  -- Asegura que el PIN tenga exactamente 6 dígitos (solo números)
  CONSTRAINT chk_cambio_password_pin_6dig
    CHECK (pin ~ '^[0-9]{6}$')
);

-- Para validar rápido por user_id y/o buscar el PIN
CREATE INDEX IF NOT EXISTS ix_cambio_password_user_id
  ON cambio_password (user_id);

CREATE INDEX IF NOT EXISTS ix_cambio_password_pin
  ON cambio_password (pin);

--tabla historial_accesos--
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS historial_acceso (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NULL,                 -- null si el login falló y no identificas usuario
  email_intentado VARCHAR(100) NULL, -- útil para fallidos
  evento VARCHAR(20) NOT NULL,       -- LOGIN_OK / LOGIN_FAIL
  creado_en TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc'),
  CONSTRAINT fk_hist_user FOREIGN KEY (user_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS ix_hist_user_id ON historial_acceso (user_id);
CREATE INDEX IF NOT EXISTS ix_hist_creado_en ON historial_acceso (creado_en);
CREATE INDEX IF NOT EXISTS ix_hist_evento ON historial_acceso (evento);
=======
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