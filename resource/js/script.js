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

	const mainContainer = document.getElementById("main-container");
	mainContainer.addEventListener("scroll", function () {
		if (mainContainer.scrollTop > 50) {
			mainContainer.classList.add("scrolled");
		} else {
			mainContainer.classList.remove("scrolled");
		}
	});

	window.initializeCalendar = function () {
		Vue.nextTick(() => {
			let calendarEl = document.getElementById('calendar');
			if (!calendarEl) return;

			let calendar = new FullCalendar.Calendar(calendarEl, {
				initialView: 'dayGridMonth',
				locale: 'ko',
				selectable: true,
				dateClick: function (info) {
					$('#selectedDate').val(info.dateStr);
					$('#eventModal').modal('show');
				}
			});
			calendar.render();

			document.getElementById('saveEvent').addEventListener('click', function () {
				let date = $('#selectedDate').val();
				let reason = $('#reasonInput').val().trim();

				if (reason) {
					calendar.addEvent({
						title: reason,
						start: date,
						backgroundColor: '#ff6666',
						textColor: '#fff',
						borderColor: '#ff3333'
					});
				}

				$('#eventModal').modal('hide');
				$('#reasonInput').val('');
			});
		});
	};
});
