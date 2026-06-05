# Guía README: herramientas para diseñar y automatizar pruebas

> Última revisión: 2026-06-05. Los precios cambian con frecuencia; antes de comprar, valida siempre la página oficial de pricing de cada herramienta.

## 1. Cómo elegir herramienta

No se elige una herramienta solo por lenguaje. Se elige por **tipo de prueba**, **framework del proyecto**, **equipo**, **presupuesto** y **nivel de mantenimiento aceptable**.

| Necesidad | Tipo de prueba | Herramientas típicas |
|---|---|---|
| Validar funciones pequeñas | Unitarias | Jest, Vitest, JUnit, pytest, unittest |
| Validar componentes UI aislados | Component/component testing | React Testing Library, Angular Testing Library, Cypress Component Testing |
| Validar endpoints y códigos HTTP | API/backend | Postman, Supertest, MockMvc, REST Assured, FastAPI TestClient, Django test client |
| Validar flujos reales de usuario | E2E/UI | Playwright, Cypress, Selenium, WebdriverIO |
| Validar contratos entre servicios | Contract testing | Pact, OpenAPI/Swagger, Postman contract tests |
| Simular dependencias externas | Mocks/stubs | WireMock, Mock Service Worker, Postman mock servers |
| Probar con base de datos real temporal | Integración | Testcontainers |
| Medir carga y rendimiento | Performance/load testing | k6, JMeter, Gatling, Locust |
| Diseñar casos legibles por negocio | BDD | Cucumber/Gherkin, Behave, Gauge |
| Gestionar casos manuales y automatizados | Test management | TestRail, Zephyr, Xray, Qase |
| Medir calidad y cobertura | Quality/coverage | SonarQube, JaCoCo, Istanbul/nyc, pytest-cov |

---

## 2. Recomendación rápida por stack

### React / Next.js / Vite

| Tipo | Recomendación | Complejidad |
|---|---|---|
| Unitarias | Vitest o Jest | Baja |
| Componentes | React Testing Library | Media |
| E2E | Playwright | Media |
| API Node | Supertest + Jest/Vitest | Media |
| Mocks de API | MSW | Media |

### Angular

| Tipo | Recomendación | Complejidad |
|---|---|---|
| Unitarias | Vitest en Angular moderno; Jasmine/Karma en proyectos existentes | Media |
| Componentes | Angular Testing Library o TestBed | Media |
| E2E | Playwright o Cypress | Media |

### Java / Spring Boot

| Tipo | Recomendación | Complejidad |
|---|---|---|
| Unitarias | JUnit 5 + Mockito | Baja-media |
| Controller/API sin servidor real | MockMvc | Media |
| API real | REST Assured o TestRestTemplate/WebTestClient | Media |
| DB/servicios reales | Testcontainers | Media-alta |
| UI/E2E | Playwright Java o Selenium | Media-alta |

### Python / FastAPI / Django / Flask

| Tipo | Recomendación | Complejidad |
|---|---|---|
| Unitarias | pytest | Baja |
| FastAPI API | pytest + TestClient | Baja-media |
| Django | Django TestCase o pytest-django | Media |
| E2E/UI | Playwright Python o Selenium | Media |
| Carga | Locust o k6 | Media |

---

## 3. Herramientas de E2E / UI

### Playwright

- **Link:** https://playwright.dev/
- **Uso:** pruebas E2E, pruebas de UI, pruebas cross-browser, grabación con codegen.
- **Lenguajes:** TypeScript, JavaScript, Python, Java, .NET.
- **Frameworks compatibles:** React, Angular, Vue, Svelte, Next.js, Nuxt, apps web en general.
- **Precio:** open source/gratis. El costo aparece si usas infraestructura externa de ejecución, por ejemplo GitHub Actions, Azure, BrowserStack, etc.
- **Complejidad:** media. Muy buena para proyectos modernos.
- **Requisitos previos:** Node.js para JS/TS; Python para Python; JDK para Java. También instala navegadores.

Configuración TypeScript:

```bash
npm init playwright@latest
npx playwright test
npx playwright show-report
```

Ejemplo:

```ts
import { test, expect } from '@playwright/test';

test('login inválido muestra error', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  await page.getByLabel('Email').fill('admin@test.com');
  await page.getByLabel('Contraseña').fill('wrong');
  await page.getByRole('button', { name: /ingresar/i }).click();

  await expect(page.getByText('Credenciales inválidas')).toBeVisible();
  await expect(page).toHaveURL(/login/);
});
```

Codegen:

```bash
npx playwright codegen http://localhost:3000/login
```

Cuándo usarlo:

