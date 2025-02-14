# Explicación del Proyecto

Este archivo detalla la estructura del proyecto, el propósito de cada archivo y los patrones de diseño utilizados.

---

## **Estructura del Proyecto**
El presente proyecto sigue una estructura modular y organizada para demostrar los principios **SOLID** y el uso de patrones de diseño como **MVC (Model-View-Controller)** y **Dependency Injection**.

### **Estructura:**
```plaintext
src/
├── models/
│   ├── Order.js          # Define la estructura de los pedidos
│   ├── MenuItem.js       # Define la estructura de los elementos del menú
├── services/
│   ├── OrderService.js   # Contiene la lógica de negocio para gestionar pedidos
│   ├── NotificationService.js # Maneja las notificaciones mediante dependencias
│   ├── EmailNotification.js  # Implementación específica para enviar notificaciones por email
│   ├── SMSNotification.js    # Implementación específica para enviar notificaciones por SMS
├── interfaces/
│   ├── INotification.js  # Define una interfaz para las notificaciones
├── controllers/
│   ├── OrderController.js # Controlador que maneja las solicitudes relacionadas con pedidos
├── routes/
│   ├── orderRoutes.js    # Define las rutas de la API para gestionar pedidos
├── middlewares/
│   ├── errorHandler.js   # Middleware global para manejar errores
├── app.js                # Configura la aplicación Express
├── server.js             # Punto de entrada del servidor
```

---

## **Propósito de Cada Archivo**

### **1. `models/`**
Esta carpeta contiene las definiciones de los modelos del dominio.

- **`Order.js`:**
  Define la estructura de un pedido, como `id`, `menuItem`, `quantity`, y `status`. Este modelo sirve para representar pedidos en el sistema.

  ```javascript
  class Order {
      constructor(id, menuItem, quantity, status = 'created') {
          this.id = id;
          this.menuItem = menuItem;
          this.quantity = quantity;
          this.status = status;
      }
  }
  module.exports = Order;
  ```

- **`MenuItem.js`:**
  Define la estructura de los elementos del menú, como `name` y `price`. Puede extenderse para agregar categorías u opciones.

---

### **2. `services/`**
Contiene la lógica de negocio, siguiendo el principio de **Single Responsibility**.

- **`OrderService.js`:**
  Gestiona las operaciones de los pedidos, como crear, listar y eliminar. Se encarga de interactuar con los datos y las dependencias, como `NotificationService`.

- **`NotificationService.js`:**
  Actúa como un puente para las notificaciones. Usa **Dependency Injection** para recibir una implementación concreta (por ejemplo, `EmailNotification` o `SMSNotification`).

- **`EmailNotification.js` y `SMSNotification.js`:**
  Implementan la interfaz `INotification`. Esto sigue el principio de **Open/Closed**, permitiendo agregar nuevos métodos de notificación sin modificar el código existente.

---

### **3. `interfaces/`**
Define contratos para las clases, lo que asegura que las implementaciones cumplan con un estándar.

- **`INotification.js`:**
  Es una interfaz que declara el método `send(message)`. Las clases como `EmailNotification` y `SMSNotification` deben implementarla.

---

### **4. `controllers/`**
Controladores que manejan las solicitudes HTTP y delegan la lógica a los servicios.

- **`OrderController.js`:**
  Procesa solicitudes relacionadas con pedidos (`POST /orders`, `GET /orders`, `DELETE /orders/:id`). Sigue el principio de **Dependency Inversion**, ya que no depende directamente de `OrderService`, sino de abstracciones.

---

### **5. `routes/`**
Define las rutas de la API y las conecta con los controladores.

- **`orderRoutes.js`:**
  Mapea las rutas HTTP (`/orders`) a las funciones del controlador correspondiente. Sigue el patrón **Middleware Chain** de Express.

---

### **6. `middlewares/`**
Contiene middlewares reutilizables para el manejo de solicitudes y respuestas.

- **`errorHandler.js`:**
  Un middleware global para manejar errores. Garantiza que cualquier error no controlado devuelva una respuesta consistente al cliente.

---

### **7. Archivos raíz**
- **`app.js`:**
  Configura la aplicación Express, cargando middlewares y rutas.

- **`server.js`:**
  Punto de entrada del servidor. Inicia la aplicación y escucha en un puerto.

---

## **Patrón de Diseño: MVC + Dependency Injection**

### **1. MVC (Model-View-Controller)**
Este patrón organiza el proyecto en tres responsabilidades principales:
- **Modelos (Model):**
  Representan la estructura de los datos (por ejemplo, `Order.js` y `MenuItem.js`).
- **Controladores (Controller):**
  Manejan las solicitudes HTTP y delegan la lógica al servicio correspondiente.
- **Servicios (View/Business Logic):**
  Procesan la lógica de negocio y realizan operaciones en los datos.

**Ventaja:** Mantiene el código organizado, limpio y fácil de mantener.

---

### **2. Dependency Injection**
En lugar de que los servicios o controladores creen sus propias dependencias, estas se pasan como argumentos en el constructor. Por ejemplo:
```javascript
class OrderService {
    constructor(notification) {
        this.notificationService = notification;
    }
}
```
Esto sigue el principio de **Inversión de Dependencias (DIP)**:
- `OrderService` depende de una abstracción (`INotification`), no de una implementación concreta (`EmailNotification`).

---

## **Cómo los principios SOLID influyen en el diseño**
1. **Single Responsibility Principle:** Cada archivo tiene una responsabilidad específica (modelo, servicio, controlador, etc.).
2. **Open/Closed Principle:** Se pueden agregar nuevos tipos de notificaciones sin modificar el código existente.
3. **Liskov Substitution Principle:** Las implementaciones como `EmailNotification` pueden sustituir a `INotification` sin problemas.
4. **Interface Segregation Principle:** `INotification` tiene métodos específicos y pequeños.
5. **Dependency Inversion Principle:** Los servicios y controladores no dependen de implementaciones concretas, sino de abstracciones.

---
