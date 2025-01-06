/* eslint-disable no-continue */
function isSingleDigit(str: string) {
  const val = Number(str);
  return val >= 0 && val <= 9;
}

/**
 * Apply the mask to the target string.
 *
 * For example, applying the mask '00/00/0000' to '10162024'
 * results in '10/16/2024'.
 *
 * The function stops and returns a partial result if
 * it cannot apply the mask properly.
 *
 * Here's an example of a bad case: applying the same mask to
 * '10/6/2024' results in '10/6'. The day requires two digits.
 */
export function applyMask(
  value: string,
  mask?: string,
  formatDensity?: string
) {
  if (!mask || !value) {
    return value;
  }

  let result = '';
  let valuePtr = 0;
  let maskPtr = 0;

  const targetStr = value.replace(/\s/g, '');

  while (
    valuePtr < targetStr.length &&
    maskPtr < mask.length
  ) {
    const char = targetStr[valuePtr];

    // expect a digit char, and receive a digit char (good case)
    if (mask[maskPtr] === '0' && isSingleDigit(char)) {
      result += char;
      valuePtr += 1;
      maskPtr += 1;
      continue;
    }

    /**
     * Dev note:
     * On mobile, user could only enter digits on the virtual numeric keypad. For mobile users,
     * we automatically append the non-digit char from the mask to the resulting string.
     */

    // expect a non-digit char, and receive the same non-digit char or a digit char (good case)
    if (
      mask[maskPtr] !== '0' &&
      (mask[maskPtr] === char || isSingleDigit(char))
    ) {
      result +=
        formatDensity === 'loose'
          ? ` ${mask[maskPtr]} `
          : mask[maskPtr];

      if (!isSingleDigit(char)) {
        valuePtr += 1;
      }

      maskPtr += 1;
      continue;
    }

    // all other bad cases
    break;
  }

  return result.trim();
}