- Login, registro, checkout, formularios críticos.
- Validación visual funcional, no necesariamente pixel-perfect.
- Cross-browser con Chromium, Firefox y WebKit.

Cuándo evitarlo:

- Para toda la lógica pequeña del sistema. Es mejor cubrir eso con unitarias/API.

---

### Cypress

- **Link:** https://docs.cypress.io/
- **Pricing:** https://www.cypress.io/pricing
- **Uso:** E2E, component testing, debugging visual, grabación/ayuda con Cypress Studio.
- **Lenguajes:** JavaScript y TypeScript.
- **Frameworks compatibles:** React, Angular, Vue, Svelte, Next.js y apps web.
- **Precio:** Cypress App es gratis/open source. Cypress Cloud tiene plan gratuito y planes pagos para dashboard, paralelización, analytics, flake management y grabaciones.
- **Complejidad:** baja-media. Muy amigable para comenzar.
- **Requisitos previos:** Node.js.

Configuración:

```bash
npm install -D cypress
npx cypress open
```

Ejemplo:

```ts
describe('Login', () => {
  it('muestra error con credenciales inválidas', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('admin@test.com');
    cy.get('input[name="password"]').type('wrong');
    cy.contains('button', 'Ingresar').click();

    cy.contains('Credenciales inválidas').should('be.visible');
    cy.url().should('include', '/login');
  });
});
```

Cuándo usarlo:

- Equipos frontend que quieren feedback visual rápido.
- Component testing en React/Angular/Vue.
- Proyectos donde el dashboard de Cypress Cloud aporte valor.

Cuándo evitarlo:

- Si necesitas soporte multi-lenguaje. Playwright o Selenium cubren más lenguajes.

---

### Selenium WebDriver

- **Link:** https://www.selenium.dev/documentation/webdriver/
- **Uso:** automatización de navegador, E2E, suites enterprise antiguas o multi-lenguaje.
- **Lenguajes:** Java, Python, JavaScript, C#, Ruby, Kotlin y más.
- **Frameworks compatibles:** cualquier app web.
- **Precio:** gratis/open source. Puede requerir servicios pagos si ejecutas en cloud/device farms.
- **Complejidad:** media-alta. Más configuración y mantenimiento que Playwright/Cypress en muchos casos.
- **Requisitos previos:** depende del lenguaje. En versiones modernas, Selenium Manager ayuda con drivers.

Configuración Java Maven:

```xml
<dependency>
  <groupId>org.seleniumhq.selenium</groupId>
  <artifactId>selenium-java</artifactId>
  <version>4.28.0</version>
  <scope>test</scope>
</dependency>
```

Ejemplo Java + JUnit:

```java
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import static org.junit.jupiter.api.Assertions.assertTrue;

class LoginTest {
  @Test
  void invalidLoginShowsError() {
    WebDriver driver = new ChromeDriver();
    try {
      driver.get("http://localhost:3000/login");
      driver.findElement(By.name("email")).sendKeys("admin@test.com");
      driver.findElement(By.name("password")).sendKeys("wrong");
      driver.findElement(By.cssSelector("button[type='submit']")).click();

      assertTrue(driver.getPageSource().contains("Credenciales inválidas"));
    } finally {
      driver.quit();
    }
  }
}
```

Cuándo usarlo:

- Empresas con suites Selenium existentes.
- Necesidad multi-lenguaje muy amplia.
- Integraciones con grids de navegadores.

---

### WebdriverIO

- **Link:** https://webdriver.io/
- **Uso:** E2E y browser automation en JavaScript/TypeScript, sobre WebDriver o DevTools.
- **Precio:** gratis/open source.
- **Complejidad:** media.

Configuración:

```bash
npm init wdio@latest .
npx wdio run ./wdio.conf.js
```

---

## 4. Herramientas unitarias y de componentes JS/TS

### Vitest

- **Link:** https://vitest.dev/
- **Uso:** pruebas unitarias, integración ligera y componentes en proyectos Vite/modernos.
- **Frameworks compatibles:** React, Vue, Svelte, Angular moderno, Node, librerías TS/JS.
- **Precio:** gratis/open source.
- **Complejidad:** baja.
- **Requisitos previos:** Node.js.

Configuración:

```bash
npm install -D vitest
```

`package.json`:

```json
{
  "scripts": {
    "test": "vitest",
    "test:coverage": "vitest run --coverage"
  }
}
```

Ejemplo:

```ts
import { describe, expect, it } from 'vitest';

function sum(a: number, b: number) {
  return a + b;
}

describe('sum', () => {
  it('suma dos números', () => {
    expect(sum(2, 3)).toBe(5);
  });
});
```

