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
let userList = document.querySelector("tbody");

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

// TODO: დაასრულეთ შემდეგი ფუნქციები
function renderUsers(usersArray) {
	// TODO: usersArray არის სერვერიდან დაბრუნებული ობიექტების მასივი
	// TODO: ამ მონაცმების მიხედვით html ში ჩასვით ცხრილი როგორც "ცხრილი.png" შია

	// console.log(usersArray);
	const userRows = usersArray.map((user) => {
		return `
					<tr>
						<td>${user.id}</td>
						<td>${user.first_name}</td>
						<td>${user.last_name}</td>
						<td>${user.email}</td>
						<td>${user.id_number}</td>
						<td>${user.phone}</td>
						<td>${user.zip_code}</td>
						<td>${user.gender}</td>
						<td>
								<button class="edit " type="button" data-user-id="${user.id}" data-name="satesto">Edit</button>
								<button class="delete " type="button" data-user-id="${user.id}">Delete</button>
						</td>
					</tr>`;
	});
	// console.log(usersArray);
	userList.innerHTML = userRows.join("");
	userActions(); // ყოველ რენდერზე ახლიდან უნდა მივაბათ ივენთ ლისნერები
}

// TODO: დაასრულე
function userActions() {
	// 1. ცხრილში ღილაკებზე უნდა მიამაგროთ event listener-ები
	// 2. იქნება 2 ღილაკი რედაქტირება და წაშლა როგორც "ცხრილი.png" ში ჩანს
	// 3. id შეინახეთ data-user-id ატრიბუტად ღილაკებზე, data ატრიბუტებზე წვდომა შეგიძლიათ dataset-ის გამოყენებით მაგ:selectedElement.dataset
	// 4. წაშლა ღილაკზე დაჭერისას უნდა გაიგზავნოს წაშლის მოთხოვნა (deleteUser ფუნქციის მეშვეობით) სერვერზე და გადაეცეს id
	// 5. ედიტის ღილაკზე უნდა გაიხსნას მოდალი სადაც ფორმი იქნება იმ მონაცემებით შევსებული რომელზეც მოხდა კლიკი. ედიტის ღილაკზე უნდა გამოიძახოთ getUser ფუნქცია და რომ დააბრუნებს ერთი მომხმარებლის დატას (ობიექტს და არა მასივს)  ეს დატა უნდა შეივსოს ფორმში და ამის შემდეგ შეგიძლიათ დააედიტოთ ეს ინფორმაცია. ფორმის დასაბმითებისას უნდა მოხდეს updateUser() ფუნქციის გამოძახება, სადაც გადასცემთ განახლებულ იუზერის ობიექტს, გვჭირდება იუზერის აიდიც, რომელიც  მოდალის გახსნისას user_id-ის (hidden input არის და ვიზუალურად არ ჩანს) value-ში შეგიძლიათ შეინახოთ

	const editBtns = document.querySelectorAll(".edit");
	const deleteBtns = document.querySelectorAll(".delete");

	editBtns.forEach((btn) => {
		btn.addEventListener("click", async (e) => {
			// console.log(btn.dataset.userId, "edit");

			// მივიღოთ ინფორმაცია იუზერის შესახებ
			const data = await getUser(btn.dataset.userId);

			// console.log(data);
			const user = data.users;

			// შევავსოთ ფორმა ამ იუზერის ინფორმაციით
			userName.value = user.first_name;
			userLastName.value = user.last_name;
			userEmail.value = user.email;
			userMobile.value = user.phone;
			userPersonalId.value = user.id_number;
			userZipCode.value = user.zip_code;
			user_id.value = user.id;

			// სქესის შესაბამისი ინფუთი მოვნიშნოთ
			document
				.querySelector(`input[value=${user.gender}]`)
				.setAttribute("checked", true);

			// გავსხნათ ფორმა
			openRegModal.click();
		});
	});

	deleteBtns.forEach((btn) => {
		btn.addEventListener("click", (e) => {
			// console.log(btn.dataset.userId, "delete");
			const id = btn.dataset.userId;
			deleteUser(id);
		});
	});
}

function getAllUsers() {
	fetch("https://borjomi.loremipsum.ge/api/all-users")
		.then((res) => res.json())
		.then((data) => {
			// console.log(data.users);
			// html-ში გამოტანა მონაცემების

			renderUsers(data.users);
		})
		.catch((err) => console.log(err));
}

async function getUser(id) {
	const res = await fetch(`https://borjomi.loremipsum.ge/api/get-user/${id}`, {
		method: "get",
	});
	// გვიბრუნებს იუზერის ობიექტს
	const data = await res.json();

	return data;
}

function updateUser(userObj) {
	// მიიღებს დაედითებულ ინფორმაციას და გააგზავნით სერვერზე
	// TODO დაასრულეთ ფუნქცია
	//  method: "put",  https://borjomi.loremipsum.ge/api/update-user/${userObj.id}
	// userObj -იც უნდა გადასცეთ როგორც addNewUser ფუნქიაში
	// TODO: შენახვის, ედიტირების და წაშლის შემდეგ ახლიდან წამოიღეთ დატა

	fetch(`https://borjomi.loremipsum.ge/api/update-user/${userObj.id}`, {
		method: "put",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(userObj),
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			getAllUsers();

			// ფორმის რესეტი
			form.reset();
			user_id.value = "";
			document.querySelector(`input[checked]`).removeAttribute("checked"); //მონიშნული სქესის გაუქმება

			// მოდალის დახურვა
			document.querySelector("#reg-form-modal").classList.remove("active");
		})
		.catch((e) => {
			console.log("error", e);
		});
}

getAllUsers();

form.addEventListener("submit", (e) => {
	e.preventDefault();
	userGender = document.querySelector("[name='gender']:checked");

	const userObj = {
		id: user_id.value, //ეს #user_id hidden input გვაქვს html-ში და ამას გამოვიყენებთ მხოლოდ დაედითებისთვის
		first_name: userName.value,
		last_name: userLastName.value,
		phone: userMobile.value,
		id_number: userPersonalId.value,
		email: userEmail.value,
		gender: userGender.value,
		zip_code: userZipCode.value,
	};

	// addNewUser(userObj);

	//  TODO: თუ user_id.value არის ცარიელი (თავიდან ცარიელია) მაშინ უნდა შევქმნათ  --> addNewUser(userObj)

	// თუ დაედითებას ვაკეთებთ, ჩვენ ვანიჭებთ მნიშვნელობას userActions ფუნქციაში
	// TODO: თუ user_id.value არის (არაა ცარიელი სტრინგი) მაშინ უნდა დავაედიტოთ, (როცა ფორმს ედითის ღილაკის შემდეგ იუზერის ინფუთით ვავსებთ, ვაედითებთ და ვასაბმითებთ) -->  updateUser(userObj);

	if (userObj.id) {
		// console.log("update");
		updateUser(userObj);
	} else {
		// console.log("add new");
		addNewUser(userObj);
	}
});
