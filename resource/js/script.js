document.addEventListener("DOMContentLoaded", function () {
	const sidebar = document.getElementById("sidebar");
	const sidebarToggle = document.getElementById("sidebar-toggle");
	const sidebarOverlay = document.createElement("div");
	sidebarOverlay.id = "sidebar-overlay";
	document.body.appendChild(sidebarOverlay);

	sidebarToggle.addEventListener("click", function () {
		sidebar.classList.add("active");
		sidebarOverlay.classList.add("active");
	});
	sidebarOverlay.addEventListener("click", function () {
		sidebar.classList.remove("active");
		sidebarOverlay.classList.remove("active");
	});

	const app = document.getElementById("app");
	const mainContainer = document.getElementById("main-container");
	mainContainer.addEventListener("scroll", function () {
		if (mainContainer.scrollTop > 50) {
			app.classList.add("scrolled");
		} else {
			app.classList.remove("scrolled");
		}
	});

	const observer = new MutationObserver(() => {
		const calendarEl = document.getElementById("calendar");
		if (calendarEl && !calendarEl.dataset.initialized) {
			calendarEl.dataset.initialized = "true"; // 중복 방지
			console.log("✅ Calendar detected, initializing...");

			let calendar = new FullCalendar.Calendar(calendarEl, {
				initialView: "dayGridMonth",
				locale: "ko",
				selectable: true,
				fixedWeekCount: false,
				headerToolbar: false,
				dayHeaderFormat: {
					weekday: 'long'
				},
				dateClick: function (info) {
					$("#selectedDate").val(info.dateStr);
					$("#eventModal").modal("show");
				},
				dayCellContent: function (info) {
					let number = document.createElement("a");
					number.classList.add("fc-daygrid-day-number");
					number.innerHTML = info.dayNumberText.replace("일","");
					if (info.view.type === "dayGridMonth") {
						return {
							html: number.outerHTML
						};
					}
					return {
						domNodes: []
					};
				},
			});
			calendar.render();
		}
	});

	// `#app` 내부 변화를 감지 (동적 HTML 변경 감지)
	observer.observe(document.getElementById("app"), { childList: true, subtree: true });
});

function handleCredentialResponse(response) {
	const data = parseJwt(response.credential);
	document.getElementById('profile-img').src = data.picture;
	document.getElementById('user-name').innerText = data.name;

	document.getElementById('profile-icon').classList.add('hidden');
	document.getElementById('user-info').classList.remove('hidden');
	document.getElementById('login-button').classList.add('hidden');
}

function parseJwt(token) {
	return JSON.parse(atob(token.split('.')[1]));
}

window.onload = function () {
	google.accounts.id.initialize({
		client_id: "YOUR_GOOGLE_CLIENT_ID",
		callback: handleCredentialResponse
	});
	google.accounts.id.renderButton(
		document.getElementById("login-button"),
		{ type: "standard", theme: "outline", size: "medium" , text: "signin", width: "100", locale: "en_EN"}
	);
};