---

### Jest

- **Link:** https://jestjs.io/docs/getting-started
- **Uso:** unitarias, integración ligera, snapshots, mocks.
- **Frameworks compatibles:** React, Node, NestJS, Next.js, librerías JS/TS.
- **Precio:** gratis/open source.
- **Complejidad:** baja-media. Con TypeScript puede requerir Babel, ts-jest o configuración adicional.

Configuración básica:

```bash
npm install -D jest
npm pkg set scripts.test="jest"
```

Ejemplo:

```js
function sum(a, b) {
  return a + b;
}

test('suma dos números', () => {
  expect(sum(2, 3)).toBe(5);
});
```

---

### React Testing Library

- **Link:** https://testing-library.com/docs/react-testing-library/intro/
- **Uso:** pruebas de componentes React desde la perspectiva del usuario.
- **Compatible con:** React, Next.js, Vite, CRA. Se usa con Jest o Vitest.
- **Precio:** gratis/open source.
- **Complejidad:** baja-media.

Configuración con Vitest:

```bash
npm install -D @testing-library/react @testing-library/jest-dom jsdom vitest
```

Ejemplo:

```tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { expect, test } from 'vitest';

function LoginButton({ enabled }: { enabled: boolean }) {
  return <button disabled={!enabled}>Ingresar</button>;
}

test('el botón queda deshabilitado', () => {
  render(<LoginButton enabled={false} />);
  expect(screen.getByRole('button', { name: /ingresar/i })).toBeDisabled();
});
```

---

### Angular Testing Library / Angular TestBed

- **Angular testing:** https://angular.dev/guide/testing
- **Angular + Karma/Jasmine:** https://angular.dev/guide/testing/karma
- **Migración a Vitest:** https://angular.dev/guide/testing/migrating-to-vitest
- **Uso:** servicios, componentes, pipes, directivas.
- **Precio:** gratis/open source.
- **Complejidad:** media.

Configuración Angular moderna:

```bash
ng test
```

En proyectos Angular nuevos, revisa si el runner es Vitest. En proyectos existentes, es común encontrar Jasmine/Karma.

---

## 5. Herramientas de API/backend

### Postman

- **Link:** https://www.postman.com/
- **Docs testing:** https://learning.postman.com/docs/tests-and-scripts/write-scripts/test-scripts/
- **Pricing:** https://www.postman.com/pricing/
- **Uso:** diseño y prueba de APIs, colecciones, environments, scripts de test, mocks, documentación, monitores.
- **Compatible con:** cualquier API REST, GraphQL, gRPC y otros protocolos soportados por Postman.
- **Precio:** tiene plan Free. En la página oficial consultada aparecen planes Solo, Team y Enterprise con precios por usuario/mes facturados anualmente.
- **Complejidad:** baja-media.

Ejemplo de test Postman:

```js
pm.test('status es 401', function () {
  pm.response.to.have.status(401);
});

pm.test('mensaje correcto', function () {
  const body = pm.response.json();
  pm.expect(body.message).to.eql('Credenciales inválidas');
});
```

Cuándo usarlo:

- Diseñar casos API antes de automatizarlos en código.
- Compartir colecciones con QA/devs.
- Ejecutar smoke tests de API en CI con Postman CLI/Newman.

---

### Insomnia

- **Link:** https://insomnia.rest/
- **Uso:** cliente API para REST, GraphQL, gRPC, environments.
- **Precio:** tiene opciones gratuitas y planes pagos según colaboración/empresa.
- **Complejidad:** baja.

---

### Bruno

- **Link:** https://www.usebruno.com/
- **Uso:** cliente API orientado a archivos locales versionables en Git.
- **Precio:** app base open source; puede tener planes pagos/pro.
- **Complejidad:** baja.

---

### Supertest

- **Link:** https://www.npmjs.com/package/supertest
- **Uso:** pruebas HTTP para apps Node, Express, NestJS, Koa, Fastify.
- **Precio:** gratis/open source.
- **Complejidad:** baja-media.

Configuración:

```bash
npm install -D supertest jest
```

Ejemplo:

```js
const request = require('supertest');
const app = require('./app');

test('login inválido devuelve 401', async () => {
  const response = await request(app)
    .post('/login')
    .send({ email: 'admin@test.com', password: 'wrong' });

  expect(response.status).toBe(401);
  expect(response.body.message).toBe('Credenciales inválidas');
});
```

---

### Spring Boot: JUnit 5, Mockito, MockMvc, WebTestClient, REST Assured

#### JUnit 5

