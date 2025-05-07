/**
 * Build script for SystemPlus AI Assistant
 */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

try {
  // Build backend
  console.log('\n📦 Building backend...');
  execSync('npm run build:backend', { stdio: 'inherit', cwd: rootDir });
  console.log('✅ Backend build complete!');
  
  // Build widget
  console.log('\n📦 Building widget...');
  execSync('npm run build:widget', { stdio: 'inherit', cwd: rootDir });
  console.log('✅ Widget build complete!');
  
  // Copy data directory if it doesn't exist in dist
  const srcDataDir = path.join(rootDir, 'data');
  const destDataDir = path.join(distDir, 'data');
  
  if (!fs.existsSync(destDataDir) && fs.existsSync(srcDataDir)) {
    console.log('\n📋 Copying data directory...');
    fs.mkdirSync(destDataDir, { recursive: true });
    
    const files = fs.readdirSync(srcDataDir);
    for (const file of files) {
      const srcFile = path.join(srcDataDir, file);
      const destFile = path.join(destDataDir, file);
      
      if (fs.statSync(srcFile).isFile()) {
        fs.copyFileSync(srcFile, destFile);
      }
    }
    
    console.log('✅ Data directory copied!');
  }
  
  console.log('\n🎉 Build completed successfully!\n');
} catch (error) {
  console.error('\n❌ Build failed:', error);
  process.exit(1);
}
