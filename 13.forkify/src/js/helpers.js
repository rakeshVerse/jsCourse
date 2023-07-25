// Helper Functions

import { TIMEOUT_SEC } from './config';

/**
 * Creates a Promise that rejects with an error after the specified time.
 * @param {number} s - The time in seconds before the Promise rejects.
 * @returns {Promise} A Promise that rejects with an error after the specified time.
 */
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**
 * Performs an AJAX request using fetch API and handles timeout.
 * @param {string} url - The URL to send the AJAX request to.
 * @param {Object} [uploadData = undefined] - The data to be uploaded.
 * @returns {Promise} A Promise that resolves with the response data if successful, otherwise rejects with an error.
 * @throws {Error} If the AJAX request fails or the timeout is reached.
 */
export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
