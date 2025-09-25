<template>
  <div
    class="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6"
  >
    <div class="max-w-2xl w-full">
      <!-- Header -->
      <div class="text-center mb-16">
        <div class="mb-6">
          <h1
            class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-wedding-700 mb-2 tracking-tight"
          >
            Haiku Hochzeitsspiel
          </h1>
          <div
            class="flex items-center justify-center gap-3 text-xl sm:text-2xl mb-4"
          >
            <span class="text-wedding-500">🍎</span>
            <span class="text-wedding-400">✨</span>
            <span class="text-wedding-700">♥️</span>
            <span class="text-wedding-400">✨</span>
            <span class="text-wedding-500">🌹</span>
          </div>
        </div>
        <div class="max-w-md mx-auto mb-6 px-4">
          <p
            class="text-lg sm:text-xl text-wedding-600 leading-relaxed font-light"
          >
            Kombiniere drei Codewörter von den Karten, um ein vollständiges
            Haiku zu bilden!
          </p>
        </div>
        <div
          class="inline-flex items-center px-4 py-2 bg-bohemian-50 rounded-full border border-bohemian-200"
        >
          <p class="text-sm text-bohemian-700 font-medium">
            Daniel & Astrid • 27.09.2025
          </p>
        </div>
      </div>

      <!-- Game Card -->
      <div class="card max-w-lg mx-auto shadow-xl sm:shadow-2xl">
        <!-- Timeout Warning -->
        <div
          v-if="timeoutRemaining > 0"
          class="mb-6 text-center"
        >
          <div
            class="text-red-600 font-semibold animate-pulse-slow p-4 bg-red-50 rounded-lg border border-red-200"
          >
            <p class="font-semibold">
              ⏰ Bitte warten...
            </p>
            <p class="text-sm">
              Noch {{ formatTimeoutDisplay(timeoutRemaining) }} bis zum nächsten
              Versuch
            </p>
          </div>
        </div>

        <!-- Input Form -->
        <form
          class="space-y-6"
          @submit.prevent="handleSubmit"
        >
          <div class="space-y-4 sm:space-y-6">
            <div>
              <label
                class="block text-sm sm:text-base font-medium text-wedding-700 mb-2"
              >
                1. Codewort (erste Zeile)
              </label>
              <input
                ref="input1Ref"
                v-model="codeword1"
                type="text"
                class="input-field"
                :class="{
                  'error-shake': invalidCodewords.codeword1,
                }"
                placeholder="🍎 Rotes Codewort"
                :disabled="timeoutRemaining > 0"
                maxlength="10"
                @input="clearFieldError('codeword1')"
                @blur="validateCodeword('codeword1', codeword1)"
                @keydown.tab.exact="
                  $event.preventDefault();
                  validateCodeword('codeword1', codeword1);
                  input2Ref?.focus();
                "
                @keydown.enter="
                  validateCodeword('codeword1', codeword1);
                  input2Ref?.focus();
                "
              >
            </div>

            <div>
              <label
                class="block text-sm sm:text-base font-medium text-wedding-700 mb-2"
              >
                2. Codewort (zweite Zeile)
              </label>
              <input
                ref="input2Ref"
                v-model="codeword2"
                type="text"
                class="input-field"
                :class="{
                  'error-shake': invalidCodewords.codeword2,
                }"
                placeholder="🍑 Gelbes Codewort"
                :disabled="timeoutRemaining > 0"
                maxlength="10"
                @input="clearFieldError('codeword2')"
                @blur="validateCodeword('codeword2', codeword2)"
                @keydown.tab.exact="
                  $event.preventDefault();
                  validateCodeword('codeword2', codeword2);
                  input3Ref?.focus();
                "
                @keydown.shift.tab="
                  $event.preventDefault();
                  input1Ref?.focus();
                "
                @keydown.enter="
                  validateCodeword('codeword2', codeword2);
                  input3Ref?.focus();
                "
              >
            </div>

            <div>
              <label
                class="block text-sm sm:text-base font-medium text-wedding-700 mb-2"
              >
                3. Codewort (dritte Zeile)
              </label>
              <input
                ref="input3Ref"
                v-model="codeword3"
                type="text"
                class="input-field"
                :class="{
                  'error-shake': invalidCodewords.codeword3,
                }"
                placeholder="🫐 Blaues Codewort"
                :disabled="timeoutRemaining > 0"
                maxlength="10"
                @input="clearFieldError('codeword3')"
                @blur="validateCodeword('codeword3', codeword3)"
                @keydown.shift.tab="
                  $event.preventDefault();
                  input2Ref?.focus();
                "
                @keydown.enter="
                  validateCodeword('codeword3', codeword3);
                  handleSubmit();
                "
              >
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="btn-primary w-full relative"
            :class="{ 'btn-loading': isLoading }"
            :disabled="timeoutRemaining > 0 || isLoading"
          >
            <span
              v-if="isLoading"
              class="invisible"
            >🔍 Prüfe...</span>
            <span v-else-if="timeoutRemaining > 0">
              ⏰ Warten ({{ Math.ceil(timeoutRemaining / 1000) }}s)
            </span>
            <span v-else>✨ Haiku prüfen</span>
            <span
              v-if="isLoading"
              class="absolute inset-0 flex items-center justify-center"
            >
              <div
                class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"
              />
            </span>
          </button>
        </form>

        <!-- Error Message -->
        <Transition name="slide-up">
          <div
            v-if="errorMessage"
            class="mt-6"
          >
            <div
              class="bg-red-50 border border-red-200 rounded-lg p-4 text-center relative overflow-hidden"
            >
              <div
                class="absolute inset-0 bg-gradient-to-r from-red-100 to-red-50 opacity-50"
              />
              <div class="relative">
                <div class="flex items-center justify-center mb-2">
                  <span class="text-2xl mr-2">⚠️</span>
                  <p class="text-red-700 font-semibold">
                    {{ errorMessage }}
                  </p>
                </div>
                <p
                  v-if="attemptCount > 0"
                  class="text-sm text-red-600"
                >
                  Versuche bisher: {{ attemptCount }}
                </p>
                <div
                  v-if="timeoutRemaining > 0"
                  class="mt-3 bg-red-100 rounded-full h-2 overflow-hidden"
                >
                  <div
                    class="h-full bg-red-400 rounded-full transition-all duration-1000 ease-linear"
                    :style="{
                      width: `${100 - (timeoutRemaining / 30000) * 100}%`,
                    }"
                  />
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>

      <!-- Success Modal -->
      <Transition name="fade">
        <div
          v-if="showSuccess"
          class="fixed inset-0 bg-white flex flex-col items-center justify-center p-4 sm:p-6 z-50"
        >
          <div class="max-w-2xl w-full text-center">
            <!-- Celebration Effects -->
            <div class="flex items-center justify-center gap-4 text-4xl mb-8">
              <span class="text-wedding-500">🍎</span>
              <span class="text-wedding-400">✨</span>
              <span class="text-wedding-700">♥️</span>
              <span class="text-wedding-400">✨</span>
              <span class="text-wedding-500">🌹</span>
            </div>

            <!-- Main Content -->
            <h2
              class="text-3xl sm:text-4xl font-bold text-wedding-700 mb-8 bg-gradient-to-r from-wedding-600 to-wedding-800 bg-clip-text"
            >
              Herzlichen Glückwunsch!
            </h2>

            <p
              class="text-bohemian-700 mb-12 text-lg sm:text-xl font-light leading-relaxed"
            >
              Du hast ein wunderschönes Haiku vervollständigt!
            </p>

            <!-- Display the completed haiku -->
            <div class="mb-16">
              <div class="space-y-6">
                <div
                  v-for="(line, index) in completedHaiku.lines"
                  :key="index"
                  class="text-2xl sm:text-3xl leading-relaxed text-bohemian-800 italic font-medium"
                  :style="{ animationDelay: `${index * 0.3}s` }"
                >
                  {{ line }}
                </div>
              </div>
            </div>

            <!-- Back Button -->
            <button
              class="px-6 py-3 text-bohemian-600 hover:text-bohemian-800 bg-bohemian-50 hover:bg-bohemian-100 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-bohemian-300"
              @click="resetAndReturn"
            >
              ← Zurück
            </button>
          </div>
        </div>
      </Transition>

      <!-- Statistics -->
      <div class="mt-6 sm:mt-8 text-center text-sm text-bohemian-500">
        <p
          v-if="attemptCount > 0"
          class="mt-1"
        >
          📊 Deine Versuche: {{ attemptCount }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import {
  verifyCodewords,
  getTimeoutRemaining,
  formatTimeoutDisplay,
  getAttemptCount,
} from "../utils/verification.js";
import { getAllLines } from "../data/haikus.js";

// Reactive state
const codeword1 = ref("");
const codeword2 = ref("");
const codeword3 = ref("");
const isLoading = ref(false);
const showError = ref(false);
const errorMessage = ref("");
const showSuccess = ref(false);
const completedHaiku = ref(null);
const timeoutRemaining = ref(0);
const attemptCount = ref(0);
const invalidCodewords = ref({
  codeword1: false,
  codeword2: false,
  codeword3: false,
});

// Refs for input elements
const input1Ref = ref(null);
const input2Ref = ref(null);
const input3Ref = ref(null);

// Timer for countdown
let timeoutId = null;

// Get all valid codewords for validation
const validCodewords = getAllLines().map((line) => line.codeword.toUpperCase());

// Methods
const clearError = () => {
  showError.value = false;
  errorMessage.value = "";
  invalidCodewords.value = {
    codeword1: false,
    codeword2: false,
    codeword3: false,
  };
};

// Clear error for specific field
const clearFieldError = (fieldName) => {
  showError.value = false;
  errorMessage.value = "";
  invalidCodewords.value[fieldName] = false;
};

// Validate if a codeword exists in the haiku set
const isValidCodeword = (codeword) => {
  if (!codeword || codeword.trim().length === 0) return true; // Empty is OK
  return validCodewords.includes(codeword.trim().toUpperCase());
};

// Validate individual codeword on blur/navigation
const validateCodeword = (fieldName, value) => {
  if (value && value.trim().length > 0 && !isValidCodeword(value)) {
    invalidCodewords.value[fieldName] = true;
    // Trigger shake animation
    setTimeout(() => {
      invalidCodewords.value[fieldName] = false;
    }, 500);
  }
};

const resetGame = () => {
  codeword1.value = "";
  codeword2.value = "";
  codeword3.value = "";
  showSuccess.value = false;
  showError.value = false;
  errorMessage.value = "";
  completedHaiku.value = null;
  invalidCodewords.value = {
    codeword1: false,
    codeword2: false,
    codeword3: false,
  };
};

const resetAndReturn = async () => {
  resetGame();
  await nextTick();
  if (input1Ref.value) {
    input1Ref.value.focus();
  }
};

const focusFirstInput = async () => {
  await nextTick();
  if (input1Ref.value) {
    input1Ref.value.focus();
  }
};

// Handle browser back button when success modal is open
const handlePopState = (event) => {
  if (showSuccess.value) {
    event.preventDefault();
    resetAndReturn();
    // Push a new state to prevent actual navigation
    window.history.pushState(null, "", window.location.href);
  }
};

// Push state when success modal opens
const pushSuccessState = () => {
  window.history.pushState(null, "", window.location.href);
};

// Watch for success modal changes
watch(showSuccess, (newValue) => {
  if (newValue) {
    // Modal opened - push state and add listener
    pushSuccessState();
    window.addEventListener("popstate", handlePopState);
  } else {
    // Modal closed - remove listener
    window.removeEventListener("popstate", handlePopState);
  }
});

const updateTimeout = () => {
  timeoutRemaining.value = getTimeoutRemaining();
  attemptCount.value = getAttemptCount();
  if (timeoutRemaining.value > 0) {
    startTimeoutTimer();
  }
};

const startTimeoutTimer = () => {
  stopTimeoutTimer();
  timeoutId = setTimeout(() => {
    updateTimeout();
  }, 100);
};

const stopTimeoutTimer = () => {
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
};

const handleSuccess = (result) => {
  completedHaiku.value = result.haiku;
  showSuccess.value = true;
};

const handleError = (result) => {
  showError.value = true;
  errorMessage.value = result.message;

  if (result.error === "TIMEOUT" || result.error === "WRONG_COMBINATION") {
    timeoutRemaining.value = result.timeoutRemaining;
    attemptCount.value = result.attempts;
    startTimeoutTimer();
  }
};

const handleSubmit = async () => {
  if (timeoutRemaining.value > 0) {
    return;
  }

  clearError();

  // First, validate all codewords
  const codewords = [
    { field: "codeword1", value: codeword1.value },
    { field: "codeword2", value: codeword2.value },
    { field: "codeword3", value: codeword3.value },
  ];

  let hasInvalidCodewords = false;

  codewords.forEach(({ field, value }) => {
    if (value && value.trim().length > 0 && !isValidCodeword(value)) {
      invalidCodewords.value[field] = true;
      hasInvalidCodewords = true;
      // Clear shake after animation
      setTimeout(() => {
        invalidCodewords.value[field] = false;
      }, 500);
    }
  });

  // If any codewords are invalid, don't proceed
  if (hasInvalidCodewords) {
    return;
  }

  isLoading.value = true;

  try {
    // Small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    const result = verifyCodewords(
      codeword1.value,
      codeword2.value,
      codeword3.value,
    );

    if (result.success) {
      handleSuccess(result);
    } else {
      // Only handle wrong combinations if all codewords are valid
      if (result.error === "WRONG_COMBINATION") {
        // Clear the form and start timeout
        setTimeout(() => {
          codeword1.value = "";
          codeword2.value = "";
          codeword3.value = "";
          timeoutRemaining.value = result.timeoutRemaining;
          attemptCount.value = result.attempts;
          startTimeoutTimer();
          // Focus first input after clearing
          setTimeout(() => {
            if (input1Ref.value) {
              input1Ref.value.focus();
            }
          }, 100);
        }, 1000);
      }
      handleError(result);
    }
  } catch (error) {
    console.error("Verification error:", error);
    showError.value = true;
    errorMessage.value =
      "Ein unerwarteter Fehler ist aufgetreten. Bitte versuche es erneut.";
  } finally {
    isLoading.value = false;
  }
};

// Lifecycle
onMounted(() => {
  updateTimeout();
  focusFirstInput();
});

onUnmounted(() => {
  stopTimeoutTimer();
  // Clean up popstate listener
  window.removeEventListener("popstate", handlePopState);
});
</script>
