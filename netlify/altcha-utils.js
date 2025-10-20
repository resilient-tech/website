/**
 * ALTCHA Verification Utility
 * Verifies the ALTCHA payload received from the client
 */

const { verifySolution } = require('altcha-lib')

/**
 * Verify ALTCHA payload
 * @param {string} payload - Base64 encoded payload from ALTCHA widget
 * @param {string} secret - Secret key used to generate challenges
 * @returns {Object} - { valid: boolean, error?: string }
 */
async function verifyAltchaPayload(payload, secret) {
  try {
    if (!payload || typeof payload !== 'string') {
      return { valid: false, error: 'Invalid payload format' }
    }

    if (!secret) {
      return { valid: false, error: 'Secret key not configured' }
    }

    // Verify using official library
    const isValid = await verifySolution(payload, secret)

    if (!isValid) {
      return { valid: false, error: 'Invalid solution' }
    }

    return { valid: true }
  } catch (error) {
    console.error('Error verifying ALTCHA payload:', error)
    return { valid: false, error: 'Verification failed: ' + error.message }
  }
}

module.exports = { verifyAltchaPayload }
