const form = document.getElementById("form");
const nameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passInput = document.getElementById("password");
const phoneInput = document.getElementById("phone");

const checkUsername = () => {
	let valid = false;
	 
	const min = 3;
	const max = 25;
	
	const username = nameInput.value.trim();
	 
	if (isEmpty(username)) {
		showError(nameInput, "El nombre es obligatorio");
		 
	} else if (!isBetween(username.length, min, max)) {
		showError(
			nameInput,
			`El nombre debe tener entre ${min} y ${max} caracteres`
		);
		 
		showSuccess(nameInput);
		valid = true;
	}
	return valid;
};

const checkMail = () => {
	 
	let valid = false;
	 
	const emailValue = emailInput.value.trim();
	 
	if (isEmpty(emailInput)) {
		showError(emailInput, "El mail es obligatorio");
		 
	} else if (!isEmailValid(emailValue)) {
		showError(emailInput, "El mail no es válido");
	} else {
		 
		showSuccess(emailInput);
		valid = true;
	}
	return valid;
};

const checkPassword = () => {
	 
	let valid = false;
	 
	const password = passInput.value.trim();
	 
	if (isEmpty(password)) {
		showError(passInput, "La contraseña es obligatoria");
		 
	} else if (!isPassSecure(password)) {
		showError(
			passInput,
			"La contraseña debe tener al menos 8 caracteres, una mayuscula, una minuscula y un simbolo"
		);
		 
	} else {
		showSuccess(passInput);
		valid = true;
	}
	return valid;
};

const checkPhone = () => {
	 
	let valid = false;
	 
	const phoneValue = phoneInput.value.trim();
	 
	if (!isPhoneValid(phoneValue)) {
		showError(phoneInput, "El telefono no es válido");
		 
	} else {
		showSuccess(phoneInput);
		valid = true;
	}
	return valid;
}


const isEmpty = (value) => value === "";

const isBetween = (length, min, max) => {
	return length < min || length > max ? false : true;
};

const isEmailValid = (email) => {
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
	 
	return re.test(email);
};
 

const isPassSecure = (pass) => {
	const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
	 
	return re.test(pass);
};

const isPhoneValid = (phone) => {
	const re = /^[0-9]{10}$/;
	 
	return re.test(phone);
};

const showError = (input, message) => {
	const formField = input.parentElement;
	formField.classList.remove("success");
	formField.classList.add("error");
	const error = formField.querySelector("small");
	error.textContent = message;
};

const showSuccess = (input) => {
	const formField = input.parentElement;
	formField.classList.remove("error");
	formField.classList.add("success");
	const error = formField.querySelector("small");
	error.textContent = "";
};

const debounce = (fn, delay = 500) => {
	let timeoutId;

	return (...args) => {
		 
		if (timeoutId) clearTimeout(timeoutId);

		 
		timeoutId = setTimeout(() => {
			fn.apply(null, args);
		}, delay);
	};
};

form.addEventListener("submit", (e) => {
	 
	e.preventDefault();

	 
	let isUsernameValid = checkUsername();
	let isEmailValid = checkMail();
	let isPasswordValid = checkPassword();
	let isPhoneValid = checkPhone();

	 
	let isFormValid =
		isUsernameValid && isEmailValid && isPasswordValid && isPhoneValid;

	 
	if (isFormValid) {
		console.log("Enviamos el formulario");
		form.submit();
	}
});

form.addEventListener(
	"input",
	debounce((e) => {
		switch (e.target.id) {
			case "username":
				checkUsername();
				break;
			case "email":
				checkMail();
				break;
			case "password":
				checkPassword();
				break;
			case "phone":
				checkPhone();
				break;
		}
	})
);