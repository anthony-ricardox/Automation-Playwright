import { expect, test } from "@playwright/test"

const BASE_URL = 'https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login'

test.describe('ato 1 - validar carregamento e visibilidade de elemento', () => {
    test('Validar titulo e carregamento da pagina', async ({ page }) => {
        //navegar ate a pagina de login
        await page.goto(`${BASE_URL}/login.html`)
        //validar titulo
        await expect(page).toHaveTitle(/LojaQA | Entrar/i)
    })

    test('Verificar exibição dos capos do formulario de login', async ({ page }) => {
        await page.goto(`${BASE_URL}/login.html`)
        //validar campo
        await expect(page.locator('#email')).toBeVisible();
        await expect(page.locator('#password')).toBeVisible();
        await expect(page.locator('#loginBtn')).toBeVisible();

        //Validar se o botao está desativado ou não
        await expect(page.locator('#loginBtn')).toBeDisabled();
    })
})