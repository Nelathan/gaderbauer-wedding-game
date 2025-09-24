<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-4">
    <div class="max-w-2xl w-full">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-bold text-wedding-700 mb-4">
          🌸 Haiku Hochzeitsspiel 🌸
        </h1>
        <p class="text-lg text-wedding-600 leading-relaxed">
          Kombiniere drei Codewörter von den Karten, um ein vollständiges Haiku
          zu bilden!
        </p>
        <p class="text-sm text-wedding-500 mt-2">
          Daniel & Astrid • 27.09.2025
        </p>
      </div>

      <!-- Game Card -->
      <div class="card max-w-lg mx-auto">
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
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-wedding-700 mb-2">
                1. Codewort (erste Zeile)
              </label>
              <input
                v-model="codeword1"
                type="text"
                class="input-field"
                :class="{ 'error-shake': showError && !codeword1 }"
                placeholder="z.B. GOLD"
                :disabled="timeoutRemaining > 0"
                maxlength="10"
                @input="clearError"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-wedding-700 mb-2">
                2. Codewort (zweite Zeile)
              </label>
              <input
                v-model="codeword2"
                type="text"
                class="input-field"
                :class="{ 'error-shake': showError && !codeword2 }"
                placeholder="z.B. HERZ"
                :disabled="timeoutRemaining > 0"
                maxlength="10"
                @input="clearError"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-wedding-700 mb-2">
                3. Codewort (dritte Zeile)
              </label>
              <input
                v-model="codeword3"
                type="text"
                class="input-field"
                :class="{ 'error-shake': showError && !codeword3 }"
                placeholder="z.B. EWIG"
                :disabled="timeoutRemaining > 0"
                maxlength="10"
                @input="clearError"
              >
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="btn-primary w-full"
            :disabled="timeoutRemaining > 0 || isLoading"
          >
            <span v-if="isLoading">🔍 Prüfe...</span>
            <span v-else-if="timeoutRemaining > 0">
              ⏰ Warten ({{ Math.ceil(timeoutRemaining / 1000) }}s)
            </span>
            <span v-else>✨ Haiku prüfen</span>
          </button>
        </form>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="mt-6"
        >
          <div
            class="bg-red-50 border border-red-200 rounded-lg p-4 text-center"
          >
            <p class="text-red-700">
              {{ errorMessage }}
            </p>
            <p
              v-if="attemptCount > 0"
              class="text-sm text-red-600 mt-2"
            >
              Versuche bisher: {{ attemptCount }}
            </p>
          </div>
        </div>
      </div>

      <!-- Success Modal -->
      <Transition name="fade">
        <div
          v-if="showSuccess"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
        >
          <div
            class="bg-white rounded-lg shadow-2xl max-w-lg w-full p-8 text-center"
          >
            <div class="animate-bounce-slow text-green-600 text-6xl mb-4">
              🎉
            </div>
            <h2 class="text-2xl font-bold text-wedding-700 mb-4">
              Herzlichen Glückwunsch!
            </h2>
            <p class="text-wedding-600 mb-6">
              Du hast ein wunderschönes Haiku vervollständigt!
            </p>

            <!-- Display the completed haiku -->
            <div
              class="bg-wedding-50 rounded-lg p-6 mb-6 border border-wedding-200"
            >
              <div
                v-for="(line, index) in completedHaiku.lines"
                :key="index"
                class="haiku-line"
              >
                {{ line }}
                <span class="text-xs text-wedding-500 ml-2 font-mono">
                  ({{ completedHaiku.codewords[index] }})
                </span>
              </div>
            </div>

            <div class="flex gap-4 justify-center">
              <button
                class="btn-primary"
                @click="resetGame"
              >
                🔄 Neues Haiku suchen
              </button>
              <button
                class="px-6 py-3 border-2 border-wedding-300 text-wedding-700 rounded-lg hover:bg-wedding-50 transition-colors duration-200"
                @click="showSuccess = false"
              >
                ✨ Bewundern
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Statistics -->
      <div class="mt-8 text-center text-sm text-wedding-500">
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
import { ref, onMounted, onUnmounted } from "vue";
import {
  verifyCodewords,
  getTimeoutRemaining,
  formatTimeoutDisplay,
  getAttemptCount,
} from "../utils/verification.js";

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

// Timer for countdown
let timeoutId = null;

// Methods
const clearError = () => {
  showError.value = false;
  errorMessage.value = "";
};

const resetGame = () => {
  codeword1.value = "";
  codeword2.value = "";
  codeword3.value = "";
  showSuccess.value = false;
  showError.value = false;
  errorMessage.value = "";
  completedHaiku.value = null;
};

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

  if (result.error === "WRONG_COMBINATION") {
    // Clear inputs on wrong combination
    setTimeout(() => {
      codeword1.value = "";
      codeword2.value = "";
      codeword3.value = "";
    }, 1000);
  }
};

const handleSubmit = async () => {
  if (timeoutRemaining.value > 0) {
    return;
  }

  clearError();
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
});

onUnmounted(() => {
  stopTimeoutTimer();
});
</script>
