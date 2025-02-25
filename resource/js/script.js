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
				dateClick: function (info) {
					$("#selectedDate").val(info.dateStr);
					$("#eventModal").modal("show");
				}
			});
			calendar.render();
		}
	});

	// `#app` 내부 변화를 감지 (동적 HTML 변경 감지)
	observer.observe(document.getElementById("app"), { childList: true, subtree: true });
});
