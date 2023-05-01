// დავალება:

//   1. არსებულ ფორმაში დაამატეთ 2 ველი mobile-number, repeat-password

//   2.  mobile-number - ვალიდაცია:  სავალდებულოა, უნდა შეიცავდეს მხოლოდ რიცხვებს, შეყვანილი სიმბოლოების რაოდენობა უნდა იყოს 9-ის ტოლი.

//   3.  repeat-password - ვალიდაცია: სავალდებულოა, მნიშვნელობა უნდა ემთხვეოდეს password ველის მნიშვნელობას

// იუზერისთვის გამოიტანეთ შესაბამისი შეტყობინებები (როგორც ლექციაზე დავამატეთ).

const form = document.querySelector("form"),
	nameInput = document.querySelector("#name"),
	emailInput = document.querySelector("#email"),
	passwordInput = document.querySelector("#password"),
	mobileNumberInput = document.querySelector("#mobile_number"),
	repeatPasswordInput = document.querySelector("#repeat_password");

const openModal = document.querySelector(".open-modal");

function checkEmail() {
	if (emailInput.validity.valueMissing) {
		emailInput.parentElement.querySelector(".message").innerText =
			"email is required";
		return false;
	} else if (!/@gmail.com$/.test(emailInput.value)) {
		emailInput.parentElement.querySelector(".message").innerText =
			"email must be gmail";
		return false;
	} else {
		emailInput.parentElement.querySelector(".message").innerText = "";
		return true;
	}
}

function checkPassword() {
	const passValue = passwordInput.value;
	if (passValue.length < 5) {
		passwordInput.parentElement.querySelector(".message").innerText =
			"weak password";
		passwordInput.classList.remove("normal");
		passwordInput.classList.remove("strong");
		passwordInput.classList.add("weak");
		return false;
	} else if (passValue.length >= 5 && passValue.length < 8) {
		passwordInput.parentElement.querySelector(".message").innerText =
			"normal password";
		passwordInput.classList.remove("weak");
		passwordInput.classList.remove("strong");
		passwordInput.classList.add("normal");
		return false;
	} else {
		passwordInput.parentElement.querySelector(".message").innerText = "";
		passwordInput.classList.remove("weak");
		passwordInput.classList.remove("normal");
		passwordInput.classList.add("strong");
		return true;
	}
}

function checkMobileNumber() {
	// console.log(mobileNumberInput.value, mobileNumberInput.value.trim());
	// ''
	if (mobileNumberInput.value.trim() === "") {
		mobileNumberInput.parentElement.querySelector(".message").innerText =
			"mobile number is required";
		return false;
	} else if (!/^\d+$/.test(mobileNumberInput.value)) {
		// mobileNumberInput.value = "";
		// /[0-9]/.test(mobileNumberInput.value)
		mobileNumberInput.parentElement.querySelector(".message").innerText =
			"mobile number must be only numbers";
		return false;
	} else if (mobileNumberInput.value.length !== 9) {
		mobileNumberInput.parentElement.querySelector(".message").innerText =
			"mobile number must be 9 char";
		return false;
	} else {
		mobileNumberInput.parentElement.querySelector(".message").innerText = "";
		return true;
	}
}

function checkRepeatPassword() {
	if (repeatPasswordInput.value.trim() === "") {
		repeatPasswordInput.parentElement.querySelector(".message").innerText =
			"password is required";

		return false;
	} else if (repeatPasswordInput.value !== passwordInput.value) {
		repeatPasswordInput.parentElement.querySelector(".message").innerText =
			"passwords must be same";
		return false;
	} else {
		repeatPasswordInput.parentElement.querySelector(".message").innerText = "";
		return true;
	}
}

emailInput.addEventListener("input", checkEmail);
passwordInput.addEventListener("input", checkPassword);
mobileNumberInput.addEventListener("input", checkMobileNumber);
repeatPasswordInput.addEventListener("input", checkRepeatPassword);

form.addEventListener("submit", (e) => {
	e.preventDefault();
	// validations

	const isEmailValid = checkEmail();
	const isPasswordValid = checkPassword();
	const isMobileValid = checkMobileNumber();
	const isRepeatedPasswordValid = checkRepeatPassword();

	if (
		isEmailValid &&
		isPasswordValid &&
		isMobileValid &&
		isRepeatedPasswordValid
	) {
		// console.log("submit form");
		// form.submit()
		showModal("#success-modal");
		form.reset();
	}
});

function showModal(selector) {
	const modal = document.querySelector(selector);
	if (modal) {
		const closeBtn = modal.querySelector(".close-btn");

		modal.classList.add("active");
		closeBtn.addEventListener("click", (e) => {
			modal.classList.remove("active");
		});
		modal.addEventListener("click", (e) => {
			// console.log(e.target);
			if (e.target.classList.contains("modal")) {
				modal.classList.remove("active");
			}
		});
	}
}

openModal.addEventListener("click", (e) => {
	showModal("#error-modal");
});
