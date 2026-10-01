import { test, expect } from "@playwright/test";

const BASE_URL =
  "https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login";
// test.describe() funciona como um bloco de testes
test.describe("ATO 1 - Validar carregamento e visibilidade de elementos", async () => {
  test("Validar título e carregamento da pagina", async ({ page }) => {
    // navegar até a pagina de login
    await page.goto(`${BASE_URL}/login.html`);

    // validar título
    await expect(page).toHaveTitle(/LojaQA | Entrar/i);
  });
  test("Verificar exibição dos campos do formulário de login", async ({
    page,
  }) => {
    // navegar até a pagina de login
    await page.goto(`${BASE_URL}/login.html`);

    // validar campos
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.locator("#loginBtn")).toBeVisible();

    // verificar botão de login desativado antes do preenchimento de dados de login
    await expect(page.locator("#loginBtn")).toBeDisabled();
  });
});

test.describe("ATO 2 - Caminho feliz", async () => {
  test("Validar acesso e redirecionar ao painel", async ({ page }) => {
    // navegar até a pagina de login
    await page.goto(`${BASE_URL}/login.html`);
    // Preencher campos utilizando o fill()
    await page.fill("#email", "admin@system.com");
    await page.fill("#password", "AdminPassword123");
    // validar botão ativo
    await expect(page.locator("#loginBtn")).toBeEnabled();
    // Acao de clique no btn
    await page.click("#loginBtn");
    // Validar redirecionamento para a pagina /painel
    await expect(page).toHaveURL(/painel\.html/);
  });
});
