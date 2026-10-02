import {test, expect} from '@playwright/test';

const BASE_URL = 'https://alisonmelo.github.io/tioalison-pe-t4-fap26/projetos-base/01-sistema-login';

test.describe('ato 1 validar carregamento e visibilidade de elementos', async () => {
    test('validar titulo e carregamento da pagina', async ({page}) => {
        //navegar ate pagina de login
        await page.goto(`${BASE_URL}/login.html`)
        //validar titulo
        await expect(page).toHaveTitle(/LojaQA | Entrar/i);   

});
test('verificar exibicao dos campos do form de login', async ({page}) => {
    await page.goto(`${BASE_URL}/login.html`)

    //validar campos
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.locator('#loginBtn')).toBeVisible(); 
    //verificar se btn esta desativado
    await expect(page.locator('#loginBtn')).toBeDisabled();
});


});

test.describe('ato 2 caminho feliz', async () => {
    test('validar acesso e redicionar ao painel',async ({page}) =>{
          //navegar ate pagina de login
        await page.goto(`${BASE_URL}/login.html`)
        //preencher campos utilizando o fill()
        await page.fill('#email', 'andredev123@gmail.com')
        await page.fill('#password', '123456789');
        //validar btn ativo
        await expect(page.locator('#loginBtn')).toBeEnabled();
        //clicar no btn
        await page.click('#loginBtn');
        //validar redirecionamento
        await expect(page).toHaveURL(/painel\.html/);
        

    })

    test('verificar botão de login desativado quando o campo de email está incorreto', async ({page}) => {
        //navegar ate pagina de login
        await page.goto(`${BASE_URL}/login.html`)
        //preencher campos utilizando o fill()
        await page.fill('#email', 'email-invalido');
        await page.fill('#password', '123456789');
        //validar btn desativado
        await expect(page.locator('#loginBtn')).toBeDisabled();
    })
        

    })

    test.describe('ato 3 caminho triste', async () => {
        test('verificar mensagem de erro quando o campo de email está incorreto', async ({page}) => {
            //navegar ate pagina de login
            await page.goto(`${BASE_URL}/login.html`)
            //preencher campos utilizando o fill()
            await page.fill('#email', 'emailinvalido@gmail.com');
            await page.fill('#password', '123456789');
            // Clicar no botão Entrar para submeter o formulário
        await page.click('#loginBtn');
            //validar mensagem de erro
            await expect(page.locator('#errorMessage')).toBeVisible();
            await expect(page.locator('#errorMessage')).toHaveText('Erro: usuário não encontrado. Tentativa 1 de 3.');
        })

        //criar usuarios de cliente e lojista e validar o formulario de cadastro e o login com esse usuario
        test('criar usuario de cliente  e validar o formulario de cadastro e o login com esses usuarios', async ({page}) => {
             //navegar ate pagina de login
        await page.goto(`${BASE_URL}/login.html`)
        //clicar no btn de criar conta
        await page.locator('[onclick*="section-register"]').click();
        //preencher campos do formulario de cadastro para o usuario cliente
        await page.fill('#reg-name', 'Cliente Teste');
        await page.fill('#reg-email', 'cliieenteteste@gmail.com');
        await page.fill('#reg-password', '123456789');
        await page.selectOption('#reg-role', 'Cliente');
        await page.click('#registerBtn');
        //acessar o login com o usuario criado
        await page.fill('#email', 'cliieenteteste@gmail.com');
        await page.fill('#password', '123456789');
        await page.click('#loginBtn');
        await expect(page).toHaveURL(/painel\.html/);

        })

        //criar usuarios de cliente e lojista e validar o formulario de cadastro e o login com esse usuario
        test('criar usuario de lojista  e validar o formulario de cadastro e o login com esses usuarios', async ({page}) => {

      //navegar ate pagina de login
        await page.goto(`${BASE_URL}/login.html`)
        //clicar no btn de criar conta
        await page.locator('[onclick*="section-register"]').click();
        //preencher campos do formulario de cadastro para o usuario lojista
        await page.fill('#reg-name', 'Lojista Teste');
        await page.fill('#reg-email', 'lojiistaateste@gmail.com');
        await page.fill('#reg-password', '123456789');
        await page.selectOption('#reg-role', 'Lojista / vendedor');
        await page.fill('#reg-store-name', 'Loja Teste');
        await page.click('#registerBtn');
        //acessar o login com o usuario criado
        await page.fill('#email', 'lojiistaateste@gmail.com');
        await page.fill('#password', '123456789');
        await page.click('#loginBtn');
        await expect(page).toHaveURL(/painel\.html/);
        })
           

    })