- **Link:** https://junit.org/junit5/
- **Docs:** https://docs.junit.org/current/user-guide/
- **Uso:** unitarias e integración en Java.
- **Precio:** gratis/open source.
- **Complejidad:** baja-media.

#### Mockito

- **Link:** https://site.mockito.org/
- **Uso:** mocks de dependencias en pruebas unitarias Java.
- **Precio:** gratis/open source.
- **Complejidad:** media.

#### MockMvc

- **Link:** https://docs.spring.io/spring-framework/reference/testing/mockmvc.html
- **Uso:** probar controladores Spring MVC sin levantar servidor real completo.
- **Precio:** incluido en Spring Test; gratis/open source.
- **Complejidad:** media.

Ejemplo MockMvc:

```java
@WebMvcTest(AuthController.class)
class AuthControllerTest {
  @Autowired MockMvc mockMvc;

  @Test
  void invalidLoginShouldReturn401() throws Exception {
    mockMvc.perform(post("/auth/login")
        .contentType(MediaType.APPLICATION_JSON)
        .content("""
          {"email":"admin@test.com","password":"wrong"}
        """))
      .andExpect(status().isUnauthorized())
      .andExpect(jsonPath("$.message").value("Credenciales inválidas"));
  }
}
```

#### REST Assured

- **Link:** https://rest-assured.io/
- **Docs:** https://rest-assured.io/docs
- **Uso:** pruebas de API REST en Java con sintaxis fluida.
- **Precio:** gratis/open source.
- **Complejidad:** media.

Configuración Maven:

```xml
<dependency>
  <groupId>io.rest-assured</groupId>
  <artifactId>rest-assured</artifactId>
  <version>6.0.0</version>
  <scope>test</scope>
</dependency>
```

Ejemplo:

```java
given()
  .contentType("application/json")
  .body("""
    {"email":"admin@test.com","password":"wrong"}
  """)
.when()
  .post("http://localhost:8080/auth/login")
.then()
  .statusCode(401)
  .body("message", equalTo("Credenciales inválidas"));
```

---

### FastAPI TestClient + pytest

- **FastAPI testing:** https://fastapi.tiangolo.com/tutorial/testing/
- **pytest:** https://docs.pytest.org/
- **Uso:** endpoints FastAPI, status codes, JSON, auth, validaciones.
- **Precio:** gratis/open source.
- **Complejidad:** baja-media.

Configuración:

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install fastapi httpx pytest
```

Ejemplo:

```python
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_invalid_login_returns_401():
    response = client.post('/login', json={
        'email': 'admin@test.com',
        'password': 'wrong'
    })

    assert response.status_code == 401
    assert response.json()['detail'] == 'Credenciales inválidas'
```

---

### Django TestCase / pytest-django

- **Django testing:** https://docs.djangoproject.com/en/stable/topics/testing/
- **pytest-django:** https://pytest-django.readthedocs.io/
- **Uso:** modelos, vistas, formularios, templates, APIs Django/DRF.
- **Precio:** gratis/open source.
- **Complejidad:** media.

Ejemplo Django TestCase:

```python
from django.test import TestCase
from django.urls import reverse

class LoginViewTests(TestCase):
    def test_invalid_login_returns_error(self):
        response = self.client.post(reverse('login'), {
            'email': 'admin@test.com',
            'password': 'wrong'
        })

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Credenciales inválidas')
```

---

## 6. Diseño de pruebas API y contratos

### Swagger / OpenAPI

- **Link:** https://swagger.io/specification/
- **Uso:** definir el contrato de una API: endpoints, parámetros, respuestas, status codes, schemas.
- **Precio:** especificación abierta/gratis. Herramientas comerciales de SwaggerHub tienen planes pagos.
- **Complejidad:** media.

Ejemplo mínimo:

```yaml
paths:
  /login:
    post:
      responses:
        '200':
          description: Login exitoso
        '401':
          description: Credenciales inválidas
