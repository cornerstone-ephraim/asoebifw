import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";

const countries = getCountries();

export type PrizePhoneCountry = CountryCode;

export type PhoneCountryOption = {
  callingCode: string;
  flag: string;
  name: string;
  value: CountryCode;
};

function getCountryFlag(country: CountryCode) {
  return String.fromCodePoint(
    ...country
      .toUpperCase()
      .split("")
      .map((character) => 127397 + character.charCodeAt(0)),
  );
}

export const phoneCountryOptions: PhoneCountryOption[] = countries
  .map((country) => ({
    callingCode: `+${getCountryCallingCode(country)}`,
    flag: getCountryFlag(country),
    name: country,
    value: country,
  }))
  .sort((first, second) => first.value.localeCompare(second.value));

export function getLocalizedPhoneCountryOptions() {
  const regionNames = new Intl.DisplayNames(["en"], { type: "region" });

  return phoneCountryOptions
    .map((option) => ({
      ...option,
      name: regionNames.of(option.value) ?? option.value,
    }))
    .sort((first, second) => first.name.localeCompare(second.name));
}

export function isPrizePhoneCountry(value: string): value is CountryCode {
  return countries.includes(value as CountryCode);
}

export function normalizePrizePhone(
  country: string,
  phoneNumber: string,
): string | null {
  if (!isPrizePhoneCountry(country)) return null;

  const parsed = parsePhoneNumberFromString(phoneNumber, country);
  return parsed?.isValid() ? parsed.number : null;
}
