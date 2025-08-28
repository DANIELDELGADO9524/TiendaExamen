-- Crear base de datos
CREATE DATABASE TiendaDB;
GO

-- Usar la base de datos
USE TiendaDB;
GO

-- ========================
-- Tabla: Clientes
-- ========================
CREATE TABLE Clientes (
    IdCliente INT IDENTITY(1,1) PRIMARY KEY,
    Nombre NVARCHAR(100) NOT NULL,
    Apellidos NVARCHAR(100) NOT NULL,
    Direccion NVARCHAR(200),
    Password NVARCHAR(100) NOT NULL DEFAULT '1234',
    Activo BIT NOT NULL DEFAULT 1
);
GO

-- ========================
-- Tabla: Tiendas
-- ========================
CREATE TABLE Tiendas (
    IdTienda INT IDENTITY(1,1) PRIMARY KEY,
    Sucursal NVARCHAR(100) NOT NULL,
    Direccion NVARCHAR(200)
);
GO

-- ========================
-- Tabla: Articulos
-- ========================
CREATE TABLE Articulos (
    IdArticulo INT IDENTITY(1,1) PRIMARY KEY,
    Codigo NVARCHAR(50) NOT NULL,
    Descripcion NVARCHAR(200),
    Precio DECIMAL(10,2) NOT NULL,
    Imagen NVARCHAR(200),
    Stock INT NOT NULL
);
GO

-- ========================
-- Tabla: ArticuloTienda (relación muchos a muchos)
-- ========================
CREATE TABLE ArticuloTienda (
    IdArticulo INT NOT NULL,
    IdTienda INT NOT NULL,
    Fecha DATETIME NOT NULL DEFAULT GETDATE(),
    PRIMARY KEY (IdArticulo, IdTienda),
    FOREIGN KEY (IdArticulo) REFERENCES Articulos(IdArticulo),
    FOREIGN KEY (IdTienda) REFERENCES Tiendas(IdTienda)
);
GO

-- ========================
-- Tabla: ClienteArticulo (compras)
-- ========================
CREATE TABLE ClienteArticulo (
    IdCliente INT NOT NULL,
    IdArticulo INT NOT NULL,
    Fecha DATETIME NOT NULL DEFAULT GETDATE(),
    PRIMARY KEY (IdCliente, IdArticulo, Fecha),
    FOREIGN KEY (IdCliente) REFERENCES Clientes(IdCliente),
    FOREIGN KEY (IdArticulo) REFERENCES Articulos(IdArticulo)
);
GO

