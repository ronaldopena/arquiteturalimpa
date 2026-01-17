const { spawn, execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Configurações
const TEST_DB_FILE = './prisma/dev_teste.db';
const TEST_DB_URL = 'file:./dev_teste.db';
const SERVER_PORT = 3001;

// Caminhos
const prismaBinary = path.resolve(__dirname, '../node_modules/.bin/prisma');
const cypressBinary = path.resolve(__dirname, '../node_modules/.bin/cypress');

// Função para limpar o banco de teste
function setupTestDb() {
  console.log('🔄 Configurando banco de dados de teste...');
  
  const dbPath = path.resolve(__dirname, '..', TEST_DB_FILE);
  
  if (fs.existsSync(dbPath)) {
    console.log('🗑️ Removendo banco de dados antigo...');
    fs.unlinkSync(dbPath);
  }

  console.log('📦 Rodando migrações...');
  try {
    execSync(`npx prisma migrate deploy`, {
      env: { ...process.env, DATABASE_URL: TEST_DB_URL },
      stdio: 'inherit'
    });
    console.log('✅ Banco de dados de teste pronto!');
  } catch (error) {
    console.error('❌ Erro ao configurar banco de dados:', error);
    process.exit(1);
  }
}

// Função principal
async function runTests() {
  setupTestDb();

  console.log('🚀 Iniciando servidor de teste na porta ' + SERVER_PORT + '...');
  
  const server = spawn('npx', ['ts-node-dev', '--transpile-only', 'src/server.ts'], {
    env: { ...process.env, DATABASE_URL: TEST_DB_URL, PORT: SERVER_PORT },
    shell: true,
    stdio: 'pipe' // Vamos monitorar a saída para saber quando está pronto
  });

  let serverReady = false;

  server.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(`[API] ${output.trim()}`);
    if (output.includes(`Server is running on port ${SERVER_PORT}`) && !serverReady) {
      serverReady = true;
      startCypress();
    }
  });

  server.stderr.on('data', (data) => {
    console.error(`[API Error] ${data.toString()}`);
  });

  function startCypress() {
    console.log('🧪 Iniciando Cypress no modo interativo (open)...');
    
    // Define baseUrl para o Cypress
    const cypressEnv = { 
      ...process.env, 
      CYPRESS_baseUrl: `http://localhost:${SERVER_PORT}` 
    };

    const cypress = spawn('npx', ['cypress', 'open'], {
      env: cypressEnv,
      shell: true,
      stdio: 'inherit'
    });

    cypress.on('close', (code) => {
      console.log(`🏁 Cypress finalizado com código ${code}`);
      
      // Mata o servidor
      if (process.platform === 'win32') {
         try {
             execSync(`taskkill /pid ${server.pid} /T /F`);
         } catch (e) {
             // Ignora erro se o processo já estiver morto
         }
      } else {
         server.kill();
      }
      
      process.exit(code);
    });
  }
}

runTests();