```

### Pact

- **Link:** https://docs.pact.io/
- **Uso:** contract testing entre consumidor y proveedor. Muy útil en microservicios.
- **Precio:** Pact open source es gratis; PactFlow es producto cloud pago.
- **Complejidad:** alta.

Cuándo usarlo:

- Frontend y backend evolucionan por separado.
- Microservicios donde no quieres depender de ambientes completos para validar compatibilidad.

---

## 7. Mocks, stubs y servicios simulados

### Mock Service Worker, MSW

- **Link:** https://mswjs.io/
- **Uso:** mock de APIs REST, GraphQL y WebSocket en browser y Node.
- **Compatible con:** React, Vue, Angular, Next.js, Storybook, Vitest, Jest, Playwright.
- **Precio:** gratis/open source.
- **Complejidad:** media.

Configuración:

```bash
npm install -D msw
npx msw init public/ --save
```

Ejemplo handler:

```ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/login', () => {
    return HttpResponse.json(
      { message: 'Credenciales inválidas' },
      { status: 401 }
    );
  })
];
```

Cuándo usarlo:

- Probar frontend sin backend real.
- Simular errores 401, 500, timeouts.
- Storybook o pruebas de componentes.

---

### WireMock

- **Link:** https://wiremock.org/
- **Cloud pricing:** https://www.wiremock.io/get-pricing
- **Uso:** simular APIs HTTP externas, errores, latencia, respuestas específicas.
- **Compatible con:** Java, Docker, standalone server, cualquier app que consuma HTTP.
- **Precio:** WireMock open source es gratis. WireMock Cloud tiene plan gratuito/trial y planes pagos.
- **Complejidad:** media.

Docker rápido:

```bash
docker run -it --rm -p 8080:8080 wiremock/wiremock
```

Ejemplo stub:

```bash
curl -X POST http://localhost:8080/__admin/mappings \
  -H 'Content-Type: application/json' \
  -d '{
    "request": { "method": "GET", "url": "/users/1" },
    "response": { "status": 200, "jsonBody": { "id": 1, "name": "Angela" } }
  }'
```

---

## 8. Testcontainers: integración con dependencias reales

- **Link:** https://testcontainers.com/
- **Getting started:** https://testcontainers.com/getting-started/
- **Uso:** levantar bases de datos, Redis, Kafka, RabbitMQ, Selenium browsers, WireMock, etc. como contenedores temporales durante pruebas.
- **Lenguajes:** Java, .NET, Go, Node.js, Python, Rust y más.
- **Precio:** librerías open source gratis. Requiere Docker o runtime compatible. Testcontainers Desktop existe como complemento.
- **Complejidad:** media-alta.

Cuándo usarlo:

- Probar repositorios con PostgreSQL/MySQL real.
- Probar integración con Redis/Kafka sin depender de ambientes compartidos.
- Evitar diferencias entre H2 y la base real.

Java Maven ejemplo PostgreSQL:

```xml
<dependency>
  <groupId>org.testcontainers</groupId>
  <artifactId>postgresql</artifactId>
  <version>1.20.4</version>
  <scope>test</scope>
</dependency>
```

Ejemplo conceptual:

```java
@Testcontainers
class UserRepositoryTest {
  @Container
  static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16");

  @Test
  void containerStarts() {
    assertTrue(postgres.isRunning());
  }
}
```

---

## 9. BDD: diseñar pruebas como comportamiento

### Cucumber + Gherkin

- **Link:** https://cucumber.io/
- **Gherkin docs:** https://cucumber.io/docs/gherkin/
- **Installation:** https://cucumber.io/docs/installation/
- **Uso:** escribir escenarios entendibles por negocio, QA y desarrollo.
- **Lenguajes:** Java, JavaScript/TypeScript, Ruby, Python y otros.
- **Precio:** Cucumber open source es gratis. CucumberStudio/SmartBear o integraciones empresariales pueden ser pagos.
- **Complejidad:** media-alta. Fácil de leer, pero requiere disciplina para no duplicar steps.

Ejemplo `.feature`:

```gherkin
Feature: Login

  Scenario: Login inválido
    Given el usuario está en la pantalla de login
    When ingresa el email "admin@test.com"
    And ingresa la contraseña "wrong"
    Then debe ver el mensaje "Credenciales inválidas"
    And debe permanecer en la página "/login"
```

Configuración JS:

```bash
npm install -D @cucumber/cucumber
```

Cuándo usarlo:

- Cuando negocio/producto/QA necesitan leer y discutir escenarios.
- Criterios de aceptación.

Cuándo evitarlo:

- Si solo lo usa desarrollo y añade más mantenimiento que valor.

---

### Behave para Python

- **Link:** https://behave.readthedocs.io/
- **Uso:** BDD/Gherkin en Python.
- **Precio:** gratis/open source.
- **Complejidad:** media.

---

### Gauge

- **Link:** https://gauge.org/
- **Uso:** especificaciones ejecutables en Markdown.
- **Precio:** gratis/open source.
- **Complejidad:** media.

---

## 10. Performance, carga y estrés

### k6

- **Link:** https://k6.io/
- **Docs:** https://grafana.com/docs/k6/latest/
- **Grafana pricing:** https://grafana.com/pricing/
- **Uso:** load testing, stress, spike, soak, smoke tests, synthetic monitoring.
- **Lenguaje:** scripts en JavaScript.
- **Precio:** k6 OSS es gratis/open source. Grafana Cloud tiene plan Free y planes pagos/uso según Grafana.
- **Complejidad:** media.

Configuración:

```bash
# macOS
brew install k6

