document.addEventListener("DOMContentLoaded", () => {
	const { createApp } = Vue;
	const { createRouter, createWebHashHistory } = VueRouter;

	const Main = { template: "<div><h2>메인 페이지</h2></div>" };
	const Schedule = { template: "<div><h2>다음 일정</h2></div>" };
	const Calendar = {
		template: "<div><h2>일정 체크</h2><div id='calendar'></div></div>",
		mounted() {
			this.$nextTick(() => {
				let calendarEl = document.getElementById("calendar");
				if (calendarEl) {
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
		}
	};

	const routes = [
		{ path: "/main", component: Main },
		{ path: "/schedule", component: Schedule },
		{ path: "/calendar", component: Calendar }
	];

	const router = createRouter({
		history: createWebHashHistory(),
		routes
	});

	const app = createApp({
		data() {
			return {};
		}
	});

	app.use(router);
	app.mount("#app");
});
