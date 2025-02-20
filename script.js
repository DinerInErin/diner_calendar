document.addEventListener("DOMContentLoaded", function () {
	const sidebar = document.getElementById("sidebar");
	const toggleButton = document.getElementById("sidebar-toggle");
	// 초기 상태 설정 (접힌 상태)
	sidebar.classList.remove("open");
	toggleButton.addEventListener("click", function () {
		sidebar.classList.toggle("open");
	});
});

document.addEventListener('DOMContentLoaded', function() {
	let calendarEl = document.getElementById('calendar');
	let calendar = new FullCalendar.Calendar(calendarEl, {
		initialView: 'dayGridMonth',
		dateClick: function(info) {
			let reason = prompt("해당 날짜에 만날 수 없는 이유를 입력하세요:");
			if (reason) {
				calendar.addEvent({
					title: "❌",
					start: info.dateStr,
					backgroundColor: '#ff4d4d',
					borderColor: '#ff4d4d',
					extendedProps: { reason: reason }
				});
			}
		},
		eventDidMount: function(info) {
			if (info.event.extendedProps.reason) {
				$(info.el).tooltip({
					title: info.event.extendedProps.reason,
					placement: 'top'
				});
			}
		}
	});
	calendar.render();
});