# Windows, con Chocolatey
choco install k6
```

Ejemplo:

```js
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, {
    'status 200': (r) => r.status === 200,
    'respuesta < 500ms': (r) => r.timings.duration < 500,
  });
}
```

Ejecutar:

```bash
k6 run test.js
```

---

### Apache JMeter

- **Link:** https://jmeter.apache.org/
- **Getting started:** https://jmeter.apache.org/usermanual/get-started.html
- **Uso:** carga, performance, pruebas HTTP/HTTPS, JDBC, FTP, LDAP, JUnit, etc.
- **Precio:** gratis/open source.
- **Complejidad:** media-alta. Tiene interfaz visual, pero requiere criterio para escenarios reales.
- **Requisitos:** Java.

Ejecutar GUI:

```bash
jmeter
```

Ejecutar no-GUI:

```bash
jmeter -n -t plan.jmx -l results.jtl -e -o report/
```

---

### Locust

- **Link:** https://locust.io/
- **Uso:** load testing escrito en Python.
- **Precio:** gratis/open source.
- **Complejidad:** media.

Configuración:

```bash
pip install locust
```

Ejemplo:

```python
from locust import HttpUser, task

class WebsiteUser(HttpUser):
    @task
    def home(self):
        self.client.get('/')
```

Ejecutar:

```bash
locust
```

---

### Gatling

- **Link:** https://gatling.io/
- **Uso:** performance testing para equipos JVM; scripts en Scala/Java/Kotlin.
- **Precio:** open source disponible; Gatling Enterprise/Cloud es pago.
- **Complejidad:** alta.

---

## 11. Cobertura, calidad y mutation testing

### SonarQube / SonarCloud

- **Link:** https://www.sonarsource.com/products/sonarqube/
- **Pricing:** https://www.sonarsource.com/plans-and-pricing/
- **Uso:** calidad de código, bugs, code smells, vulnerabilidades, quality gates, cobertura.
- **Compatible con:** muchos lenguajes: Java, JS/TS, Python, C#, etc.
- **Precio:** Community/self-managed gratis; planes Team/Enterprise pagos. La página oficial consultada indica que el plan pago empieza desde un monto mensual para cierto número de líneas privadas analizadas.
- **Complejidad:** media.

Docker rápido:

```bash
docker run -d --name sonarqube -p 9000:9000 sonarqube:lts-community
```

---

### JaCoCo

- **Link:** https://www.jacoco.org/jacoco/
- **Uso:** cobertura en Java/JVM.
- **Precio:** gratis/open source.
- **Complejidad:** media.

Gradle:

```gradle
plugins {
  id 'jacoco'
}

