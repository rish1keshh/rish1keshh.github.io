#!/usr/bin/env node

/**
 * Subresource Integrity (SRI) Hash Generator
 *
 * This script generates SRI hashes for external resources to ensure they haven't been tampered with.
 *
 * Usage:
 *   node scripts/generate-sri.js <file-path-or-url>
 *   node scripts/generate-sri.js https://cdn.example.com/library.js
 *   node scripts/generate-sri.js ./public/script.js
 *
 * The script will output the integrity attribute that can be added to script/link tags.
 */

const crypto = require('crypto');
const fs = require('fs');
const https = require('https');
const http = require('http');

/**
 * Generate SRI hash from buffer
 */
function generateSRIHash(buffer) {
  const algorithms = ['sha256', 'sha384', 'sha512'];
  const hashes = algorithms.map(algorithm => {
    const hash = crypto.createHash(algorithm).update(buffer).digest('base64');
    return `${algorithm}-${hash}`;
  });

  return hashes.join(' ');
}

/**
 * Fetch content from URL
 */
function fetchURL(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;

    client.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to fetch: HTTP ${response.statusCode}`));
        return;
      }

      const chunks = [];
      response.on('data', chunk => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
}

/**
 * Read file from filesystem
 */
function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

/**
 * Main function
 */
async function main() {
  const input = process.argv[2];

  if (!input) {
    console.error('Usage: node generate-sri.js <file-path-or-url>');
    console.error('Example: node generate-sri.js https://cdn.example.com/library.js');
    console.error('Example: node generate-sri.js ./public/script.js');
    process.exit(1);
  }

  try {
    console.log(`\nGenerating SRI hash for: ${input}\n`);

    let buffer;
    if (input.startsWith('http://') || input.startsWith('https://')) {
      console.log('Fetching from URL...');
      buffer = await fetchURL(input);
    } else {
      console.log('Reading from file...');
      buffer = await readFile(input);
    }

    const integrity = generateSRIHash(buffer);

    console.log('SRI Hash generated successfully!\n');
    console.log('Integrity attribute:');
    console.log(`integrity="${integrity}"`);
    console.log('\nFull tag example for script:');
    console.log(`<script src="${input}" integrity="${integrity}" crossorigin="anonymous"></script>`);
    console.log('\nFull tag example for stylesheet:');
    console.log(`<link rel="stylesheet" href="${input}" integrity="${integrity}" crossorigin="anonymous">`);
    console.log('\n');

  } catch (error) {
    console.error('\nError:', error.message);
    process.exit(1);
  }
}

main();
