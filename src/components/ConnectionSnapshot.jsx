import React, { useState, useEffect } from 'react';

/**
 * ConnectionSnapshot Component
 *
 * Security Measures Implemented:
 * - Input sanitization for all user agent data
 * - Rate limiting for IP API calls
 * - Error handling to prevent information leakage
 * - XSS prevention through data validation
 */

// Rate limiting configuration
const RATE_LIMIT = {
  maxCalls: 1,
  windowMs: 60000, // 1 minute
  storageKey: 'ip_fetch_timestamp',
};

// Sanitize string to prevent XSS
const sanitizeString = (str) => {
  if (typeof str !== 'string') return 'Unknown';
  // Remove any HTML tags and special characters
  return str
    .replace(/[<>\"']/g, '')
    .substring(0, 100) // Limit length
    .trim() || 'Unknown';
};

// Validate IP address format
const isValidIP = (ip) => {
  if (typeof ip !== 'string') return false;
  // IPv4 pattern
  const ipv4Pattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  // IPv6 pattern (simplified)
  const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
};

// Check rate limit
const checkRateLimit = () => {
  try {
    const lastFetch = localStorage.getItem(RATE_LIMIT.storageKey);
    if (!lastFetch) return true;

    const timeSinceLastFetch = Date.now() - parseInt(lastFetch, 10);
    return timeSinceLastFetch > RATE_LIMIT.windowMs;
  } catch (error) {
    // If localStorage is not available, allow the request
    return true;
  }
};

// Update rate limit timestamp
const updateRateLimit = () => {
  try {
    localStorage.setItem(RATE_LIMIT.storageKey, Date.now().toString());
  } catch (error) {
    // Silently fail if localStorage is not available
  }
};

const ConnectionSnapshot = () => {
  const [metadata, setMetadata] = useState({
    ip: 'Loading...',
    device: 'Unknown',
    os: 'Unknown',
    browser: 'Unknown',
    timezone: 'Unknown',
  });

  useEffect(() => {
    // Detect device type with sanitization
    const detectDevice = () => {
      try {
        const ua = sanitizeString(navigator.userAgent);
        if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
          return 'Tablet';
        }
        if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
          return 'Mobile';
        }
        return 'Desktop';
      } catch (error) {
        return 'Unknown';
      }
    };

    // Detect OS family (general categories only) with sanitization
    const detectOS = () => {
      try {
        const ua = sanitizeString(navigator.userAgent);
        if (/Windows/i.test(ua)) return 'Windows';
        if (/Mac OS X|Macintosh/i.test(ua)) return 'macOS';
        if (/Linux/i.test(ua)) return 'Linux';
        if (/Android/i.test(ua)) return 'Android';
        if (/iOS|iPhone|iPad|iPod/i.test(ua)) return 'iOS';
        return 'Unknown';
      } catch (error) {
        return 'Unknown';
      }
    };

    // Detect browser engine/family with sanitization
    const detectBrowser = async () => {
      try {
        const ua = sanitizeString(navigator.userAgent);

        // Check for Brave first (Brave mimics Chrome but has navigator.brave)
        if (navigator.brave && typeof navigator.brave.isBrave === 'function') {
          try {
            const isBrave = await navigator.brave.isBrave();
            if (isBrave) return 'Brave (Chromium)';
          } catch (e) {
            // If brave check fails, continue with other checks
          }
        }

        // Check for Edge (must come before Chrome check)
        if (/Edg/i.test(ua) || /Edge/i.test(ua)) return 'Edge (Chromium)';

        // Check for Opera
        if (/Opera|OPR/i.test(ua)) return 'Opera (Blink)';

        // Check for Chrome (after Brave, Edge, and Opera)
        if (/Chrome/i.test(ua)) return 'Chrome (Blink)';

        // Check for Safari (must come after Chrome check since Chrome includes Safari in UA)
        if (/Safari/i.test(ua)) return 'Safari (WebKit)';

        // Check for Firefox
        if (/Firefox/i.test(ua)) return 'Firefox (Gecko)';

        return 'Unknown';
      } catch (error) {
        return 'Unknown';
      }
    };

    // Get timezone as UTC offset with validation
    const getTimezone = () => {
      try {
        const offset = -new Date().getTimezoneOffset();
        // Validate offset is within reasonable range (-12 to +14 hours)
        if (offset < -840 || offset > 840) return 'Unknown';

        const hours = Math.floor(Math.abs(offset) / 60);
        const minutes = Math.abs(offset) % 60;
        const sign = offset >= 0 ? '+' : '-';
        return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      } catch (error) {
        return 'Unknown';
      }
    };

    // Fetch masked IP address with rate limiting and validation
    const fetchIP = async () => {
      try {
        // Check rate limit
        if (!checkRateLimit()) {
          return 'Rate Limited';
        }

        // Fetch with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const response = await fetch('https://api.ipify.org?format=json', {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          },
        });

        clearTimeout(timeoutId);

        // Validate response
        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();

        // Validate IP format
        if (!data.ip || !isValidIP(data.ip)) {
          return 'Hidden';
        }

        // Update rate limit
        updateRateLimit();

        const ip = sanitizeString(data.ip);

        // Mask the IP - show first octet and last octet only
        const parts = ip.split('.');
        if (parts.length === 4) {
          // IPv4: validate octets are numbers
          const validOctets = parts.every(octet => /^\d+$/.test(octet) && parseInt(octet) <= 255);
          if (!validOctets) return 'Hidden';
          return `${parts[0]}...${parts[3]}`;
        }

        // For IPv6, show first and last segment
        const parts6 = ip.split(':');
        if (parts6.length > 2) {
          return `${parts6[0]}...${parts6[parts6.length - 1]}`;
        }

        return 'Hidden';
      } catch (error) {
        // Log error in development only
        if (process.env.NODE_ENV === 'development') {
          console.error('IP fetch error:', error.message);
        }
        return 'Hidden';
      }
    };

    // Set all metadata
    const initMetadata = async () => {
      const ip = await fetchIP();
      const browser = await detectBrowser();
      setMetadata({
        ip,
        device: detectDevice(),
        os: detectOS(),
        browser,
        timezone: getTimezone(),
      });
    };

    initMetadata();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
      {/* Main snapshot text - Hidden on mobile, visible on tablets and up */}
      <div
        className="hidden sm:block absolute top-[45%] left-4 sm:left-8 md:left-16 lg:left-24 font-mono text-[10px] sm:text-xs"
        style={{ maxWidth: '280px' }}
      >
        <div className="space-y-1.5 text-left">
          <div className="text-cyan-bright/60 mb-3 font-semibold tracking-wider">
            CONNECTION SNAPSHOT (NOT STORED)
          </div>
          <div className="text-electric-blue/50">
            <span className="text-text-slate/50">IP Address:</span> {metadata.ip}
          </div>
          <div className="text-electric-blue/50">
            <span className="text-text-slate/50">Device Class:</span> {metadata.device}
          </div>
          <div className="text-electric-blue/50">
            <span className="text-text-slate/50">Operating System:</span> {metadata.os}
          </div>
          <div className="text-electric-blue/50">
            <span className="text-text-slate/50">Browser Engine:</span> {metadata.browser}
          </div>
          <div className="text-electric-blue/50">
            <span className="text-text-slate/50">Timezone:</span> {metadata.timezone}
          </div>
          <div className="text-text-slate/40 text-[10px] mt-3 italic max-w-sm">
            * Privacy-focused browsers may standardize these values
          </div>
        </div>

        {/* Privacy reassurance message - positioned right below snapshot */}
        <div className="mt-4 font-mono text-[10px] text-text-slate/40">
          <div className="bg-navy-light/5 border border-electric-blue/10 rounded px-3 py-2">
            <span className="text-cyan-bright/50">🔒</span> No data is stored or tracked. This information is
            shared by browsers with every website by default.
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionSnapshot;