test {
  useJUnitPlatform()
  finalizedBy jacocoTestReport
}
```

---

### Istanbul / nyc

- **Link:** https://istanbul.js.org/
- **Uso:** cobertura JS/TS.
- **Precio:** gratis/open source.
- **Complejidad:** baja-media.

Configuración:

```bash
npm install -D nyc
```

---

### pytest-cov

- **Link:** https://pytest-cov.readthedocs.io/
- **Uso:** cobertura Python con pytest.
- **Precio:** gratis/open source.
- **Complejidad:** baja.

Configuración:

```bash
pip install pytest-cov
pytest --cov=src tests/
```

---

### Mutation testing

#### Stryker Mutator

- **Link:** https://stryker-mutator.io/
- **Uso:** mutation testing para JS/TS, C# y otros ecosistemas.
- **Precio:** gratis/open source.
- **Complejidad:** alta.

#### PIT Mutation Testing

- **Link:** https://pitest.org/
- **Uso:** mutation testing para Java.
- **Precio:** gratis/open source.
- **Complejidad:** alta.

#### mutmut

- **Link:** https://mutmut.readthedocs.io/
- **Uso:** mutation testing para Python.
- **Precio:** gratis/open source.
- **Complejidad:** alta.

Cuándo usar mutation testing:

- Cuando ya tienes tests y quieres saber si realmente detectan errores.
- No es lo primero que se configura en un proyecto principiante.

---

## 12. Gestión de casos de prueba

Estas herramientas no siempre ejecutan el test; muchas sirven para diseñar, documentar, planear, evidenciar y reportar.

### TestRail

- **Link:** https://www.testrail.com/
- **Pricing:** https://www.testrail.com/pricing/
- **Uso:** test cases, test plans, test runs, reportes, trazabilidad.
- **Precio:** pago; pricing flexible por usuario/bulk; suele ofrecer trial o cotización.
- **Complejidad:** media.

### Zephyr

- **Link:** https://smartbear.com/test-management/zephyr/
- **Atlassian Marketplace pricing:** https://marketplace.atlassian.com/apps/1213259/zephyr-test-management-and-automation-for-jira
- **Uso:** gestión de pruebas dentro de Jira, trazabilidad, reportes.
- **Precio:** pago; depende de usuarios/edición/Jira.
- **Complejidad:** media.

### Xray

- **Link:** https://www.getxray.app/
- **Atlassian Marketplace:** https://marketplace.atlassian.com/apps/1211769/xray-test-management-for-jira
- **Uso:** test management en Jira, BDD, integración con automatización, trazabilidad.
- **Precio:** pago; depende de usuarios/edición/Jira.
- **Complejidad:** media-alta.

### Qase

- **Link:** https://qase.io/
- **Pricing:** https://www.qase.io/pricing/
- **Uso:** test management moderno, manual + automatizado, reportes, integraciones.
- **Precio:** tiene plan gratuito/limitado y planes pagos por usuario/mes según su pricing.
- **Complejidad:** baja-media.

---

## 13. Herramientas visuales para diseñar flujos

Estas ayudan antes de escribir código.

| Herramienta | Link | Uso | Precio típico | Complejidad |
|---|---|---|---|---|
| Figma/FigJam | https://www.figma.com/figjam/ | Flujos, journeys, pantallas | Free + pago | Baja |
| Miro | https://miro.com/ | Mapas de flujo, workshops QA | Free + pago | Baja |
| diagrams.net | https://www.diagrams.net/ | Diagramas gratis | Gratis | Baja |
| Lucidchart | https://www.lucidchart.com/ | Diagramas formales | Free + pago | Baja-media |
| Whimsical | https://whimsical.com/ | Flujos rápidos | Free + pago | Baja |

Ejemplo de diseño de flujo de login:

```text
Login
 ├── Credenciales válidas -> /dashboard
 ├── Password incorrecta -> mensaje "Credenciales inválidas" y sigue en /login
 ├── Email vacío -> "Email requerido"
 ├── Password vacío -> "Contraseña requerida"
 └── Usuario bloqueado -> mensaje especial
```

---

## 14. IA y asistentes para crear borradores de pruebas

| Herramienta | Link | Uso | Precio | Complejidad |
|---|---|---|---|---|
| GitHub Copilot | https://github.com/features/copilot | Sugerir tests desde código | Pago con opciones según plan | Baja |
| ChatGPT | https://chatgpt.com/ | Diseñar casos, datos y assertions | Free + pago | Baja |
| Cursor | https://cursor.com/ | IDE con IA para generar/refactorizar tests | Free + pago | Baja-media |
| JetBrains AI | https://www.jetbrains.com/ai/ | Asistencia dentro de IDEs JetBrains | Pago/planes | Baja |

Recomendación: usa IA para borradores, pero revisa manualmente:

- Que las assertions tengan sentido.
- Que no use selectors frágiles.
- Que no invente endpoints.
- Que no pruebe implementación interna innecesaria.

---

## 15. Matriz de precio y complejidad

| Herramienta | Precio aproximado | Complejidad | Mejor para |
|---|---|---:|---|
| Playwright | Gratis/open source | Media | E2E moderno multi-browser |
| Cypress App | Gratis/open source | Baja-media | E2E y component testing frontend |
| Cypress Cloud | Free + pago | Media | Dashboard, paralelización, flakiness |
| Selenium | Gratis/open source | Media-alta | Enterprise/multi-lenguaje |
| WebdriverIO | Gratis/open source | Media | E2E JS/TS flexible |
| Vitest | Gratis/open source | Baja | Unitarias JS/TS modernas |
| Jest | Gratis/open source | Baja-media | Unitarias JS/TS/React/Node |
| React Testing Library | Gratis/open source | Baja-media | Componentes React |
| Postman | Free + pago | Baja-media | Diseño y pruebas API |
| Supertest | Gratis/open source | Baja-media | API Node/Express/Nest |
| JUnit 5 | Gratis/open source | Baja-media | Java unit/integration |
| Mockito | Gratis/open source | Media | Mocks Java |
| MockMvc | Gratis/open source | Media | Controllers Spring MVC |
| REST Assured | Gratis/open source | Media | API testing Java |
| pytest | Gratis/open source | Baja | Python unit/integration |
| FastAPI TestClient | Gratis/open source | Baja-media | API FastAPI |
| Django TestCase | Gratis/open source | Media | Apps Django |
| MSW | Gratis/open source | Media | Mock APIs frontend |
| WireMock OSS | Gratis/open source | Media | Simular APIs HTTP |
| WireMock Cloud | Free/trial + pago | Media | Mock APIs colaborativo/cloud |
| Testcontainers | Gratis/open source | Media-alta | DB/servicios reales en tests |
| Cucumber | Gratis/open source | Media-alta | BDD/casos legibles |
| k6 OSS | Gratis/open source | Media | Carga con JS |
| Grafana Cloud k6 | Free + pago/uso | Media | Reportes cloud performance |
| JMeter | Gratis/open source | Media-alta | Carga con GUI/protocolos variados |
| Locust | Gratis/open source | Media | Carga con Python |
| SonarQube Community | Gratis | Media | Calidad/cobertura local |
| SonarQube Team/Enterprise | Pago | Media-alta | Quality gates enterprise |
| TestRail | Pago | Media | Gestión formal QA |
| Zephyr | Pago | Media | Gestión de pruebas en Jira |
| Xray | Pago | Media-alta | Trazabilidad Jira + BDD |
| Qase | Free + pago | Baja-media | Gestión QA moderna |

---

## 16. Configuración recomendada por escenario

### Escenario A: Frontend React/Next principiante

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
npm init playwright@latest
```

