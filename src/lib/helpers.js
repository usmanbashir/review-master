/**
 * Calculate the sum of the ratings.
 *
 * @param {Array} ratings
 * @returns {number} Sum of the Ratings
 */
const getSummedRating = (ratings) => {
  return ratings.reduce((accumulator, rating) => {
    return accumulator + rating.stars;
  }, 0);
};

/**
 * Calculate the average rating.
 *
 * @param {number} sum
 * @param {number} total
 * returns {number} Average Rating
 */
const getAverageRating = (sum, total) => {
  return sum / total;
};

/**
 * Build a URL for a given locations Google Street View Photo.
 *
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {string} key - API Key to use for Google Street View Photo.
 * @param {?number} radius - The radius for the search zone.
 * @returns {string} Google Street View Photo URL
 */
const getStreetViewPhotoURL = (lat, lng, key, radius = 50) => {
  return `https://maps.googleapis.com/maps/api/streetview?size=400x200&location=${lat},${lng}&radius=${radius}&key=${key}`;
};

/**
 * Sort an Array of restaurants based on their average rating.
 *
 * @param {Array} data
 * @return {Array} Sorted Array
 */
const getSortedDataByAverageRating = (data) => {
  // Create a new instance of the array to be sorted.
  // As `Array.sort` mutates the original array instead.
  return [...data].sort((a, b) => {
    let aAvgRating = 0;
    let bAvgRating = 0;

    // In case the information was retrieved from Google Places API.
    // Use the retrieved rating information in place of the average.
    if (a.googleRating) {
      aAvgRating = a.googleRating;
    } else {
      aAvgRating = getAverageRating(getSummedRating(a.ratings), a.ratings.length);
    }

    if (b.googleRating) {
      bAvgRating = b.googleRating;
    } else {
      bAvgRating = getAverageRating(getSummedRating(b.ratings), b.ratings.length);
    }

    // In case the restaurant has no ratings information.
    if (isNaN(aAvgRating)) { aAvgRating = 0; }
    if (isNaN(bAvgRating)) { bAvgRating = 0; }

    if (aAvgRating > bAvgRating) {
      return -1;
    } else if (aAvgRating < bAvgRating) {
      return 1;
    } else {
      return 0;
    }
  });
};

/**
 * Makes the source number match the precision of the target number.
 *
 * @param {number} fromNumber - The source number that needs to be converted.
 * @param {number} toNumber - The target number who's precision should be matched during conversion.
 * @returns {number}
 */
const matchPrecision = (fromNumber, toNumber) => {
  return Number(fromNumber.toPrecision(toNumber.toString().length - 1));
};

export {
  getSummedRating,
  getAverageRating,
  getStreetViewPhotoURL,
  getSortedDataByAverageRating,
  matchPrecision,
};
