/**
 * ALTCHA Verification Utility
 * Verifies the ALTCHA payload received from the client
 */

const { verifySolution, extractParams } = require('altcha-lib')

// Minimum time between challenge issue and submission. A scripted solver clears
// the PoW in ~50ms; a human takes seconds. Kept low so a genuine fast paste feels
// throttled, never rejected (the client also holds the request to this floor).
const MIN_DWELL_MS = 3500
const MAX_AGE_MS = 30 * 60 * 1000 // matches challenge expiry in altcha-challenge.js

/**
 * Verify ALTCHA payload
 * @param {string} payload - Base64 encoded payload from ALTCHA widget
 * @param {string} secret - Secret key used to generate challenges
 * @param {string} [expectedOrigin] - Origin the request came from; matched against signed param
 * @returns {Object} - { valid: boolean, error?: string }
 */
async function verifyAltchaPayload(payload, secret, expectedOrigin) {
  try {
    if (!payload || typeof payload !== 'string') {
      return { valid: false, error: 'Invalid payload format' }
    }

    if (!secret) {
      return { valid: false, error: 'Secret key not configured' }
    }

    // Signature + expiry check. Signature ensures salt (and its signed params) untampered.
    const isValid = await verifySolution(payload, secret, true) // checkExpires = true

    if (!isValid) {
      return { valid: false, error: 'Invalid or expired solution' }
    }

    // Signed params minted by altcha-challenge: issue time and origin.
    const params = extractParams(payload)

    const issued = parseInt(params.iat || '0', 10) * 1000
    if (!issued) {
      return { valid: false, error: 'Challenge missing issue time' }
    }

    const age = Date.now() - issued
    // `bot: true` marks signals a real (client-throttled) browser never trips, so the
    // caller can fake success instead of teaching the bot what tripped it.
    if (age < MIN_DWELL_MS) return { valid: false, bot: true, error: 'Submitted too quickly' }
    if (age > MAX_AGE_MS) return { valid: false, error: 'Challenge too old' }

    if (expectedOrigin && params.o && params.o !== 'direct' && params.o !== expectedOrigin) {
      return { valid: false, bot: true, error: 'Origin mismatch' }
    }

    // Return the signed bait nonce so the caller can check the submission did NOT
    // echo it back via the decoy csrf_token field (bot trap).
    return { valid: true, nonce: params.n }
  } catch (error) {
    console.error('Error verifying ALTCHA payload:', error)
    return { valid: false, error: 'Verification failed: ' + error.message }
  }
}

module.exports = { verifyAltchaPayload }