Usar:

- Vitest para funciones y hooks.
- React Testing Library para componentes.
- Playwright para 3 a 8 flujos críticos.

### Escenario B: Angular

```bash
ng test
npm init playwright@latest
```

Usar:

- Vitest o Karma/Jasmine según versión del proyecto.
- TestBed/Angular Testing Library para componentes.
- Playwright para E2E.

### Escenario C: Spring Boot API

Usar:

- JUnit 5 + Mockito para servicios.
- MockMvc para controllers.
- REST Assured para API real.
- Testcontainers para PostgreSQL/MySQL/Redis/Kafka.

### Escenario D: Python FastAPI

```bash
pip install pytest httpx pytest-cov
```

Usar:

- pytest para unitarias.
- TestClient para endpoints.
- Testcontainers si necesitas DB real.
- Playwright Python si necesitas navegador.

### Escenario E: QA manual que empieza automatización

Usar:

- Postman para APIs.
- Playwright Codegen para entender UI automation.
- Cucumber/Gherkin para documentar escenarios si negocio participa.
- Qase/TestRail/Zephyr/Xray si hay gestión formal de casos.

---

## 17. Buenas prácticas

1. No automatices todo en E2E. Los E2E son más lentos y más frágiles.
2. Prioriza flujos críticos: login, pagos, permisos, creación de entidades, errores importantes.
3. Escribe assertions de comportamiento, no solo de copy visual.
4. Evita selectors frágiles como clases CSS generadas automáticamente.
5. Usa datos de prueba controlados.
6. No dependas de servicios externos reales si puedes mockearlos.
7. Para integración importante, usa dependencias reales temporales con Testcontainers.
8. Ejecuta unitarias en cada cambio; API/E2E en PR o pipeline.
9. Mide cobertura, pero no la confundas con calidad real.
10. Revisa flaky tests; un test que falla aleatoriamente pierde credibilidad.

---

## 18. Ruta de aprendizaje sugerida

1. Aprende assertions con pytest/JUnit/Vitest.
2. Prueba endpoints con Postman o Supertest/FastAPI TestClient/MockMvc.
3. Automatiza un flujo UI con Playwright.
4. Agrega mocks con MSW o WireMock.
5. Agrega integración real con Testcontainers.
6. Agrega cobertura con pytest-cov/JaCoCo/Istanbul.
7. Agrega performance básico con k6.
8. Agrega gestión formal solo si el equipo lo necesita.

---

## 19. Mini-glosario

- **Assertion:** validación que debe ser verdadera para que la prueba pase.
- **Unit test:** prueba una pieza pequeña de código.
- **Integration test:** prueba varias partes conectadas.
- **API test:** prueba endpoints, status codes, JSON, headers.
- **E2E test:** prueba un flujo completo como usuario real.
- **Mock:** simulación de una dependencia.
- **Stub:** respuesta falsa predefinida.
- **Flaky test:** test que a veces pasa y a veces falla sin cambios reales.
- **Coverage:** porcentaje de código ejecutado por tests.
- **Mutation testing:** inserta bugs artificiales para medir si tus tests los detectan.
- **BDD:** escribir comportamiento esperado en lenguaje cercano al negocio.

