/**
 * Helper function to display the resulting data after user input their search criteria
 * 
 * @param {*} result data containing those who match the search criteria
 */
function search(result) {
	let names = buildStudentsHtml(result);
	let students = document.getElementById("students");
	students.innerHTML = names;
}

/**
 * Helper function to clear the search field and sets all student(the original data) to display
 * 
 * @param {*} data the original data with all the students
 */
function clear(data) {
	let names = buildStudentsHtml(data);
		let students = document.getElementById("students");
		students.innerHTML = names;
	
	// clears the search field
	document.getElementById("search-name").value = "";
	document.getElementById("search-major").value = "";
	document.getElementById("search-interest").value = "";
}

fetch("https://cs571.org/s23/hw3/api/students", {
	method: "GET",
	headers: {
		"X-CS571-ID": "bid_2a1709990731052fcc9b"
	}
})
	.then(response => response.json())
	.then(data => {
		console.log(data);
		let names = buildStudentsHtml(data);
		let students = document.getElementById("students");
		students.innerHTML = names;

		document.getElementById("search-btn").addEventListener("click", () => {
			let result = data.filter(person => {
				if ((Object.values(person.name).some(value => value.toLowerCase().includes(document.getElementById("search-name").value.trim().toLowerCase()))
					|| (person.name.first + ' '+ person.name.last).toLowerCase().includes(document.getElementById("search-name").value.trim().toLowerCase()))
					&& person.major.toLowerCase().includes(document.getElementById("search-major").value.trim().toLowerCase())
					&& person.interests.some(value => value.toLowerCase().includes(document.getElementById("search-interest").value.trim().toLowerCase()))) {
					return true;
				}
			});
			search(result);
		});

		document.getElementById("reset-search-btn").addEventListener("click", () => {
			clear(data);
		})
	});



/**
 * Given an array of students, generates HTML for all students
 * using {@link buildStudentHtml}.
 * 
 * @param {*} studs array of students
 * @returns html containing all students
 */
function buildStudentsHtml(studs) {
	return studs.map(stud => buildStudentHtml(stud)).join("\n");
}

/**
 * Given a student object, generates HTML. Use innerHtml to insert this
 * into the DOM, we will talk about security considerations soon!
 * 
 * @param {*} stud 
 * @returns 
 */
function buildStudentHtml(stud) {
	let html = `<div class = "col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">`;
	html += `<h1>${stud.name.first} ${stud.name.last}</h1>`;
	html += `<h3>${stud.major} </h3>`;
	html += `<p>${stud.name.first} is taking ${stud.numCredits} credits and ${stud.fromWisconsin ? "is" : "is not"} from Wisconsin.</p>`;
	html += `<p>Numer of interests: ${stud.interests.length}</p>`;
	stud.interests.forEach(interest => {
		html += `<li> ${interest} </li>`;
	});
	html += `</div>`
	return html;
}
