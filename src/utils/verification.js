import CryptoJS from "crypto-js";
import { haikus, SECRET_SALT } from "../data/haikus.js";

// Generate all valid hash combinations for verification
const generateValidHashes = () => {
  const validHashes = [];

  haikus.forEach((haiku) => {
    const codewords = haiku.lines.map((line) => line.codeword);
    const combinedString = codewords.join("") + SECRET_SALT;
    const hash = CryptoJS.SHA256(combinedString).toString();
    validHashes.push({
      hash,
      haikuId: haiku.id,
      codewords: codewords,
      lines: haiku.lines.map((line) => line.text),
    });
  });

  return validHashes;
};

const VALID_HASHES = generateValidHashes();

// Timeout management
const TIMEOUT_KEY = "wedding_game_timeout";
const TIMEOUT_DURATION = 10000; // 10 seconds
const ATTEMPT_KEY = "wedding_game_attempts";

export const getTimeoutRemaining = () => {
  const timeoutEnd = localStorage.getItem(TIMEOUT_KEY);
  if (!timeoutEnd) return 0;

  const remaining = parseInt(timeoutEnd) - Date.now();
  return remaining > 0 ? remaining : 0;
};

export const setGameTimeout = () => {
  const timeoutEnd = Date.now() + TIMEOUT_DURATION;
  localStorage.setItem(TIMEOUT_KEY, timeoutEnd.toString());
};

export const clearGameTimeout = () => {
  localStorage.removeItem(TIMEOUT_KEY);
};

export const isInTimeout = () => {
  return getTimeoutRemaining() > 0;
};

// Attempt tracking
export const getAttemptCount = () => {
  const attempts = localStorage.getItem(ATTEMPT_KEY);
  return attempts ? parseInt(attempts) : 0;
};

export const incrementAttempts = () => {
  const current = getAttemptCount();
  localStorage.setItem(ATTEMPT_KEY, (current + 1).toString());
};

export const resetAttempts = () => {
  localStorage.removeItem(ATTEMPT_KEY);
};

// Main verification function
export const verifyCodewords = (codeword1, codeword2, codeword3) => {
  // Check if user is in timeout
  if (isInTimeout()) {
    return {
      success: false,
      error: "TIMEOUT",
      timeoutRemaining: getTimeoutRemaining(),
      message: "Du musst noch warten, bevor du es erneut versuchen kannst.",
    };
  }

  // Validate input
  if (!codeword1 || !codeword2 || !codeword3) {
    return {
      success: false,
      error: "INCOMPLETE",
      message: "Bitte alle drei Codewörter eingeben.",
    };
  }

  // Normalize input
  const normalizedCodewords = [codeword1.trim().toUpperCase(), codeword2.trim().toUpperCase(), codeword3.trim().toUpperCase()];

  // Generate hash from user input
  const combinedString = normalizedCodewords.join("") + SECRET_SALT;
  const inputHash = CryptoJS.SHA256(combinedString).toString();

  // Check against valid hashes
  const matchingHaiku = VALID_HASHES.find((valid) => valid.hash === inputHash);

  if (matchingHaiku) {
    // Success! Reset attempts and clear any timeout
    resetAttempts();
    clearGameTimeout();

    return {
      success: true,
      haiku: {
        id: matchingHaiku.haikuId,
        lines: matchingHaiku.lines,
        codewords: matchingHaiku.codewords,
      },
      message: "Herzlichen Glückwunsch! Du hast ein Haiku vervollständigt!",
    };
  } else {
    // Failed attempt
    incrementAttempts();
    const attempts = getAttemptCount();

    // Set timeout after failed attempt
    setGameTimeout();

    return {
      success: false,
      error: "WRONG_COMBINATION",
      attempts: attempts,
      timeoutRemaining: TIMEOUT_DURATION,
      message: `Diese Kombination ist nicht korrekt. Versuch ${attempts}. Du kannst in 10 Sekunden erneut versuchen.`,
    };
  }
};

// Utility to format timeout display
export const formatTimeoutDisplay = (milliseconds) => {
  const seconds = Math.ceil(milliseconds / 1000);
  return `${seconds} Sekunde${seconds !== 1 ? "n" : ""}`;
};

// Get statistics for debugging (can be removed in production)
export const getGameStats = () => {
  return {
    totalHaikus: haikus.length,
    totalLines: haikus.length * 3,
    attempts: getAttemptCount(),
    timeoutRemaining: getTimeoutRemaining(),
    validHashesCount: VALID_HASHES.length,
  };
};

// Development helper to get all valid combinations (remove in production)
export const getAllValidCombinations = () => {
  return VALID_HASHES.map((valid) => ({
    haikuId: valid.haikuId,
    codewords: valid.codewords,
    lines: valid.lines,
  }));
};
