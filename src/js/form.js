const openRegModal = document.querySelector(".open-reg-modal");

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

openRegModal.addEventListener("click", () => {
	showModal("#reg-form-modal");
});

const closeBtn = document.querySelector(".close-btn");
const form = document.querySelector("#register-user"),
	userName = document.querySelector("#user_name"),
	userLastName = document.querySelector("#user_surname"),
	userMobile = document.querySelector("#user_phone"),
	userPersonalId = document.querySelector("#user_personal-id"),
	userEmail = document.querySelector("#user_email"),
	userZipCode = document.querySelector("#user_zip-code"),
	// user id ფორმში, რომელიც გვჭირდება დაედითებისთვის
	user_id = document.querySelector("#user_id");
let userGender = document.querySelector("[name='gender']");

const createUserUrl = "https://borjomi.loremipsum.ge/api/register", //method POST  ყველა ველი სავალდებულო
	getAllUsersUrl = "https://borjomi.loremipsum.ge/api/all-users", //method GET
	getSingleUserUrl = "https://borjomi.loremipsum.ge/api/get-user/1 ", //id, method  GET
	updateUserUrl = "https://borjomi.loremipsum.ge/api/update-user/1 ", //id, method PUT
	deleteUserUrl = "https://borjomi.loremipsum.ge/api/delete-user/1"; //id, method DELETE

// const user = {
// 	first_name: "satesto",
// 	last_name: "text",
// 	phone: "123456789",
// 	id_number: "12345678909",
// 	email: "text@gmail.com",
// 	gender: "male",
// 	zip_code: "1245",
// };

function addNewUser(userObj) {
	fetch("https://borjomi.loremipsum.ge/api/register", {
		method: "post",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userObj),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);

			if (data.status === 1) {
				getAllUsers();
				form.reset();
				closeBtn.click();
				// console.log(form);

				// window.location = "index.html";
			}
		});
}

async function deleteUser(id) {
	try {
		const res = await fetch(
			`https://borjomi.loremipsum.ge/api/delete-user/${id}`,
			{
				method: "delete",
			}
		);

		// console.log(res);

		const data = await res.json();
		console.log(data);
		if (data.status == 1) {
			getAllUsers();
		}
	} catch (error) {
		console.log(error);
	}
}

form.addEventListener("submit", (e) => {
	e.preventDefault();
	userGender = document.querySelector("[name='gender']:checked");

	const userObj = {
		first_name: userName.value,
		last_name: userLastName.value,
		phone: userMobile.value,
		id_number: userPersonalId.value,
		email: userEmail.value,
		gender: userGender.value,
		zip_code: userZipCode.value,
	};

	addNewUser(userObj);
});

// fetch("https://jsonplaceholder.typicode.com/todos/1")
// 	.then((res) => res.json())
// 	.then((data) => console.log(data));

console.log("after fecth");
// new Promise((resolve, reject)=>{})

function getAllUsers() {
	fetch("https://borjomi.loremipsum.ge/api/all-users")
		.then((res) => res.json())
		.then((data) => {
			console.log(data.users);
		})
		.catch((err) => console.log(err));
}

getAllUsers();

try {
	console.log(userNAME);
} catch (error) {
	console.log(error);
} finally {
	console.log("finally");
}

console.log("after try catch");
