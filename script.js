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
		locale: 'ko',
		selectable: true,
		dateClick: function(info) {
			$('#selectedDate').val(info.dateStr); // 선택한 날짜 저장
			$('#eventModal').modal('show'); // 모달 표시
		}
	});
	calendar.render();

	// 이벤트 저장 버튼 클릭 시
	document.getElementById('saveEvent').addEventListener('click', function() {
		let date = $('#selectedDate').val();
		let reason = $('#reasonInput').val().trim();

		if (reason) {
			calendar.addEvent({
				title: reason,
				start: date,
				backgroundColor: '#ff6666', // 기본 색상 (변경 가능)
				textColor: '#fff',
				borderColor: '#ff3333'
			});
		}

		$('#eventModal').modal('hide'); // 모달 닫기
		$('#reasonInput').val(''); // 입력 필드 초기화
	});
});


