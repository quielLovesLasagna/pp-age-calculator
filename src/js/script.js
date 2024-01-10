"use strict";

// ELEMENT/S
const userBirthdayEl = document.getElementById("date-of-birth");
const calcAgeBtn = document.querySelector(".calc__submit-btn");
const calcAgainBtn = document.querySelector(".calc-again");
const calcResults = document.querySelector(".calc__results");
const yearsEl = document.querySelector(".years");
const monthsEl = document.querySelector(".months");
const daysEl = document.querySelector(".days");
const yearTag = document.querySelector(".year-tag");
const monthTag = document.querySelector(".month-tag");
const dayTag = document.querySelector(".day-tag");

// FUNCTION/S
function calcAge(birthDate) {
	// -- Convert birthdate str to Date Object
	const birthDateObj = new Date(birthDate);

	// -- Get user year,  month, and day
	const userBirthYear = birthDateObj.getFullYear();
	const userBirthMonth = birthDateObj.getMonth() + 1;
	const userBirthDay = birthDateObj.getDate();

	// -- Get current data
	const currentDate = new Date();

	// -- Get current year, month, and day
	const currentYear = currentDate.getFullYear();
	const currentMonth = currentDate.getMonth() + 1;
	const currentDay = currentDate.getDate();

	// -- Initialize user age in years
	let ageInYears = currentYear - userBirthYear;

	// -- Declare user age in months and days
	let ageInMonths;
	let ageInDays;

	// -- Calculating ageInMonths and ageInYears
	if (currentMonth >= userBirthMonth) {
		ageInMonths = currentMonth - userBirthMonth;
	} else {
		ageInYears--;
		ageInMonths = 12 + currentMonth - userBirthMonth;
	}

	// -- Calculating the ageInDays
	if (currentDay >= userBirthDay) {
		ageInDays = currentDay - userBirthDay;
	} else {
		ageInMonths--;
		const daysInBirthMonth = new Date(currentYear, userBirthMonth, 0).getDate();
		ageInDays = daysInBirthMonth + currentDay - userBirthDay;
	}

	// From: https://github.com/josefigarola/JS_Practices/blob/main/AgeCalculatorApp/script.js
	if (ageInMonths < 0) {
		ageInMonths = 11;
		ageInYears--;
	}

	return {
		years: ageInYears,
		months: ageInMonths,
		days: ageInDays,
	};
}

function formatTag(info) {
	yearTag.textContent = info.years > 1 ? "Years" : "Year";
	monthTag.textContent = info.months > 1 ? "Months" : "Month";
	dayTag.textContent = info.days > 1 ? "Days" : "Day";
}

function displayAge(userAge) {
	// -- Show results
	calcResults.classList.add("show-results");

	// -- Format the tags
	formatTag(userAge);

	// -- Get the years, months, and days from userAge
	const { years, months, days } = userAge;

	// -- Change results text contents
	yearsEl.textContent = String(years).padStart(2, "0");
	monthsEl.textContent = String(months).padStart(2, "0");
	daysEl.textContent = String(days).padStart(2, "0");
}

function removeResult() {
	// -- Remove results
	calcResults.classList.remove("show-results");

	// -- Remove user birthday
	userBirthdayEl.value = "";
}

// EVENT LISTENER/S
calcAgeBtn.addEventListener("click", (event) => {
	event.preventDefault();

	if (!userBirthdayEl.value) {
		return alert("Please provide your date of birth!");
	}

	// -- Store user age info to userAge
	const userAge = calcAge(userBirthdayEl.value);

	// -- Invoke displayAge function using userAge
	displayAge(userAge);
});

calcAgainBtn.addEventListener("click", removeResult);
