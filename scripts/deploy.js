/**
 * Deployment script for SystemPlus AI Assistant
 */
const { execSync } = require('child_process');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const rootDir = path.resolve(__dirname, '..');

// Environment options
const environments = {
  development: {
    host: 'dev.systemplus.systems',
    directory: '/var/www/assistant-dev'
  },
  staging: {
    host: 'staging.systemplus.systems',
    directory: '/var/www/assistant-staging'
  },
  production: {
    host: 'asistente.systemplus.systems',
    directory: '/var/www/assistant-prod'
  }
};

// Ask for environment selection
console.log('\n🚀 SystemPlus AI Assistant Deployment');
console.log('----------------------------------------');
console.log('Select deployment environment:');
Object.keys(environments).forEach((env, index) => {
  console.log(`${index + 1}. ${env} (${environments[env].host})`);
});

rl.question('\nEnter environment number: ', (answer) => {
  const envIndex = parseInt(answer) - 1;
  const envNames = Object.keys(environments);
  
  if (envIndex < 0 || envIndex >= envNames.length) {
    console.error('❌ Invalid selection. Deployment aborted.');
    rl.close();
    return;
  }
  
  const selectedEnv = envNames[envIndex];
  const { host, directory } = environments[selectedEnv];
  
  rl.question(`\nConfirm deployment to ${selectedEnv} (${host})? (y/n): `, (confirmation) => {
    if (confirmation.toLowerCase() !== 'y') {
      console.log('Deployment aborted.');
      rl.close();
      return;
    }
    
    // Run build first
    try {
      console.log('\n📦 Building project...');
      execSync('node scripts/build.js', { stdio: 'inherit', cwd: rootDir });
      
      console.log(`\n🚢 Deploying to ${selectedEnv}...`);
      
      // Deploy using rsync
      const rsyncCmd = `rsync -avz --delete ./dist/ systemplus@${host}:${directory}`;
      execSync(rsyncCmd, { stdio: 'inherit', cwd: rootDir });
      
      // Restart service
      console.log('\n🔄 Restarting service...');
      execSync(`ssh systemplus@${host} 'sudo systemctl restart systemplus-assistant'`, { stdio: 'inherit' });
      
      console.log(`\n✅ Deployment to ${selectedEnv} completed successfully!\n`);
    } catch (error) {
      console.error('\n❌ Deployment failed:', error.message);
    }
    
    rl.close();
  });
});
