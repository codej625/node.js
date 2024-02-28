(() => {
  async function fetchUsers() {
    try {
      const response = await fetch("/user/age/50");
      const jsonData = await response.json();
      const wrap = document.querySelector("#wrap");
      const table = document.createElement("table");

      /* 테이블 헤더 생성 */
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
      ["ID", "Name", "Age", "Email"].forEach((headerText) => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);

      /* 사용자 데이터 표시 */
      const tbody = document.createElement("tbody");
      jsonData.forEach((user) => {
        const row = document.createElement("tr");
        ["id", "name", "age", "email"].forEach((fieldName) => {
          const cell = document.createElement("td");
          cell.textContent = user[fieldName];
          row.appendChild(cell);
        });
        tbody.appendChild(row);
      });
      table.appendChild(tbody);

      wrap.innerHTML = ''; /* 테이블 초기화 */
      wrap.appendChild(table);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  }

  fetchUsers();
})();
